async function loadPage(url) {
  try {
    // サーバー側の /api/proxy にリクエストを投げる
    const res = await fetch("/api/proxy?url=" + encodeURIComponent(url));
    const html = await res.text();
    
    // iframeに流し込む
    document.getElementById("view").srcdoc = html;
  } catch (e) {
    console.error("Fetch Error:", e);
    alert("読み込みに失敗しました。");
  }
}

// ボタンが押された時の処理
document.getElementById("loadBtn").onclick = () => {
  const url = document.getElementById("url").value;
  if (!url) return;
  
  window.moveToTop(); // UIを動かす
  loadPage(url);      // 通信開始
};
