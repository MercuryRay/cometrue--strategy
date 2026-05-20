@echo off
chcp 65001 >nul
title kokopelli-ec 本番Stripeキー登録
echo.
echo  kokopelli-ec 本番Stripeキーを登録します（値は画面に出ません）
echo  取得元: https://dashboard.stripe.com/apikeys （本番モード）
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0register-stripe-live-key.ps1"
echo.
echo  --- 完了したらこのウィンドウを閉じてください ---
pause
