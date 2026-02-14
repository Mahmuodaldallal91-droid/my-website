(() => {
  const images = [
    "assets/slider/s1.jpeg",
    "assets/slider/s2.jpeg",
    "assets/slider/s3.jpeg",
    "assets/slider/s4.jpeg",
    "assets/slider/s5.jpeg",
  ];

  const dict = {
    title: { ar: "مركز الارتقاء الطبي", en: "Medical Elevation Center", he: "מרכז העלייה הרפואי" },
    subtitle: { ar: "رعاية طبية حديثة بثقة وخصوصية.", en: "Modern care with trust & privacy.", he: "טיפול מודרני באמון ובפרטיות." },
    tapToZoom: { ar: "اضغط على الصورة للتكبير", en: "Tap the image to zoom", he: "הקש על התמונה להגדלה" },
  };

  const setLang = (lang) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "ar" || lang === "he") ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = dict[key] && dict[key][lang];
      if (val) el.textContent = val;
    });

    document.querySelectorAll(".langchip").forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  };

  document.querySelectorAll(".langchip").forEach(btn => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  setLang("ar");

  const track = document.getElementById("sliderTrack");
  const dots = document.getElementById("dots");
  const thumbs = document.getElementById("thumbs");

  let index = 0;
  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  const makeSlide = (src, i) => {
    const s = document.createElement("div");
    s.className = "slide";
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Slide ${i+1}`;
    img.loading = "eager";
    img.decoding = "async";
    img.addEventListener("click", () => openLightbox(i));
    s.appendChild(img);
    return s;
  };

  const makeDot = (i) => {
    const d = document.createElement("button");
    d.className = "dot";
    d.type = "button";
    d.addEventListener("click", () => goTo(i));
    return d;
  };

  const makeThumb = (src, i, cls="thumb") => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = cls;
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Thumb ${i+1}`;
    img.loading = "lazy";
    img.decoding = "async";
    b.appendChild(img);
    b.addEventListener("click", () => goTo(i));
    return b;
  };

  images.forEach((src, i) => {
    track.appendChild(makeSlide(src, i));
    dots.appendChild(makeDot(i));
    thumbs.appendChild(makeThumb(src, i, "thumb"));
  });

  const updateUI = () => {
    track.style.transform = `translateX(${-index * 100}%)`;
    [...dots.children].forEach((d, i) => d.classList.toggle("is-active", i === index));
    [...thumbs.children].forEach((t, i) => t.classList.toggle("is-active", i === index));
  };

  const goTo = (i) => {
    index = (i + images.length) % images.length;
    updateUI();
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  document.getElementById("nextBtn").addEventListener("click", next);
  document.getElementById("prevBtn").addEventListener("click", prev);

  const frame = document.getElementById("sliderFrame");

  const onDown = (e) => {
    isDragging = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    currentX = startX;
    track.style.transition = "none";
  };
  const onMove = (e) => {
    if (!isDragging) return;
    currentX = (e.touches ? e.touches[0].clientX : e.clientX);
    const dx = currentX - startX;
    const pct = (dx / frame.clientWidth) * 100;
    track.style.transform = `translateX(calc(${-index * 100}% + ${pct}%))`;
  };
  const onUp = () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = "";
    const dx = currentX - startX;
    const threshold = frame.clientWidth * 0.18;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    else updateUI();
  };

  frame.addEventListener("mousedown", onDown);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);

  frame.addEventListener("touchstart", onDown, { passive: true });
  frame.addEventListener("touchmove", onMove, { passive: true });
  frame.addEventListener("touchend", onUp);

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbThumbs = document.getElementById("lbThumbs");
  const lbZoom = document.querySelector(".lightbox__zoom");
  let lbIndex = 0;

  images.forEach((src, i) => {
    const t = document.createElement("button");
    t.type = "button";
    t.className = "lbthumb";
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Viewer thumb ${i+1}`;
    img.loading = "lazy";
    img.decoding = "async";
    t.appendChild(img);
    t.addEventListener("click", () => setLB(i));
    lbThumbs.appendChild(t);
  });

  const setLB = (i) => {
    lbIndex = (i + images.length) % images.length;
    lbImg.src = images[lbIndex];
    lbImg.alt = `Image ${lbIndex+1}`;
    [...lbThumbs.children].forEach((t, k) => t.classList.toggle("is-active", k === lbIndex));
    lbZoom.scrollTop = 0;
    lbZoom.scrollLeft = 0;
  };

  const openLightbox = (i) => {
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setLB(i);
  };

  const closeLightbox = () => {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbBackdrop").addEventListener("click", closeLightbox);

  updateUI();

  // Preload first slide
  const preload = new Image();
  preload.src = images[0];
})();
