"""
D2C LP Before/After イメージ生成スクリプト
============================================
kokopelli-ec の testimonials 用イメージを 3 テーマ × Before/After = 6 枚生成。

- 毛艶: 毛の束アイコン (灰トーン → 光沢ビビッド)
- 水の飲み量: 水量ゲージ / 棒グラフ (低 → 高)
- 元気度: 犬猫アイコンの姿勢 (うなだれ → 元気)

制約:
- 架空の顔写真は使わない (アイコン / イラスト / グラフで表現)
- 断定表現を避け、"使い始めて数週間" のような体験談トーン
- 1080x1080 px, PNG, 200KB 以下目標
- Before = モノトーン, After = ビビッド
"""

from __future__ import annotations

import math
import os
import sys
from pathlib import Path
from typing import Tuple

from PIL import Image, ImageDraw, ImageFilter, ImageFont

# -------------------------------------------------------------------
# 共通設定
# -------------------------------------------------------------------
SIZE = 1080
OUT_DIR = Path("C:/Users/timbe/kokopelli-ec/public/testimonials")
OUT_DIR.mkdir(parents=True, exist_ok=True)

FONT_CANDIDATES = [
    "C:/Windows/Fonts/YuGothB.ttc",
    "C:/Windows/Fonts/meiryob.ttc",
    "C:/Windows/Fonts/NotoSansJP-VF.ttf",
    "C:/Windows/Fonts/YuGothM.ttc",
]


def load_font(size: int) -> ImageFont.FreeTypeFont:
    for path in FONT_CANDIDATES:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size=size)
            except OSError:
                continue
    return ImageFont.load_default()


# Before = グレースケール系, After = ビビッド (青緑〜オレンジで健康感)
BEFORE_BG_TOP = (225, 227, 230)
BEFORE_BG_BOTTOM = (170, 174, 180)
BEFORE_ACCENT = (110, 115, 122)
BEFORE_FG = (70, 74, 80)

AFTER_BG_TOP = (255, 246, 222)
AFTER_BG_BOTTOM = (255, 198, 128)
AFTER_ACCENT = (16, 163, 127)   # kokopelli緑
AFTER_FG = (40, 48, 60)
AFTER_HILIGHT = (255, 214, 76)


def gradient_bg(top: Tuple[int, int, int], bottom: Tuple[int, int, int]) -> Image.Image:
    img = Image.new("RGB", (SIZE, SIZE), top)
    draw = ImageDraw.Draw(img)
    for y in range(SIZE):
        t = y / (SIZE - 1)
        r = int(top[0] + (bottom[0] - top[0]) * t)
        g = int(top[1] + (bottom[1] - top[1]) * t)
        b = int(top[2] + (bottom[2] - top[2]) * t)
        draw.line([(0, y), (SIZE, y)], fill=(r, g, b))
    return img


def draw_centered_text(draw: ImageDraw.ImageDraw, xy: Tuple[int, int], text: str,
                       font: ImageFont.FreeTypeFont, fill: Tuple[int, int, int],
                       shadow: bool = False) -> None:
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = xy[0] - w // 2
    y = xy[1] - h // 2
    if shadow:
        draw.text((x + 2, y + 3), text, font=font, fill=(0, 0, 0, 120))
    draw.text((x, y), text, font=font, fill=fill)


def badge(draw: ImageDraw.ImageDraw, xy: Tuple[int, int, int, int], text: str,
          bg: Tuple[int, int, int], fg: Tuple[int, int, int],
          font: ImageFont.FreeTypeFont, radius: int = 28) -> None:
    draw.rounded_rectangle(xy, radius=radius, fill=bg)
    cx = (xy[0] + xy[2]) // 2
    cy = (xy[1] + xy[3]) // 2
    draw_centered_text(draw, (cx, cy), text, font, fg)


def save_optimized(img: Image.Image, path: Path) -> int:
    """PNG 圧縮して 200KB 以下を狙う。画質下げすぎないよう段階的に縮小。"""
    # Step1: 1080 フル PNG
    img.save(path, "PNG", optimize=True, compress_level=9)
    size_kb = path.stat().st_size / 1024
    # 段階的に再保存 (パレット化や小縮小)
    if size_kb > 200:
        # パレット 256色に変換
        pal = img.convert("P", palette=Image.ADAPTIVE, colors=256)
        pal.save(path, "PNG", optimize=True)
        size_kb = path.stat().st_size / 1024
    if size_kb > 200:
        # 最終手段: 900px に縮小 (Next.js 側で Image リサイズされるため品質影響小)
        small = img.resize((900, 900), Image.LANCZOS)
        small.save(path, "PNG", optimize=True, compress_level=9)
        size_kb = path.stat().st_size / 1024
    return int(size_kb)


# -------------------------------------------------------------------
# 1. 毛艶 Before / After
# -------------------------------------------------------------------
def draw_fur_tuft(img: Image.Image, center: Tuple[int, int], radius: int,
                  base_color: Tuple[int, int, int], highlight: Tuple[int, int, int] | None) -> None:
    """毛の束を縦線の集合で表現。円形シルエット内に毛を収める。"""
    import random
    random.seed(42)

    cx, cy = center
    # 毛を描く専用のマスク付きレイヤー
    strand_layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(strand_layer)

    # 背景シルエット (柔らかい楕円)
    sdraw.ellipse((cx - radius, cy - int(radius * 0.95),
                   cx + radius, cy + int(radius * 0.95)),
                  fill=base_color + (220,))

    # 毛のストランド (中心ほど長く、楕円範囲内)
    strand_count = 180
    for _ in range(strand_count):
        # 楕円内にランダム配置
        rx = (random.random() - 0.5) * 2 * radius * 0.95
        # y中心からのオフセット (楕円の方程式で許容範囲内)
        x_ratio = abs(rx) / radius
        # y許容幅
        y_allow = int(radius * 0.95 * math.sqrt(max(0.0, 1.0 - x_ratio ** 2)))
        # 毛の長さ: 中心ほど長い
        length = int(y_allow * 1.6 * (0.7 + random.random() * 0.3))
        # 毛は y中心を跨ぐ
        y_center_offset = random.randint(-y_allow // 3, y_allow // 3)
        y_top = cy + y_center_offset - length // 2
        y_bot = cy + y_center_offset + length // 2
        # 楕円内にクリップ
        y_top = max(cy - y_allow, y_top)
        y_bot = min(cy + y_allow, y_bot)

        shade = random.randint(-25, 25)
        c = tuple(max(0, min(255, v + shade)) for v in base_color)
        width = random.randint(4, 7)
        sdraw.line([(cx + int(rx), y_top), (cx + int(rx), y_bot)],
                   fill=c + (230,), width=width)

    # 軽くぼかして毛の束感を自然に
    strand_layer = strand_layer.filter(ImageFilter.GaussianBlur(radius=1.2))
    img.paste(strand_layer, (0, 0), strand_layer)

    if highlight:
        # 艶の光沢バンド (上部のみ, 横長に薄く)
        hi_layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
        hdraw = ImageDraw.Draw(hi_layer)
        hdraw.ellipse((cx - int(radius * 0.65), cy - int(radius * 0.8),
                       cx + int(radius * 0.65), cy - int(radius * 0.5)),
                      fill=highlight + (95,))
        hi_layer = hi_layer.filter(ImageFilter.GaussianBlur(radius=8))
        img.paste(hi_layer, (0, 0), hi_layer)


def gen_fur(stage: str) -> None:
    """stage: 'before' | 'after'"""
    is_after = stage == "after"
    bg_top = AFTER_BG_TOP if is_after else BEFORE_BG_TOP
    bg_bot = AFTER_BG_BOTTOM if is_after else BEFORE_BG_BOTTOM
    img = gradient_bg(bg_top, bg_bot)

    # 毛束
    fur_base = (142, 98, 60) if is_after else (128, 130, 134)
    fur_hi = (255, 224, 150) if is_after else None
    draw_fur_tuft(img, (SIZE // 2, SIZE // 2 + 40), 260, fur_base, fur_hi)

    # After にはキラッとマーク
    if is_after:
        d = ImageDraw.Draw(img, "RGBA")
        for (cx, cy, s) in [(800, 300, 38), (270, 380, 26), (820, 740, 22)]:
            d.polygon([
                (cx, cy - s), (cx + s * 0.22, cy - s * 0.22),
                (cx + s, cy), (cx + s * 0.22, cy + s * 0.22),
                (cx, cy + s), (cx - s * 0.22, cy + s * 0.22),
                (cx - s, cy), (cx - s * 0.22, cy - s * 0.22),
            ], fill=AFTER_HILIGHT + (235,))

    draw = ImageDraw.Draw(img, "RGBA")
    font_badge = load_font(54)
    font_title = load_font(78)
    font_sub = load_font(36)

    # Before/Afterバッジ
    if is_after:
        badge(draw, (60, 60, 360, 150), "AFTER", AFTER_ACCENT, (255, 255, 255), font_badge)
    else:
        badge(draw, (60, 60, 360, 150), "BEFORE", BEFORE_ACCENT, (255, 255, 255), font_badge)

    # タイトル
    title = "毛並みツヤツヤ" if is_after else "毛がパサつく"
    draw_centered_text(draw, (SIZE // 2, 920), title, font_title,
                       AFTER_FG if is_after else BEFORE_FG)
    sub = "使い始めて数週間の変化 (個人の体験談)" if is_after else "水分不足で毛並みがくすみがち"
    draw_centered_text(draw, (SIZE // 2, 1000), sub, font_sub,
                       (90, 100, 115) if is_after else (95, 100, 108))

    kb = save_optimized(img, OUT_DIR / f"fur-{stage}.png")
    print(f"  fur-{stage}.png ({kb} KB)")


# -------------------------------------------------------------------
# 2. 水の飲み量 Before / After (棒グラフ)
# -------------------------------------------------------------------
def gen_water(stage: str) -> None:
    is_after = stage == "after"
    img = gradient_bg(AFTER_BG_TOP if is_after else BEFORE_BG_TOP,
                      AFTER_BG_BOTTOM if is_after else BEFORE_BG_BOTTOM)
    draw = ImageDraw.Draw(img, "RGBA")

    font_badge = load_font(54)
    font_title = load_font(72)
    font_sub = load_font(34)
    font_label = load_font(38)
    font_axis = load_font(30)

    # バッジ
    if is_after:
        badge(draw, (60, 60, 360, 150), "AFTER", AFTER_ACCENT, (255, 255, 255), font_badge)
    else:
        badge(draw, (60, 60, 360, 150), "BEFORE", BEFORE_ACCENT, (255, 255, 255), font_badge)

    # グラフエリア (白カード)
    card = (90, 220, SIZE - 90, 820)
    draw.rounded_rectangle(card, radius=32, fill=(255, 255, 255, 240))

    # 棒グラフ: 3日分 (Day1/Day7/Day14) — Before は全て低い, After は右肩上がり
    if is_after:
        vals = [0.45, 0.72, 0.92]
        bar_color = AFTER_ACCENT
    else:
        vals = [0.32, 0.30, 0.33]
        bar_color = (130, 136, 142)

    labels = ["Day 1", "Day 7", "Day 14"]
    base_y = card[3] - 80
    top_y = card[1] + 80
    h_range = base_y - top_y
    bar_w = 140
    gap = 90
    total_w = bar_w * 3 + gap * 2
    start_x = (card[0] + card[2]) // 2 - total_w // 2

    # 軸
    draw.line([(card[0] + 40, base_y), (card[2] - 40, base_y)], fill=(180, 184, 190), width=3)

    # 値ラベル (定性: イメージ目盛り) — After のみ各バーに表示。Before は最後だけ。
    if is_after:
        value_labels = ["少し", "増えた", "しっかり"]
    else:
        value_labels = ["", "", ""]

    for i, (v, lab, vlab) in enumerate(zip(vals, labels, value_labels)):
        x0 = start_x + i * (bar_w + gap)
        x1 = x0 + bar_w
        bar_h = int(h_range * v)
        y0 = base_y - bar_h
        draw.rounded_rectangle((x0, y0, x1, base_y), radius=14, fill=bar_color + (255,))
        # 定性ラベル (値を捏造しない)
        if vlab:
            draw_centered_text(draw, ((x0 + x1) // 2, y0 - 30),
                               vlab, font_label,
                               AFTER_FG if is_after else BEFORE_FG)
        draw_centered_text(draw, ((x0 + x1) // 2, base_y + 30), lab, font_axis,
                           (100, 104, 110))

    # Before は中央上部に "横ばい" 注釈
    if not is_after:
        note_x = (card[0] + card[2]) // 2
        note_y = card[1] + 140
        draw_centered_text(draw, (note_x, note_y), "横ばい",
                           load_font(56), BEFORE_FG)

    # 水滴アイコン (カード右上)
    drop_cx, drop_cy = card[2] - 110, card[1] + 95
    dc = AFTER_ACCENT if is_after else (150, 156, 162)
    draw.polygon([
        (drop_cx, drop_cy - 55),
        (drop_cx + 40, drop_cy + 10),
        (drop_cx + 20, drop_cy + 45),
        (drop_cx - 20, drop_cy + 45),
        (drop_cx - 40, drop_cy + 10),
    ], fill=dc)

    # タイトル
    title = "水を飲む量が増えた" if is_after else "水をあまり飲まない"
    draw_centered_text(draw, (SIZE // 2, 900), title, font_title,
                       AFTER_FG if is_after else BEFORE_FG)
    sub = ("美味しそうに飲む姿が増えた体験談"
           if is_after else "夏場や高齢期に気になりがち")
    draw_centered_text(draw, (SIZE // 2, 985), sub, font_sub,
                       (90, 100, 115) if is_after else (95, 100, 108))

    kb = save_optimized(img, OUT_DIR / f"water-{stage}.png")
    print(f"  water-{stage}.png ({kb} KB)")


# -------------------------------------------------------------------
# 3. 元気度 Before / After (犬アイコンの姿勢変化)
# -------------------------------------------------------------------
def draw_dog(img: Image.Image, center: Tuple[int, int], scale: float,
             body_color: Tuple[int, int, int], droopy: bool) -> None:
    """簡易犬アイコン。droopy=True なら耳と尻尾が下がり姿勢低め。"""
    d = ImageDraw.Draw(img, "RGBA")
    cx, cy = center
    s = scale

    # 体 (楕円)
    body_w = int(220 * s)
    body_h = int(140 * s)
    body_y_offset = int(20 * s) if droopy else 0
    d.ellipse((cx - body_w, cy - body_h + body_y_offset,
               cx + body_w, cy + body_h + body_y_offset), fill=body_color)

    # 足
    leg_w = int(34 * s)
    leg_h = int(70 * s) if not droopy else int(45 * s)
    leg_y = cy + body_h + body_y_offset - 10
    for lx in [cx - body_w + 50, cx - 20, cx + 30, cx + body_w - 80]:
        d.rounded_rectangle((lx, leg_y, lx + leg_w, leg_y + leg_h),
                            radius=14, fill=body_color)

    # 頭
    head_r = int(110 * s)
    head_cx = cx + int(body_w * 0.7)
    head_cy = cy - int(30 * s) + (int(50 * s) if droopy else 0)
    d.ellipse((head_cx - head_r, head_cy - head_r, head_cx + head_r, head_cy + head_r),
              fill=body_color)

    # 耳 (droopyは垂れる, 元気は立つ)
    ear_color = tuple(max(0, c - 30) for c in body_color)
    if droopy:
        d.polygon([
            (head_cx - 80, head_cy - 70),
            (head_cx - 120, head_cy + 40),
            (head_cx - 40, head_cy - 10),
        ], fill=ear_color)
        d.polygon([
            (head_cx + 80, head_cy - 70),
            (head_cx + 120, head_cy + 40),
            (head_cx + 40, head_cy - 10),
        ], fill=ear_color)
    else:
        d.polygon([
            (head_cx - 90, head_cy - 50),
            (head_cx - 130, head_cy - 140),
            (head_cx - 30, head_cy - 80),
        ], fill=ear_color)
        d.polygon([
            (head_cx + 90, head_cy - 50),
            (head_cx + 130, head_cy - 140),
            (head_cx + 30, head_cy - 80),
        ], fill=ear_color)

    # 目
    eye_color = (30, 30, 30) if not droopy else (80, 80, 80)
    eye_r = 11
    d.ellipse((head_cx - 38 - eye_r, head_cy - 10 - eye_r,
               head_cx - 38 + eye_r, head_cy - 10 + eye_r), fill=eye_color)
    d.ellipse((head_cx + 22 - eye_r, head_cy - 10 - eye_r,
               head_cx + 22 + eye_r, head_cy - 10 + eye_r), fill=eye_color)
    # 鼻
    d.ellipse((head_cx - 10, head_cy + 30, head_cx + 20, head_cy + 52),
              fill=(50, 50, 50))

    # 口 (元気は微笑, 疲れは水平)
    if droopy:
        d.line([(head_cx - 15, head_cy + 70), (head_cx + 30, head_cy + 70)],
               fill=(50, 50, 50), width=4)
    else:
        d.arc((head_cx - 25, head_cy + 55, head_cx + 40, head_cy + 95),
              start=0, end=180, fill=(50, 50, 50), width=5)

    # 尻尾
    tail_base = (cx - body_w + 30, cy - int(body_h * 0.3) + body_y_offset)
    if droopy:
        tail_end = (tail_base[0] - 70, tail_base[1] + 80)
    else:
        tail_end = (tail_base[0] - 90, tail_base[1] - 110)
    d.line([tail_base, tail_end], fill=body_color, width=28)


def gen_energy(stage: str) -> None:
    is_after = stage == "after"
    img = gradient_bg(AFTER_BG_TOP if is_after else BEFORE_BG_TOP,
                      AFTER_BG_BOTTOM if is_after else BEFORE_BG_BOTTOM)
    draw = ImageDraw.Draw(img, "RGBA")

    body = (160, 120, 82) if is_after else (150, 152, 156)
    draw_dog(img, (SIZE // 2, SIZE // 2 + 10), scale=1.2,
             body_color=body, droopy=not is_after)

    # Afterは動きエフェクト (スピード線)
    if is_after:
        d = ImageDraw.Draw(img, "RGBA")
        for y in [380, 460, 540, 620]:
            d.line([(110, y), (240, y)], fill=AFTER_ACCENT + (180,), width=10)
        # ハートマーク
        hx, hy = 880, 300
        for off in [(0, 0), (42, -20)]:
            cx2, cy2 = hx + off[0], hy + off[1]
            d.ellipse((cx2 - 22, cy2 - 22, cx2 + 4, cy2 + 4), fill=(230, 80, 100, 230))
            d.ellipse((cx2 - 4, cy2 - 22, cx2 + 22, cy2 + 4), fill=(230, 80, 100, 230))
            d.polygon([(cx2 - 22, cy2 - 6), (cx2 + 22, cy2 - 6), (cx2, cy2 + 26)],
                      fill=(230, 80, 100, 230))

    font_badge = load_font(54)
    font_title = load_font(72)
    font_sub = load_font(34)
    if is_after:
        badge(draw, (60, 60, 360, 150), "AFTER", AFTER_ACCENT, (255, 255, 255), font_badge)
    else:
        badge(draw, (60, 60, 360, 150), "BEFORE", BEFORE_ACCENT, (255, 255, 255), font_badge)

    title = "お散歩が楽しそう" if is_after else "なんだか元気がない"
    draw_centered_text(draw, (SIZE // 2, 920), title, font_title,
                       AFTER_FG if is_after else BEFORE_FG)
    sub = ("毎日の水分ケアを続けて数週間 (体験談)"
           if is_after else "夏バテ・シニア期に気になるサイン")
    draw_centered_text(draw, (SIZE // 2, 1000), sub, font_sub,
                       (90, 100, 115) if is_after else (95, 100, 108))

    kb = save_optimized(img, OUT_DIR / f"energy-{stage}.png")
    print(f"  energy-{stage}.png ({kb} KB)")


# -------------------------------------------------------------------
# Main
# -------------------------------------------------------------------
def main() -> None:
    print(f"[gen-testimonial-imagery] output: {OUT_DIR}")
    for stage in ("before", "after"):
        gen_fur(stage)
        gen_water(stage)
        gen_energy(stage)
    print("done.")


if __name__ == "__main__":
    main()
