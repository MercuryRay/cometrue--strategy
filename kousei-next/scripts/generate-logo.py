"""
煌盛商事 / PC回収便 ロゴ生成スクリプト
- v2 シンボル: 煌めき(4方輝き)+ 内側に小ダイヤ。amberグラデ。
- 横ロゴ: シンボル + 「煌盛商事」+ tagline 「PC回収便」
- 正方形SNS用: シンボル中央 + ブランド + 屋号 + サブ
"""

import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "brand")
os.makedirs(OUT_DIR, exist_ok=True)

NOTO_BOLD = "C:/Windows/Fonts/NotoSansJP-VF.ttf"
NOTO_REG = "C:/Windows/Fonts/NotoSansJP-VF.ttf"

NAVY = (12, 38, 64, 255)
AMBER = (245, 166, 35, 255)
AMBER_LIGHT = (255, 209, 102, 255)
WHITE = (255, 255, 255, 255)
BG = (255, 255, 255, 0)


def vertical_gradient(size, top, bottom):
    img = Image.new("RGBA", size, top)
    draw = ImageDraw.Draw(img)
    h = size[1]
    for y in range(h):
        t = y / max(h - 1, 1)
        r = int(top[0] * (1 - t) + bottom[0] * t)
        g = int(top[1] * (1 - t) + bottom[1] * t)
        b = int(top[2] * (1 - t) + bottom[2] * t)
        a = int(top[3] * (1 - t) + bottom[3] * t)
        draw.line([(0, y), (size[0], y)], fill=(r, g, b, a))
    return img


def diamond_polygon(cx, cy, half_w, half_h):
    return [
        (cx, cy - half_h),
        (cx + half_w, cy),
        (cx, cy + half_h),
        (cx - half_w, cy),
    ]


def make_symbol(size=512, padding_ratio=0.12, rounding=0.22):
    """円角amber四角の中に4方輝き＋中央ダイヤ。煌めきを表現。"""
    img = Image.new("RGBA", (size, size), BG)
    draw = ImageDraw.Draw(img)

    # 背景の円角square (amberグラデ)
    bg = vertical_gradient((size, size), AMBER_LIGHT, AMBER)
    mask = Image.new("L", (size, size), 0)
    mdraw = ImageDraw.Draw(mask)
    radius = int(size * rounding)
    mdraw.rounded_rectangle([(0, 0), (size, size)], radius=radius, fill=255)
    img.paste(bg, (0, 0), mask)

    # ハイライト (上半分に微妙な光)
    highlight = Image.new("RGBA", (size, size), BG)
    hdraw = ImageDraw.Draw(highlight)
    hdraw.ellipse(
        [(int(size * 0.05), int(-size * 0.4)), (int(size * 0.95), int(size * 0.45))],
        fill=(255, 255, 255, 60),
    )
    highlight = highlight.filter(ImageFilter.GaussianBlur(size * 0.04))
    img.alpha_composite(highlight)

    # 中央のメイン4方輝き(白) — 縦長ダイヤ
    cx, cy = size / 2, size / 2
    pad = int(size * padding_ratio)
    inner = size - pad * 2

    # 大きな白ダイヤ(やや縦長) — 「煌めき」
    main_h = inner * 0.46
    main_w = inner * 0.18
    pts = diamond_polygon(cx, cy, main_w, main_h)
    draw.polygon(pts, fill=WHITE)

    # 横方向の細いダイヤ
    side_w = inner * 0.34
    side_h = inner * 0.10
    pts = diamond_polygon(cx, cy, side_w, side_h)
    draw.polygon(pts, fill=WHITE)

    # 中央の小さいダイヤ(密度感)
    core_h = inner * 0.16
    core_w = inner * 0.07
    pts = diamond_polygon(cx, cy, core_w, core_h)
    draw.polygon(pts, fill=AMBER)

    return img


def make_horizontal(width=2000, height=720):
    """横長ロゴ: シンボル + 「煌盛商事」のみ(taglineなし)"""
    img = Image.new("RGBA", (width, height), BG)
    sym_size = int(height * 0.86)
    sym = make_symbol(sym_size)
    sym_y = (height - sym_size) // 2
    sym_x = int(height * 0.12)
    img.alpha_composite(sym, (sym_x, sym_y))

    text_x = sym_x + sym_size + int(height * 0.18)

    main_size = int(height * 0.50)
    font_main = ImageFont.truetype(NOTO_BOLD, main_size)
    try:
        font_main.set_variation_by_axes([900])
    except Exception:
        pass

    draw = ImageDraw.Draw(img)
    main_text = "PC回収便"
    bbox = draw.textbbox((0, 0), main_text, font=font_main)
    main_y = (height - (bbox[3] - bbox[1])) // 2 - bbox[1]
    draw.text((text_x, main_y), main_text, font=font_main, fill=NAVY)

    text_w = bbox[2] - bbox[0]
    used_w = text_x + text_w + int(height * 0.12)
    if used_w < width:
        img = img.crop((0, 0, used_w, height))

    return img


def make_square(size=1080):
    """SNSアイコン/OG用: シンボル上 + ブランド名"""
    img = Image.new("RGBA", (size, size), (255, 255, 255, 255))

    sym_size = int(size * 0.50)
    sym = make_symbol(sym_size)
    sym_x = (size - sym_size) // 2
    sym_y = int(size * 0.13)
    img.alpha_composite(sym, (sym_x, sym_y))

    draw = ImageDraw.Draw(img)
    name_size = int(size * 0.11)
    font_name = ImageFont.truetype(NOTO_BOLD, name_size)
    try:
        font_name.set_variation_by_axes([900])
    except Exception:
        pass
    sub_size = int(size * 0.046)
    font_sub = ImageFont.truetype(NOTO_REG, sub_size)
    try:
        font_sub.set_variation_by_axes([500])
    except Exception:
        pass

    name = "PC回収便"
    bbox = draw.textbbox((0, 0), name, font=font_name)
    name_w = bbox[2] - bbox[0]
    name_y = sym_y + sym_size + int(size * 0.06)
    draw.text(((size - name_w) / 2 - bbox[0], name_y - bbox[1]), name, font=font_name, fill=NAVY)

    return img


def save(img, name):
    path = os.path.join(OUT_DIR, name)
    img.save(path, "PNG", optimize=True)
    print(f"saved: {path}  ({img.size[0]}x{img.size[1]})")


if __name__ == "__main__":
    sym512 = make_symbol(512)
    save(sym512, "logo-symbol-v2-512.png")
    save(sym512.resize((256, 256), Image.LANCZOS), "logo-symbol-v2-256.png")
    save(sym512.resize((128, 128), Image.LANCZOS), "logo-symbol-v2-128.png")
    save(sym512.resize((64, 64), Image.LANCZOS), "logo-symbol-v2-64.png")

    horiz = make_horizontal(3000, 720)
    save(horiz, "logo-yoko-v2.png")

    sq = make_square(1080)
    save(sq, "logo-square-v2-1080.png")
    save(sq.resize((512, 512), Image.LANCZOS), "logo-square-v2-512.png")

    # favicon
    fav = make_symbol(64, padding_ratio=0.10, rounding=0.20)
    save(fav, "favicon-v2-64.png")
    fav32 = make_symbol(64, padding_ratio=0.10, rounding=0.20).resize((32, 32), Image.LANCZOS)
    save(fav32, "favicon-v2-32.png")

    print("done.")
