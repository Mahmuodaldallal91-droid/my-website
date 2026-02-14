// i18n dictionary (kept minimal for this page)
window.dict = {
  ar: { thanksRated: "تم التقييم ✓", alreadyRated: "تم استلام تقييمك مسبقًا" },
  en: { thanksRated: "Rated ✓", alreadyRated: "You already rated" },
  he: { thanksRated: "דירגת ✓", alreadyRated: "כבר דירגת" },
};

(function(){
  // Language switching
  const chips = Array.from(document.querySelectorAll(".langChip"));
  function setLang(lang){
    document.documentElement.lang = lang;
    const isRTL = (lang === "ar" || lang === "he");
    document.documentElement.dir = isRTL ? "rtl" : "ltr";

    chips.forEach(b => b.classList.toggle("is-active", b.dataset.lang === lang));
  }
  chips.forEach(b => b.addEventListener("click", ()=> setLang(b.dataset.lang)));
})();

(() => {
  // Slider
  const slides = Array.from(document.querySelectorAll(".slide"));
  const track  = document.getElementById("track");
  const dotsEl = document.getElementById("dots");

  let index = 0;
  let startX = 0, dx = 0, isDown = false;

  slides.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === 0 ? " is-active" : "");
    d.addEventListener("click", () => go(i));
    dotsEl.appendChild(d);
  });
  const dots = Array.from(document.querySelectorAll(".dot"));

  function update(){
    track.style.transition = "transform .65s cubic-bezier(.22,1,.36,1)";
    track.style.transform = `translateX(${index * -100}%)`;
    dots.forEach((d,i)=> d.classList.toggle("is-active", i===index));
  }
  function go(i){
    index = (i + slides.length) % slides.length;
    update();
  }

  document.querySelector(".prev").addEventListener("click", () => { go(index-1); pauseAutoplay(); });
  document.querySelector(".next").addEventListener("click", () => { go(index+1); pauseAutoplay(); });

  // Swipe
  track.addEventListener("pointerdown", (e)=>{
    isDown = true; startX = e.clientX; dx = 0;
    track.setPointerCapture(e.pointerId);
    track.style.transition = "none";
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
    } else update();
  });

  // Autoplay
  let autoplayTimer = null;
  const AUTOPLAY_MS = 3200;

  function startAutoplay(){
    stopAutoplay();
    autoplayTimer = setInterval(()=> go(index+1), AUTOPLAY_MS);
  }
  function stopAutoplay(){
    if(autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
  function pauseAutoplay(){
    stopAutoplay();
    setTimeout(startAutoplay, 1800);
  }
  startAutoplay();

  // Lightbox
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
    update();
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
        index = k; update();
        lbImg.src = slides[index].src;
        scale = 1; panX = 0; panY = 0; applyZoom();
        [...lbThumbs.children].forEach((x,xi)=> x.classList.toggle("is-active", xi===index));
      });
      lbThumbs.appendChild(b);
    });

    scale = 1; panX = 0; panY = 0; applyZoom();
    pauseAutoplay();
  }

  function closeLB(){
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden","true");
    scale = 1; panX = 0; panY = 0;
    pauseAutoplay();
  }

  slides.forEach((img,i)=> img.addEventListener("click", ()=> openLB(i)));
  lb.addEventListener("click", (e)=> { if(e.target && e.target.dataset.close !== undefined) closeLB(); });
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

  update();

  // Rating overlay (clickable)
  const wrap = document.getElementById("sliderRating");
  const stars = Array.from(wrap.querySelectorAll(".srStar"));
  const toast = document.getElementById("srToast");

  const KEY = "rise_rating_v16";
  let saved = Number(localStorage.getItem(KEY) || 0);

  function paintStars(v){
    stars.forEach(b => b.classList.toggle("is-on", Number(b.dataset.v) <= v));
  }
  function showToast(text){
    toast.textContent = text;
    toast.classList.add("is-show");
    setTimeout(()=> toast.classList.remove("is-show"), 1200);
  }
  function getI18n(k){
    const lang = document.documentElement.lang || "ar";
    return (window.dict && window.dict[lang] && window.dict[lang][k]) || (k==="thanksRated" ? "تم التقييم ✓" : "تم استلام تقييمك مسبقًا");
  }

  if(saved){
    paintStars(saved);
    wrap.classList.add("is-done");
    stars.forEach(b => b.classList.add("is-done"));
  }

  stars.forEach(btn => {
    btn.addEventListener("click", () => {
      if(localStorage.getItem(KEY)) {
        showToast(getI18n("alreadyRated"));
        return;
      }
      const v = Number(btn.dataset.v);
      localStorage.setItem(KEY, String(v));
      paintStars(v);
      wrap.classList.add("is-done");
      stars.forEach(b => b.classList.add("is-done"));
      showToast(getI18n("thanksRated"));
    });
  });

})();
