const tasks = [
  "ASP（A8.net / もしも）の提携申請を3件行う",
  "検索キーワードを10件収集して見出し案を作る",
  "過去記事1本にCTAと比較表を追加する",
  "メール登録フォームを設置してテスト送信する"
];

const day = new Date().getDay();
const todayTask = tasks[day % tasks.length];

const taskEl = document.getElementById("task");
if (taskEl) taskEl.textContent = todayTask;

const downloadEl = document.getElementById("download-plan");
if (downloadEl) {
  const planText = `Auto Income Hub 収益化プラン\n\n本日のタスク: ${todayTask}\n\n1. 記事を1本作成\n2. CTAを追加\n3. 数値を記録\n`;
  const blob = new Blob([planText], { type: "text/plain;charset=utf-8" });
  downloadEl.href = URL.createObjectURL(blob);
}
