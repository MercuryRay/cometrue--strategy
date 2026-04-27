#!/usr/bin/env python3
"""
ココペリEC 広告バナー v16 生成スクリプト

商品実物4面写真 (IMG_6589〜6592) を主役にしたバナー4枚を生成。
- フィード正方形 (1080x1080) × 猫 / 犬
- ストーリー縦長 (1080x1920) × 猫 / 犬

価格表記: ¥3,480 (SINGLE_PRICE / src/lib/prices.ts と整合)
ブランドカラー: amber-600 (#D97706) / slate-800 (#1E293B)
薬機法: 治療・治癒・効果・効能・改善 等のNGワード一切なし
"""
from __future__ import annotations

import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

# === パス設定 ===
HOME = Path.home()
DOWNLOADS = HOME / "Downloads"
OUT_DIR = HOME / "kokopelli-ec" / "public" / "ads-v16"
PREVIEW_DIR = HOME / "kokopelli-ec" / "banner-v16-preview"
PET_DIR = HOME / "kokopelli-ec" / "public" / "images"

# 商品実物写真
PRODUCT_FRONT = DOWNLOADS / "IMG_6589.jpg"          # 正面 ココペリロゴ円
PRODUCT_SIDE = DOWNLOADS / "IMG_6590.jpg"           # 側面 大Kokopelli黄色ロゴ
PRODUCT_BACK_NUTRITION = DOWNLOADS / "IMG_6591.jpg" # 裏面 30ml 栄養成分表示
PRODUCT_BACK_MIJ = DOWNLOADS / "IMG_6592.jpg"       # 裏面 MADE IN JAPAN

# ペット写真
CAT_IMG = PET_DIR / "pet-cat-happy.jpg"
DOG_IMG = PET_DIR / "pet-dog-happy.jpg"

# === フォント (Windows) ===
FONT_BOLD = "C:/Windows/Fonts/YuGothB.ttc"
FONT_REG = "C:/Windows/Fonts/YuGothM.ttc"
FONT_LIGHT = "C:/Windows/Fonts/YuGothL.ttc"

# === ブランドカラー ===
AMBER_600 = (217, 119, 6)      # #D97706
AMBER_500 = (245, 158, 11)     # #F59E0B
AMBER_50 = (255, 251, 235)     # #FFFBEB
SLATE_900 = (15, 23, 42)       # #0F172A
SLATE_800 = (30, 41, 59)       # #1E293B
SLATE_700 = (51, 65, 85)       # #334155
SLATE_100 = (241, 245, 249)    # #F1F5F9
WHITE = (255, 255, 255)
KOKOPELLI_BLUE = (40, 50, 160)  # 商品箱の青に近い色

# 価格 (src/lib/prices.ts と同期)
PRICE_SINGLE = 3480


def load_font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def crop_product_box(img_path: Path, target_aspect: float) -> Image.Image:
    """商品写真から箱中心を切り出す。

    元画像は3024x4032想定 (縦長)。商品箱は中央〜中央下寄りにある。
    target_aspect = width / height
    """
    img = Image.open(img_path).convert("RGB")
    w, h = img.size
    src_aspect = w / h
    if target_aspect > src_aspect:
        # 横方向はそのまま、縦をクロップ
        new_h = int(w / target_aspect)
        # 中央クロップ
        top = (h - new_h) // 2
        img = img.crop((0, top, w, top + new_h))
    else:
        new_w = int(h * target_aspect)
        left = (w - new_w) // 2
        img = img.crop((left, 0, left + new_w, h))
    return img


def crop_product_tight(img_path: Path, size: tuple[int, int]) -> Image.Image:
    """商品箱を可能な限り大きく見せるためのタイトクロップ。

    縦長元画像から正方形〜縦長のクロップ領域を取り、target sizeにリサイズ。
    商品箱は元画像の上から約25%〜85%にあるので、そこをクロップする。
    """
    img = Image.open(img_path).convert("RGB")
    w, h = img.size
    target_w, target_h = size
    target_aspect = target_w / target_h

    # 商品箱がある縦範囲: 上から15%〜92% を狙う
    top_y = int(h * 0.10)
    bot_y = int(h * 0.96)
    crop_h = bot_y - top_y
    crop_w = int(crop_h * target_aspect)
    if crop_w > w:
        crop_w = w
        crop_h = int(crop_w / target_aspect)
        # 商品箱を中心に再計算
        center_y = int(h * 0.55)
        top_y = max(0, center_y - crop_h // 2)
        bot_y = top_y + crop_h
    left_x = (w - crop_w) // 2
    img = img.crop((left_x, top_y, left_x + crop_w, bot_y))
    return img.resize(size, Image.LANCZOS)


def fit_pet(img_path: Path, size: tuple[int, int]) -> Image.Image:
    """ペット写真を指定サイズにcover crop"""
    img = Image.open(img_path).convert("RGB")
    w, h = img.size
    target_w, target_h = size
    src_aspect = w / h
    target_aspect = target_w / target_h
    if src_aspect > target_aspect:
        new_w = int(h * target_aspect)
        left = (w - new_w) // 2
        img = img.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target_aspect)
        top = (h - new_h) // 3  # 顔がある上部寄りを残す
        img = img.crop((0, top, w, top + new_h))
    return img.resize(size, Image.LANCZOS)


def draw_text_with_outline(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
    outline: tuple[int, int, int] = WHITE,
    outline_w: int = 4,
    anchor: str = "lt",
) -> None:
    x, y = xy
    for dx in range(-outline_w, outline_w + 1):
        for dy in range(-outline_w, outline_w + 1):
            if dx == 0 and dy == 0:
                continue
            draw.text((x + dx, y + dy), text, font=font, fill=outline, anchor=anchor)
    draw.text(xy, text, font=font, fill=fill, anchor=anchor)


def text_width(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont) -> int:
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0]


def text_height(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont) -> int:
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[3] - bbox[1]


def rounded_rect(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    radius: int,
    fill: tuple[int, int, int] | tuple[int, int, int, int],
    outline: tuple[int, int, int] | None = None,
    width: int = 0,
) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


# ============================================================
# フィード正方形 1080x1080 — 商品+ペット並列レイアウト
# ============================================================
def build_feed_banner(pet_img_path: Path, pet_label: str, output_path: Path) -> None:
    W, H = 1080, 1080
    canvas = Image.new("RGB", (W, H), AMBER_50)
    draw = ImageDraw.Draw(canvas)

    # 上部 amber グラデ風帯 (キャッチコピー領域)
    rounded_rect(draw, (0, 0, W, 220), radius=0, fill=AMBER_600)

    # キャッチコピー上部
    headline_font = load_font(FONT_BOLD, 72)
    sub_font = load_font(FONT_BOLD, 38)
    catch = f"うちの{pet_label}の毎日に、"
    catch2 = "シリカミネラル"
    draw.text((W // 2, 50), catch, font=sub_font, fill=WHITE, anchor="mt")
    draw.text((W // 2, 100), catch2, font=headline_font, fill=WHITE, anchor="mt")

    # 商品実物 (左側) — 正面 IMG_6589 を縦長クロップ
    product = crop_product_tight(PRODUCT_FRONT, (440, 600))
    canvas.paste(product, (50, 260))

    # ペット写真 (右側) — 円形マスク
    pet_size = 440
    pet = fit_pet(pet_img_path, (pet_size, pet_size))
    mask = Image.new("L", (pet_size, pet_size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, pet_size, pet_size), fill=255)
    canvas.paste(pet, (W - 50 - pet_size, 290), mask)

    # 円縁取り (slate)
    pet_x = W - 50 - pet_size
    pet_y = 290
    draw.ellipse(
        (pet_x - 6, pet_y - 6, pet_x + pet_size + 6, pet_y + pet_size + 6),
        outline=SLATE_800,
        width=8,
    )

    # 下部CTA帯
    rounded_rect(draw, (0, 880, W, H), radius=0, fill=SLATE_800)

    # 価格バッジ (amber 円)
    badge_x = 180
    badge_y = 970
    badge_r = 90
    draw.ellipse(
        (badge_x - badge_r, badge_y - badge_r, badge_x + badge_r, badge_y + badge_r),
        fill=AMBER_500,
        outline=WHITE,
        width=4,
    )
    badge_font_top = load_font(FONT_BOLD, 24)
    badge_font_price = load_font(FONT_BOLD, 42)
    draw.text((badge_x, badge_y - 30), "1本", font=badge_font_top, fill=SLATE_900, anchor="mm")
    draw.text((badge_x, badge_y + 10), f"¥{PRICE_SINGLE:,}", font=badge_font_price, fill=SLATE_900, anchor="mm")

    # CTA テキスト
    cta_font = load_font(FONT_BOLD, 56)
    cta_sub = load_font(FONT_REG, 30)
    draw.text((W - 70, 945), "公式サイトはこちら", font=cta_font, fill=WHITE, anchor="rt")
    draw.text((W - 70, 1015), "30日間 返金保証 / 送料無料(2本〜)", font=cta_sub, fill=AMBER_500, anchor="rt")

    # 商品名小さくロゴ風
    brand_font = load_font(FONT_BOLD, 30)
    draw.text((280, 240), "Kokopelli", font=brand_font, fill=KOKOPELLI_BLUE, anchor="mt")
    sub_brand = load_font(FONT_REG, 22)
    draw.text((280, 870), "動物用ケイ素濃縮溶液 30ml", font=sub_brand, fill=SLATE_700, anchor="mb")

    canvas.save(output_path, "PNG", optimize=True)
    print(f"  saved: {output_path.name}")


# ============================================================
# ストーリー縦長 1080x1920 — 上半分=商品実物 / 下半分=ペット
# ============================================================
def build_story_banner(pet_img_path: Path, pet_label: str, output_path: Path) -> None:
    W, H = 1080, 1920
    canvas = Image.new("RGB", (W, H), AMBER_50)
    draw = ImageDraw.Draw(canvas)

    # 上半分: 商品実物 (IMG_6589 正面)
    product = crop_product_tight(PRODUCT_FRONT, (W, 960))
    canvas.paste(product, (0, 0))

    # 上から amber グラデ overlay (上端のみ)
    overlay = Image.new("RGBA", (W, 220), (217, 119, 6, 0))
    od = ImageDraw.Draw(overlay)
    for y in range(220):
        a = int(220 * (1 - y / 220))
        od.line((0, y, W, y), fill=(217, 119, 6, a))
    canvas.paste(overlay, (0, 0), overlay)

    # 上部キャッチ
    head_font = load_font(FONT_BOLD, 88)
    sub_font = load_font(FONT_BOLD, 42)
    draw_text_with_outline(
        draw,
        (W // 2, 50),
        f"うちの{pet_label}の毎日に",
        sub_font,
        WHITE,
        outline=SLATE_900,
        outline_w=3,
        anchor="mt",
    )
    draw_text_with_outline(
        draw,
        (W // 2, 110),
        "シリカミネラル",
        head_font,
        AMBER_500,
        outline=WHITE,
        outline_w=4,
        anchor="mt",
    )

    # 中央セクション: 商品名 + 容量
    rounded_rect(draw, (0, 920, W, 1020), radius=0, fill=KOKOPELLI_BLUE)
    brand_font = load_font(FONT_BOLD, 48)
    cap_font = load_font(FONT_BOLD, 32)
    draw.text((W // 2, 970), "Kokopelli  動物用ケイ素濃縮溶液 30ml", font=cap_font, fill=WHITE, anchor="mm")
    _ = brand_font  # 予約

    # 下半分: ペット写真
    pet = fit_pet(pet_img_path, (W, 700))
    canvas.paste(pet, (0, 1020))

    # ペット写真の上に slate グラデ overlay (下半分のみ濃く、CTA読みやすく)
    overlay2 = Image.new("RGBA", (W, 700), (0, 0, 0, 0))
    od2 = ImageDraw.Draw(overlay2)
    for y in range(700):
        a = int(180 * (y / 700))
        od2.line((0, y, W, y), fill=(15, 23, 42, a))
    canvas.paste(overlay2, (0, 1020), overlay2)

    # 下部 CTA セクション
    rounded_rect(draw, (0, 1620, W, H), radius=0, fill=SLATE_800)

    # 価格バッジ (amber 円)
    badge_x = 200
    badge_y = 1770
    badge_r = 130
    draw.ellipse(
        (badge_x - badge_r, badge_y - badge_r, badge_x + badge_r, badge_y + badge_r),
        fill=AMBER_500,
        outline=WHITE,
        width=6,
    )
    badge_font_top = load_font(FONT_BOLD, 32)
    badge_font_price = load_font(FONT_BOLD, 60)
    draw.text((badge_x, badge_y - 40), "1本", font=badge_font_top, fill=SLATE_900, anchor="mm")
    draw.text((badge_x, badge_y + 18), f"¥{PRICE_SINGLE:,}", font=badge_font_price, fill=SLATE_900, anchor="mm")

    # CTA テキスト
    cta_font = load_font(FONT_BOLD, 64)
    cta_sub = load_font(FONT_REG, 36)
    draw.text((W - 60, 1700), "公式サイトはこちら", font=cta_font, fill=WHITE, anchor="rt")
    draw.text((W - 60, 1790), "送料無料 (2本セット〜)", font=cta_sub, fill=AMBER_500, anchor="rt")
    draw.text((W - 60, 1840), "30日間 返金保証", font=cta_sub, fill=AMBER_500, anchor="rt")

    # MADE IN JAPAN サイドリボン (右上)
    ribbon_font = load_font(FONT_BOLD, 26)
    rib_w, rib_h = 240, 60
    rounded_rect(
        draw,
        (W - rib_w - 30, 1050, W - 30, 1050 + rib_h),
        radius=8,
        fill=WHITE,
        outline=SLATE_800,
        width=3,
    )
    draw.text((W - rib_w / 2 - 30, 1080), "MADE IN JAPAN", font=ribbon_font, fill=SLATE_800, anchor="mm")

    canvas.save(output_path, "PNG", optimize=True)
    print(f"  saved: {output_path.name}")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

    print("[v16] Generating ad banners with real product photos...")
    print(f"  Output: {OUT_DIR}")
    print(f"  Preview: {PREVIEW_DIR}")
    print()

    targets = [
        ("feed", "cat", CAT_IMG, "猫", build_feed_banner, "1080x1080"),
        ("feed", "dog", DOG_IMG, "犬", build_feed_banner, "1080x1080"),
        ("story", "cat", CAT_IMG, "猫", build_story_banner, "1080x1920"),
        ("story", "dog", DOG_IMG, "犬", build_story_banner, "1080x1920"),
    ]

    for fmt, pet_kind, pet_path, pet_label, builder, dim in targets:
        fname = f"banner-v16-{fmt}-{pet_kind}-{dim}.png"
        out_path = OUT_DIR / fname
        print(f"[{fmt}/{pet_kind}] -> {fname}")
        builder(pet_path, pet_label, out_path)

        # プレビュー用コピー (1080x1080 サムネサイズ)
        preview_path = PREVIEW_DIR / fname
        img = Image.open(out_path)
        img.thumbnail((1080, 1080), Image.LANCZOS)
        img.save(preview_path, "PNG", optimize=True)
        print(f"  preview: {preview_path.name}")

    print()
    print("Done. 4 banners + 4 previews generated.")


if __name__ == "__main__":
    main()
