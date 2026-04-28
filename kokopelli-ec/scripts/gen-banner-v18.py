"""
v18 広告バナー — 相良獣医師(さがら動物病院)の写真を主役に
- 構図: 上段=先生の証言コピー / 中段=先生写真フルブリード / 下段=オファー
- 訴求軸: 「白衣じゃなく大自然」「自然豊かな宮崎の獣医師が薦める」
- v17(ペット写真+痛みフック)と並行運用するA/B素材
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

ROOT = Path.home() / "kokopelli-ec" / "public"
OUT_DIR = ROOT / "ads-v18"
OUT_DIR.mkdir(exist_ok=True)
SRC_PHOTO = ROOT / "images" / "dr-sagara-toi-misaki-16x9.webp"

SLATE_900 = (15, 23, 42)
SLATE_800 = (30, 41, 59)
AMBER_400 = (251, 191, 36)
AMBER_500 = (245, 158, 11)
WHITE = (255, 255, 255)

FONT_BOLD = "C:/Windows/Fonts/YuGothB.ttc"
FONT_REG = "C:/Windows/Fonts/YuGothM.ttc"
FONT_HEAVY = "C:/Windows/Fonts/meiryob.ttc"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def fit_image(img: Image.Image, w: int, h: int) -> Image.Image:
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
    top = (new_h - h) // 3  # 顔が中央〜上に来るように上寄せ
    return img.crop((left, top, left + w, top + h))


def draw_text_centered(draw, text, font_obj, y, width, color):
    bbox = draw.textbbox((0, 0), text, font=font_obj)
    tw = bbox[2] - bbox[0]
    x = (width - tw) // 2
    draw.text((x, y), text, fill=color, font=font_obj)
    return bbox[3] - bbox[1]


def draw_caption_strip(draw, text, font_obj, x, y, w, h, bg, fg, pad=12):
    """ Draw a translucent caption strip with text """
    draw.rectangle([x, y, x + w, y + h], fill=bg)
    bbox = draw.textbbox((0, 0), text, font=font_obj)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = x + (w - tw) // 2
    ty = y + (h - th) // 2 - 4
    draw.text((tx, ty), text, fill=fg, font=font_obj)


def build_feed(out_path: Path):
    W, H = 1080, 1080
    TOP_H = int(H * 0.22)
    MID_H = int(H * 0.54)
    BOT_H = H - TOP_H - MID_H

    canvas = Image.new("RGB", (W, H), SLATE_900)
    draw = ImageDraw.Draw(canvas)

    # Top: Hook (先生の証言)
    draw.rectangle([0, 0, W, TOP_H], fill=SLATE_900)
    f_eye = font(FONT_BOLD, 28)
    f_hook = font(FONT_HEAVY, 60)
    draw_text_centered(draw, "宮崎・さがら動物病院 相良獣医師", f_eye, 28, W, WHITE)
    line1 = "10年の臨床現場で使い続けて、"
    line2 = "学会で2度、症例報告した1本。"
    bbox = draw.textbbox((0, 0), line1, font=f_hook)
    while max(bbox[2] - bbox[0], draw.textbbox((0, 0), line2, font=f_hook)[2]) > W - 80 and f_hook.size > 36:
        f_hook = font(FONT_HEAVY, f_hook.size - 4)
        bbox = draw.textbbox((0, 0), line1, font=f_hook)
    draw_text_centered(draw, line1, f_hook, 78, W, AMBER_400)
    draw_text_centered(draw, line2, f_hook, 78 + f_hook.size + 8, W, AMBER_400)

    # Mid: 先生写真
    pet = Image.open(SRC_PHOTO).convert("RGB")
    pet = fit_image(pet, W, MID_H)
    canvas.paste(pet, (0, TOP_H))

    # キャプション帯(写真下端)
    cap_h = 44
    cap_y = TOP_H + MID_H - cap_h
    draw_caption_strip(
        draw,
        "自然豊かな宮崎から発信  |  都井岬の野生馬と",
        font(FONT_BOLD, 22),
        0, cap_y, W, cap_h,
        bg=(0, 0, 0, 0) if False else SLATE_900,
        fg=WHITE,
    )

    # Bottom: オファー
    draw.rectangle([0, TOP_H + MID_H, W, H], fill=AMBER_500)
    f_price = font(FONT_HEAVY, 70)
    f_trust = font(FONT_BOLD, 26)
    f_cta = font(FONT_HEAVY, 36)

    by = TOP_H + MID_H + 14
    draw_text_centered(draw, "2本¥5,980  (1本¥2,990)", f_price, by, W, SLATE_900)
    by += 80
    draw_text_centered(draw, "30日返金保証 / 送料無料 / 学会報告2件", f_trust, by, W, SLATE_800)
    by += 38
    cta_text = "公式サイトはこちら ▶"
    bbox = draw.textbbox((0, 0), cta_text, font=f_cta)
    cw = bbox[2] - bbox[0] + 56
    ch = bbox[3] - bbox[1] + 20
    cx = (W - cw) // 2
    draw.rounded_rectangle([cx, by, cx + cw, by + ch], radius=ch // 2, fill=SLATE_900)
    draw.text((cx + 28, by + 2), cta_text, fill=AMBER_400, font=f_cta)

    canvas.save(out_path, "PNG", optimize=True)
    print(f"saved: {out_path.relative_to(ROOT)}  ({out_path.stat().st_size // 1024}KB)")


def build_story(out_path: Path):
    W, H = 1080, 1920
    TOP_H = int(H * 0.16)
    MID_H = int(H * 0.62)
    BOT_H = H - TOP_H - MID_H

    canvas = Image.new("RGB", (W, H), SLATE_900)
    draw = ImageDraw.Draw(canvas)

    # Top
    f_eye = font(FONT_BOLD, 36)
    f_hook = font(FONT_HEAVY, 72)
    draw_text_centered(draw, "宮崎・さがら動物病院 相良獣医師", f_eye, 50, W, WHITE)
    draw_text_centered(draw, "10年の臨床現場で", f_hook, 110, W, AMBER_400)
    draw_text_centered(draw, "使い続けた1本。", f_hook, 110 + f_hook.size + 10, W, AMBER_400)

    # Mid
    pet = Image.open(SRC_PHOTO).convert("RGB")
    pet = fit_image(pet, W, MID_H)
    canvas.paste(pet, (0, TOP_H))

    cap_h = 64
    cap_y = TOP_H + MID_H - cap_h
    draw_caption_strip(
        draw,
        "自然豊かな宮崎から発信  |  都井岬の野生馬と",
        font(FONT_BOLD, 32),
        0, cap_y, W, cap_h,
        bg=SLATE_900,
        fg=WHITE,
    )

    # Bottom
    draw.rectangle([0, TOP_H + MID_H, W, H], fill=AMBER_500)
    f_price = font(FONT_HEAVY, 110)
    f_sub = font(FONT_BOLD, 38)
    f_trust = font(FONT_BOLD, 36)
    f_cta = font(FONT_HEAVY, 50)

    by = TOP_H + MID_H + 30
    draw_text_centered(draw, "2本¥5,980", f_price, by, W, SLATE_900)
    by += 120
    draw_text_centered(draw, "1本あたり¥2,990 / 送料無料", f_sub, by, W, SLATE_800)
    by += 56
    draw_text_centered(draw, "30日返金保証 / 学会症例報告2件", f_trust, by, W, SLATE_800)
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
    build_feed(OUT_DIR / "banner-v18-feed-1080x1080.png")
    build_story(OUT_DIR / "banner-v18-story-1080x1920.png")


if __name__ == "__main__":
    main()
