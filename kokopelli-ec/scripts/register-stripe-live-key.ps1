# kokopelli-ec 本番Stripeキー登録 — Claude に値を見せずに User env へ登録
# 使い方:
#   powershell -ExecutionPolicy Bypass -File C:\Users\timbe\kokopelli-ec\scripts\register-stripe-live-key.ps1
#
# 取得元: https://dashboard.stripe.com/apikeys (本番モード)
#   推奨: 「制限付きキー」を新規作成し、以下のみ「読み取り」権限を付与:
#     - Charges      : 読み取り
#     - PaymentIntents: 読み取り
#     - Subscriptions : 読み取り
#     - Balance       : 読み取り
#   (書き込み・課金系の権限は一切不要。万一漏れても被害を最小化)
#
# 既存の "kokoperi" / "KOKOPERI" キーをそのまま使う場合は full secret をそのまま貼り付け。

$ErrorActionPreference = "Stop"
$Name = "KOKOPELLI_STRIPE_LIVE_KEY"

$existing = [Environment]::GetEnvironmentVariable($Name, "User")
if ($existing) {
    $ans = Read-Host "$Name は登録済みです。上書きしますか? (y/N)"
    if ($ans -ne "y") {
        Write-Host "  → スキップ（既存値を維持）" -ForegroundColor Yellow
        exit 0
    }
}

Write-Host ""
Write-Host "kokopelli-ec 本番Stripeシークレットキー (sk_live_...) を貼り付けてください。" -ForegroundColor Cyan
Write-Host "入力は画面に表示されません（SecureString）。" -ForegroundColor Gray
$sec = Read-Host "KOKOPELLI_STRIPE_LIVE_KEY" -AsSecureString
$bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec)
$val  = [Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr)
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)

if ([string]::IsNullOrWhiteSpace($val)) {
    Write-Host "  → 空入力のため中止" -ForegroundColor Yellow
    exit 1
}
if (-not $val.StartsWith("sk_live_") -and -not $val.StartsWith("rk_live_")) {
    Write-Host "  ⚠ sk_live_ / rk_live_ で始まっていません。本番キーか確認してください。" -ForegroundColor Red
    $c = Read-Host "それでも登録しますか? (y/N)"
    if ($c -ne "y") { exit 1 }
}

[Environment]::SetEnvironmentVariable($Name, $val, "User")
Write-Host ""
Write-Host "  ✅ $Name を User env に登録しました" -ForegroundColor Green
Write-Host "  → 新規ターミナルで反映。売上確認:" -ForegroundColor Yellow
Write-Host "     node C:\Users\timbe\kokopelli-ec\scripts\check-live-sales.mjs" -ForegroundColor White
Write-Host ""
