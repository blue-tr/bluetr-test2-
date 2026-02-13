"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const loadBtn = document.getElementById("loadBtn");
  const urlInput = document.getElementById("url");
  const iframe = document.getElementById("view");

  if (!loadBtn || !urlInput || !iframe) {
    console.error("必要な要素が見つかりません");
    return;
  }

  async function loadPage(url) {
    try {
      toggleLoading(true);

      const res = await fetch("/api/index.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });

      const html = await res.text();

      if (!res.ok) {
        console.warn(`HTTP ${res.status}`);
      }

      iframe.setAttribute("sandbox", "");
      iframe.srcdoc = html;

    } catch (e) {
      console.error(e);
      alert("ページの読み込みに失敗しました");
    } finally {
      toggleLoading(false);
    }
  }

  function toggleLoading(isLoading) {
    if (isLoading) {
      loadBtn.disabled = true;
      loadBtn.dataset.originalText = loadBtn.textContent;
      loadBtn.textContent = "読み込み中...";
    } else {
      loadBtn.disabled = false;
      loadBtn.textContent =
        loadBtn.dataset.originalText || "読み込み";
    }
  }

  loadBtn.addEventListener("click", handleSubmit);

  urlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  });

  function handleSubmit() {
    const value = urlInput.value.trim();

    if (!value) {
      alert("URLを入力してください");
      return;
    }

    let parsed;
    try {
      parsed = new URL(value);
    } catch {
      alert("不正なURL形式です");
      return;
    }

    if (!["http:", "https:"].includes(parsed.protocol)) {
      alert("http または https のみ対応しています");
      return;
    }

    if (typeof window.moveToTop === "function") {
      window.moveToTop();
    }

    loadPage(parsed.href);
  }

});