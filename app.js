// ---------- Screen navigation ----------
const cards = document.querySelectorAll(".card");
function show(id) {
  cards.forEach(c => c.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.querySelectorAll("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => show(btn.getAttribute("data-go")));
});
document.getElementById("go2")?.addEventListener("click", () => show("s2"));

// ---------- Yes / No ----------
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noText = document.getElementById("noText");
const s1 = document.getElementById("s1");

yesBtn?.addEventListener("click", () => show("s2"));

let dodgeCount = 0;
const dodgeLines = [
  "Noor… No? 😏",
  "Aray meri jaan, No yahan allow nahi 😄",
  "Chotu don ke samne No? impossible 😌",
  "Hint: Yes pe click karo 💞",
  "Hehe… pakarna mushkil hai 😂"
];

function moveNo() {
  if (!noBtn || !s1) return;

  const rect = s1.getBoundingClientRect();
  const maxX = Math.max(10, rect.width - noBtn.offsetWidth - 20);
  const maxY = Math.max(10, rect.height - noBtn.offsetHeight - 220);

  noBtn.style.position = "absolute";
  noBtn.style.left = (10 + Math.random() * maxX) + "px";
  noBtn.style.top  = (140 + Math.random() * maxY) + "px";

  if (noText) {
    noText.textContent = dodgeLines[Math.min(dodgeCount, dodgeLines.length - 1)];
  }
  dodgeCount++;
}

noBtn?.addEventListener("mouseover", moveNo);
noBtn?.addEventListener("click", (e) => { e.preventDefault(); moveNo(); });
noBtn?.addEventListener("touchstart", (e) => { e.preventDefault(); moveNo(); }, { passive: false });

// ---------- Music (iOS needs user tap) ----------
const music = document.getElementById("bgMusic");
const playBtn = document.getElementById("playMusic");
const pauseBtn = document.getElementById("pauseMusic");

playBtn?.addEventListener("click", async () => {
  try { await music?.play(); } catch (e) {}
});
pauseBtn?.addEventListener("click", () => music?.pause());

// ---------- Memories slider ----------
let i = 1;
const img = document.getElementById("memImg");

function updateDots() {
  for (let k = 1; k <= 6; k++) {
    const d = document.getElementById("d" + k);
    if (d) d.classList.toggle("active", k === i);
  }
}

function setImg(n) {
  i = n;
  if (img) img.src = "assets/img" + i + ".jpg";
  updateDots();
}

document.getElementById("nextImg")?.addEventListener("click", () => setImg(i === 6 ? 1 : i + 1));
document.getElementById("prevImg")?.addEventListener("click", () => setImg(i === 1 ? 6 : i - 1));

// ---------- Floating hearts ----------
const hearts = document.getElementById("hearts");
const emojis = ["💗", "💖", "💞", "💕"];

setInterval(() => {
  if (!hearts) return;
  const h = document.createElement("div");
  h.className = "heart";
  h.style.left = Math.random() * 100 + "%";
  h.style.fontSize = (18 + Math.random() * 26) + "px";
  h.style.animationDuration = (6 + Math.random() * 5) + "s";
  h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 9000);
}, 450);

// ---------- Confetti (simple) ----------
const canvas = document.getElementById("confettiCanvas");
const btn = document.getElementById("confettiBtn");
const ctx = canvas?.getContext("2d");

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let particles = [];

function boom() {
  if (!canvas || !ctx) return;
  particles = [];
  for (let j = 0; j < 180; j++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -20,
      r: 2 + Math.random() * 4,
      vy: 2 + Math.random() * 4,
      vx: -1 + Math.random() * 2,
      a: 1,
      c: ["#ff4f81","#ff79a8","#ffd1e1","#ffffff"][Math.floor(Math.random() * 4)]
    });
  }
  animate();
}

function animate() {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.a -= 0.006;
    ctx.globalAlpha = Math.max(0, p.a);
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalAlpha = 1;
  particles = particles.filter(p => p.a > 0 && p.y < canvas.height + 30);

  if (particles.length) requestAnimationFrame(animate);
}

btn?.addEventListener("click", boom);
