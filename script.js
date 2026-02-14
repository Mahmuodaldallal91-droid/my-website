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
    badgeCod: { ar: "الدفع عند الاستلام", en: "Cash on delivery", he: "תשלום במשלוח" },
    badgePrivacy: { ar: "خصوصية تامة", en: "Full privacy", he: "פרטיות מלאה" },
    badgeGuarantee: { ar: "ضمان واسترداد", en: "Guarantee & refund", he: "אחריות והחזר" },
    btnOrder: { ar: "اطلب الآن", en: "Order now", he: "הזמן עכשיו" },
    btnReviews: { ar: "آراء العملاء", en: "Customer reviews", he: "חוות דעת" },
    btnGuaranteeRefund: { ar: "الضمان والاسترداد", en: "Guarantee & refund", he: "אחריות והחזר" },
    btnUsage: { ar: "طريقة الاستخدام", en: "How to use", he: "אופן שימוש" },
    btnBenefits: { ar: "فوائد المنتج", en: "Benefits", he: "יתרונות" },
    btnSuitable: { ar: "لمن يناسب؟", en: "Who is it for?", he: "למי זה מתאים?" },

    // Generic placeholder
    placeholderDesc: { ar: "ضع وصف الزر هنا", en: "Put the button description here.", he: "הכנס כאן תיאור." },

    // Reviews sample + form
    review1Name: { ar: "أحمد منصور", en: "Ahmed Mansour", he: "אחמד מנסור" },
    review1Text: { ar: "تجربة ممتازة والنتيجة كانت واضحة.", en: "Great experience and the result was clear.", he: "חוויה מצוינת והתוצאה הייתה ברורה." },
    review2Name: { ar: "محمد عادل", en: "Mohamed Adel", he: "מוחמד עאדל" },
    review2Text: { ar: "التغليف ممتاز وخدمة العملاء سريعة.", en: "Excellent packaging and fast support.", he: "אריזה מצוינת ושירות מהיר." },
    review3Name: { ar: "سامر خليل", en: "Samer Khalil", he: "סאמר חליל" },
    review3Text: { ar: "جيد جدًا، احتجت أكثر من مرة حتى تظهر النتيجة.", en: "Very good — I needed more than one use to see it.", he: "טוב מאוד—הייתי צריך יותר מפעם אחת כדי לראות תוצאה." },

    phName: { ar: "الاسم", en: "Name", he: "שם" },
    phComment: { ar: "اكتب تعليقك...", en: "Write your comment...", he: "כתוב תגובה..." },
    btnSendComment: { ar: "إرسال", en: "Send", he: "שלח" },
    rateBeforeComment: { ar: "قيّم المنتج أولاً", en: "Rate the product first", he: "דרג את המוצר קודם" },
    reviewNeedRating: { ar: "يرجى اختيار عدد النجوم قبل إرسال التعليق.", en: "Please select a star rating before commenting.", he: "אנא בחר דירוג כוכבים לפני שליחת תגובה." },
    reviewSent: { ar: "تم إرسال تقييمك وتعليقك. شكرًا لك!", en: "Your rating and comment were submitted. Thank you!", he: "הדירוג והתגובה נשלחו. תודה!" },
    sendReview: { ar: "إرسال التعليق", en: "Send review", he: "שלח ביקורת" },
    commentThanks: { ar: "تم استلام تعليقك. شكرًا لك!", en: "Thanks! Your comment was received.", he: "תודה! התגובה התקבלה." },


    // Section titles & placeholders (opened by the buttons)
    secOrderTitle: { ar: "اطلب الآن", en: "Order now", he: "הזמן עכשיו" },
    secOrderText: { ar: "ضع وصف الزر هنا", en: "Put the button description here.", he: "הכנס כאן תיאור." },
    secReviewsTitle: { ar: "آراء العملاء", en: "Customer reviews", he: "חוות דעת" },
    secReviewsText: { ar: "هنا ستظهر آراء العملاء على المنتج (سنضيفها لاحقاً).", en: "Customer reviews will appear here (we’ll add them later).", he: "כאן יופיעו חוות דעת הלקוחות על המוצר (נוסיף בהמשך)." },
    secGuaranteeTitle: { ar: "الضمان والاسترداد", en: "Guarantee & refund", he: "אחריות והחזר" },
    secGuaranteeText: { ar: "ضع وصف الزر هنا", en: "Put the button description here.", he: "הכנס כאן תיאור." },
    secUsageTitle: { ar: "طريقة الاستخدام", en: "How to use", he: "אופן שימוש" },
    secUsageText: { ar: "ضع وصف الزر هنا", en: "Put the button description here.", he: "הכנס כאן תיאור." },
    secBenefitsTitle: { ar: "فوائد المنتج", en: "Benefits", he: "יתרונות המוצר" },
    secSuitableTitle: { ar: "لمن يناسب؟", en: "Who is it for?", he: "למי זה מתאים?" },
    secSuitableText: { ar: "ضع وصف الزر هنا", en: "Put the button description here.", he: "הכנס כאן תיאור." },
    secBenefitsText: { ar: "ضع وصف الزر هنا", en: "Put the button description here.", he: "הכנס כאן תיאור." },
    tapToZoom: { ar: "اضغط على الصورة للتكبير", en: "Tap the image to zoom", he: "הקש על התמונה להגדלה" },
rateThanksTitle: { ar: "تم التقييم", en: "Rated", he: "דירגת" },
rateThanksText: { ar: "شكرًا لك! تم استلام تقييمك.", en: "Thanks! Your rating was received.", he: "תודה! הדירוג התקבל." },
okBtn: { ar: "حسنًا", en: "OK", he: "אישור" },
thanksRated: { ar: "تم استلام تقييمك.", en: "Rating received.", he: "הדירוג התקבל." },
alreadyRated: { ar: "تم استلام تقييمك مسبقًا.", en: "You already rated.", he: "כבר דירגת." },

    badgeCod: { ar: "الدفع عند الاستلام", en: "Cash on delivery", he: "תשלום בעת המסירה" },
    badgePrivacy: { ar: "خصوصية تامة", en: "Total privacy", he: "פרטיות מלאה" },
    badgeGuaranteeRefund: { ar: "ضمان واسترداد", en: "Guarantee & refund", he: "אחריות והחזר" },

  };
  const setLang = (lang) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "ar" || lang === "he") ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = dict[key] && dict[key][lang];
      if (val) el.textContent = val;
    });

    
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      const val = dict[key] && dict[key][lang];
      if (val) el.setAttribute("placeholder", val);
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

  // Autoplay
  let autoplayTimer = null;
  const AUTOPLAY_MS = 4200;

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      // Don't autoplay while lightbox is open
      if (lb && lb.classList.contains("is-open")) return;
      next();
    }, AUTOPLAY_MS);
  };

  const restartAutoplaySoon = () => {
    stopAutoplay();
    // Give the user a moment after interaction
    setTimeout(startAutoplay, 2500);
  };

  const makeSlide = (src, i) => {
    const s = document.createElement("div");
    s.className = "slide is-loading";
    s.dataset.index = String(i);

    const img = document.createElement("img");
    img.alt = `Slide ${i + 1}`;
    img.decoding = "async";
    // load the first image eagerly; others can be lazy
    img.loading = i === 0 ? "eager" : "lazy";
    img.src = src;

    // When the image is ready, remove loading state (prevents "blank" slide feeling)
    const markReady = () => s.classList.remove("is-loading");
    img.addEventListener("load", markReady, { once: true });
    img.addEventListener("error", () => {
      s.classList.remove("is-loading");
      s.classList.add("is-error");
      // keep the slider functional even if one image fails
      console.warn("Failed to load slide image:", src);
    }, { once: true });

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
    const isRTL = document.documentElement.getAttribute("dir") === "rtl";
    // Always move the track in the correct direction (RTL/LTR)
    track.style.transform = `translateX(${(isRTL ? 1 : -1) * index * 100}%)`;

    [...dots.children].forEach((d, i) => d.classList.toggle("is-active", i === index));
    [...thumbs.children].forEach((t, i) => t.classList.toggle("is-active", i === index));

    // Ensure loading state is accurate for the current slide (prevents blank look)
    [...track.children].forEach((slideEl, i) => {
      const img = slideEl.querySelector("img");
      if (!img) return;
      slideEl.classList.toggle("is-loading", i === index && !img.complete);
    });
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
    stopAutoplay();
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

    restartAutoplaySoon();
  };

  frame.addEventListener("mousedown", onDown);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);

  frame.addEventListener("touchstart", onDown, { passive: true });
  frame.addEventListener("touchmove", onMove, { passive: true });
  frame.addEventListener("touchend", onUp);

  // Pause autoplay if user taps arrows/dots/thumbs, then restart
  ["nextBtn", "prevBtn"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", restartAutoplaySoon);
  });
  dots.addEventListener("click", restartAutoplaySoon);
  thumbs.addEventListener("click", restartAutoplaySoon);

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
    stopAutoplay();
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setLB(i);
  };

  const closeLightbox = () => {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    restartAutoplaySoon();
  };

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbBackdrop").addEventListener("click", closeLightbox);

  updateUI();

  // Start autoplay
  startAutoplay();

  // Preload first slide
  const preload = new Image();
  preload.src = images[0];
// ===== Rating Overlay (does not touch slider logic) =====
(() => {
  const wrap = document.getElementById("srRate");
  const modal = document.getElementById("srModal");
  const srText = document.getElementById("srText");
  if (!wrap || !modal) return;

  const stars = Array.from(wrap.querySelectorAll(".srStar"));
  const KEY = "rise_slider_rating_v1";
  const AVG = Number(wrap.dataset.avg || "4.5");

  const t = (key) => {
    const lang = document.documentElement.lang || "ar";
    return (dict[key] && dict[key][lang]) ? dict[key][lang] : (dict[key] && dict[key].ar) || "";
  };

  const paint = (v) => {
    stars.forEach((b) => {
      const n = Number(b.dataset.v);
      const pct = (n <= v) ? 100 : 0;
      b.style.setProperty('--p', pct + '%');
      b.classList.toggle('isHalf', false);
    });
  };

  const paintAvg = (avg) => {
    const full = Math.floor(avg);
    const frac = Math.max(0, avg - full);
    stars.forEach((b) => {
      const n = Number(b.dataset.v);
      let pct = 0;
      if (n <= full) pct = 100;
      else if (n === full + 1 && frac > 0) pct = Math.round(frac * 100); // 50 for half
      b.style.setProperty('--p', pct + '%');
      b.classList.toggle('isHalf', pct > 0 && pct < 100);
    });
  };

  const openModal = (messageKey) => {
    if (srText) srText.textContent = t(messageKey);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };

  const saved = Number(localStorage.getItem(KEY) || 0);
  if (saved) {
    paint(saved);
    wrap.classList.add("is-done");
  }
  else {
    paintAvg(AVG);
  }

  stars.forEach(btn => {
    btn.addEventListener("click", () => {
      const already = Number(localStorage.getItem(KEY) || 0);
      if (already) {
        openModal("alreadyRated");
        return;
      }
      const v = Number(btn.dataset.v);
      localStorage.setItem(KEY, String(v));
      paint(v);
      wrap.classList.add("is-done");
      openModal("thanksRated");
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target && e.target.hasAttribute("data-sr-close")) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
})();


  // Quick action buttons: open section panels with a smooth, modern feel
  const panels = Array.from(document.querySelectorAll(".sectionPanel"));
  const openPanel = (panelEl) => {
    if (!panelEl) return;
    panels.forEach((p) => p.classList.toggle("is-open", p === panelEl));
  };

  // Default: open Reviews section on first load
  const DEFAULT_SECTION = "#reviews";
  const defaultBtn = document.querySelector(`[data-scroll="${DEFAULT_SECTION}"]`);
  const defaultPanel = document.querySelector(DEFAULT_SECTION);
  if (defaultBtn && defaultPanel) {
    document.querySelectorAll("[data-scroll]").forEach((b) => b.classList.remove("is-active"));
    defaultBtn.classList.add("is-active");
    openPanel(defaultPanel);
  }


  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // keep navigation inside the page
      e.preventDefault();

      // active style
      document.querySelectorAll("[data-scroll]").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const sel = btn.getAttribute("data-scroll");
      if (!sel) return;

      const el = document.querySelector(sel);
      if (!el) return;

      // open the requested panel (and close others)
      openPanel(el);

      // scroll to it nicely (account for sticky header)
      const header = document.querySelector("header");
      const headerH = header ? header.getBoundingClientRect().height : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - headerH - 10;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });


  // Reviews: dummy add comment (client-side only)
  const reviewForm = document.getElementById("reviewForm");
  const rfName = document.getElementById("rfName");
  const rfComment = document.getElementById("rfComment");
  const rfMsg = document.getElementById("rfMsg");
  const reviewsList = document.getElementById("reviewsList");

  if (reviewForm && rfName && rfComment && reviewsList) {
    // --- Review rating + comment (must rate before comment) ---
  function escapeHTML(str){
    return String(str)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#39;");
  }

  let rfRating = 0;
  const rfStars = document.getElementById("rfStars");
  const rfStarBtns = rfStars ? Array.from(rfStars.querySelectorAll(".starBtn")) : [];
  const rfStarsSpinner = document.getElementById("rfStarsSpinner");
  const rfError = document.getElementById("rfError");
  const rfSuccess = document.getElementById("rfSuccess");
  const rfSubmit = document.getElementById("rfSubmit");

  function rfSetStars(val) {
    rfRating = val;
    rfStarBtns.forEach((b) => {
      const n = Number(b.getAttribute("data-star") || 0);
      b.classList.toggle("isOn", n <= val);
    });
  }

  function rfFlashSpinner(ms = 280) {
    if (!rfStarsSpinner) return;
    rfStarsSpinner.classList.add("show");
    setTimeout(() => rfStarsSpinner.classList.remove("show"), ms);
  }

  rfStarBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = Number(btn.getAttribute("data-star") || 0);
      rfFlashSpinner();
      setTimeout(() => {
        rfSetStars(val);
        if (rfError) rfError.hidden = true;
        if (rfSuccess) rfSuccess.hidden = true;
      }, 220);
    });
  });

  function makeStarsRow(ratingInt) {
    const r = Math.max(1, Math.min(5, ratingInt));
    let out = "";
    for (let i = 1; i <= 5; i++) {
      out += `<span class="rStar ${i <= r ? "filled" : "empty"}">★</span>`;
    }
    return out;
  }

  function makeAvatarInitial(name) {
    const t = (name || "").trim();
    if (!t) return "؟";
    // get first visible character
    const ch = t[0].toUpperCase();
    return ch;
  }

  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = (rfName.value || "").trim();
    const comment = (rfComment.value || "").trim();

    if (rfSuccess) rfSuccess.hidden = true;

    if (!rfRating) {
      if (rfError) rfError.hidden = false;
      reviewForm.classList.remove("shake");
      void reviewForm.offsetWidth;
      reviewForm.classList.add("shake");
      return;
    }

    if (!name || !comment) return;

    // loading
    if (rfSubmit) {
      rfSubmit.classList.add("isLoading");
      rfSubmit.disabled = true;
    }

    const ratingForCard = rfRating;

    setTimeout(() => {
      const avatar = makeAvatarInitial(name);

      const card = document.createElement("div");
      card.className = "reviewCard";
      card.innerHTML = `
        <div class="reviewTop">
          <div class="reviewIdentity">
            <div class="reviewAvatar" aria-hidden="true">${avatar}</div>
            <div class="reviewName">${escapeHTML(name)}</div>
          </div>
          <div class="reviewStars" aria-label="${ratingForCard} / 5">
            ${makeStarsRow(ratingForCard)}
          </div>
        </div>
        <div class="reviewText">${escapeHTML(comment)}</div>
      `;

      reviewsList.prepend(card);

      // reset form
      rfName.value = "";
      rfComment.value = "";
      rfSetStars(0);

      if (rfSuccess) rfSuccess.hidden = false;

      if (rfSubmit) {
        rfSubmit.classList.remove("isLoading");
        rfSubmit.disabled = false;
      }
    }, 650);
  });}


})();;
