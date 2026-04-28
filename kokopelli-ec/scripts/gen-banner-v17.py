"""
v17 広告バナー生成スクリプト
- 上段: 痛みフック (slate-900 地 + amber-400 文字)
- 中段: ペット写真フルブリード + 商品ロゴ重ね
- 下段: オファー (amber-500 地 + slate-900 文字)
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path

ROOT = Path.home() / "kokopelli-ec" / "public"
OUT_DIR = ROOT / "ads-v17"
OUT_DIR.mkdir(exist_ok=True)

# Color palette
SLATE_900 = (15, 23, 42)
SLATE_800 = (30, 41, 59)
AMBER_400 = (251, 191, 36)
AMBER_500 = (245, 158, 11)
WHITE = (255, 255, 255)

# Fonts
FONT_BOLD = "C:/Windows/Fonts/YuGothB.ttc"
FONT_REG = "C:/Windows/Fonts/YuGothM.ttc"
FONT_HEAVY = "C:/Windows/Fonts/meiryob.ttc"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def fit_image(img: Image.Image, w: int, h: int) -> Image.Image:
    """ Cover-fit (crop to fill) """
    src_ratio = img.width / img.height
    dst_ratio = w / h
    if src_ratio > dst_ratio:
        new_h = h
        new_w = int(h * src_ratio)
    else:
        new_w = w
        new_h = int(w / src_ratio)
    img = img.resize((new_w, new_h), Image.LANCZOS)
    left = (new_w - w) // 2
    top = (new_h - h) // 2
    return img.crop((left, top, left + w, top + h))


def draw_text_centered(draw, text, font_obj, y, width, color):
    bbox = draw.textbbox((0, 0), text, font=font_obj)
    tw = bbox[2] - bbox[0]
    x = (width - tw) // 2
    draw.text((x, y), text, fill=color, font=font_obj)
    return bbox[3] - bbox[1]


def add_logo(canvas: Image.Image, logo_path: Path, size: int, margin: int):
    """ Place logo at bottom-right corner of mid section """
    if not logo_path.exists():
        return
    logo = Image.open(logo_path).convert("RGBA")
    logo = logo.resize((size, size), Image.LANCZOS)
    canvas.paste(logo, (canvas.width - size - margin, canvas.height - size - margin), logo)


def build_feed(pet_img_path: Path, hook: str, out_path: Path):
    W, H = 1080, 1080
    TOP_H = int(H * 0.24)
    MID_H = int(H * 0.52)
    BOT_H = H - TOP_H - MID_H

    canvas = Image.new("RGB", (W, H), SLATE_900)
    draw = ImageDraw.Draw(canvas)

    # Top: hook
    draw.rectangle([0, 0, W, TOP_H], fill=SLATE_900)
    f_hook = font(FONT_HEAVY, 64)
    # Hook can wrap on 「、」 or fixed split — assume single line; if too wide, drop size.
    bbox = draw.textbbox((0, 0), hook, font=f_hook)
    while bbox[2] - bbox[0] > W - 80 and f_hook.size > 36:
        f_hook = font(FONT_HEAVY, f_hook.size - 4)
        bbox = draw.textbbox((0, 0), hook, font=f_hook)
    th = bbox[3] - bbox[1]
    y = (TOP_H - th) // 2 - 8
    draw_text_centered(draw, hook, f_hook, y, W, AMBER_400)

    # Mid: pet photo
    pet = Image.open(pet_img_path).convert("RGB")
    pet = fit_image(pet, W, MID_H)
    canvas.paste(pet, (0, TOP_H))

    # Logo overlay (商品マーク) — Mid セクション内に完全収納
    logo_path = ROOT / "ads-v14" / "product-cut-v2.png"
    if logo_path.exists():
        logo = Image.open(logo_path).convert("RGBA")
        logo_size = int(MID_H * 0.32)
        logo = logo.resize((logo_size, logo_size), Image.LANCZOS)
        logo_y = TOP_H + MID_H - logo_size - 16
        canvas.paste(logo, (W - logo_size - 24, logo_y), logo)

    # Bottom: offer (BOT_H = 約259px に3要素を綺麗に配置)
    draw.rectangle([0, TOP_H + MID_H, W, H], fill=AMBER_500)
    f_price_main = font(FONT_HEAVY, 72)
    f_trust = font(FONT_BOLD, 26)
    f_cta = font(FONT_HEAVY, 36)

    by = TOP_H + MID_H + 18
    draw_text_centered(draw, "2本¥5,980  (1本¥2,990)", f_price_main, by, W, SLATE_900)
    by += 82
    draw_text_centered(draw, "30日返金保証 / 送料無料 / 獣医師コメント掲載", f_trust, by, W, SLATE_800)
    by += 40
    # CTA pill
    cta_text = "公式サイトはこちら ▶"
    bbox = draw.textbbox((0, 0), cta_text, font=f_cta)
    cw = bbox[2] - bbox[0] + 56
    ch = bbox[3] - bbox[1] + 20
    cx = (W - cw) // 2
    draw.rounded_rectangle([cx, by, cx + cw, by + ch], radius=ch // 2, fill=SLATE_900)
    draw.text((cx + 28, by + 2), cta_text, fill=AMBER_400, font=f_cta)

    canvas.save(out_path, "PNG", optimize=True)
    print(f"saved: {out_path.relative_to(ROOT)}  ({out_path.stat().st_size // 1024}KB)")


def build_story(pet_img_path: Path, hook: str, out_path: Path):
    W, H = 1080, 1920
    TOP_H = int(H * 0.18)
    MID_H = int(H * 0.62)
    BOT_H = H - TOP_H - MID_H

    canvas = Image.new("RGB", (W, H), SLATE_900)
    draw = ImageDraw.Draw(canvas)

    # Top hook
    f_hook = font(FONT_HEAVY, 76)
    bbox = draw.textbbox((0, 0), hook, font=f_hook)
    while bbox[2] - bbox[0] > W - 100 and f_hook.size > 40:
        f_hook = font(FONT_HEAVY, f_hook.size - 4)
        bbox = draw.textbbox((0, 0), hook, font=f_hook)
    th = bbox[3] - bbox[1]
    y = (TOP_H - th) // 2 - 10
    draw_text_centered(draw, hook, f_hook, y, W, AMBER_400)

    # Mid pet
    pet = Image.open(pet_img_path).convert("RGB")
    pet = fit_image(pet, W, MID_H)
    canvas.paste(pet, (0, TOP_H))

    # Logo
    logo_path = ROOT / "ads-v14" / "product-cut-v2.png"
    if logo_path.exists():
        logo = Image.open(logo_path).convert("RGBA")
        logo_size = int(MID_H * 0.32)
        logo = logo.resize((logo_size, logo_size), Image.LANCZOS)
        canvas.paste(logo, (W - logo_size - 40, TOP_H + MID_H - logo_size - 30), logo)

    # Bottom offer
    draw.rectangle([0, TOP_H + MID_H, W, H], fill=AMBER_500)
    f_price = font(FONT_HEAVY, 110)
    f_trust = font(FONT_BOLD, 38)
    f_cta = font(FONT_HEAVY, 50)

    by = TOP_H + MID_H + 30
    draw_text_centered(draw, "2本¥5,980", f_price, by, W, SLATE_900)
    by += 120
    draw_text_centered(draw, "1本あたり¥2,990 / 送料無料", f_trust, by, W, SLATE_800)
    by += 56
    draw_text_centered(draw, "30日返金保証 / 獣医師臨床コメント掲載", f_trust, by, W, SLATE_800)
    by += 64
    cta_text = "公式サイトはこちら ▶"
    bbox = draw.textbbox((0, 0), cta_text, font=f_cta)
    cw = bbox[2] - bbox[0] + 80
    ch = bbox[3] - bbox[1] + 28
    cx = (W - cw) // 2
    draw.rounded_rectangle([cx, by, cx + cw, by + ch], radius=ch // 2, fill=SLATE_900)
    draw.text((cx + 40, by + 6), cta_text, fill=AMBER_400, font=f_cta)

    canvas.save(out_path, "PNG", optimize=True)
    print(f"saved: {out_path.relative_to(ROOT)}  ({out_path.stat().st_size // 1024}KB)")


def main():
    cat_img = ROOT / "images" / "pet-cat-happy.jpg"
    dog_img = ROOT / "images" / "pet-dog-water.jpg"

    cat_hook = "水を飲まない我が子に。"
    dog_hook = "シニア犬の水分補給、悩んでませんか?"

    build_feed(cat_img, cat_hook, OUT_DIR / "banner-v17-feed-cat-1080x1080.png")
    build_feed(dog_img, dog_hook, OUT_DIR / "banner-v17-feed-dog-1080x1080.png")
    build_story(cat_img, cat_hook, OUT_DIR / "banner-v17-story-cat-1080x1920.png")
    build_story(dog_img, dog_hook, OUT_DIR / "banner-v17-story-dog-1080x1920.png")


if __name__ == "__main__":
    main()
