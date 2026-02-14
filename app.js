// ===== Hearts background =====
const heartsWrap = document.querySelector(".hearts");
const heartEmojis = ["💗","💖","💘","💕","❤️","✨"];

function spawnHeart(){
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = heartEmojis[Math.floor(Math.random()*heartEmojis.length)];
  h.style.left = Math.random()*100 + "vw";
  h.style.animationDuration = (4 + Math.random()*4) + "s";
  h.style.fontSize = (14 + Math.random()*22) + "px";
  h.style.opacity = (0.35 + Math.random()*0.45).toFixed(2);
  heartsWrap.appendChild(h);
  setTimeout(()=>h.remove(), 9000);
}
setInterval(spawnHeart, 260);

// ===== Screens =====
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");

function showScreen(n){
  if(n===1){ screen1.classList.add("active"); screen2.classList.remove("active"); }
  if(n===2){ screen2.classList.add("active"); screen1.classList.remove("active"); }
}

// ===== Music =====
const bgMusic = document.getElementById("bgMusic");
const playMusic = document.getElementById("playMusic");
const stopMusic = document.getElementById("stopMusic");
const musicStatus = document.getElementById("musicStatus");

playMusic.addEventListener("click", async () => {
  try{
    await bgMusic.play();
    musicStatus.textContent = "Song: on ✅";
  }catch(e){
    musicStatus.textContent = "Song: tap again (Safari rule)";
  }
});
stopMusic.addEventListener("click", () => {
  bgMusic.pause();
  musicStatus.textContent = "Song: off";
});

// ===== Valentine buttons =====
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noText = document.getElementById("noText");
const toMemories = document.getElementById("toMemories");

let noCount = 0;

// Soft teasing lines (edit here)
const noLines = [
  "Awww nahi? 😭 Chalo phir ek smile de do…",
  "Soch lo… main bohat zyada cute hun 😌",
  "Arey yaar… ‘No’ allow hi nahi hai 😂",
  "Ok ok… tumhari marzi… (but main phir bhi tang karunga 😄)",
  "Last chance… warna main ‘moti’ wali teasing mode on kar dunga 😜",
  "Hehe, mazaak tha… Tum meri Valentine ho 💞 (Now click YES!)"
];

noBtn.addEventListener("click", () => {
  noText.textContent = noLines[Math.min(noCount, noLines.length-1)];
  noCount++;

  // Make YES bigger, NO smaller (cute trick)
  const yesScale = 1 + Math.min(noCount*0.08, 0.55);
  yesBtn.style.transform = `scale(${yesScale})`;
  noBtn.style.opacity = (1 - Math.min(noCount*0.12, 0.6)).toFixed(2);

  if(noCount >= 2){
    toMemories.disabled = false;
    toMemories.classList.add("enabled");
  }
});

yesBtn.addEventListener("click", () => {
  noText.textContent = "Yayyy! 💞 Ab ‘Next’ dabao…";
  toMemories.disabled = false;
  toMemories.classList.add("enabled");
});

toMemories.addEventListener("click", () => showScreen(2));

// ===== Slider =====
const images = [
  "assets/img1.jpg",
  "assets/img2.jpg",
  "assets/img3.jpg",
  "assets/img4.jpg",
  "assets/img5.jpg",
  "assets/img6.jpg"
];

let idx = 0;
const slideImg = document.getElementById("slideImg");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const dots = document.getElementById("dots");

function buildDots(){
  dots.innerHTML = "";
  images.forEach((_,i)=>{
    const d = document.createElement("div");
    d.className = "dot" + (i===idx ? " active" : "");
    d.addEventListener("click", ()=>{ idx=i; renderSlide(); });
    dots.appendChild(d);
  });
}

function renderSlide(){
  slideImg.src = images[idx];
  [...dots.children].forEach((d,i)=>d.classList.toggle("active", i===idx));
}
buildDots();

prev.addEventListener("click", ()=>{
  idx = (idx - 1 + images.length) % images.length;
  renderSlide();
});
next.addEventListener("click", ()=>{
  idx = (idx + 1) % images.length;
  renderSlide();
});

// ===== Ending button =====
document.getElementById("endBtn").addEventListener("click", ()=>{
  // You can change this final message
  document.getElementById("finalText").textContent =
    "Tumhari presence hi meri peace hai. Happy Valentine’s Day, meri jaan 💗";
});

// Back
document.getElementById("backHome").addEventListener("click", ()=>showScreen(1));
