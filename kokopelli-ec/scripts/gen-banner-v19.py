"""
ココペリEC v19 高品質バナー
- 初期に使ってた猫写真 (pet-cat-happy.jpg) を主役にしたフォトリアル合成
- 大きい文字 + シネマグラデ + 価格バナー
- フィード(1080x1080) / ストーリー(1080x1920) の2サイズ
"""

import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
SRC_CAT = ROOT / "public" / "images" / "pet-cat-happy.jpg"
OUT_DIR = ROOT / "public" / "ads-v19"
OUT_DIR.mkdir(parents=True, exist_ok=True)

NOTO_BOLD = "C:/Windows/Fonts/NotoSansJP-VF.ttf"

AMBER = (245, 166, 35, 255)
AMBER_DARK = (210, 130, 20, 255)
AMBER_LIGHT = (255, 209, 102, 255)
NAVY_DEEP = (8, 24, 48, 255)
NAVY_MID = (16, 48, 88, 255)
WHITE = (255, 255, 255, 255)
BLACK = (0, 0, 0, 255)


def font(path, size, weight=900):
    f = ImageFont.truetype(path, size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


def fit_cover(img, target_w, target_h, focal=("center", 0.35)):
    sw, sh = img.size
    scale = max(target_w / sw, target_h / sh)
    nw, nh = int(sw * scale), int(sh * scale)
    img = img.resize((nw, nh), Image.LANCZOS)
    left = max(0, (nw - target_w) // 2)
    fy = focal[1]
    top = max(0, int((nh - target_h) * fy))
    return img.crop((left, top, left + target_w, top + target_h))


def gradient_layer(size, stops):
    w, h = size
    img = Image.new("RGBA", size)
    px = img.load()
    stops = sorted(stops, key=lambda s: s[0])
    for y in range(h):
        t = y / max(h - 1, 1)
        c = None
        for i in range(len(stops) - 1):
            t0, c0 = stops[i]
            t1, c1 = stops[i + 1]
            if t0 <= t <= t1:
                k = (t - t0) / max(t1 - t0, 1e-9)
                c = tuple(int(c0[j] * (1 - k) + c1[j] * k) for j in range(4))
                break
        if c is None:
            c = stops[-1][1] if t > stops[-1][0] else stops[0][1]
        for x in range(w):
            px[x, y] = c
    return img


def measure(text, font_obj):
    tmp = Image.new("RGBA", (8, 8))
    d = ImageDraw.Draw(tmp)
    bbox = d.textbbox((0, 0), text, font=font_obj)
    return bbox


def draw_text_centered(canvas, y, text, font_obj, fill, shadow=True, shadow_offset=8, shadow_blur=10):
    bbox = measure(text, font_obj)
    tw = bbox[2] - bbox[0]
    x = (canvas.size[0] - tw) // 2 - bbox[0]
    if shadow:
        sh_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        sd = ImageDraw.Draw(sh_layer)
        sd.text((x, y + shadow_offset), text, font=font_obj, fill=(0, 0, 0, 200))
        sh_layer = sh_layer.filter(ImageFilter.GaussianBlur(shadow_blur))
        canvas.alpha_composite(sh_layer)
    d = ImageDraw.Draw(canvas)
    d.text((x, y), text, font=font_obj, fill=fill)
    return bbox[3] - bbox[1]


def draw_text_at(canvas, x, y, text, font_obj, fill, shadow=False, shadow_offset=6, shadow_blur=8):
    if shadow:
        sh_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        sd = ImageDraw.Draw(sh_layer)
        sd.text((x, y + shadow_offset), text, font=font_obj, fill=(0, 0, 0, 180))
        sh_layer = sh_layer.filter(ImageFilter.GaussianBlur(shadow_blur))
        canvas.alpha_composite(sh_layer)
    d = ImageDraw.Draw(canvas)
    d.text((x, y), text, font=font_obj, fill=fill)


def rounded_rect(size, radius, fill, outline=None, outline_w=0):
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([(0, 0), size], radius=radius, fill=fill, outline=outline, width=outline_w)
    return img


def make_feed():
    W, H = 1080, 1080
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 255))

    cat = Image.open(SRC_CAT).convert("RGBA")
    cat = fit_cover(cat, W, H, focal=("center", 0.30))
    enh = ImageEnhance.Contrast(cat).enhance(1.10)
    enh = ImageEnhance.Color(enh).enhance(1.18)
    canvas.paste(enh, (0, 0))

    top_grad = gradient_layer((W, int(H * 0.55)), [
        (0.0, (8, 20, 40, 235)),
        (1.0, (8, 20, 40, 0)),
    ])
    canvas.alpha_composite(top_grad, (0, 0))

    bot_grad = gradient_layer((W, int(H * 0.55)), [
        (0.0, (8, 20, 40, 0)),
        (1.0, (8, 20, 40, 250)),
    ])
    canvas.alpha_composite(bot_grad, (0, H - bot_grad.size[1]))

    # === TOP BAND: brand eyebrow ===
    f_eye = font(NOTO_BOLD, 36, 700)
    draw_text_centered(canvas, 60, "KOKOPELLI  ｜  ペット専用 国産シリカ天然水", f_eye, AMBER_LIGHT, shadow=True)

    # accent underline under eyebrow
    d = ImageDraw.Draw(canvas)
    d.rectangle([(W // 2 - 50, 122), (W // 2 + 50, 126)], fill=AMBER)

    # === HEADLINES ===
    f_main = font(NOTO_BOLD, 116, 900)
    draw_text_centered(canvas, 160, "毎日のお水を、", f_main, WHITE)
    draw_text_centered(canvas, 295, "見直すだけ。", f_main, AMBER_LIGHT)

    # === BOTTOM ORANGE PANEL (price) ===
    panel_w = W - 100
    panel_h = 230
    panel_x = 50
    panel_y = H - panel_h - 130  # leaves room for CTA below
    panel = rounded_rect((panel_w, panel_h), 32, AMBER)
    # subtle drop shadow for the panel
    sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh)
    sd.rounded_rectangle([(panel_x, panel_y + 12), (panel_x + panel_w, panel_y + panel_h + 12)], radius=32, fill=(0, 0, 0, 140))
    sh = sh.filter(ImageFilter.GaussianBlur(20))
    canvas.alpha_composite(sh)
    canvas.alpha_composite(panel, (panel_x, panel_y))

    # price main
    f_price = font(NOTO_BOLD, 130, 900)
    txt = "2本 ¥5,980"
    bbox = measure(txt, f_price)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    px = panel_x + (panel_w - tw) // 2 - bbox[0]
    py = panel_y + 25 - bbox[1]
    draw_text_at(canvas, px, py, txt, f_price, NAVY_DEEP)

    # price sub
    f_psub = font(NOTO_BOLD, 34, 700)
    sub_text = "1本あたり ¥2,990  ·  送料無料  ·  30日返金保証"
    bbox = measure(sub_text, f_psub)
    tw = bbox[2] - bbox[0]
    sx = panel_x + (panel_w - tw) // 2 - bbox[0]
    sy = panel_y + panel_h - 50 - bbox[1]
    draw_text_at(canvas, sx, sy, sub_text, f_psub, NAVY_DEEP)

    # === CTA BUTTON below panel ===
    cta_w, cta_h = 640, 88
    cta_x = (W - cta_w) // 2
    cta_y = H - cta_h - 20
    cta = rounded_rect((cta_w, cta_h), 44, NAVY_DEEP)
    canvas.alpha_composite(cta, (cta_x, cta_y))
    f_cta = font(NOTO_BOLD, 42, 900)
    cta_text = "公式サイトはこちら  ▶"
    bbox = measure(cta_text, f_cta)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = cta_x + (cta_w - tw) // 2 - bbox[0]
    ty = cta_y + (cta_h - th) // 2 - bbox[1]
    draw_text_at(canvas, tx, ty, cta_text, f_cta, WHITE)

    out_path = OUT_DIR / "banner-v19-feed-cat-1080x1080.png"
    canvas.convert("RGB").save(out_path, "PNG", optimize=True)
    print(f"[feed] saved: {out_path}")


def make_story():
    W, H = 1080, 1920
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 255))

    cat = Image.open(SRC_CAT).convert("RGBA")
    cat = fit_cover(cat, W, H, focal=("center", 0.20))
    enh = ImageEnhance.Contrast(cat).enhance(1.10)
    enh = ImageEnhance.Color(enh).enhance(1.18)
    canvas.paste(enh, (0, 0))

    top_grad = gradient_layer((W, int(H * 0.45)), [
        (0.0, (8, 20, 40, 245)),
        (1.0, (8, 20, 40, 0)),
    ])
    canvas.alpha_composite(top_grad, (0, 0))

    bot_grad = gradient_layer((W, int(H * 0.55)), [
        (0.0, (8, 20, 40, 0)),
        (1.0, (8, 20, 40, 250)),
    ])
    canvas.alpha_composite(bot_grad, (0, H - bot_grad.size[1]))

    # === TOP BAND ===
    f_eye = font(NOTO_BOLD, 42, 700)
    draw_text_centered(canvas, 90, "KOKOPELLI  ｜  ペット専用 国産シリカ天然水", f_eye, AMBER_LIGHT, shadow=True)

    d = ImageDraw.Draw(canvas)
    d.rectangle([(W // 2 - 60, 165), (W // 2 + 60, 170)], fill=AMBER)

    # === HEADLINES ===
    f_main = font(NOTO_BOLD, 158, 900)
    draw_text_centered(canvas, 220, "毎日のお水を、", f_main, WHITE)
    draw_text_centered(canvas, 410, "見直すだけ。", f_main, AMBER_LIGHT)

    # sub copy
    f_sub_top = font(NOTO_BOLD, 50, 700)
    draw_text_centered(canvas, 620, "ペットの『命の水』を", f_sub_top, WHITE, shadow=True)
    draw_text_centered(canvas, 695, "見つめ直す習慣。", f_sub_top, WHITE, shadow=True)

    # === BOTTOM ORANGE PANEL ===
    panel_w = W - 100
    panel_h = 420
    panel_x = 50
    panel_y = H - panel_h - 180
    sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh)
    sd.rounded_rectangle([(panel_x, panel_y + 16), (panel_x + panel_w, panel_y + panel_h + 16)], radius=40, fill=(0, 0, 0, 140))
    sh = sh.filter(ImageFilter.GaussianBlur(24))
    canvas.alpha_composite(sh)
    panel = rounded_rect((panel_w, panel_h), 40, AMBER)
    canvas.alpha_composite(panel, (panel_x, panel_y))

    # price main
    f_price = font(NOTO_BOLD, 180, 900)
    txt = "2本 ¥5,980"
    bbox = measure(txt, f_price)
    tw = bbox[2] - bbox[0]
    px = panel_x + (panel_w - tw) // 2 - bbox[0]
    py = panel_y + 40 - bbox[1]
    draw_text_at(canvas, px, py, txt, f_price, NAVY_DEEP)

    # price sub line 1
    f_psub = font(NOTO_BOLD, 50, 700)
    sub1 = "1本あたり ¥2,990  ·  送料無料"
    bbox = measure(sub1, f_psub)
    tw = bbox[2] - bbox[0]
    sx = panel_x + (panel_w - tw) // 2 - bbox[0]
    sy = panel_y + 250 - bbox[1]
    draw_text_at(canvas, sx, sy, sub1, f_psub, NAVY_DEEP)

    sub2 = "30日間返金保証 / 学会症例報告"
    bbox = measure(sub2, f_psub)
    tw = bbox[2] - bbox[0]
    sx = panel_x + (panel_w - tw) // 2 - bbox[0]
    sy = panel_y + 330 - bbox[1]
    draw_text_at(canvas, sx, sy, sub2, f_psub, NAVY_DEEP)

    # === CTA BUTTON below panel ===
    cta_w, cta_h = 760, 120
    cta_x = (W - cta_w) // 2
    cta_y = H - cta_h - 40
    cta = rounded_rect((cta_w, cta_h), 60, NAVY_DEEP)
    canvas.alpha_composite(cta, (cta_x, cta_y))
    f_cta = font(NOTO_BOLD, 54, 900)
    cta_text = "公式サイトはこちら  ▶"
    bbox = measure(cta_text, f_cta)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = cta_x + (cta_w - tw) // 2 - bbox[0]
    ty = cta_y + (cta_h - th) // 2 - bbox[1]
    draw_text_at(canvas, tx, ty, cta_text, f_cta, WHITE)

    out_path = OUT_DIR / "banner-v19-story-cat-1080x1920.png"
    canvas.convert("RGB").save(out_path, "PNG", optimize=True)
    print(f"[story] saved: {out_path}")


if __name__ == "__main__":
    make_feed()
    make_story()
    print("DONE.")
