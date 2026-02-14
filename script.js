// AUTOPLAY_V13_FIX
const dict = {
  ar: {
    centerName: "مركز الارتقاء الطبي",
    tagline: "رعاية طبية حديثة بثقة وخصوصية",
    langAr: "عربي",
    langEn: "English",
    langHe: "עברית"
  },
  en: {
    centerName: "Medical Elevation Center",
    tagline: "Modern care with trust & privacy",
    langAr: "Arabic",
    langEn: "English",
    langHe: "Hebrew"
  },
  he: {
    centerName: "מרכז ההתרוממות הרפואי",
    tagline: "רפואה מודרנית באמון ובפרטיות",
    langAr: "ערבית",
    langEn: "אנגלית",
    langHe: "עברית"
  }
};

function setLang(lang){
  const isRTL = (lang === "ar" || lang === "he");
  document.documentElement.lang = lang;
  document.documentElement.dir = isRTL ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    const v = dict?.[lang]?.[key];
    if (v) el.textContent = v;
  });

  document.querySelectorAll(".langchip").forEach(btn=>{
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  localStorage.setItem("site_lang", lang);
}

document.querySelectorAll(".langchip").forEach(btn=>{
  btn.addEventListener("click", ()=> setLang(btn.dataset.lang));
});
setLang(localStorage.getItem("site_lang") || "ar");

(() => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const track  = document.getElementById("track");
  const dotsEl = document.getElementById("dots");

  let index = 0;
  let startX = 0, dx = 0, isDown = false;

  // Build dots
  slides.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === 0 ? " is-active" : "");
    d.addEventListener("click", () => { go(i); pauseAutoplay(); });
    dotsEl.appendChild(d);
  });
  const dots = Array.from(document.querySelectorAll(".dot"));

  function update(animate = true){
    track.style.transition = animate ? "transform .75s cubic-bezier(.22,1,.36,1)" : "none";
    track.style.transform = `translateX(${index * -100}%)`;
    dots.forEach((d,i)=> d.classList.toggle("is-active", i===index));
  }
  function go(i){
    index = (i + slides.length) % slides.length;
    update(true);
  }

  document.getElementById("prevBtn").addEventListener("click", () => { go(index-1); pauseAutoplay(); });
  document.getElementById("nextBtn").addEventListener("click", () => { go(index+1); pauseAutoplay(); });

  // Swipe
  track.addEventListener("pointerdown", (e)=>{
    isDown = true; startX = e.clientX; dx = 0;
    track.setPointerCapture(e.pointerId);
    update(false);
    pauseAutoplay();
  });
  track.addEventListener("pointermove", (e)=>{
    if(!isDown) return;
    dx = e.clientX - startX;
    const w = track.getBoundingClientRect().width;
    const pct = (dx / w) * 100;
    track.style.transform = `translateX(${index * -100 + pct}%)`;
  });
  track.addEventListener("pointerup", ()=>{
    if(!isDown) return;
    isDown = false;
    if(Math.abs(dx) > 40){
      go(index + (dx < 0 ? 1 : -1));
    } else update(true);
  });

  // ---- Autoplay
  let autoplayTimer = null;
  let resumeTimer = null;
  const AUTOPLAY_MS = 3200;

  function startAutoplay(){
    stopAutoplay();
    autoplayTimer = setInterval(()=> go(index+1), AUTOPLAY_MS);
  }
  function stopAutoplay(){
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
  function pauseAutoplay(){
    stopAutoplay();
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(startAutoplay, 4000);
  }
  // pause when tab hidden
  document.addEventListener("visibilitychange", ()=>{
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  startAutoplay();

  // ---- Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbThumbs = document.getElementById("lbThumbs");
  const lbStage = document.getElementById("lbStage");

  let scale = 1;
  let panX = 0, panY = 0;
  let pDown = false, pX = 0, pY = 0;

  function applyZoom(){
    lbImg.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
  }
  function openLB(i){
    index = i;
    update(true);
    pauseAutoplay();

    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden","false");
    lbImg.src = slides[index].src;

    lbThumbs.innerHTML = "";
    slides.forEach((s, k) => {
      const b = document.createElement("button");
      b.className = "lb-thumb" + (k===index ? " is-active" : "");
      b.type = "button";
      b.innerHTML = `<img src="${s.src}" alt="thumb ${k+1}" loading="lazy">`;
      b.addEventListener("click", () => {
        index = k; update(true);
        lbImg.src = slides[index].src;
        scale = 1; panX = 0; panY = 0; applyZoom();
        [...lbThumbs.children].forEach((x,xi)=> x.classList.toggle("is-active", xi===index));
      });
      lbThumbs.appendChild(b);
    });

    scale = 1; panX = 0; panY = 0; applyZoom();
  }
  function closeLB(){
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden","true");
    scale = 1; panX = 0; panY = 0; applyZoom();
  }

  slides.forEach((img,i)=> img.addEventListener("click", ()=> openLB(i)));
  document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeLB));
  document.addEventListener("keydown", (e)=> { if(e.key==="Escape") closeLB(); });

  // double tap / double click zoom
  let lastTap = 0;
  lbStage.addEventListener("pointerdown", (e)=>{
    const now = Date.now();
    if(now - lastTap < 260){
      scale = (scale === 1 ? 2.2 : 1);
      panX = 0; panY = 0;
      applyZoom();
    }
    lastTap = now;

    pDown = true; pX = e.clientX; pY = e.clientY;
    lbStage.setPointerCapture(e.pointerId);
  });
  lbStage.addEventListener("pointermove", (e)=>{
    if(!pDown || scale === 1) return;
    const nx = e.clientX, ny = e.clientY;
    panX += (nx - pX);
    panY += (ny - pY);
    pX = nx; pY = ny;
    applyZoom();
  });
  lbStage.addEventListener("pointerup", ()=> { pDown = false; });

  // wheel zoom
  lbStage.addEventListener("wheel", (e)=>{
    if(!lb.classList.contains("is-open")) return;
    e.preventDefault();
    scale = Math.min(3, Math.max(1, scale + (e.deltaY > 0 ? -0.15 : 0.15)));
    if(scale === 1){ panX = 0; panY = 0; }
    applyZoom();
  }, { passive:false });

  update(true);
})();
