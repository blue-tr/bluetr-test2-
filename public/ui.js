"use strict";

const bar = document.getElementById("bar");
const title = document.getElementById("title");
const bg = document.getElementById("bg");
const view = document.getElementById("view");

function moveToTop() {
  bar.classList.remove("center");
  bar.classList.add("top");
  title.classList.add("hide");
  bg.classList.add("show");
  view.classList.add("show");
}

// 外部から使えるようにしておく
window.moveToTop = moveToTop;
