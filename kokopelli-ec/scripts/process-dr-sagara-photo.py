"""
相良獣医師(都井岬の野生馬)の写真をLP用に最適化:
- 4:3 と 1:1 の2バージョン書き出し
- WebP変換 (品質88)
- 解像度: 800px(LP用) / 600px(モバイル/フォールバック)
"""
from PIL import Image, ImageOps
from pathlib import Path

SRC = Path.home() / "Downloads" / "IMG_6597.jpg"
OUT_DIR = Path.home() / "kokopelli-ec" / "public" / "images"
OUT_DIR.mkdir(parents=True, exist_ok=True)


def cover_crop(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    src_ratio = img.width / img.height
    dst_ratio = target_w / target_h
    if src_ratio > dst_ratio:
        # source is wider — crop sides
        new_w = int(img.height * dst_ratio)
        left = (img.width - new_w) // 2
        img = img.crop((left, 0, left + new_w, img.height))
    else:
        # source is taller — crop top/bottom
        new_h = int(img.width / dst_ratio)
        # 顔と馬が中央〜上寄りなので、少し上目にトリミング
        top = (img.height - new_h) // 3
        img = img.crop((0, top, img.width, top + new_h))
    return img.resize((target_w, target_h), Image.LANCZOS)


def main():
    img = Image.open(SRC)
    img = ImageOps.exif_transpose(img)  # iPhone EXIF回転対応
    print(f"original: {img.width}x{img.height}")

    # 4:3 (LP メインカラム用、800x600)
    v43 = cover_crop(img, 800, 600)
    out43 = OUT_DIR / "dr-sagara-toi-misaki-4x3.webp"
    v43.save(out43, "WEBP", quality=88, method=6)
    print(f"saved: {out43.name}  ({out43.stat().st_size // 1024}KB)")

    # 1:1 (サイドサムネ用、600x600)
    v11 = cover_crop(img, 600, 600)
    out11 = OUT_DIR / "dr-sagara-toi-misaki.webp"
    v11.save(out11, "WEBP", quality=88, method=6)
    print(f"saved: {out11.name}  ({out11.stat().st_size // 1024}KB)")

    # 16:9 (バナー差し替え候補用、1200x675)
    v169 = cover_crop(img, 1200, 675)
    out169 = OUT_DIR / "dr-sagara-toi-misaki-16x9.webp"
    v169.save(out169, "WEBP", quality=88, method=6)
    print(f"saved: {out169.name}  ({out169.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
