"""
Meta広告用 動画クリエイティブ v2
==========================================
v1のNG修正:
  1) 製品(ココペリ パッケージ)が映っていない → 全シーンに製品継続表示
  2) green-* 系を使用 → ブランドカラー amber-600/500 + slate-800/700 に統一
  3) 静止カット連結 → 全フレームPillow生成でズーム/シェイク/フェードを付与

仕様:
  - A_age (高齢ペット訴求) / B_refund (返金保証訴求)
  - feed=1080x1080 / story=1080x1920
  - 15s @ 24fps = 360 frames
  - 無音 (Meta SNS無音再生がデフォルト, v1も無音だったため整合)
  - h264 + yuv420p

タイムライン:
  0.0 - 2.0s  フック (ペット背景 + キャッチ)
  2.0 - 8.0s  製品センター大表示 (画面比45%以上, ズーム+シェイク)
  8.0 - 13.0s 訴求文 (左:製品 右:訴求) + 製品継続表示
 13.0 - 15.0s CTA + 価格 + 製品 (左下に製品継続)
"""

import math
import shutil
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

# ===== Paths =====
ROOT = Path(r"C:\Users\timbe\kokopelli-ec")
IMG_DIR = ROOT / "public" / "images"
ADS_DIR = ROOT / "public" / "ads"
TMP_DIR = ROOT / ".tmp" / "v2-frames"
TMP_DIR.mkdir(parents=True, exist_ok=True)

FONT_BLACK = r"C:\Windows\Fonts\YuGothB.ttc"   # Bold (Heavy相当)
FONT_BOLD = r"C:\Windows\Fonts\YuGothB.ttc"
FONT_MED = r"C:\Windows\Fonts\YuGothM.ttc"

# ===== Brand palette (amber + slate, NO green) =====
AMBER_600 = (217, 119, 6)        # primary
AMBER_500 = (245, 158, 11)       # primary light
AMBER_50 = (255, 251, 235)       # bg cream
SLATE_800 = (30, 41, 59)         # secondary dark
SLATE_700 = (51, 65, 85)
SLATE_500 = (100, 116, 139)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (220, 38, 38)              # 価格用

# ===== Pricing (lib/prices.ts と一致) =====
SINGLE_PRICE = 3480
BUNDLE_2_PRICE = 5980

# ===== Product images (LP内で参照されている公式画像) =====
PRODUCT_FRONT = IMG_DIR / "image-1.webp"   # パッケージ正面 (ロゴ + ココペリ + 高濃度ケイ素濃縮溶液)
PRODUCT_OG = IMG_DIR / "image-4.webp"      # OG指定の高品質ショット
PRODUCT_SIDE = IMG_DIR / "image-5.webp"    # 側面 (Kokopelli横ロゴ)


# ============================================================
# Pillow util
# ============================================================

def load_font(path, size):
    return ImageFont.truetype(path, size)


def fit_cover(pil_img, target):
    """target=(W,H) に cover でリサイズ + センタークロップ"""
    iw, ih = pil_img.size
    tw, th = target
    r = max(tw / iw, th / ih)
    nw, nh = int(iw * r), int(ih * r)
    img = pil_img.resize((nw, nh), Image.LANCZOS)
    left = (nw - tw) // 2
    top = (nh - th) // 2
    return img.crop((left, top, left + tw, top + th))


def fit_contain(pil_img, target):
    """target=(W,H) に contain でリサイズ (アスペクト保持, パディング無)"""
    iw, ih = pil_img.size
    tw, th = target
    r = min(tw / iw, th / ih)
    nw, nh = max(1, int(iw * r)), max(1, int(ih * r))
    return pil_img.resize((nw, nh), Image.LANCZOS)


def text_size(draw, text, font):
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0], bbox[3] - bbox[1]


def draw_text_stroked(draw, xy, text, font, fill=WHITE, stroke=BLACK, stroke_w=8):
    """白塗り + 黒太縁取り (画面横幅60%目安はサイズで調整)"""
    draw.text(xy, text, font=font, fill=fill,
              stroke_width=stroke_w, stroke_fill=stroke)


def draw_text_centered_stroked(draw, cx, y, text, font, fill=WHITE, stroke=BLACK, stroke_w=8):
    w, _ = text_size(draw, text, font)
    draw.text((cx - w // 2, y), text, font=font, fill=fill,
              stroke_width=stroke_w, stroke_fill=stroke)


def rounded_rect(size, radius, fill, stroke=None, stroke_w=0):
    W, H = size
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, W - 1, H - 1], radius=radius,
                        fill=fill, outline=stroke, width=stroke_w)
    return img


def soft_drop_shadow(pil_img, offset=(0, 8), blur=10, alpha=120):
    """製品画像の足元に軽い影を付与して立体感を出す"""
    from PIL import ImageFilter
    w, h = pil_img.size
    shadow = Image.new("RGBA", (w + 60, h + 60), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rectangle([30 + offset[0], 30 + offset[1],
                  30 + offset[0] + w, 30 + offset[1] + h],
                 fill=(0, 0, 0, alpha))
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    out = Image.new("RGBA", (w + 60, h + 60), (0, 0, 0, 0))
    out.alpha_composite(shadow)
    out.alpha_composite(pil_img.convert("RGBA"), (30, 30))
    return out


def gradient_overlay(size, top_alpha=0, bottom_alpha=180, color=(0, 0, 0)):
    """背景の上下グラデ (テキスト可読性確保)"""
    W, H = size
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    arr = np.zeros((H, W, 4), dtype=np.uint8)
    arr[:, :, 0] = color[0]
    arr[:, :, 1] = color[1]
    arr[:, :, 2] = color[2]
    alphas = np.linspace(top_alpha, bottom_alpha, H, dtype=np.uint8)
    arr[:, :, 3] = np.tile(alphas[:, None], (1, W))
    return Image.fromarray(arr, "RGBA")


# ============================================================
# Motion helpers (時間tに対する変位)
# ============================================================

def ease_out_cubic(t):
    return 1 - (1 - t) ** 3


def ease_in_out(t):
    return 0.5 - 0.5 * math.cos(math.pi * max(0.0, min(1.0, t)))


def gentle_shake(t, amp_px=6, freq=0.5):
    """ふわっとした揺れ (左右)"""
    return int(amp_px * math.sin(2 * math.pi * freq * t))


# ============================================================
# Scene composers — 各 t (秒) からPIL画像を返す
# ============================================================

def compose_hook(size, t, pet_img_path, line1, line2, accent_color=AMBER_500):
    """0.0-2.0s フック (ペット背景 + 黒グラデ + キャッチ)"""
    W, H = size
    pet = Image.open(pet_img_path).convert("RGB")
    pet = fit_cover(pet, size)

    # ゆったりズーム (1.00 → 1.06)
    z = 1.0 + 0.06 * (t / 2.0)
    nw, nh = int(W * z), int(H * z)
    pet_z = pet.resize((nw, nh), Image.LANCZOS)
    pet_z = pet_z.crop(((nw - W) // 2, (nh - H) // 2,
                        (nw - W) // 2 + W, (nh - H) // 2 + H))

    img = pet_z.convert("RGBA")
    img.alpha_composite(gradient_overlay(size, top_alpha=80, bottom_alpha=200))

    d = ImageDraw.Draw(img)
    f1 = load_font(FONT_BLACK, int(W * 0.10))
    f2 = load_font(FONT_BLACK, int(W * 0.085))

    # フェードイン (alpha shift)
    alpha = int(255 * ease_out_cubic(min(1.0, t / 0.5)))

    # 中央〜やや下寄せ
    cx = W // 2
    w1, h1 = text_size(d, line1, f1)
    w2, h2 = text_size(d, line2, f2)
    cy = int(H * 0.55)

    # alpha付き別レイヤー
    text_layer = Image.new("RGBA", size, (0, 0, 0, 0))
    td = ImageDraw.Draw(text_layer)
    draw_text_centered_stroked(td, cx, cy, line1, f1,
                               fill=WHITE, stroke=BLACK, stroke_w=8)
    draw_text_centered_stroked(td, cx, cy + int(h1 * 1.3), line2, f2,
                               fill=accent_color, stroke=BLACK, stroke_w=8)
    if alpha < 255:
        a = text_layer.split()[3]
        a = a.point(lambda p: int(p * alpha / 255))
        text_layer.putalpha(a)
    img.alpha_composite(text_layer)
    return img.convert("RGB")


def compose_product_hero(size, t, dur, top_banner_text, sub_text):
    """2.0-8.0s 製品ボトル センター大表示 (ズーム+左右シェイク)"""
    W, H = size
    bg = Image.new("RGB", size, AMBER_50)

    # 上部バンド (amber)
    d = ImageDraw.Draw(bg)
    bh = int(H * 0.11)
    d.rectangle([0, 0, W, bh], fill=AMBER_600)
    fb = load_font(FONT_BLACK, int(W * 0.052))
    bw, bbh = text_size(d, top_banner_text, fb)
    d.text(((W - bw) // 2, (bh - bbh) // 2 - 4),
           top_banner_text, font=fb, fill=WHITE)

    # 製品: 画面比45%以上を確保 (短辺基準)
    short = min(W, H)
    target = int(short * 0.62)  # 製品高さ
    prod = Image.open(PRODUCT_FRONT).convert("RGBA")
    prod = fit_contain(prod, (target, target))

    # 軽いズーム (1.00 → 1.05) + 左右シェイク
    local_t = t - 2.0
    z = 1.0 + 0.05 * ease_in_out(local_t / dur)
    pw, ph = prod.size
    pw2, ph2 = int(pw * z), int(ph * z)
    prod_z = prod.resize((pw2, ph2), Image.LANCZOS)
    prod_z = soft_drop_shadow(prod_z, offset=(0, 12), blur=14, alpha=100)

    cx = W // 2 + gentle_shake(local_t, amp_px=8, freq=0.35)
    cy = int(H * 0.50)
    px = cx - prod_z.size[0] // 2
    py = cy - prod_z.size[1] // 2
    bg_rgba = bg.convert("RGBA")
    bg_rgba.alpha_composite(prod_z, (px, py))

    # 下部サブテキスト
    d2 = ImageDraw.Draw(bg_rgba)
    fs = load_font(FONT_BLACK, int(W * 0.058))
    sw, sh = text_size(d2, sub_text, fs)
    sy = int(H * 0.86)
    # 白枠
    pad = 18
    box = rounded_rect((sw + pad * 2, sh + pad * 2), 14, fill=SLATE_800 + (255,))
    bg_rgba.alpha_composite(box, ((W - sw - pad * 2) // 2, sy - pad))
    d2 = ImageDraw.Draw(bg_rgba)
    d2.text(((W - sw) // 2, sy - 4), sub_text, font=fs, fill=WHITE)

    return bg_rgba.convert("RGB")


def fit_font_to_width(font_path, text, max_w, start_size, min_size=14):
    """text が max_w に収まる最大サイズを二分探索ぽく決める"""
    size = start_size
    while size > min_size:
        f = load_font(font_path, size)
        bbox = f.getbbox(text)
        w = bbox[2] - bbox[0]
        if w <= max_w:
            return f, size
        size -= 2
    return load_font(font_path, min_size), min_size


def compose_pitch(size, t, dur, headline, body_lines, accent_color=AMBER_600):
    """8.0-13.0s 訴求 (feed=上:製品 下:訴求(縦積み) / story=上:製品 下:訴求)
    feedは横に並べると右側が狭すぎるため縦積みに変更。"""
    W, H = size
    is_story = H > W
    bg = Image.new("RGB", size, AMBER_50)

    # 製品サイズ
    if is_story:
        target_w = int(W * 0.55)
        target_h = int(H * 0.42)
    else:
        # feed: 上半分に製品 (横幅最大40%, 高さ50%)
        target_w = int(W * 0.40)
        target_h = int(H * 0.50)
    prod = Image.open(PRODUCT_OG).convert("RGBA")
    prod = fit_contain(prod, (target_w, target_h))
    prod = soft_drop_shadow(prod, offset=(0, 10), blur=12, alpha=90)

    bg_rgba = bg.convert("RGBA")
    if not is_story:
        # feed: 上に製品センター
        px = (W - prod.size[0]) // 2
        py = int(H * 0.05)
        bg_rgba.alpha_composite(prod, (px, py))
        text_x = int(W * 0.05)
        text_w = W - 2 * text_x
    else:
        # story: 上に製品
        px = (W - prod.size[0]) // 2
        py = int(H * 0.08)
        bg_rgba.alpha_composite(prod, (px, py))
        text_x = int(W * 0.06)
        text_w = W - 2 * text_x

    d = ImageDraw.Draw(bg_rgba)

    # text_w に確実に収めるための動的フォントサイズ決定
    # ヘッドラインは body より大きく
    head_start = int(W * (0.085 if is_story else 0.075))
    body_start = int(W * (0.052 if is_story else 0.048))
    f_head, f_head_size = fit_font_to_width(FONT_BLACK, headline, text_w, head_start)
    # 全bodyの最長行を基準にbody fontを決定
    longest_body = max(body_lines, key=len)
    f_body, f_body_size = fit_font_to_width(FONT_BOLD, longest_body, text_w, body_start)

    # フェードスライド
    local_t = t - 8.0
    slide = int(40 * (1 - ease_out_cubic(min(1.0, local_t / 0.5))))

    if is_story:
        ty = int(H * 0.62)
    else:
        # feed: 製品下から開始
        ty = int(H * 0.60)

    hw, hh = text_size(d, headline, f_head)
    d.text(((W - hw) // 2 + slide, ty), headline, font=f_head, fill=accent_color)
    ty += int(hh * 1.5)
    for line in body_lines:
        bw, bh = text_size(d, line, f_body)
        d.text(((W - bw) // 2 + slide, ty), line, font=f_body, fill=SLATE_800)
        ty += int(bh * 1.4)

    return bg_rgba.convert("RGB")


def compose_cta(size, t, dur, price_label, price_value, cta_text, url_text):
    """13.0-15.0s CTA + 価格 + 製品継続
       feed/story とも縦積み: 上=製品, 下=価格ラベル/価格値/CTAボタン/URL
       feedで横並びにすると右カラムが狭すぎ price/CTA が見切れるため統一。"""
    W, H = size
    is_story = H > W
    bg = Image.new("RGB", size, AMBER_50)

    # 上部に細い amber バンド
    d = ImageDraw.Draw(bg)
    bh = int(H * 0.04)
    d.rectangle([0, 0, W, bh], fill=AMBER_600)

    bg_rgba = bg.convert("RGBA")

    # ============ 製品配置 (上半分センター) ============
    if is_story:
        target_w = int(W * 0.55)
        target_h = int(H * 0.40)
    else:
        # feed: 上半分に収める
        target_w = int(W * 0.42)
        target_h = int(H * 0.48)
    prod = Image.open(PRODUCT_FRONT).convert("RGBA")
    prod = fit_contain(prod, (target_w, target_h))
    prod = soft_drop_shadow(prod, offset=(0, 8), blur=10, alpha=80)
    px = (W - prod.size[0]) // 2
    py = int(H * 0.06) if is_story else int(H * 0.05)
    bg_rgba.alpha_composite(prod, (px, py))

    d = ImageDraw.Draw(bg_rgba)

    # ============ 価格 + CTA (下半分センター) ============
    cx = W // 2
    col_w = int(W * 0.86)

    if is_story:
        f_label_start = int(W * 0.065)
        f_price_start = int(W * 0.16)
        f_cta_start = int(W * 0.058)
        f_url = load_font(FONT_MED, int(W * 0.036))
        cta_h = int(W * 0.13)
        ty = int(H * 0.56)
    else:
        # feed: 下半分にコンパクトに
        f_label_start = int(W * 0.058)
        f_price_start = int(W * 0.14)
        f_cta_start = int(W * 0.052)
        f_url = load_font(FONT_MED, int(W * 0.032))
        cta_h = int(W * 0.12)
        ty = int(H * 0.62)

    # フォントを col_w に確実に収める (見切れ防止)
    f_label, _ = fit_font_to_width(FONT_BOLD, price_label, col_w, f_label_start)
    f_price, _ = fit_font_to_width(FONT_BLACK, price_value, col_w, f_price_start)
    f_cta, _ = fit_font_to_width(FONT_BLACK, cta_text, col_w - int(W * 0.04), f_cta_start)

    # 価格ラベル
    lw, lh = text_size(d, price_label, f_label)
    d.text((cx - lw // 2, ty), price_label, font=f_label, fill=SLATE_800)
    ty += int(lh * 1.3)
    # 価格値
    pw, ph = text_size(d, price_value, f_price)
    d.text((cx - pw // 2, ty), price_value, font=f_price, fill=RED)
    ty += int(ph * 1.15)

    # CTA ボタン
    cta_w = col_w
    cta_btn = rounded_rect((cta_w, cta_h), 24, fill=AMBER_600 + (255,))
    bg_rgba.alpha_composite(cta_btn, (cx - cta_w // 2, ty))
    d = ImageDraw.Draw(bg_rgba)
    cw, ch = text_size(d, cta_text, f_cta)
    d.text((cx - cw // 2, ty + (cta_h - ch) // 2 - int(cta_h * 0.05)),
           cta_text, font=f_cta, fill=WHITE)
    cta_top_y = ty
    ty += cta_h + int(H * 0.018)

    # URL
    uw, uh = text_size(d, url_text, f_url)
    d.text((cx - uw // 2, ty), url_text, font=f_url, fill=SLATE_700)

    # ボタンに登場ハイライト (13.0-13.4s)
    local_t = t - 13.0
    if local_t < 0.4:
        pulse = int(70 * (1 - local_t / 0.4))
        overlay = Image.new("RGBA", size, (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        od.rounded_rectangle(
            [cx - cta_w // 2, cta_top_y,
             cx + cta_w // 2, cta_top_y + cta_h],
            radius=24, fill=(255, 255, 255, pulse))
        bg_rgba.alpha_composite(overlay)

    return bg_rgba.convert("RGB")


# ============================================================
# Variant config — A/B
# ============================================================

VARIANTS = {
    "A": {
        # 高齢ペット訴求
        "hook_image": IMG_DIR / "pet-dog-senior.jpg",
        "hook_line1": "うちの子、もう10歳。",
        "hook_line2": "毎日の水、大丈夫？",
        "hook_accent": AMBER_500,
        "hero_top_banner": "高濃度ケイ素 10,000mg/L",
        "hero_sub_text": "シニア世代の毎日のケアに",
        "pitch_headline": "シニアペットの毎日に、",
        "pitch_body": [
            "1日たった数滴を",
            "いつものごはんへ。",
            "シンプル処方で続けやすい。",
        ],
        "pitch_accent": AMBER_600,
        "cta_label": "まずは1本",
        "cta_price": f"¥{SINGLE_PRICE:,}",
        "cta_text": "公式サイトで詳細を見る",
        "cta_url": "kokopelli.kamuturu.jp",
        "bgm": r"C:\Users\timbe\youtube-auto\assets\bgm\emotional_strings.wav",
    },
    "B": {
        # 返金保証訴求
        "hook_image": IMG_DIR / "pet-cat-happy.jpg",
        "hook_line1": "試したい、けど",
        "hook_line2": "合わなかったら不安。",
        "hook_accent": AMBER_500,
        "hero_top_banner": "30日間 全額返金保証",
        "hero_sub_text": "だから安心して試せる",
        "pitch_headline": "リスクゼロで、",
        "pitch_body": [
            "30日以内に合わなければ",
            "全額返金。",
            "まずは試してみる。",
        ],
        "pitch_accent": AMBER_600,
        "cta_label": "お試し1本",
        "cta_price": f"¥{SINGLE_PRICE:,}",
        "cta_text": "公式サイトで詳細を見る",
        "cta_url": "kokopelli.kamuturu.jp",
        "bgm": r"C:\Users\timbe\youtube-auto\assets\bgm\cute_bgm.wav",
    },
}


# ============================================================
# Frame dispatcher
# ============================================================

def render_frame(size, variant, t):
    cfg = VARIANTS[variant]
    if t < 2.0:
        return compose_hook(size, t,
                            cfg["hook_image"],
                            cfg["hook_line1"], cfg["hook_line2"],
                            accent_color=cfg["hook_accent"])
    elif t < 8.0:
        return compose_product_hero(size, t, dur=6.0,
                                    top_banner_text=cfg["hero_top_banner"],
                                    sub_text=cfg["hero_sub_text"])
    elif t < 13.0:
        return compose_pitch(size, t, dur=5.0,
                             headline=cfg["pitch_headline"],
                             body_lines=cfg["pitch_body"],
                             accent_color=cfg["pitch_accent"])
    else:
        return compose_cta(size, t, dur=2.0,
                           price_label=cfg["cta_label"],
                           price_value=cfg["cta_price"],
                           cta_text=cfg["cta_text"],
                           url_text=cfg["cta_url"])


# ============================================================
# Render pipeline (frames → ffmpeg)
# ============================================================

def render_video(size, variant, out_path, fps=24, duration=15.0):
    label = f"{variant}_{size[0]}x{size[1]}"
    work = TMP_DIR / label
    if work.exists():
        shutil.rmtree(work)
    work.mkdir(parents=True, exist_ok=True)

    n_frames = int(fps * duration)
    print(f"  Rendering {n_frames} frames -> {work}")
    for i in range(n_frames):
        t = i / fps
        img = render_frame(size, variant, t)
        # JPEG (品質90) でディスク節約 + 高速
        img.save(work / f"f_{i:04d}.jpg", quality=92)
        if (i + 1) % 60 == 0:
            print(f"    {i + 1}/{n_frames}")

    cfg = VARIANTS[variant]
    bgm_path = cfg.get("bgm")

    # 無音の中間動画を先に作成
    silent_mp4 = work / "silent.mp4"
    cmd_video = [
        "ffmpeg", "-y", "-loglevel", "error",
        "-framerate", str(fps),
        "-i", str(work / "f_%04d.jpg"),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "medium",
        "-crf", "21",
        "-movflags", "+faststart",
        str(silent_mp4),
    ]
    print(f"  ffmpeg encode video -> silent.mp4")
    subprocess.run(cmd_video, check=True)

    # BGM合成 (ノーマライズ -16 LUFS + 13.5s以降フェードアウト)
    # afade t=out: 13.5s開始, 1.5s継続で15.0sまで
    # loudnorm: I=-16 LUFS, TP=-1.5 dB, LRA=11
    if bgm_path and Path(bgm_path).exists():
        print(f"  ffmpeg mux BGM -> {out_path.name}")
        cmd_mux = [
            "ffmpeg", "-y", "-loglevel", "error",
            "-i", str(silent_mp4),
            "-i", bgm_path,
            "-filter_complex",
            f"[1:a]atrim=0:{duration},asetpts=PTS-STARTPTS,"
            f"afade=t=out:st={duration - 1.5}:d=1.5,"
            f"loudnorm=I=-16:TP=-1.5:LRA=11,"
            f"aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo[aout]",
            "-map", "0:v",
            "-map", "[aout]",
            "-c:v", "copy",
            "-c:a", "aac",
            "-b:a", "128k",
            "-ar", "48000",
            "-ac", "2",
            "-shortest",
            "-movflags", "+faststart",
            str(out_path),
        ]
        subprocess.run(cmd_mux, check=True)
    else:
        # BGM無ければそのままコピー
        shutil.copy(silent_mp4, out_path)

    # cleanup
    shutil.rmtree(work)
    print(f"    done: {out_path.stat().st_size / 1024 / 1024:.2f} MB")


def main():
    jobs = [
        ("A", (1080, 1080), ADS_DIR / "video-v2A-feed.mp4"),
        ("A", (1080, 1920), ADS_DIR / "video-v2A-story.mp4"),
        ("B", (1080, 1080), ADS_DIR / "video-v2B-feed.mp4"),
        ("B", (1080, 1920), ADS_DIR / "video-v2B-story.mp4"),
    ]
    for variant, size, out in jobs:
        print(f"\n>>> {variant} {size[0]}x{size[1]} -> {out.name}")
        render_video(size, variant, out)


if __name__ == "__main__":
    main()
