"""
Meta広告用 動画クリエイティブ生成スクリプト v1
- 15秒 x 2本 (A_age / B_refund)
- 1080x1080 (feed) + 1080x1920 (story) 両対応
- 音声なし / BGMなし (SNS無音再生デフォルト)
- Python + MoviePy 2.x + ffmpeg
"""

import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import numpy as np
from moviepy import ImageClip, CompositeVideoClip, ColorClip

ROOT = Path(r"C:\Users\timbe\kokopelli-ec")
IMG_DIR = ROOT / "public" / "images"
ADS_DIR = ROOT / "public" / "ads"
OUT_DIR = ADS_DIR

FONT_BOLD = r"C:\Windows\Fonts\YuGothB.ttc"
FONT_MED = r"C:\Windows\Fonts\YuGothM.ttc"

# Brand palette
BRAND_GREEN = (76, 175, 80)
BRAND_ORANGE = (255, 152, 0)
BG_CREAM = (255, 248, 235)
TEXT_DARK = (33, 33, 33)
WHITE = (255, 255, 255)
RED = (230, 57, 70)


def make_text_image(size, text, font_path, font_size, color=TEXT_DARK,
                    bg=None, align="center", stroke_w=0, stroke_fill=None,
                    line_spacing=1.25, padding=40):
    """テキストを描画したPIL画像を返す(RGBA)"""
    W, H = size
    img = Image.new("RGBA", size, bg if bg else (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype(font_path, font_size)

    lines = text.split("\n")
    line_heights = []
    line_widths = []
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        line_widths.append(bbox[2] - bbox[0])
        line_heights.append(bbox[3] - bbox[1])

    total_h = int(sum(line_heights) * line_spacing)
    y = (H - total_h) // 2

    for line, lw, lh in zip(lines, line_widths, line_heights):
        if align == "center":
            x = (W - lw) // 2
        elif align == "left":
            x = padding
        else:
            x = W - lw - padding
        if stroke_w and stroke_fill:
            draw.text((x, y), line, font=font, fill=color,
                      stroke_width=stroke_w, stroke_fill=stroke_fill)
        else:
            draw.text((x, y), line, font=font, fill=color)
        y += int(lh * line_spacing)

    return img


def pil_to_clip(pil_img, duration):
    """PIL画像→MoviePy ImageClip"""
    return ImageClip(np.array(pil_img)).with_duration(duration)


def fit_image(img_path, target_size, crop_mode="cover"):
    """画像をtarget_sizeに合わせてPIL Imageで返す"""
    img = Image.open(img_path).convert("RGB")
    tw, th = target_size
    iw, ih = img.size
    ratio = max(tw / iw, th / ih) if crop_mode == "cover" else min(tw / iw, th / ih)
    nw, nh = int(iw * ratio), int(ih * ratio)
    img = img.resize((nw, nh), Image.LANCZOS)
    # center crop
    left = (nw - tw) // 2
    top = (nh - th) // 2
    img = img.crop((left, top, left + tw, top + th))
    return img


def rounded_rect_image(size, radius, fill, stroke=None, stroke_w=0):
    W, H = size
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([0, 0, W - 1, H - 1], radius=radius,
                            fill=fill, outline=stroke, width=stroke_w)
    return img


def make_cta_banner(width, height, price_text, cta_text):
    """下部CTAバナー(角丸オレンジ)"""
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    bg = rounded_rect_image((width - 60, height - 40), 30,
                             fill=BRAND_ORANGE + (255,))
    img.paste(bg, (30, 20), bg)
    draw = ImageDraw.Draw(img)
    f1 = ImageFont.truetype(FONT_BOLD, 56)
    f2 = ImageFont.truetype(FONT_BOLD, 44)
    b1 = draw.textbbox((0, 0), price_text, font=f1)
    b2 = draw.textbbox((0, 0), cta_text, font=f2)
    w1 = b1[2] - b1[0]
    w2 = b2[2] - b2[0]
    draw.text(((width - w1) // 2, 30), price_text, font=f1, fill=WHITE)
    draw.text(((width - w2) // 2, 110), cta_text, font=f2, fill=WHITE)
    return img


# ============ 共通: シーンビルダー ============

def build_scene_bg(size, color=BG_CREAM):
    return ColorClip(size, color=color).with_duration(1)


def kenburns_clip(pil_img, size, duration, zoom_from=1.0, zoom_to=1.08):
    """簡易Ken Burns (ズーム)"""
    arr = np.array(pil_img)
    base = ImageClip(arr).with_duration(duration)
    # resize animation
    base = base.resized(lambda t: zoom_from + (zoom_to - zoom_from) * (t / duration))
    base = base.with_position("center")
    return base


def overlay_text(text, size, duration, font_path=FONT_BOLD, font_size=90,
                 color=WHITE, stroke_w=6, stroke_fill=(0, 0, 0),
                 y_offset=0, fade_in=0.3):
    pil = make_text_image(size, text, font_path, font_size, color=color,
                          stroke_w=stroke_w, stroke_fill=stroke_fill)
    clip = ImageClip(np.array(pil)).with_duration(duration)
    if y_offset:
        clip = clip.with_position(("center", y_offset))
    if fade_in:
        clip = clip.with_effects([__import__("moviepy").vfx.FadeIn(fade_in)])
    return clip


# ============ 動画1: A_age ============

def build_video_a(size, out_path):
    W, H = size
    is_story = H > W

    # --- シーン1 (0-3s): フック ---
    pet_img = fit_image(IMG_DIR / "pet-dog-senior.jpg", size)
    # 下部に暗グラデーション+テキスト
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    grad_h = int(H * 0.55)
    for i in range(grad_h):
        alpha = int(200 * (i / grad_h))
        od.rectangle([0, H - grad_h + i, W, H - grad_h + i + 1],
                     fill=(0, 0, 0, alpha))
    scene1_bg = pet_img.convert("RGBA")
    scene1_bg.alpha_composite(overlay)
    # テキスト
    tsize = int(W * 0.095) if is_story else int(W * 0.085)
    txt_layer = make_text_image(size,
                                 "16歳のうちの子、\nまだ元気でいてほしい。",
                                 FONT_BOLD, tsize,
                                 color=WHITE, stroke_w=5, stroke_fill=(0, 0, 0))
    # テキスト下寄せにするため別画像合成
    final_s1 = scene1_bg.copy()
    # compute text layer position offset (center vertical → shift down)
    shift = int(H * 0.18) if is_story else int(H * 0.12)
    final_s1.alpha_composite(Image.fromarray(
        np.roll(np.array(txt_layer), shift, axis=0)))
    scene1 = pil_to_clip(final_s1.convert("RGB"), 3.0)

    # --- シーン2 (3-8s): 商品ショット ---
    v8a_path = ADS_DIR / ("banner-v8A-story-1080x1920.png" if is_story else "banner-v8A-feed-1080x1080.png")
    prod_img = fit_image(v8a_path, size)
    # 上部バナーテキスト追加
    banner_over = Image.new("RGBA", size, (0, 0, 0, 0))
    bd = ImageDraw.Draw(banner_over)
    bh = int(H * 0.12)
    bd.rectangle([0, 0, W, bh], fill=BRAND_GREEN + (230,))
    f_bn = ImageFont.truetype(FONT_BOLD, int(W * 0.055))
    bn_text = "高濃度ケイ素 10,000mg/L"
    bbx = bd.textbbox((0, 0), bn_text, font=f_bn)
    bd.text(((W - (bbx[2] - bbx[0])) // 2, (bh - (bbx[3] - bbx[1])) // 2 - 10),
            bn_text, font=f_bn, fill=WHITE)
    s2 = prod_img.convert("RGBA")
    s2.alpha_composite(banner_over)
    scene2 = pil_to_clip(s2.convert("RGB"), 5.0)

    # --- シーン3 (8-15s): CTA ---
    bg3 = Image.new("RGB", size, BG_CREAM)
    d3 = ImageDraw.Draw(bg3)
    # 見出し
    f_main = ImageFont.truetype(FONT_BOLD, int(W * 0.11))
    f_sub = ImageFont.truetype(FONT_BOLD, int(W * 0.07))
    f_small = ImageFont.truetype(FONT_MED, int(W * 0.045))

    main_txt = "まずは1本"
    price_txt = "¥3,480〜"
    sub_txt = "30日 全額返金保証"
    cta_txt = "今すぐ購入する"

    # Layout
    y_cursor = int(H * 0.15)
    b = d3.textbbox((0, 0), main_txt, font=f_main)
    d3.text(((W - (b[2] - b[0])) // 2, y_cursor), main_txt, font=f_main, fill=TEXT_DARK)
    y_cursor += int((b[3] - b[1]) * 1.3)

    # price - red
    b = d3.textbbox((0, 0), price_txt, font=f_main)
    d3.text(((W - (b[2] - b[0])) // 2, y_cursor), price_txt, font=f_main, fill=RED)
    y_cursor += int((b[3] - b[1]) * 1.6)

    # 返金保証バッジ
    badge_w = int(W * 0.75)
    badge_h = int(W * 0.13)
    badge = rounded_rect_image((badge_w, badge_h), 20,
                                fill=(255, 255, 255, 255),
                                stroke=BRAND_GREEN, stroke_w=5)
    bg3.paste(badge, ((W - badge_w) // 2, y_cursor), badge)
    bdg_d = ImageDraw.Draw(bg3)
    bb = bdg_d.textbbox((0, 0), sub_txt, font=f_sub)
    bdg_d.text(((W - (bb[2] - bb[0])) // 2, y_cursor + (badge_h - (bb[3] - bb[1])) // 2 - 5),
               sub_txt, font=f_sub, fill=BRAND_GREEN)
    y_cursor += badge_h + int(H * 0.06)

    # CTA button
    cta_w = int(W * 0.82)
    cta_h = int(W * 0.17)
    cta_btn = rounded_rect_image((cta_w, cta_h), 30,
                                  fill=BRAND_ORANGE + (255,))
    bg3.paste(cta_btn, ((W - cta_w) // 2, y_cursor), cta_btn)
    cd = ImageDraw.Draw(bg3)
    cb = cd.textbbox((0, 0), cta_txt, font=f_main)
    cd.text(((W - (cb[2] - cb[0])) // 2, y_cursor + (cta_h - (cb[3] - cb[1])) // 2 - 10),
            cta_txt, font=f_main, fill=WHITE)

    # 小さい注記
    note = "kokopelli.kamuturu.jp"
    nb = cd.textbbox((0, 0), note, font=f_small)
    cd.text(((W - (nb[2] - nb[0])) // 2, y_cursor + cta_h + int(H * 0.04)),
            note, font=f_small, fill=TEXT_DARK)

    scene3 = pil_to_clip(bg3, 7.0)

    # 連結
    from moviepy import concatenate_videoclips
    final = concatenate_videoclips([scene1, scene2, scene3], method="compose")
    final.write_videofile(str(out_path), fps=24, codec="libx264",
                          preset="medium", bitrate="2500k",
                          audio=False, threads=4)
    final.close()


# ============ 動画2: B_refund ============

def build_video_b(size, out_path):
    W, H = size
    is_story = H > W

    # --- シーン1 (0-3s): フック ---
    pet_img = fit_image(IMG_DIR / "pet-cat-happy.jpg", size)
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    # 半透明黒レイヤー
    od.rectangle([0, 0, W, H], fill=(0, 0, 0, 110))
    s1 = pet_img.convert("RGBA")
    s1.alpha_composite(overlay)
    # テキスト
    tsize = int(W * 0.1) if is_story else int(W * 0.09)
    d = ImageDraw.Draw(s1)
    f = ImageFont.truetype(FONT_BOLD, tsize)
    line1 = "効果なければ"
    line2 = "30日 全額返金。"
    b1 = d.textbbox((0, 0), line1, font=f)
    b2 = d.textbbox((0, 0), line2, font=f)
    th_total = (b1[3] - b1[1]) + (b2[3] - b2[1]) + int(tsize * 0.3)
    y = (H - th_total) // 2
    d.text(((W - (b1[2] - b1[0])) // 2, y), line1, font=f, fill=WHITE,
           stroke_width=5, stroke_fill=(0, 0, 0))
    d.text(((W - (b2[2] - b2[0])) // 2, y + int(tsize * 1.3)),
           line2, font=f, fill=(255, 220, 80),
           stroke_width=5, stroke_fill=(0, 0, 0))
    scene1 = pil_to_clip(s1.convert("RGB"), 3.0)

    # --- シーン2 (3-8s): 返金保証バッジ ---
    bg2 = Image.new("RGB", size, BG_CREAM)
    d2 = ImageDraw.Draw(bg2)
    # 大きい円形バッジ
    badge_d = int(min(W, H) * 0.55)
    cx, cy = W // 2, int(H * 0.38)
    d2.ellipse([cx - badge_d // 2, cy - badge_d // 2,
                cx + badge_d // 2, cy + badge_d // 2],
               fill=BRAND_GREEN, outline=WHITE, width=15)
    # 内側リング
    d2.ellipse([cx - badge_d // 2 + 25, cy - badge_d // 2 + 25,
                cx + badge_d // 2 - 25, cy + badge_d // 2 - 25],
               outline=WHITE, width=5)

    f_bg = ImageFont.truetype(FONT_BOLD, int(W * 0.095))
    f_sm = ImageFont.truetype(FONT_BOLD, int(W * 0.06))
    l1 = "30日"
    l2 = "全額返金"
    l3 = "保証"
    b1 = d2.textbbox((0, 0), l1, font=f_bg)
    b2 = d2.textbbox((0, 0), l2, font=f_bg)
    b3 = d2.textbbox((0, 0), l3, font=f_sm)
    y0 = cy - int(badge_d * 0.3)
    d2.text((cx - (b1[2] - b1[0]) // 2, y0), l1, font=f_bg, fill=WHITE)
    d2.text((cx - (b2[2] - b2[0]) // 2, y0 + int((b1[3] - b1[1]) * 1.3)),
            l2, font=f_bg, fill=WHITE)
    d2.text((cx - (b3[2] - b3[0]) // 2, y0 + int((b1[3] - b1[1]) * 2.5)),
            l3, font=f_sm, fill=WHITE)

    # 下段テキスト
    f_lower = ImageFont.truetype(FONT_BOLD, int(W * 0.07))
    lower1 = "飲みっぱなしでもOK"
    lower2 = "リスクゼロでお試し"
    ly = int(H * 0.75)
    bl1 = d2.textbbox((0, 0), lower1, font=f_lower)
    bl2 = d2.textbbox((0, 0), lower2, font=f_lower)
    d2.text(((W - (bl1[2] - bl1[0])) // 2, ly), lower1, font=f_lower, fill=TEXT_DARK)
    d2.text(((W - (bl2[2] - bl2[0])) // 2, ly + int((bl1[3] - bl1[1]) * 1.4)),
            lower2, font=f_lower, fill=BRAND_ORANGE)

    scene2 = pil_to_clip(bg2, 5.0)

    # --- シーン3 (8-15s): CTA ---
    bg3 = Image.new("RGB", size, BG_CREAM)
    d3 = ImageDraw.Draw(bg3)
    f_main = ImageFont.truetype(FONT_BOLD, int(W * 0.11))
    f_sub = ImageFont.truetype(FONT_BOLD, int(W * 0.07))
    f_small = ImageFont.truetype(FONT_MED, int(W * 0.045))

    y_cursor = int(H * 0.15)
    main_txt = "お試し1本"
    price_txt = "¥3,480"
    b = d3.textbbox((0, 0), main_txt, font=f_main)
    d3.text(((W - (b[2] - b[0])) // 2, y_cursor), main_txt, font=f_main, fill=TEXT_DARK)
    y_cursor += int((b[3] - b[1]) * 1.4)

    b = d3.textbbox((0, 0), price_txt, font=f_main)
    d3.text(((W - (b[2] - b[0])) // 2, y_cursor), price_txt, font=f_main, fill=RED)
    y_cursor += int((b[3] - b[1]) * 1.8)

    # 返金保証バッジ
    badge_w = int(W * 0.75)
    badge_h = int(W * 0.13)
    badge = rounded_rect_image((badge_w, badge_h), 20,
                                fill=(255, 255, 255, 255),
                                stroke=BRAND_GREEN, stroke_w=5)
    bg3.paste(badge, ((W - badge_w) // 2, y_cursor), badge)
    bdg_d = ImageDraw.Draw(bg3)
    sub_txt = "30日 全額返金保証"
    bb = bdg_d.textbbox((0, 0), sub_txt, font=f_sub)
    bdg_d.text(((W - (bb[2] - bb[0])) // 2, y_cursor + (badge_h - (bb[3] - bb[1])) // 2 - 5),
               sub_txt, font=f_sub, fill=BRAND_GREEN)
    y_cursor += badge_h + int(H * 0.06)

    cta_w = int(W * 0.82)
    cta_h = int(W * 0.17)
    cta_btn = rounded_rect_image((cta_w, cta_h), 30,
                                  fill=BRAND_ORANGE + (255,))
    bg3.paste(cta_btn, ((W - cta_w) // 2, y_cursor), cta_btn)
    cd = ImageDraw.Draw(bg3)
    cta_txt = "今すぐ購入する"
    cb = cd.textbbox((0, 0), cta_txt, font=f_main)
    cd.text(((W - (cb[2] - cb[0])) // 2, y_cursor + (cta_h - (cb[3] - cb[1])) // 2 - 10),
            cta_txt, font=f_main, fill=WHITE)

    note = "kokopelli.kamuturu.jp"
    nb = cd.textbbox((0, 0), note, font=f_small)
    cd.text(((W - (nb[2] - nb[0])) // 2, y_cursor + cta_h + int(H * 0.04)),
            note, font=f_small, fill=TEXT_DARK)

    scene3 = pil_to_clip(bg3, 7.0)

    from moviepy import concatenate_videoclips
    final = concatenate_videoclips([scene1, scene2, scene3], method="compose")
    final.write_videofile(str(out_path), fps=24, codec="libx264",
                          preset="medium", bitrate="2500k",
                          audio=False, threads=4)
    final.close()


# ============ Main ============

def main():
    jobs = [
        ("A", (1080, 1080), OUT_DIR / "video-v1A-feed.mp4", build_video_a),
        ("A", (1080, 1920), OUT_DIR / "video-v1A-story.mp4", build_video_a),
        ("B", (1080, 1080), OUT_DIR / "video-v1B-feed.mp4", build_video_b),
        ("B", (1080, 1920), OUT_DIR / "video-v1B-story.mp4", build_video_b),
    ]
    for label, size, out, fn in jobs:
        print(f"\n>>> Rendering {label} {size[0]}x{size[1]} -> {out.name}")
        fn(size, out)
        print(f"    done: {out.stat().st_size / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    main()
