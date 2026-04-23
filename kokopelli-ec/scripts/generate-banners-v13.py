"""
Banner v13 (NEW) — 4 訴求軸 × 2 フォーマット = 8 枚

1. pain:      ペインポイント型 「水道水のフッ素が心配...」
2. authority: 権威型          「シリカ配合ミネラル水」
3. social:    社会的証明型    「多くの飼い主様に選ばれる」
4. offer:     オファー型       「初回500円お試し」

デザイン: v12 の金/緑/黒ベースを継承
テキスト: ストローク + ドロップシャドウ でコントラスト確保
各画像 800KB 以下
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(BASE, 'public', 'images')
OUT_DIR = os.path.join(BASE, 'public', 'ads')
os.makedirs(OUT_DIR, exist_ok=True)

FONT_BOLD = 'C:/Windows/Fonts/YuGothB.ttc'
FONT_MED = 'C:/Windows/Fonts/YuGothM.ttc'
FONT_MEIRYO_B = 'C:/Windows/Fonts/meiryob.ttc'

# カラーパレット（v12継承）
GOLD = (234, 179, 8)          # yellow-500 金色
GOLD_LIGHT = (253, 224, 71)   # yellow-300
GREEN = (22, 163, 74)         # green-600
GREEN_LIGHT = (74, 222, 128)  # green-400
NAVY = (10, 15, 35)           # 深い紺
DARK = (0, 0, 0)
WHITE = (255, 255, 255)
CREAM = (255, 244, 214)       # 見出し強調用

# ============================================================
# 訴求パターン
# ============================================================
VARIANTS = {
    'pain': {
        'bg_pet': {'dog': 'pet-dog-owner.jpg', 'cat': 'pet-cat-owner.jpg'},
        'eyebrow': '飲み水、大丈夫ですか？',
        'headline_top': '水道水のフッ素が',
        'headline_bottom': '気になる飼い主さんへ',
        'sub': 'ペット専用・無添加処方ミネラルウォーター',
        'badge': '気になる成分ゼロ',
        'badge_color': GREEN,
        'accent_color': GOLD,
        'cta': '詳しく見る',
        'cta_color': GOLD,
    },
    'authority': {
        'bg_pet': {'dog': 'pet-dog-happy.jpg', 'cat': 'pet-cat-happy.jpg'},
        'eyebrow': '犬・猫のプレミアム水',
        'headline_top': 'シリカ配合',
        'headline_bottom': 'ミネラルウォーター',
        'sub': '水溶性ケイ素 10,000mg/L・無添加処方',
        'badge': '高濃度ケイ素配合',
        'badge_color': GOLD,
        'accent_color': GOLD_LIGHT,
        'cta': '公式サイトを見る',
        'cta_color': GREEN,
    },
    'social': {
        'bg_pet': {'dog': 'cute-dogs.jpg', 'cat': 'cute-cat.jpg'},
        'eyebrow': '全国の飼い主さんに支持',
        'headline_top': '多くの飼い主様に',
        'headline_bottom': '選ばれています',
        'sub': '毎日の健康維持に、ペット専用ミネラル水',
        'badge': 'リピート多数',
        'badge_color': GOLD,
        'accent_color': GOLD_LIGHT,
        'cta': 'ココペリを見る',
        'cta_color': GREEN,
    },
    'offer': {
        'bg_pet': {'dog': 'pet-dog-water.jpg', 'cat': 'orange-cat.jpg'},
        'eyebrow': '公式サイト限定',
        'headline_top': '初回お試し',
        'headline_bottom': '500円',
        'sub': 'まずは気軽にお試しください',
        'badge': '期間限定',
        'badge_color': (220, 38, 38),  # red-600
        'accent_color': GOLD,
        'cta': '500円で試す',
        'cta_color': GOLD,
    },
}

FORMATS = {
    'feed': (1080, 1080),
    'story': (1080, 1920),
}


# ============================================================
# 画像操作
# ============================================================
def load_bg(path, size):
    img = Image.open(path).convert('RGB')
    tw, th = size
    iw, ih = img.size
    scale = max(tw / iw, th / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    img = img.resize((nw, nh), Image.LANCZOS)
    left = (nw - tw) // 2
    top = (nh - th) // 2
    img = img.crop((left, top, left + tw, top + th))
    return img


def navy_tint(img, alpha=0.65):
    """画像にネイビー色のオーバーレイを重ねて高級感を出す"""
    overlay = Image.new('RGB', img.size, NAVY)
    return Image.blend(img, overlay, alpha)


def vertical_gradient(img, from_color=NAVY, alpha_top=0.3, alpha_bottom=0.95, ratio=1.0):
    """上から下へ暗くなるグラデーションを重ねる"""
    W, H = img.size
    grad_h = int(H * ratio)
    gradient = Image.new('L', (1, grad_h))
    for iy in range(grad_h):
        t = iy / grad_h
        alpha = alpha_top + (alpha_bottom - alpha_top) * (t ** 1.3)
        gradient.putpixel((0, iy), int(255 * alpha))
    grad_img = gradient.resize((W, grad_h))
    color_layer = Image.new('RGB', (W, grad_h), from_color)
    base = img.crop((0, H - grad_h, W, H))
    composited = Image.composite(color_layer, base, grad_img)
    img.paste(composited, (0, H - grad_h))
    return img


def top_gradient(img, color=NAVY, alpha_top=0.85, alpha_bottom=0.0, ratio=0.35):
    """上部に帯状のグラデーション（ヘッダー領域暗転）"""
    W, H = img.size
    grad_h = int(H * ratio)
    gradient = Image.new('L', (1, grad_h))
    for iy in range(grad_h):
        t = iy / grad_h
        alpha = alpha_top + (alpha_bottom - alpha_top) * t
        gradient.putpixel((0, iy), int(255 * alpha))
    grad_img = gradient.resize((W, grad_h))
    color_layer = Image.new('RGB', (W, grad_h), color)
    base = img.crop((0, 0, W, grad_h))
    composited = Image.composite(color_layer, base, grad_img)
    img.paste(composited, (0, 0))
    return img


# ============================================================
# テキスト描画（ドロップシャドウ + ストローク）
# ============================================================
def draw_text_shadow(img, xy, text, font, fill=WHITE, stroke_w=3, stroke_fill=DARK,
                     shadow_offset=(4, 4), shadow_blur=6, shadow_alpha=180):
    """ドロップシャドウ付きテキスト描画"""
    # 影レイヤー
    W, H = img.size
    shadow_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow_layer)
    sx, sy = xy[0] + shadow_offset[0], xy[1] + shadow_offset[1]
    sd.text((sx, sy), text, font=font, fill=(0, 0, 0, shadow_alpha),
            stroke_width=stroke_w, stroke_fill=(0, 0, 0, shadow_alpha))
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(shadow_blur))
    img.paste(shadow_layer, (0, 0), shadow_layer)
    # 本体
    d = ImageDraw.Draw(img)
    d.text(xy, text, font=font, fill=fill,
           stroke_width=stroke_w, stroke_fill=stroke_fill)


def draw_text_center_shadow(img, text, font, y, fill=WHITE, stroke_w=3, stroke_fill=DARK,
                            shadow_offset=(4, 4), shadow_blur=6):
    d = ImageDraw.Draw(img)
    bbox = d.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    W = img.size[0]
    x = (W - w) // 2
    draw_text_shadow(img, (x, y), text, font, fill=fill,
                     stroke_w=stroke_w, stroke_fill=stroke_fill,
                     shadow_offset=shadow_offset, shadow_blur=shadow_blur)
    return bbox[3] - bbox[1]


def auto_fit_font(text, font_path, start_size, max_width, min_size=36):
    """max_widthに収まる最大フォントサイズを探して返す"""
    size = start_size
    while size > min_size:
        f = ImageFont.truetype(font_path, size)
        bbox = f.getbbox(text)
        w = bbox[2] - bbox[0]
        if w <= max_width:
            return f, size
        size -= 4
    return ImageFont.truetype(font_path, min_size), min_size


def draw_pill_badge(img, text, font, bg_color, text_color=WHITE,
                    x=None, y=0, pad_x=28, pad_y=14):
    """丸型バッジ（ピル形状）"""
    d = ImageDraw.Draw(img)
    bbox = d.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    W = img.size[0]
    full_w = tw + pad_x * 2
    full_h = th + pad_y * 2
    if x is None:
        x = (W - full_w) // 2
    # ドロップシャドウ
    shadow = Image.new('RGBA', img.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle(
        [x + 3, y + 5, x + full_w + 3, y + full_h + 5],
        radius=full_h // 2, fill=(0, 0, 0, 140)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    img.paste(shadow, (0, 0), shadow)
    d = ImageDraw.Draw(img)
    d.rounded_rectangle(
        [x, y, x + full_w, y + full_h],
        radius=full_h // 2, fill=bg_color,
    )
    d.text((x + pad_x, y + pad_y - 3), text, font=font, fill=text_color)
    return full_w, full_h


def draw_cta_button(img, text, font, color, x, y, width,
                    text_color=WHITE, pad_y=28):
    d = ImageDraw.Draw(img)
    bbox = d.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    h = th + pad_y * 2
    # シャドウ
    shadow = Image.new('RGBA', img.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle([x + 4, y + 8, x + width + 4, y + h + 8],
                         radius=h // 2, fill=(0, 0, 0, 160))
    shadow = shadow.filter(ImageFilter.GaussianBlur(10))
    img.paste(shadow, (0, 0), shadow)
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([x, y, x + width, y + h], radius=h // 2, fill=color)
    tx = x + (width - tw) // 2
    # ボタン文字は白 + 控えめなシャドウ
    d.text((tx, y + pad_y - 3), text, font=font, fill=text_color,
           stroke_width=2, stroke_fill=DARK)
    # 矢印
    arrow = ' →'
    ab = d.textbbox((0, 0), arrow, font=font)
    d.text((tx + tw, y + pad_y - 3), arrow, font=font, fill=text_color,
           stroke_width=2, stroke_fill=DARK)
    return h


def draw_accent_line(img, y, width, color, x=None, thickness=4):
    d = ImageDraw.Draw(img)
    W = img.size[0]
    if x is None:
        x = (W - width) // 2
    d.rounded_rectangle([x, y, x + width, y + thickness],
                        radius=thickness // 2, fill=color)


# ============================================================
# メイン生成
# ============================================================
def generate(variant_key, fmt_key, pet):
    v = VARIANTS[variant_key]
    size = FORMATS[fmt_key]
    W, H = size
    bg_path = os.path.join(IMG_DIR, v['bg_pet'][pet])
    img = load_bg(bg_path, size)
    # 全体にネイビーティント
    img = navy_tint(img, alpha=0.72)
    # 上部グラデ
    img = top_gradient(img, color=NAVY, alpha_top=0.92, alpha_bottom=0.0, ratio=0.45)
    # 下部グラデ
    img = vertical_gradient(img, from_color=NAVY,
                            alpha_top=0.0, alpha_bottom=0.96, ratio=0.65)

    # ---- サイズ調整 ----
    if fmt_key == 'feed':
        eyebrow_size = 36
        headline_size = 96
        sub_size = 34
        badge_size = 32
        cta_size = 44
        top_start = int(H * 0.10)
    else:  # story
        eyebrow_size = 44
        headline_size = 128
        sub_size = 44
        badge_size = 40
        cta_size = 56
        top_start = int(H * 0.08)

    # セーフエリア幅（画面幅の88%）
    safe_w = int(W * 0.88)
    f_eyebrow = ImageFont.truetype(FONT_MED, eyebrow_size)
    # ヘッドラインは長い行に合わせて自動縮小
    longest = v['headline_top'] if len(v['headline_top']) >= len(v['headline_bottom']) else v['headline_bottom']
    f_headline, actual_headline_size = auto_fit_font(
        longest, FONT_MEIRYO_B, headline_size, safe_w,
        min_size=56 if fmt_key == 'feed' else 72
    )
    f_sub = ImageFont.truetype(FONT_MED, sub_size)
    f_badge = ImageFont.truetype(FONT_BOLD, badge_size)
    f_cta = ImageFont.truetype(FONT_BOLD, cta_size)

    # ---- BADGE 上部 ----
    draw_pill_badge(img, v['badge'], f_badge, v['badge_color'],
                    text_color=WHITE, y=top_start,
                    pad_x=32, pad_y=14)

    # ---- EYEBROW ----
    y = top_start + badge_size + 56
    draw_text_center_shadow(img, v['eyebrow'], f_eyebrow, y,
                            fill=v['accent_color'], stroke_w=2, stroke_fill=DARK,
                            shadow_offset=(2, 2), shadow_blur=4)

    # ---- アクセントライン ----
    y += eyebrow_size + 20
    draw_accent_line(img, y, width=int(W * 0.18),
                     color=v['accent_color'], thickness=5)

    # ---- HEADLINE 上 ----
    y += 30
    h1 = draw_text_center_shadow(img, v['headline_top'], f_headline, y,
                                 fill=WHITE, stroke_w=5, stroke_fill=DARK,
                                 shadow_offset=(5, 6), shadow_blur=8)
    # 金色特別扱い: "500円" だけ特大・金色
    if variant_key == 'offer':
        y += h1 + (20 if fmt_key == 'story' else 12)
        # 特大サイズ (セーフエリアにフィット)
        big_target = int(actual_headline_size * 1.35)
        f_big, _ = auto_fit_font(
            v['headline_bottom'], FONT_MEIRYO_B, big_target, safe_w,
            min_size=80
        )
        h2 = draw_text_center_shadow(img, v['headline_bottom'], f_big, y,
                                     fill=GOLD, stroke_w=6, stroke_fill=DARK,
                                     shadow_offset=(6, 7), shadow_blur=10)
    else:
        y += h1 + (22 if fmt_key == 'story' else 14)
        h2 = draw_text_center_shadow(img, v['headline_bottom'], f_headline, y,
                                     fill=v['accent_color'],
                                     stroke_w=5, stroke_fill=DARK,
                                     shadow_offset=(5, 6), shadow_blur=8)

    # ---- SUB (auto-fit) ----
    y += h2 + (48 if fmt_key == 'story' else 30)
    f_sub_fit, _ = auto_fit_font(v['sub'], FONT_MED, sub_size, safe_w, min_size=24)
    draw_text_center_shadow(img, v['sub'], f_sub_fit, y,
                            fill=(230, 230, 230),
                            stroke_w=2, stroke_fill=DARK,
                            shadow_offset=(2, 2), shadow_blur=4)

    # ---- CTA bottom ----
    cta_text = v['cta']
    if fmt_key == 'feed':
        cta_w = int(W * 0.80)
        cta_y = H - 200
    else:
        cta_w = int(W * 0.86)
        cta_y = H - 320

    draw_cta_button(img, cta_text, f_cta, v['cta_color'],
                    (W - cta_w) // 2, cta_y, cta_w, text_color=WHITE)

    # ---- bottom tagline ----
    f_tag = ImageFont.truetype(FONT_MED, 26 if fmt_key == 'feed' else 32)
    tag = 'Kokopelli | 犬・猫のためのミネラルウォーター'
    tag_y = cta_y + (110 if fmt_key == 'feed' else 170)
    if tag_y < H - 40:
        draw_text_center_shadow(img, tag, f_tag, tag_y,
                                fill=(210, 210, 210),
                                stroke_w=1, stroke_fill=DARK,
                                shadow_offset=(1, 1), shadow_blur=3)

    # ---- save (容量最適化) ----
    out_name = f'banner-v13-{variant_key}-{fmt_key}-{pet}-{W}x{H}.png'
    out_path = os.path.join(OUT_DIR, out_name)
    # 800KB以下に収めるため、palette最適化 + 最大圧縮
    # まずはRGBで最適化保存を試みる
    img.save(out_path, 'PNG', optimize=True, compress_level=9)
    size_kb = os.path.getsize(out_path) / 1024
    # 800KB超えた場合は quantize してファイルサイズを下げる
    if size_kb > 800:
        pal = img.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
        pal.save(out_path, 'PNG', optimize=True, compress_level=9)
        size_kb = os.path.getsize(out_path) / 1024
    print(f'Saved: {os.path.basename(out_path)} ({size_kb:.0f} KB)')
    return out_path


if __name__ == '__main__':
    results = []
    for vk in VARIANTS:
        for fk in FORMATS:
            # ペインは犬、権威は猫、社会的証明は犬、オファーは猫 を代表にする
            # → 仕様は 4訴求 × 2フォーマット = 8枚。pet は訴求ごとに固定。
            pet_map = {
                'pain': 'dog',
                'authority': 'cat',
                'social': 'dog',
                'offer': 'cat',
            }
            results.append(generate(vk, fk, pet_map[vk]))
    print(f'\nAll done. {len(results)} files generated.')
    total_kb = sum(os.path.getsize(r) for r in results) / 1024
    print(f'Total size: {total_kb:.0f} KB')
