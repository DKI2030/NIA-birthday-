/* ==========================================================
   main.js – page navigation, background particles, stars
   ========================================================== */

const pages = {
  1: document.getElementById("page1"),
  2: document.getElementById("page2"),
  3: document.getElementById("page3")
};
const video = document.getElementById("birthday-video");

/* Show one page, hide the others */
window.showPage = function (n) {
  Object.entries(pages).forEach(([key, el]) => {
    el.classList.toggle("active", Number(key) === n);
  });

  // Leaving the video page → pause the video
  if (n !== 2 && video) video.pause();

  // Arriving on the poem page → begin the poem
  if (n === 3) {
    pages[3].scrollTop = 0;
    startPoetry();
  }
};

/* Page 2 → Page 3 */
document.getElementById("continue-btn").addEventListener("click", () => showPage(3));

/* ---------- Floating purple particles (behind everything) ---------- */
(function () {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  let w, h, dots = [];

  function setup() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.round((w * h) / 16000);       // fewer on small screens
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.8 + Math.random() * 2.2,
      vy: 0.15 + Math.random() * 0.45,
      sway: Math.random() * Math.PI * 2,
      a: 0.25 + Math.random() * 0.6
    }));
  }
  setup();
  window.addEventListener("resize", setup);

  function draw() {
    ctx.clearRect(0, 0, w, h);
    dots.forEach(d => {
      d.y -= d.vy;
      d.sway += 0.01;
      d.x += Math.sin(d.sway) * 0.25;
      if (d.y < -10) { d.y = h + 10; d.x = Math.random() * w; }

      ctx.globalAlpha = d.a;
      ctx.fillStyle = "#c58bff";
      ctx.shadowColor = "#a84cf0";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ---------- Twinkling stars on page 3 ---------- */
(function () {
  const box = document.querySelector(".stars");
  for (let i = 0; i < 70; i++) {
    const s = document.createElement("span");
    s.className = "star";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.animationDelay = Math.random() * 3 + "s";
    s.style.transform = "scale(" + (0.5 + Math.random()) + ")";
    box.appendChild(s);
  }
})();
