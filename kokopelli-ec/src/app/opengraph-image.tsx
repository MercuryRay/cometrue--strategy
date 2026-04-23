import { ImageResponse } from 'next/og';

/**
 * 動的 OG 画像（ルートページ用）
 * - Next.js Metadata API 準拠（file convention: app/opengraph-image.tsx）
 * - Edge Runtime で描画、1200x630 PNG
 * - ブランドカラー: amber-600 / slate-800（禁止: green-*）
 */

export const runtime = 'edge';
export const alt = 'ココペリ｜犬・猫のための動物用栄養補助食品 水溶性ケイ素濃縮液';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #0f172a 100%)',
        position: 'relative',
        fontFamily: 'sans-serif',
      }}
    >
      {/* 装飾: 右上 amber グロー */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217,119,6,0.45) 0%, rgba(217,119,6,0) 70%)',
        }}
      />
      {/* 装飾: 左下 gold グロー */}
      <div
        style={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.35) 0%, rgba(245,158,11,0) 70%)',
        }}
      />

      {/* ブランドバッジ */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '10px 28px',
          border: '2px solid #d97706',
          borderRadius: 999,
          color: '#fbbf24',
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: 4,
          marginBottom: 40,
        }}
      >
        KOKOPELLI
      </div>

      {/* メインタイトル */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#ffffff',
          fontSize: 72,
          fontWeight: 800,
          lineHeight: 1.2,
          textAlign: 'center',
          padding: '0 80px',
        }}
      >
        <div>犬・猫のための</div>
        <div
          style={{
            color: '#fbbf24',
            fontSize: 88,
            marginTop: 8,
          }}
        >
          水溶性ケイ素濃縮液
        </div>
      </div>

      {/* サブコピー */}
      <div
        style={{
          marginTop: 40,
          color: '#e2e8f0',
          fontSize: 36,
          fontWeight: 500,
        }}
      >
        高濃度10,000mg/L・シンプル処方
      </div>

      {/* フッター URL */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          color: '#94a3b8',
          fontSize: 24,
          letterSpacing: 2,
        }}
      >
        kokopelli.kamuturu.jp
      </div>
    </div>,
    {
      ...size,
    }
  );
}
