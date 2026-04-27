# Meta Marketing API トークン取得手順（永続化）

最終更新: 2026-04-27
目的: 一度トークンを発行すれば、以降のバナー差し替えはCLI 1コマンドで実行可能になる
所要時間: 初回 30〜45分

---

## 0. 前提

- Facebookビジネスマネージャー管理者アカウント保有
- 広告アカウント `act_518379218762642` 所有者またはadmin権限
- ココペリECの公式FBページ管理者

---

## 1. Meta開発者アプリ作成

1. https://developers.facebook.com/apps/ にアクセス（FBログイン必要）
2. 右上「アプリを作成」
3. ユースケース: **「ビジネスを管理する」** 選択
4. アプリ名: `Kokopelli EC Ad Automation`
5. 連絡先メール: `timberfrost321@gmail.com`
6. ビジネスポートフォリオ: ココペリEC関連のものを選択

---

## 2. Marketing API 製品追加

1. 作成したアプリの **「製品を追加」** から
2. **「Marketing API」** を選択 → 「設定」
3. 左メニュー **Marketing API → ツール** へ移動
4. **「アクセストークンを取得」** ボタンクリック
5. 必要権限にチェック：
   - `ads_management`（広告作成・更新）
   - `ads_read`（広告データ読み取り）
   - `business_management`（ビジネス資産管理）
6. 「アクセストークンを取得」 → ダイアログで **「同意する」**
7. 表示された短期トークン（〜2時間有効）をコピー

---

## 3. 長期トークン化（60日有効化）

短期トークンを60日有効の長期トークンに変換：

```bash
# PowerShellまたはbashで実行（短期トークンと App ID/Secret 必要）
SHORT_TOKEN="<手順2-7で取得した短期トークン>"
APP_ID="<アプリ詳細ページで確認>"
APP_SECRET="<アプリ詳細→基本設定→アプリシークレット>"

curl -s "https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${SHORT_TOKEN}"
```

レスポンス例:

```json
{ "access_token": "EAAxxxxxxxxxxxxxxxxxxxx", "token_type": "bearer", "expires_in": 5184000 }
```

→ `access_token` の値が60日有効な長期トークン。

---

## 4. システムユーザー作成（恒久トークン化）

長期トークンも60日で失効するため、**システムユーザートークン（無期限）** に昇格：

1. https://business.facebook.com/settings/system-users にアクセス
2. **「追加」** → 名前: `Kokopelli Ad API` / ロール: `管理者`
3. 作成後、**「アセットを追加」** で以下を割り当て：
   - 広告アカウント `518379218762642`（権限: 広告アカウントを管理）
   - FBページ（権限: ページを管理）
4. **「新しいトークンを生成」** → アプリ選択 → 期限: **「期限なし」** → 必要権限：
   - `ads_management`
   - `ads_read`
   - `business_management`
   - `pages_show_list`
   - `pages_read_engagement`
5. 生成されたトークンを安全に保管（**画面を閉じると二度と見られない**）

---

## 5. ローカル環境への登録

PowerShellでUser環境変数として登録（値はClaudeに見えない安全設計）:

```powershell
# Windowsキー → "環境変数" → ユーザー環境変数の編集
# 新規 → 変数名: META_ACCESS_TOKEN / 値: 手順4で取得したトークン
# 同様に追加:
#   META_AD_ACCOUNT_ID = act_518379218762642
#   META_APP_ID        = <アプリID>
#   META_APP_SECRET    = <アプリシークレット>

# またはPowerShellワンライナー（管理者不要・User scope）
[Environment]::SetEnvironmentVariable("META_ACCESS_TOKEN", "EAAxxxxxxxxx...", "User")
[Environment]::SetEnvironmentVariable("META_AD_ACCOUNT_ID", "act_518379218762642", "User")
```

新規ターミナルを開けば反映される（既存ターミナルでは無効）。

---

## 6. 動作確認

```bash
curl -s "https://graph.facebook.com/v21.0/me?access_token=${META_ACCESS_TOKEN}"
# → {"name":"Kokopelli Ad API","id":"100xxxxxxxxx"} が返ればOK

curl -s "https://graph.facebook.com/v21.0/${META_AD_ACCOUNT_ID}?fields=name,account_status&access_token=${META_ACCESS_TOKEN}"
# → {"name":"...","account_status":1,"id":"act_518379218762642"} が返ればOK
```

---

## 7. トークン取得完了後

`scripts/swap-ad-creative-api.mjs`（次のドキュメント）を実行可能になる：

```bash
cd ~/kokopelli-ec
node scripts/swap-ad-creative-api.mjs --variant=feed-cat --dry-run
node scripts/swap-ad-creative-api.mjs --variant=all
```

---

## 8. セキュリティ注意

- アクセストークンは **絶対にgitコミットしない**（`.env*` で除外済）
- トークンが漏洩した疑いがある場合: ビジネスマネージャー → システムユーザー → トークン削除 → 再発行
- 必要最小限の権限のみ付与（不要権限は外す）
