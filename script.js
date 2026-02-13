const dict = {
  ar: {
    lang_ar: "عربي",
    lang_en: "English",
    lang_he: "עברית",
    title: "مركز الارتقاء الطبي",
    subtitle: "رعاية طبية حديثة بثقة وخصوصية"
  },
  en: {
    lang_ar: "Arabic",
    lang_en: "English",
    lang_he: "Hebrew",
    title: "Medical Elevation Center",
    subtitle: "Modern care with trust & privacy"
  },
  he: {
    lang_ar: "ערבית",
    lang_en: "אנגלית",
    lang_he: "עברית",
    title: "מרכז ההתרוממות הרפואי",
    subtitle: "רפואה מודרנית באמון ובפרטיות"
  }
};

function setLang(lang){
  const isRTL = (lang === "ar" || lang === "he");
  document.documentElement.lang = lang;
  document.documentElement.dir = isRTL ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    const val = dict?.[lang]?.[key];
    if (val) el.textContent = val;
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


/* Sticky header: update offset + auto-hide */
(function(){
  const top = document.getElementById("stickyTop");
  if(!top) return;

  const setOffset = ()=>{
    const h = top.offsetHeight || 0;
    document.documentElement.style.setProperty("--topbarH", h + "px");
  };

  let lastY = window.scrollY || 0;
  let ticking = false;

  const onScroll = ()=>{
    const y = window.scrollY || 0;

    // shadow when scrolled a bit
    top.classList.toggle("is-scrolled", y > 6);

    // hide on scroll down, show on scroll up
    const goingDown = y > lastY;
    if (y < 10){
      top.classList.remove("is-hidden");
    } else if (goingDown && y > 80){
      top.classList.add("is-hidden");
    } else if (!goingDown){
      top.classList.remove("is-hidden");
    }

    lastY = y;
  };

  const rafScroll = ()=>{
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(()=>{
      onScroll();
      ticking = false;
    });
  };

  window.addEventListener("scroll", rafScroll, {passive:true});
  window.addEventListener("resize", setOffset);
  setOffset();
  onScroll();
})();
