/* ==========================================================
   heart.js – Page 1: touch the heart → beat → expand → burst
   ========================================================== */

(function () {
  const heartBtn = document.getElementById("heart-btn");
  const page1    = document.getElementById("page1");
  const flash    = document.getElementById("flash");
  const canvas   = document.getElementById("burst-canvas");
  const ctx      = canvas.getContext("2d");

  let clicked = false;
  let particles = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  heartBtn.addEventListener("click", () => {
    if (clicked) return;
    clicked = true;

    // 1 + 2: heart beats, glow gets stronger
    heartBtn.classList.add("beating");
    page1.classList.add("leaving");

    // 3: heart expands
    setTimeout(() => {
      heartBtn.classList.remove("beating");
      heartBtn.classList.add("expanding");
    }, 1800);

    // 4 + 5: break into particles + flash
    setTimeout(explode, 2800);
  });

  // Make particles from points inside the (expanded) heart shape
  function explode() {
    const rect = heartBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const scale = (rect.width * 1.65) / 36;   // heart is scaled 1.65x at this moment

    const colors = ["#e2b8ff", "#c58bff", "#a84cf0", "#8a2be2", "#ffffff"];
    particles = [];

    for (let i = 0; i < 520; i++) {
      // classic heart curve
      const t = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random());     // fills the inside, not only the outline
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      const x = cx + hx * r * scale;
      const y = cy - hy * r * scale - rect.height * 0.04;

      const angle = Math.atan2(y - cy, x - cx) + (Math.random() - 0.5) * 0.7;
      const speed = 2 + Math.random() * 11;

      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.5 + Math.random() * 3.5,
        life: 1,
        decay: 0.006 + Math.random() * 0.012,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    heartBtn.classList.add("gone");
    flash.classList.add("go");
    animate();

    // 6: open page 2 while the particles are still flying
    setTimeout(() => window.showPage(2), 1300);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;

    particles.forEach(p => {
      if (p.life <= 0) return;
      alive++;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.975;
      p.vy = p.vy * 0.975 + 0.05;      // tiny drift downward
      p.life -= p.decay;

      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    if (alive > 0) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
})();
