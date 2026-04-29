"""
ココペリEC v20 高品質バナー（権威軸刷新版）
- LP獣医師証言ブロックと整合: 「獣医師10年使用 × 学会症例2回 × 宮崎天然シリカ」
- v19 (猫写真ベース) を継承しつつヘッドライン/バッジ/CTAをアップグレード
- フィード(1080x1080) / ストーリー(1080x1920)
"""

import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
SRC_CAT = ROOT / "public" / "images" / "pet-cat-tongue.jpg"
OUT_DIR = ROOT / "public" / "ads-v20"
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


def vignette(size, strength=0.55):
    w, h = size
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy = w // 2, h // 2
    rad = int(max(w, h) * 0.85)
    for r in range(rad, 0, -8):
        a = int(strength * 255 * (1 - r / rad) ** 2)
        d.ellipse([(cx - r, cy - r), (cx + r, cy + r)], outline=(0, 0, 0, a), width=4)
    return layer.filter(ImageFilter.GaussianBlur(40))


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


def authority_pills(canvas, top_y, items, font_obj, fill_bg=(255, 255, 255, 235), fill_fg=NAVY_DEEP, gap=18, pad_x=24, pad_y=12, radius_factor=0.5):
    """信頼バッジ群を中央寄せに横並び配置。items: [str, ...]"""
    measured = []
    for it in items:
        b = measure(it, font_obj)
        measured.append((it, b[2] - b[0], b[3] - b[1], b[0], b[1]))
    pill_h = max(m[2] for m in measured) + pad_y * 2
    radius = int(pill_h * radius_factor)
    total_w = sum(m[1] + pad_x * 2 for m in measured) + gap * (len(measured) - 1)
    x = (canvas.size[0] - total_w) // 2
    for it, tw, th, bx, by in measured:
        pill_w = tw + pad_x * 2
        # subtle shadow
        sh = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        sd = ImageDraw.Draw(sh)
        sd.rounded_rectangle([(x, top_y + 4), (x + pill_w, top_y + pill_h + 4)], radius=radius, fill=(0, 0, 0, 110))
        sh = sh.filter(ImageFilter.GaussianBlur(10))
        canvas.alpha_composite(sh)
        pill = rounded_rect((pill_w, pill_h), radius, fill_bg)
        canvas.alpha_composite(pill, (x, top_y))
        d = ImageDraw.Draw(canvas)
        d.text((x + pad_x - bx, top_y + pad_y - by), it, font=font_obj, fill=fill_fg)
        x += pill_w + gap


def make_feed():
    W, H = 1080, 1080
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 255))

    cat = Image.open(SRC_CAT).convert("RGBA")
    cat = fit_cover(cat, W, H, focal=("center", 0.30))
    enh = ImageEnhance.Contrast(cat).enhance(1.12)
    enh = ImageEnhance.Color(enh).enhance(1.20)
    canvas.paste(enh, (0, 0))
    canvas.alpha_composite(vignette((W, H), strength=0.45))

    top_grad = gradient_layer((W, int(H * 0.50)), [
        (0.0, (8, 20, 40, 230)),
        (1.0, (8, 20, 40, 0)),
    ])
    canvas.alpha_composite(top_grad, (0, 0))

    bot_grad = gradient_layer((W, int(H * 0.58)), [
        (0.0, (8, 20, 40, 0)),
        (1.0, (8, 20, 40, 252)),
    ])
    canvas.alpha_composite(bot_grad, (0, H - bot_grad.size[1]))

    # === EYEBROW ===
    f_eye = font(NOTO_BOLD, 34, 700)
    draw_text_centered(canvas, 60, "KOKOPELLI  ｜  獣医師10年、診療で使用", f_eye, AMBER_LIGHT, shadow=True)
    d = ImageDraw.Draw(canvas)
    d.rectangle([(W // 2 - 60, 118), (W // 2 + 60, 122)], fill=AMBER)

    # === HEADLINES ===
    f_main = font(NOTO_BOLD, 122, 900)
    draw_text_centered(canvas, 152, "10年、選ばれた", f_main, WHITE)
    draw_text_centered(canvas, 296, "シリカ天然水。", f_main, AMBER_LIGHT)

    # === AUTHORITY PILLS ===
    f_pill = font(NOTO_BOLD, 28, 800)
    authority_pills(canvas, 460, ["✓ 学会症例報告 2回", "✓ 宮崎・天然シリカ", "✓ 30日返金保証"], f_pill)

    # === BOTTOM ORANGE PANEL (price) ===
    panel_w = W - 100
    panel_h = 220
    panel_x = 50
    panel_y = H - panel_h - 130
    sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh)
    sd.rounded_rectangle([(panel_x, panel_y + 12), (panel_x + panel_w, panel_y + panel_h + 12)], radius=32, fill=(0, 0, 0, 140))
    sh = sh.filter(ImageFilter.GaussianBlur(20))
    canvas.alpha_composite(sh)
    panel = rounded_rect((panel_w, panel_h), 32, AMBER)
    canvas.alpha_composite(panel, (panel_x, panel_y))

    # 限定バッジ
    badge_w, badge_h = 200, 48
    badge_x = panel_x + (panel_w - badge_w) // 2
    badge_y = panel_y - badge_h // 2
    badge = rounded_rect((badge_w, badge_h), 24, NAVY_DEEP)
    canvas.alpha_composite(badge, (badge_x, badge_y))
    f_badge = font(NOTO_BOLD, 26, 900)
    bb = measure("初回限定特価", f_badge)
    bw = bb[2] - bb[0]
    bh = bb[3] - bb[1]
    draw_text_at(canvas, badge_x + (badge_w - bw) // 2 - bb[0], badge_y + (badge_h - bh) // 2 - bb[1], "初回限定特価", f_badge, AMBER_LIGHT)

    # price main
    f_price = font(NOTO_BOLD, 124, 900)
    txt = "2本 ¥5,980"
    bbox = measure(txt, f_price)
    tw = bbox[2] - bbox[0]
    px = panel_x + (panel_w - tw) // 2 - bbox[0]
    py = panel_y + 35 - bbox[1]
    draw_text_at(canvas, px, py, txt, f_price, NAVY_DEEP)

    # price sub
    f_psub = font(NOTO_BOLD, 32, 700)
    sub_text = "1本あたり ¥2,990  ·  送料無料  ·  30日返金保証"
    bbox = measure(sub_text, f_psub)
    tw = bbox[2] - bbox[0]
    sx = panel_x + (panel_w - tw) // 2 - bbox[0]
    sy = panel_y + panel_h - 48 - bbox[1]
    draw_text_at(canvas, sx, sy, sub_text, f_psub, NAVY_DEEP)

    # === CTA BUTTON ===
    cta_w, cta_h = 720, 92
    cta_x = (W - cta_w) // 2
    cta_y = H - cta_h - 18
    # gradient cta
    cta = rounded_rect((cta_w, cta_h), 46, NAVY_DEEP)
    # subtle gold inner border
    cta_border = rounded_rect((cta_w, cta_h), 46, (0, 0, 0, 0), outline=AMBER, outline_w=3)
    canvas.alpha_composite(cta, (cta_x, cta_y))
    canvas.alpha_composite(cta_border, (cta_x, cta_y))
    f_cta = font(NOTO_BOLD, 44, 900)
    cta_text = "今すぐ詳細を見る  ▶"
    bbox = measure(cta_text, f_cta)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = cta_x + (cta_w - tw) // 2 - bbox[0]
    ty = cta_y + (cta_h - th) // 2 - bbox[1]
    draw_text_at(canvas, tx, ty, cta_text, f_cta, WHITE)

    out_path = OUT_DIR / "banner-v20-feed-cat-1080x1080.png"
    canvas.convert("RGB").save(out_path, "PNG", optimize=True)
    print(f"[feed] saved: {out_path}")


def make_story():
    W, H = 1080, 1920
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 255))

    cat = Image.open(SRC_CAT).convert("RGBA")
    cat = fit_cover(cat, W, H, focal=("center", 0.20))
    enh = ImageEnhance.Contrast(cat).enhance(1.12)
    enh = ImageEnhance.Color(enh).enhance(1.20)
    canvas.paste(enh, (0, 0))
    canvas.alpha_composite(vignette((W, H), strength=0.45))

    top_grad = gradient_layer((W, int(H * 0.45)), [
        (0.0, (8, 20, 40, 245)),
        (1.0, (8, 20, 40, 0)),
    ])
    canvas.alpha_composite(top_grad, (0, 0))

    bot_grad = gradient_layer((W, int(H * 0.55)), [
        (0.0, (8, 20, 40, 0)),
        (1.0, (8, 20, 40, 252)),
    ])
    canvas.alpha_composite(bot_grad, (0, H - bot_grad.size[1]))

    # === EYEBROW ===
    f_eye = font(NOTO_BOLD, 42, 700)
    draw_text_centered(canvas, 90, "KOKOPELLI  ｜  獣医師10年、診療で使用", f_eye, AMBER_LIGHT, shadow=True)
    d = ImageDraw.Draw(canvas)
    d.rectangle([(W // 2 - 70, 165), (W // 2 + 70, 170)], fill=AMBER)

    # === HEADLINES ===
    f_main = font(NOTO_BOLD, 158, 900)
    draw_text_centered(canvas, 220, "10年、選ばれた", f_main, WHITE)
    draw_text_centered(canvas, 410, "シリカ天然水。", f_main, AMBER_LIGHT)

    # === SUBCOPY ===
    f_sub_top = font(NOTO_BOLD, 50, 700)
    draw_text_centered(canvas, 620, "宮崎・都井岬の獣医師が", f_sub_top, WHITE, shadow=True)
    draw_text_centered(canvas, 695, "臨床で使い続ける一本。", f_sub_top, WHITE, shadow=True)

    # === AUTHORITY PILLS ===
    f_pill = font(NOTO_BOLD, 36, 800)
    authority_pills(canvas, 820, ["✓ 学会症例報告 2回", "✓ 宮崎・天然シリカ"], f_pill, pad_x=30, pad_y=16)
    authority_pills(canvas, 900, ["✓ 30日返金保証", "✓ 全国送料無料"], f_pill, pad_x=30, pad_y=16)

    # === BOTTOM ORANGE PANEL ===
    panel_w = W - 100
    panel_h = 420
    panel_x = 50
    panel_y = H - panel_h - 200
    sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh)
    sd.rounded_rectangle([(panel_x, panel_y + 16), (panel_x + panel_w, panel_y + panel_h + 16)], radius=40, fill=(0, 0, 0, 140))
    sh = sh.filter(ImageFilter.GaussianBlur(24))
    canvas.alpha_composite(sh)
    panel = rounded_rect((panel_w, panel_h), 40, AMBER)
    canvas.alpha_composite(panel, (panel_x, panel_y))

    # 限定バッジ
    badge_w, badge_h = 320, 64
    badge_x = panel_x + (panel_w - badge_w) // 2
    badge_y = panel_y - badge_h // 2
    badge = rounded_rect((badge_w, badge_h), 32, NAVY_DEEP)
    canvas.alpha_composite(badge, (badge_x, badge_y))
    f_badge = font(NOTO_BOLD, 36, 900)
    bb = measure("初回限定特価 ✦", f_badge)
    bw = bb[2] - bb[0]
    bh = bb[3] - bb[1]
    draw_text_at(canvas, badge_x + (badge_w - bw) // 2 - bb[0], badge_y + (badge_h - bh) // 2 - bb[1], "初回限定特価 ✦", f_badge, AMBER_LIGHT)

    # price main
    f_price = font(NOTO_BOLD, 180, 900)
    txt = "2本 ¥5,980"
    bbox = measure(txt, f_price)
    tw = bbox[2] - bbox[0]
    px = panel_x + (panel_w - tw) // 2 - bbox[0]
    py = panel_y + 50 - bbox[1]
    draw_text_at(canvas, px, py, txt, f_price, NAVY_DEEP)

    # price sub line 1
    f_psub = font(NOTO_BOLD, 50, 700)
    sub1 = "1本あたり ¥2,990  ·  送料無料"
    bbox = measure(sub1, f_psub)
    tw = bbox[2] - bbox[0]
    sx = panel_x + (panel_w - tw) // 2 - bbox[0]
    sy = panel_y + 260 - bbox[1]
    draw_text_at(canvas, sx, sy, sub1, f_psub, NAVY_DEEP)

    sub2 = "30日間返金保証 / 学会症例報告"
    bbox = measure(sub2, f_psub)
    tw = bbox[2] - bbox[0]
    sx = panel_x + (panel_w - tw) // 2 - bbox[0]
    sy = panel_y + 340 - bbox[1]
    draw_text_at(canvas, sx, sy, sub2, f_psub, NAVY_DEEP)

    # === CTA BUTTON ===
    cta_w, cta_h = 800, 130
    cta_x = (W - cta_w) // 2
    cta_y = H - cta_h - 50
    cta = rounded_rect((cta_w, cta_h), 65, NAVY_DEEP)
    cta_border = rounded_rect((cta_w, cta_h), 65, (0, 0, 0, 0), outline=AMBER, outline_w=4)
    canvas.alpha_composite(cta, (cta_x, cta_y))
    canvas.alpha_composite(cta_border, (cta_x, cta_y))
    f_cta = font(NOTO_BOLD, 56, 900)
    cta_text = "今すぐ詳細を見る  ▶"
    bbox = measure(cta_text, f_cta)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = cta_x + (cta_w - tw) // 2 - bbox[0]
    ty = cta_y + (cta_h - th) // 2 - bbox[1]
    draw_text_at(canvas, tx, ty, cta_text, f_cta, WHITE)

    out_path = OUT_DIR / "banner-v20-story-cat-1080x1920.png"
    canvas.convert("RGB").save(out_path, "PNG", optimize=True)
    print(f"[story] saved: {out_path}")


if __name__ == "__main__":
    make_feed()
    make_story()
    print("DONE.")
