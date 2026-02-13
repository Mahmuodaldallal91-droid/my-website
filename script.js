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

  // sync BOTH sets of buttons (top + sticky)
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


/* Mini sticky header: show when scrolling up, hide when scrolling down */
(function(){
  const mini = document.getElementById("miniHeader");
  if (!mini) return;

  let lastY = window.scrollY || 0;
  let ticking = false;

  function onScroll(){
    const y = window.scrollY || 0;
    const goingDown = y > lastY + 2;
    const goingUp = y < lastY - 2;

    // only after some scroll
    if (y < 80){
      mini.classList.remove("is-show");
      lastY = y;
      return;
    }

    if (goingDown) mini.classList.remove("is-show");
    if (goingUp) mini.classList.add("is-show");

    lastY = y;
  }

  window.addEventListener("scroll", ()=>{
    if (!ticking){
      window.requestAnimationFrame(()=>{
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});
})();
