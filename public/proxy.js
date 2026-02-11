async function loadPage(url) {
  try {
    // POST リクエストでサーバーに送信
    const res = await fetch("/api/index.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });
    
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }
    
    const html = await res.text();
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
