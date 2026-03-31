const tasks = [
  "ASP（A8.net / もしも）の提携申請を3件行う",
  "検索キーワードを10件収集して見出し案を作る",
  "過去記事1本にCTAと比較表を追加する",
  "メール登録フォームを設置してテスト送信する"
];

const day = new Date().getDay();
const taskEl = document.getElementById("task");
if (taskEl) {
  taskEl.textContent = tasks[day % tasks.length];
}
