const output = document.getElementById("output");

// قد يكون موجود/غير موجود حسب الأزرار
const btnFeatures = document.getElementById("btnFeatures");
const btnReviews  = document.getElementById("btnReviews");
const btnOrder    = document.getElementById("btnOrder");
const btnPrice    = document.getElementById("btnPrice");
const btnPrivacy  = document.getElementById("btnPrivacy");

// ✅ أزرار جديدة
const btnWarranty = document.getElementById("btnWarranty");
const btnRefund   = document.getElementById("btnRefund");

const orderForm = document.getElementById("orderForm");
const reviewsSection = document.getElementById("reviewsSection");
const aboutSection = document.getElementById("aboutSection");
const warrantyRefundSection = document.getElementById("warrantyRefundSection");
const privacySection = document.getElementById("privacySection");
const productInfoSection = document.getElementById("productInfoSection");
const infoBadgesWrap = document.getElementById("infoBadges");
const infoPanel = document.getElementById("infoPanel");
const infoPanelTitle = document.getElementById("infoPanelTitle");
const infoPanelText  = document.getElementById("infoPanelText");
const infoBadgeBtns = infoBadgesWrap ? Array.from(infoBadgesWrap.querySelectorAll(".infoBadge")) : [];

// ✅ معلومات المنتج: تفعيل شارات الفتح/الطي
let _activeInfoBadge = null;
function bindInfoBadges(){
  if(!infoBadgeBtns || !infoBadgeBtns.length) return;
  infoBadgeBtns.forEach(btn => {
    if(btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      // إذا ضغط نفس الشارة وهي مفتوحة: اطوِ اللوحة
      const isSame = (_activeInfoBadge === btn);
      const isOpen = infoPanel && infoPanel.classList.contains('open');
      if(isSame && isOpen){
        if(infoPanel) infoPanel.classList.remove('open');
        setActiveBadge(null);
        _activeInfoBadge = null;
        return;
      }
      _activeInfoBadge = btn;
      setActiveBadge(btn);
      renderInfoBadge(btn);
      openInfoPanel();
    });
  });
}



// الطلب
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const orderNotesInput = document.getElementById("orderNotes");
// ✅ جديد: الدولة + المدينة
const countrySelect = document.getElementById("country");
const cityInput = document.getElementById("city");
const qtyInput = document.getElementById("qty");
const priceHint = document.getElementById("priceHint");
const paySelect = document.getElementById("pay");
const submitOrder = document.getElementById("submitOrder");

// التعليقات
const reviewsList = document.getElementById("reviewsList");
const commentName = document.getElementById("commentName");
const replyText   = document.getElementById("replyText");
const sendReply   = document.getElementById("sendReply");
const policyDetails = document.getElementById("policyDetails");
const useLocationBtn = document.getElementById("useLocation");

// قسم الضمان والاسترداد
const refundName = document.getElementById("refundName");
const refundPhone = document.getElementById("refundPhone");
const refundReason = document.getElementById("refundReason");
const refundPhoto = document.getElementById("refundPhoto");
const submitRefund = document.getElementById("submitRefund");


// ✅ نجوم التقييم قبل التعليق
const miniStarsWrap = document.getElementById("miniStars");
const miniStarBtns  = miniStarsWrap ? Array.from(miniStarsWrap.querySelectorAll(".miniStar")) : [];


// ✅ رابط سياسة الضمان والاسترداد داخل نموذج الطلب (يعمل حتى لو القسم مخفي)
const policyAnchor = document.querySelector(".policyAnchor");
if(policyAnchor){
  policyAnchor.addEventListener("click", (e) => {
    e.preventDefault();

    // افتح قسم الضمان والاسترداد
    if(typeof showWarrantyRefund === "function"){
      showWarrantyRefund();
    }else{
      // fallback: أظهر العنصر إن وُجد
      const sec = document.getElementById("warrantyRefundSection");
      if(sec) sec.classList.remove("hidden");
    }

    // فعّل الزر إن وُجد
    if(btnRefund) setActive(btnRefund);

    // مرّر ناعماً للقسم بعد إظهاره
    requestAnimationFrame(() => {
      const sec = document.getElementById("warrantyRefundSection");
      if(sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// ===== Modal =====
const modal = document.getElementById("modal");
const modalOk = document.getElementById("modalOk");

// ✅ Loading (آخر إضافة: تأخير المودال)
const loading = document.getElementById("loading");

// ✅ تأثير active للأزرار (مثل أزرار التنقل)
function tapActive(btn){
  if(!btn) return;
  btn.classList.add("active");
  setTimeout(() => btn.classList.remove("active"), 450);
}

function showLoading(){
  if(!loading) return;
  loading.classList.remove("hidden");
  loading.setAttribute("aria-hidden","false");
  // ✅ سلاسة الظهور
  requestAnimationFrame(() => loading.classList.add("show"));
}
function hideLoading(){
  if(!loading) return;
  // ✅ سلاسة الإخفاء
  loading.classList.remove("show");
  setTimeout(() => {
    loading.classList.add("hidden");
    loading.setAttribute("aria-hidden","true");
  }, 250);
}
// ✅ لودينغ ثم مودال
function openModalWithDelay(title, text, delayMs = 2000){
  showLoading();
  setTimeout(() => {
    hideLoading();
    openModal(title, text);
  }, delayMs);
}

function openModal(title, text){
  modal.querySelector(".modalTitle").textContent = title;
  modal.querySelector(".modalText").innerHTML = text;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden","false");
  requestAnimationFrame(() => modal.classList.add("show"));
}

function closeModal(){
  modal.classList.remove("show");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden","true");
  }, 220);
}

// ✅ نفس الإغلاق لكن مع تأثير زر "حسناً"
modalOk.addEventListener("click", () => {
  tapActive(modalOk);
  closeModal();
});
modal.addEventListener("click", (e) => { if(e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});


// ===== Order Privacy Toggle (compact) =====
function syncOrderPrivacy(card){
  const more = card.querySelector(".orderPrivacyMore");
  const btn = card.querySelector(".orderPrivacyToggle");
  if(!more || !btn) return;
  if(card.classList.contains("open")){
    more.style.maxHeight = more.scrollHeight + "px";
    btn.setAttribute("aria-expanded","true");
    more.setAttribute("aria-hidden","false");
  }else{
    more.style.maxHeight = "0px";
    btn.setAttribute("aria-expanded","false");
    more.setAttribute("aria-hidden","true");
  }
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".orderPrivacyToggle");
  if(!btn) return;
  const card = btn.closest(".orderPrivacyCard");
  if(!card) return;
  card.classList.toggle("open");
  syncOrderPrivacy(card);
});

// ===== حفظ مكان السكرول حتى لا يطلع لفوق =====
function preserveScroll(fn){
  const y = window.scrollY;
  fn();
  requestAnimationFrame(() => window.scrollTo({ top: y }));
}

// ===== أنيميشن نص =====
function changeTextWithAnimation(text){
  output.classList.add("fade-out");
  setTimeout(() => {
    output.textContent = text;
    output.classList.remove("fade-out");
    output.classList.add("fade-in");
    setTimeout(() => output.classList.remove("fade-in"), 500);
  }, 220);
}

// ===== Active Button =====
const navButtons = document.querySelectorAll(".buttons button");
function setActive(btn){
  navButtons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// ===== إظهار/إخفاء أقسام =====
function hideAllSections(){
  if(orderForm) orderForm.classList.add("hidden");
  if(reviewsSection) reviewsSection.classList.add("hidden");
  if(aboutSection) aboutSection.classList.add("hidden");
  if(warrantyRefundSection) warrantyRefundSection.classList.add("hidden");
  if(privacySection) privacySection.classList.add("hidden");
  if(productInfoSection) productInfoSection.classList.add("hidden");
}


function showOrder(){
  hideAllSections();
  orderForm.classList.remove("hidden");
}

function showReviews(){
  hideAllSections();
  reviewsSection.classList.remove("hidden");
}


function showAbout(){
  hideAllSections();
  if(aboutSection) aboutSection.classList.remove("hidden");
}
function showWarrantyRefund(){
  hideAllSections();
  if(warrantyRefundSection) warrantyRefundSection.classList.remove("hidden");
}

function showProductInfo(){
  hideAllSections();
  if(productInfoSection) productInfoSection.classList.remove("hidden");
  bindInfoBadges();

  // افتح اللوحة افتراضياً على أول شارة
  if(infoBadgeBtns && infoBadgeBtns.length){
    const first = infoBadgeBtns[0];
    setActiveBadge(first);
    renderInfoBadge(first);
    openInfoPanel();
  }
}

function setActiveBadge(btn){
  if(!infoBadgeBtns) return;
  infoBadgeBtns.forEach(b => b.classList.remove("active"));
  if(btn) btn.classList.add("active");
}


function escapeHtml(str){
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// تحويل نصوص معلومات المنتج لقوائم مرتبة (بدون تغيير المحتوى)
function formatInfoTextToHTML(raw){
  const safe = escapeHtml(raw);

  // دعم **Bold**
  const withBold = safe.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  const lines = withBold
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map(l => l.trim());

  let html = "";
  let inOl = false;
  let inUl = false;

  const closeLists = () => {
    if(inOl){ html += "</ol>"; inOl = false; }
    if(inUl){ html += "</ul>"; inUl = false; }
  };

  for(const line of lines){
    if(!line){
      // سطر فارغ = فاصل
      closeLists();
      continue;
    }

    // عنصر مرقّم: 1. أو 1- أو 1 – أو 1 — 
    let m = line.match(/^(\d+)\s*([.\-–—])\s*(.+)$/);
    if(m){
      if(inUl){ html += "</ul>"; inUl = false; }
      if(!inOl){ html += "<ol>"; inOl = true; }
      html += `<li>${m[3]}</li>`;
      continue;
    }

    // عنصر نقطي يبدأ بـ -
    m = line.match(/^[-•]\s*(.+)$/);
    if(m){
      if(inOl){ html += "</ol>"; inOl = false; }
      if(!inUl){ html += "<ul>"; inUl = true; }
      html += `<li>${m[1]}</li>`;
      continue;
    }

    // سطر عادي
    closeLists();
    html += `<p>${line}</p>`;
  }

  closeLists();
  return html;
}

function renderInfoBadge(btn){
  if(!btn) return;
  const title = btn.getAttribute("data-title") || btn.textContent.trim();
  const text  = btn.getAttribute("data-text")  || "";
  if(infoPanelTitle) infoPanelTitle.textContent = title;
  if(infoPanelText)  infoPanelText.innerHTML  = formatInfoTextToHTML(text);
}

function openInfoPanel(){
  if(!infoPanel) return;
  infoPanel.classList.add("open");
}

function showPrivacy(){
  hideAllSections();
  if(privacySection) privacySection.classList.remove("hidden");
}



// ✅ زر "قدّم طلب استرداد" داخل القسم الحديث
const wrGoRefund = document.getElementById("wrGoRefund");
const refundFormCard = document.getElementById("refundFormCard");
if(wrGoRefund){
  wrGoRefund.addEventListener("click", () => {
    tapActive(wrGoRefund);
    // افتح القسم إن كان مخفيًا
    if(warrantyRefundSection) warrantyRefundSection.classList.remove("hidden");
    requestAnimationFrame(() => {
      const target = refundFormCard || document.getElementById("refundForm");
      if(target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}



// ===== السلايدر =====
const slides = document.getElementById("slides");
const dots = document.querySelectorAll(".dot");
const slideItems = slides ? Array.from(slides.children) : [];
let current = 0;
let autoTimer = null;
let isAnimating = false;

function setDots(){
  dots.forEach(d => d.classList.remove("active"));
  if(dots[current]) dots[current].classList.add("active");
}

function hideAllSlides(){
  slideItems.forEach(el => {
    el.classList.remove("is-active","from-left","from-right","to-left","to-right");
    el.style.display = "none";
    el.setAttribute("aria-hidden","true");
  });
}

function showInitial(){
  if(!slideItems.length) return;
  hideAllSlides();
  current = 0;
  const first = slideItems[0];
  first.style.display = "flex";
  first.classList.add("is-active");
  first.setAttribute("aria-hidden","false");
  setDots();
}

function goToSlide(i){
  const n = slideItems.length;
  if(!n) return;
  const nextIndex = ((i % n) + n) % n;
  if(nextIndex === current || isAnimating) return;

  isAnimating = true;

  const prevIndex = current;
  const prevEl = slideItems[prevIndex];
  const nextEl = slideItems[nextIndex];

  // نظّف الشرائح الأخرى (لا نلمس غير السلايدر)
  slideItems.forEach((el, idx) => {
    if(idx !== prevIndex && idx !== nextIndex){
      el.classList.remove("is-active","from-left","from-right","to-left","to-right");
      el.style.display = "none";
      el.setAttribute("aria-hidden","true");
    }
  });

  // تحديد الاتجاه (التالي/السابق) بشكل منطقي حتى مع القفز عبر النقاط
  const forwardSteps = (nextIndex - prevIndex + n) % n;
  const backwardSteps = (prevIndex - nextIndex + n) % n;
  const isForward = forwardSteps <= backwardSteps;

  const exitClass  = isForward ? "to-left"   : "to-right";
  const enterClass = isForward ? "from-right": "from-left";

  // جهّز العرض
  prevEl.style.display = "flex";
  nextEl.style.display = "flex";
  nextEl.classList.remove("to-left","to-right","from-left","from-right","is-active");
  prevEl.classList.remove("to-left","to-right");

  nextEl.classList.add(enterClass);
  // reflow لضمان تطبيق التحريك
  nextEl.getBoundingClientRect();

  nextEl.classList.add("is-active");
  nextEl.setAttribute("aria-hidden","false");

  prevEl.classList.add(exitClass);

  // حدّث النقاط فوراً
  current = nextIndex;
  setDots();

  // بعد انتهاء الانيميشن نخفي السابقة
  setTimeout(() => {
    prevEl.classList.remove("is-active","to-left","to-right");
    prevEl.style.display = "none";
    prevEl.setAttribute("aria-hidden","true");

    nextEl.classList.remove("from-left","from-right");
    isAnimating = false;
  }, 480);
}

function nextSlide(){
  if(!slideItems.length) return;
  goToSlide(current + 1);
}

function prevSlide(){
  if(!slideItems.length) return;
  goToSlide(current - 1);
}

function startAuto(){
  stopAuto();
  if(slideItems.length <= 1) return;
  autoTimer = setInterval(nextSlide, 4500);
}
function stopAuto(){
  if(autoTimer){
    clearInterval(autoTimer);
    autoTimer = null;
  }
}

dots.forEach((d, idx) => {
  d.addEventListener("click", () => {
    stopAuto();
    goToSlide(idx);
    startAuto();
  });
});

// الأسهم (إن وجدت)
const prevBtn = document.querySelector(".carousel .prev");
const nextBtn = document.querySelector(".carousel .next");
if(prevBtn) prevBtn.addEventListener("click", () => { stopAuto(); prevSlide(); startAuto(); });
if(nextBtn) nextBtn.addEventListener("click", () => { stopAuto(); nextSlide(); startAuto(); });

// تشغيل أولي
showInitial();
startAuto();


// ===== التقييم (متجر بلاي ستايل) =====
const starsWrap = document.getElementById("stars");
const starBtns = Array.from(document.querySelectorAll(".star"));
const ratingOverlay = document.getElementById("ratingOverlay");
const ratingValueEl = document.getElementById("ratingValue");

const RATED_KEY = "demo_rated_once";
const RATED_VALUE_KEY = "demo_rated_value";

// ✅ جديد: مصدر التقييم (top / mini)
const RATED_SOURCE_KEY = "demo_rated_source";

// ✅ تقييم وهمي ثابت يظهر دائمًا فوق الصورة
const FAKE_AVG_RATING = 4.5;
if(ratingValueEl) ratingValueEl.textContent = FAKE_AVG_RATING.toFixed(1);

// ✅ جديد: إظهار/إخفاء miniStars حسب مصدر التقييم
function updateMiniStarsVisibility(){
  if(!miniStarsWrap) return;

  const ratedOnce = localStorage.getItem(RATED_KEY) === "1";
  const source = localStorage.getItem(RATED_SOURCE_KEY); // "top" أو "mini"

  // نخفي تقييم قبل التعليق فقط إذا التقييم تم من الأعلى
  const shouldHide = ratedOnce && source === "top";

  // نخفي أقرب بلوك أو نفس العنصر
  const block = miniStarsWrap.closest(".rateBeforeComment") || miniStarsWrap;
  block.style.display = shouldHide ? "none" : "";
}

// عرض تقييم المستخدم إذا سبق قيّم
let savedRating = Number(localStorage.getItem(RATED_VALUE_KEY) || "0");
let locked = localStorage.getItem(RATED_KEY) === "1";

/* ✅ تعديل: دعم نصف نجمة + preview */
function paintStars(n, mode="on"){
  const full = Math.floor(n);
  const hasHalf = (n - full) >= 0.5;

  starBtns.forEach(btn => {
    const s = Number(btn.dataset.star);
    btn.classList.remove("on","preview","half");

    // أثناء preview نخليه نجوم كاملة فقط
    if(mode === "preview"){
      if(s <= n) btn.classList.add("preview");
      return;
    }

    // العادي (on / half)
    if(s <= full){
      btn.classList.add("on");
    }else if(hasHalf && s === full + 1){
      btn.classList.add("half");
    }
  });
}

// ✅ رسم نجوم miniStars
function paintMiniStars(n, mode="on"){
  if(!miniStarBtns.length) return;
  miniStarBtns.forEach(btn => {
    const s = Number(btn.dataset.star);
    btn.classList.remove("on","preview");
    if(s <= n){
      btn.classList.add(mode === "preview" ? "preview" : "on");
    }
  });
}

function lockStars(){
  locked = true;
  localStorage.setItem(RATED_KEY, "1");
  starBtns.forEach(b => b.disabled = true);
  if(miniStarBtns.length) miniStarBtns.forEach(b => b.disabled = true);
  starsWrap.classList.add("locked");
}

function unlockStars(){
  locked = false;
  localStorage.removeItem(RATED_KEY);
  starBtns.forEach(b => b.disabled = false);
  if(miniStarBtns.length) miniStarBtns.forEach(b => b.disabled = false);
}

function applyRatingUI(val){
  // ✅ ملاحظة: لا نغيّر الرقم فوق الصورة أبداً (يبقى 4.5)
  paintStars(val, "on");
  paintMiniStars(val, "on");
}

/* ✅ جديد: إذا ما في تقييم مستخدم → اعرض 4.5 نجمة افتراضيًا */
if(savedRating > 0){
  applyRatingUI(savedRating);
}else{
  paintStars(FAKE_AVG_RATING, "on");
}
if(locked){
  lockStars();
}
updateMiniStarsVisibility();
  updatePriceHint();

// ===== نجوم التقييم أعلى الصورة =====
starBtns.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    if(locked) return;
    paintStars(Number(btn.dataset.star), "preview");
  });

  btn.addEventListener("mouseleave", () => {
    if(locked) return;
    if(savedRating > 0) paintStars(savedRating, "on");
    else paintStars(FAKE_AVG_RATING, "on"); // ✅ يرجع لـ 4.5 بدل ما يصير 0
  });

  btn.addEventListener("click", () => {
    if(locked) return;

    const chosen = Number(btn.dataset.star);
    savedRating = chosen;
    localStorage.setItem(RATED_VALUE_KEY, String(chosen));

    // ✅ جديد: هذا التقييم جاء من الأعلى
    localStorage.setItem(RATED_SOURCE_KEY, "top");

    // حركة: اختفاء بطيء ثم ظهور بطيء
    starsWrap.classList.remove("fadeIn");
    starsWrap.classList.add("fadeOut");
    setTimeout(() => {
      applyRatingUI(chosen);
      starsWrap.classList.remove("fadeOut");
      starsWrap.classList.add("fadeIn");
      setTimeout(() => starsWrap.classList.remove("fadeIn"), 420);
    }, 320);

    // ✅ مودال شكر (بتأخير ثانيتين)
    openModalWithDelay("⭐ شكراً لتقييمك", `تم تسجيل تقييمك بنجاح.<br>تقييمك: <b>${chosen}</b> نجوم`, 2000);

    lockStars();

    // ✅ جديد: حدّث إخفاء miniStars
    updateMiniStarsVisibility();
  });
});

// ===== ✅ نجوم "قم بالتقييم قبل التعليق" (miniStars) =====
if(miniStarBtns.length){
  miniStarBtns.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      if(locked) return;
      paintMiniStars(Number(btn.dataset.star), "preview");
    });

    btn.addEventListener("mouseleave", () => {
      if(locked) return;
      if(savedRating > 0) paintMiniStars(savedRating, "on");
      else paintMiniStars(0, "on");
    });

    btn.addEventListener("click", () => {
      if(locked) return;

      const chosen = Number(btn.dataset.star);
      savedRating = chosen;
      localStorage.setItem(RATED_VALUE_KEY, String(chosen));

      // ✅ جديد: هذا التقييم جاء من miniStars
      localStorage.setItem(RATED_SOURCE_KEY, "mini");

      // حركة اختفاء/ظهور للـ miniStars + نجوم الأعلى
      starsWrap.classList.remove("fadeIn");
      starsWrap.classList.add("fadeOut");
      setTimeout(() => {
        applyRatingUI(chosen);
        starsWrap.classList.remove("fadeOut");
        starsWrap.classList.add("fadeIn");
        setTimeout(() => starsWrap.classList.remove("fadeIn"), 420);
      }, 320);

      // ✅ مودال شكر (بتأخير ثانيتين)
      openModalWithDelay("⭐ شكراً لتقييمك", `تم تسجيل تقييمك بنجاح.<br>تقييمك: <b>${chosen}</b> نجوم`, 2000);

      lockStars();

      // ✅ جديد: حدّث إخفاء miniStars (لن يُخفى لأنه source=mini)
      updateMiniStarsVisibility();
    });
  });
}

// ===== آراء تجريبية للاختبار فقط (Demo) =====
const demoReviews = [{"name": "مازن الدوسري", "stars": 4, "time": "الآن", "text": "مفعوله كويس وسريع، بس أتمنى لو السعر يكون أقل شوي."}, {"name": "كريم الدالي", "stars": 4, "time": "الآن", "text": "التحسن موجود وواضح، لكن يحتاج التزام وعدم استعجال."}, {"name": "مؤيد نجم", "stars": 2, "time": "الآن", "text": "ما عندي مشكلة بالمنتج، المشكلة كلها بالتوصيل: تأخير بدون سبب واضح."}, {"name": "ناصر الزعبي", "stars": 4, "time": "الآن", "text": "مفعوله سريع ومرضي، بس السعر غالي شوي. مع الخصم ممكن يكون مناسب."}, {"name": "خالد عادل", "stars": 5, "time": "الآن", "text": "أهم شيء بالنسبة لي كان الإحساس بالتحكم، وهذا اللي لاحظته. تجربة ممتازة."}, {"name": "حسام ناصر", "stars": 5, "time": "الآن", "text": "لاحظت فرق واضح في القوة والثبات مع الاستمرار. التجربة كانت مريحة ومرضية."}, {"name": "أنس الدالي", "stars": 5, "time": "الآن", "text": "مفعوله سريع ومريح. صراحة تجربة إيجابية جدًا."}, {"name": "سامر خليل", "stars": 4, "time": "الآن", "text": "المنتج ممتاز وفرق معي، لكن أتمنى لو يكون فيه شرح أكثر داخل العلبة. غير كذا كل شيء تمام والنتيجة مرضية."}, {"name": "سامر عادل", "stars": 4, "time": "الآن", "text": "التحسن جيد جدًا، بس احتجت وقت بسيط عشان يبان الفرق بشكل كامل."}, {"name": "وليد حمدان", "stars": 1, "time": "الآن", "text": "للأسف ما حصلت على النتيجة اللي توقعتها. رجعوا المبلغ ناقص التوصيل، وما أظن أعيد الطلب."}, {"name": "נמרוד ס.", "stars": 5, "time": "الآن", "text": "הגיע ארוז יפה ובזמן. התוצאה הייתה טובה מהציפיות."}, {"name": "محمد عادل", "stars": 5, "time": "الآن", "text": "جودة المنتج ممتازة جدًا، والشي اللي عجبني إنه ما يحتاج وقت طويل عشان تحس بالفرق. خدمة العملاء ردّوا علي بسرعة لما سألت عن طريقة الاستخدام."}, {"name": "فهد المطيري", "stars": 5, "time": "الآن", "text": "ما كنت مقتنع بموضوع ‘نتيجة سريعة’، لكن طلع الكلام صحيح."}, {"name": "ناصر عبد الله", "stars": 4, "time": "الآن", "text": "المنتج ممتاز، لكن كنت أتمنى يكون السعر أقل شوي. ومع ذلك الجودة تستاهل والنتيجة مرضية جدًا."}, {"name": "فواز إبراهيم", "stars": 4, "time": "الآن", "text": "ممتاز من ناحية الإحساس بالثبات، فقط تمنيت لو التعليمات داخل العلبة تكون أوضح شوي."}, {"name": "فادي إبراهيم", "stars": 5, "time": "الآن", "text": "تجربة ممتازة، وميزة المنتج إنه ما يحتاج تعقيد… التزام بسيط ونتيجة محترمة."}, {"name": "حسام شريف", "stars": 3, "time": "الآن", "text": "المنتج جيد ويؤدي الغرض، لكن السعر أعلى من المتوقع."}, {"name": "بهاء يوسف", "stars": 3, "time": "الآن", "text": "النتيجة مرضية، لكن السعر غالي مقارنة بمنتجات ثانية."}, {"name": "خالد ناصر", "stars": 5, "time": "الآن", "text": "وصلني خلال يومين والتغليف كان نظيف ومحكم. استخدمته مرتين ولاحظت فرق واضح من أول مرة، وبصراحة راح أعيد الطلب."}, {"name": "عادل الزهراني", "stars": 1, "time": "الآن", "text": "تجربة توصيل سيئة للغاية. لو ما تحسنت ما راح أكرر الطلب."}, {"name": "مؤيد عيسى", "stars": 3, "time": "الآن", "text": "بصراحة توقعت أكثر، لكنه ما يزال جيد. يمكن تجربتي تختلف عن غيري."}, {"name": "زياد منصور", "stars": 5, "time": "الآن", "text": "فرق سريع وملحوظ. تجربة ممتازة وبأمان."}, {"name": "كريم الدالي", "stars": 5, "time": "الآن", "text": "الفرق واضح، وأكثر شيء عجبني إنه التحسن كان طبيعي وتدريجي."}, {"name": "إياد خليل", "stars": 4, "time": "الآن", "text": "مفعوله جيد جدًا، بس كنت أتمنى يكون فيه حجم أكبر."}, {"name": "عبد الرحمن شريف", "stars": 5, "time": "الآن", "text": "صراحة المنتج فاجأني. أول استخدام حسّيت بفرق واضح، وموضوع الضمان والوضوح في التعامل خلاني مطمئن."}, {"name": "ناصر داود", "stars": 2, "time": "الآن", "text": "تجربة التوصيل كانت عشوائية. أتمنى تحسين الخدمة بأسرع وقت."}, {"name": "إيهاب خليل", "stars": 2, "time": "الآن", "text": "وصلني بعد انتظار طويل جدًا. أتمنى تحسين شركة الشحن/التوصيل."}, {"name": "سامي الدروبي", "stars": 3, "time": "الآن", "text": "خدمة العملاء محترمة وردّوا بسرعة، المنتج مقبول لكن ما كانت النتيجة بنفس السرعة اللي توقعتها."}, {"name": "نادر السعدي", "stars": 1, "time": "الآن", "text": "التوصيل سيء جدًا، وتواصلهم ضعيف. حسّيت إني ألاحق الطلب."}, {"name": "رائد سليمان", "stars": 5, "time": "الآن", "text": "أنا جرّبت أشياء كثير قبل وما كنت مقتنع، هذا الوحيد اللي حسّيت معاه براحة ونتيجة واضحة. أهم شيء الالتزام بالطريقة."}, {"name": "نادر إبراهيم", "stars": 2, "time": "الآن", "text": "ما شفت فرق يذكر. الاسترداد خطوة إيجابية، لكن خصم التوصيل يقلل الثقة."}, {"name": "إياد حمدان", "stars": 4, "time": "الآن", "text": "فعّال، بس يحتاجون يوفرون خيارات سعرية أكثر أو باقات."}, {"name": "كريم شهاب", "stars": 4, "time": "الآن", "text": "النتيجة كويسة، بس كنت أتمنى يكون فيه شرح داخل العلبة أو كود يودّي لفيديو توضيحي."}, {"name": "طلال منصور", "stars": 1, "time": "الآن", "text": "التوصيل مرهق… لا مواعيد واضحة ولا التزام. تجربة سيئة."}, {"name": "كريم صبحي", "stars": 4, "time": "الآن", "text": "النتيجة ممتازة بشكل عام، بس أتمنى يكون فيه إرشادات مختصرة أكثر."}, {"name": "سامي الدروبي", "stars": 3, "time": "الآن", "text": "خدمة العملاء محترمة وردّوا بسرعة، المنتج مقبول لكن ما كانت النتيجة بنفس السرعة اللي توقعتها."}, {"name": "جهاد مصطفى", "stars": 4, "time": "الآن", "text": "تجربة عامة إيجابية، لكن تمنيت لو فيه حجم أكبر أو خيار اقتصادي."}, {"name": "مازن خليل", "stars": 4, "time": "الآن", "text": "المنتج جيد جدًا، بس النتيجة ما كانت فورية عندي—احتجت وقت بسيط واستمرارية."}, {"name": "جهاد مصطفى", "stars": 4, "time": "الآن", "text": "تجربة عامة إيجابية، لكن تمنيت لو فيه حجم أكبر أو خيار اقتصادي."}, {"name": "كريم الزهراني", "stars": 4, "time": "الآن", "text": "التجربة جيدة جدًا، والمكان مريح. أتمنى بس يكون وقت الانتظار أقل."}, {"name": "إياد حمدان", "stars": 4, "time": "الآن", "text": "فعّال، بس يحتاجون يوفرون خيارات سعرية أكثر أو باقات."}, {"name": "فادي إبراهيم", "stars": 5, "time": "الآن", "text": "شي مرتب من كل النواحي: طلب، توصيل، تغليف، ونتيجة. أهم نقطة عندي إنه فعلاً يعطي فرق خلال وقت قصير."}, {"name": "سامي منصور", "stars": 4, "time": "الآن", "text": "المنتج فعّال عندي، لكن السعر عالي. لو ينزل شوي راح يكون ممتاز."}, {"name": "محمد العتيبي", "stars": 5, "time": "الآن", "text": "مفعول ممتاز ونتيجة واضحة. راح أعيد الطلب."}, {"name": "איתן ר.", "stars": 5, "time": "الآن", "text": "תוצאה מהירה ומוצר נוח לשימוש. ממליץ."}, {"name": "طارق الزعبي", "stars": 5, "time": "الآن", "text": "خدمة عملاء صادقة وواضحة، ما في مبالغة ولا وعود غير واقعية."}, {"name": "حسام إبراهيم", "stars": 5, "time": "الآن", "text": "تجربة ممتازة مع الدعم. تواصل محترم وحلول مباشرة."}, {"name": "عمر الزعبي", "stars": 2, "time": "الآن", "text": "ما أقدر أقول إنه أعطاني نتيجة. الاسترداد موجود وهذا شيء يحسب لهم، لكن خصم التوصيل مزعج."}, {"name": "عبد الرحمن شريف", "stars": 5, "time": "الآن", "text": "كنت متردد بالبداية، لكن بعد التجربة اقتنعت. النتيجة مرضية."}, {"name": "يوسف حمدان", "stars": 4, "time": "الآن", "text": "يعطي نتيجة جيدة جدًا، بس احتجت أكثر من مرة عشان تثبت معي."}, {"name": "يوسف الشمري", "stars": 5, "time": "الآن", "text": "مفعوله سريع جدًا، حسّيت براحة وتحسن من أول مرة."}, {"name": "عمر العبدالله", "stars": 5, "time": "الآن", "text": "تأثيره سريع جدًا مقارنة بأشياء ثانية جربتها."}, {"name": "خالد الزهراني", "stars": 3, "time": "الآن", "text": "استخدمته أكثر من مرة، حسّيت بتحسن بسيط. يمكن لو استمريت أكثر تكون النتيجة أفضل."}, {"name": "عمر العبدالله", "stars": 5, "time": "الآن", "text": "تأثيره سريع جدًا مقارنة بأشياء ثانية جربتها."}, {"name": "محمد ناصر", "stars": 5, "time": "الآن", "text": "فرق معي بشكل واضح من ناحية التحكم. مع الوقت حسّيت بثقة أكبر وراحة."}, {"name": "אמיר כ.", "stars": 5, "time": "الآن", "text": "קל לשימוש והתוצאה מורגשת. ממליץ בחום."}, {"name": "طارق الدوسري", "stars": 4, "time": "الآن", "text": "لاحظت تأثير سريع، لكن يبان أكثر مع تكرار الاستخدام."}, {"name": "مؤيد منصور", "stars": 2, "time": "الآن", "text": "للأسف ما كان فعال معي. دعمهم سريع، بس موضوع خصم التوصيل مزعج."}, {"name": "طارق يوسف", "stars": 1, "time": "الآن", "text": "جربته بالطريقة المذكورة وما شفت أي فائدة. رجعوا المبلغ ناقص رسوم الشحن."}, {"name": "كريم الزهراني", "stars": 4, "time": "الآن", "text": "التجربة جيدة جدًا، والمكان مريح. أتمنى بس يكون وقت الانتظار أقل."}, {"name": "بهاء يوسف", "stars": 5, "time": "الآن", "text": "النتيجة ممتازة بالنسبة لي. استخدامه سهل ومفعوله واضح."}, {"name": "بهاء يوسف", "stars": 3, "time": "الآن", "text": "النتيجة مرضية، لكن السعر غالي مقارنة بمنتجات ثانية."}, {"name": "رامي الديري", "stars": 1, "time": "الآن", "text": "ولا مرة جاني تحديث صحيح عن الشحنة. وصلت فجأة بعد تأخير طويل."}, {"name": "عبد الرحمن خليل", "stars": 4, "time": "الآن", "text": "التحسن واضح، بس السعر مرتفع. لو فيه عروض للشراء المتكرر بيكون ممتاز."}, {"name": "رائد سليمان", "stars": 5, "time": "الآن", "text": "أنا جرّبت أشياء كثير قبل وما كنت مقتنع، هذا الوحيد اللي حسّيت معاه براحة ونتيجة واضحة. أهم شيء الالتزام بالطريقة."}, {"name": "ناصر الغامدي", "stars": 5, "time": "الآن", "text": "النتيجة كانت فورية تقريبًا، وهذا أكثر شيء خلاني راضي."}, {"name": "كريم منصور", "stars": 5, "time": "الآن", "text": "المنتج أعطاني إحساس بالتحسن من أول استخدام، ممتاز."}, {"name": "דוד כ.", "stars": 5, "time": "الآن", "text": "איכות גבוהה ותוצאה ברורה. מרוצה מאוד מהקנייה."}, {"name": "أحمد العبدالله", "stars": 5, "time": "الآن", "text": "مفعوله واضح من أول كم استخدام. حسّيت بفرق حقيقي وارتحت."}, {"name": "حسن أبو علي", "stars": 2, "time": "الآن", "text": "المنتج ممتاز لكن التوصيل خرب التجربة. تأخير وإرباك كثير."}, {"name": "مازن السبيعي", "stars": 4, "time": "الآن", "text": "مفعوله سريع ومرضي جدًا، بس أتمنى لو يكون فيه شرح مختصر أكثر."}, {"name": "رائد منصور", "stars": 5, "time": "الآن", "text": "منتج محترم وساعدني كثير. غير لي الموضوع من توتر إلى ثقة."}, {"name": "محمد الحربي", "stars": 5, "time": "الآن", "text": "من أول استخدام لاحظت نتيجة واضحة. تجربة ممتازة."}, {"name": "سامر ناصر", "stars": 5, "time": "الآن", "text": "تواصلت معهم قبل الطلب وكان الرد محترم وواضح. حسّيت بثقة من أول تعامل."}, {"name": "שחר מ.", "stars": 5, "time": "الآن", "text": "איכות מעולה והתוצאה הופיעה מהר. חוויה חיובית."}, {"name": "גיל א.", "stars": 4, "time": "الآن", "text": "מוצר טוב מאוד, אבל הייתי רוצה אפשרות לגודל/כמות גדולה יותר."}, {"name": "יוסי מ.", "stars": 5, "time": "الآن", "text": "מוצר מצוין. הרגשתי שינוי די מהר והשימוש פשוט."}, {"name": "سامر شهاب", "stars": 2, "time": "الآن", "text": "ما أعطاني نتيجة، يمكن ما يناسبني. الاسترداد تم لكن خصموا التوصيل."}, {"name": "حسام الدالي", "stars": 5, "time": "الآن", "text": "تجربتي ممتازة. أكثر شيء عجبني إن المنتج يعطي نتيجة سريعة وما حسّيت بأي إزعاج. والتوصيل كان سريع."}, {"name": "سامر شهاب", "stars": 2, "time": "الآن", "text": "ما أعطاني نتيجة، يمكن ما يناسبني. الاسترداد تم لكن خصموا التوصيل."}, {"name": "طارق عز الدين", "stars": 4, "time": "الآن", "text": "التجربة إيجابية جدًا. النتيجة واضحة والخدمة ممتازة، فقط تأخر التوصيل يوم واحد عندي لكن وصل بالنهاية تمام."}, {"name": "حسام الدالي", "stars": 5, "time": "الآن", "text": "تجربتي ممتازة. أكثر شيء عجبني إن المنتج يعطي نتيجة سريعة وما حسّيت بأي إزعاج. والتوصيل كان سريع."}, {"name": "مازن السالمي", "stars": 4, "time": "الآن", "text": "المنتج جيد وعملي، بس كنت أتمنى لو يجي معه ملحق/أداة تساعد على الاستخدام."}, {"name": "حسن أبو علي", "stars": 2, "time": "الآن", "text": "المنتج ممتاز لكن التوصيل خرب التجربة. تأخير وإرباك كثير."}, {"name": "אבי ש.", "stars": 4, "time": "الآن", "text": "עובד טוב, אבל לקח לי כמה פעמים עד שהבנתי את השגרה הכי טובה."}, {"name": "طارق عز الدين", "stars": 4, "time": "الآن", "text": "التجربة إيجابية جدًا. النتيجة واضحة والخدمة ممتازة، فقط تأخر التوصيل يوم واحد عندي لكن وصل بالنهاية تمام."}, {"name": "فادي منصور", "stars": 5, "time": "الآن", "text": "شرحوا لي طريقة الاستخدام خطوة بخطوة، وتأكدوا إني فاهم قبل ما أقفل."}, {"name": "رائد القحطاني", "stars": 5, "time": "الآن", "text": "أسرع منتج جربته من ناحية النتيجة. فعلاً فرق معي فورًا."}, {"name": "بهاء يوسف", "stars": 5, "time": "الآن", "text": "استخدمته حسب التعليمات وكانت النتيجة ممتازة. حسّيت براحة من أول مرة، وهذا الشي اللي كنت أدور عليه."}, {"name": "إياد صبحي", "stars": 4, "time": "الآن", "text": "ممتاز من ناحية الجودة، بس أتمنى لو يكون السعر أقل شوي أو عروض للشراء المتكرر."}, {"name": "فواز حمدان", "stars": 4, "time": "الآن", "text": "النتيجة ممتازة بشكل عام، بس أتمنى لو الإرشادات تكون أوضح داخل العبوة."}, {"name": "عمر الحداد", "stars": 5, "time": "الآن", "text": "مفعول قوي ومرضي. أهم شيء تتبع التعليمات."}, {"name": "حسام فوزي", "stars": 4, "time": "الآن", "text": "تحسن واضح، لكن لازم التزام بالطريقة وعدم استعجال النتيجة."}, {"name": "أحمد منصور", "stars": 5, "time": "الآن", "text": "طلبته وأنا متردد، لكن بصراحة طلع أفضل مما توقعت. استخدمته بالضبط حسب التعليمات وكانت النتيجة واضحة بسرعة. التغليف مرتب ووصلني بدون أي مشكلة."}, {"name": "إياد خليل", "stars": 4, "time": "الآن", "text": "مفعوله جيد جدًا، بس كنت أتمنى يكون فيه حجم أكبر."}, {"name": "حسام الخالدي", "stars": 5, "time": "الآن", "text": "فرق معي بسرعة وبشكل واضح. تجربة مريحة."}, {"name": "وليد حمدان", "stars": 5, "time": "الآن", "text": "مفعول سريع ونتيجة مرضية جدًا من البداية."}, {"name": "ياسر أبو عمر", "stars": 4, "time": "الآن", "text": "النتيجة كانت جيدة جدًا، بس أنا احتجت أكثر من استخدام عشان توضح معي بالكامل. بشكل عام منتج محترم ويستاهل."}, {"name": "יוסי מ.", "stars": 5, "time": "الآن", "text": "מוצר מצוין. הרגשתי שינוי די מהר והשימוש פשוט."}, {"name": "خالد شهاب", "stars": 3, "time": "الآن", "text": "يعطي نتيجة، بس القيمة مقابل السعر ما هي الأفضل بالنسبة لي."}, {"name": "يزن عبد الله", "stars": 3, "time": "الآن", "text": "كويس، لكن احتجت وقت أطول عشان أحس بالفرق. ما أقدر أقول ممتاز ولا سيء."}, {"name": "خالد شهاب", "stars": 3, "time": "الآن", "text": "يعطي نتيجة، بس القيمة مقابل السعر ما هي الأفضل بالنسبة لي."}, {"name": "سامي الحربي", "stars": 1, "time": "الآن", "text": "التوصيل سيّئ جدًا. تأخر كثير ووصلني بدون أي تحديثات واضحة."}, {"name": "خالد عادل", "stars": 5, "time": "الآن", "text": "الطاقم محترم جدًا، والتعامل احترافي. هذا أهم شيء عندي."}, {"name": "محمد الحربي", "stars": 5, "time": "الآن", "text": "من أول استخدام لاحظت نتيجة واضحة. تجربة ممتازة."}, {"name": "فادي حمدان", "stars": 1, "time": "الآن", "text": "توقعت نتيجة واضحة مثل اللي مكتوب، لكن ما حصل. استرجعت فلوسي بالنهاية، بس خصموا قيمة الشحن."}, {"name": "رائد منصور", "stars": 5, "time": "الآن", "text": "فرق معي بشكل ملحوظ، خصوصًا لما استخدمته بانتظام."}, {"name": "زياد منصور", "stars": 5, "time": "الآن", "text": "مفعول واضح وتجربة ممتازة من ناحية النتيجة."}, {"name": "كريم الديري", "stars": 3, "time": "الآن", "text": "النتيجة جيدة وموجودة، بس كنت أتمنى يكون السعر أقل أو يكون فيه عروض."}, {"name": "نادر إبراهيم", "stars": 4, "time": "الآن", "text": "التحسن كان سريع، لكن أحب دايمًا أعطيه وقت مع الاستمرار."}, {"name": "نادر السعدي", "stars": 1, "time": "الآن", "text": "التوصيل سيء جدًا، وتواصلهم ضعيف. حسّيت إني ألاحق الطلب."}, {"name": "نادر إبراهيم", "stars": 4, "time": "الآن", "text": "يعطي نتيجة ممتازة بشكل عام، بس تختلف حسب الاستخدام."}, {"name": "حسام الدالي", "stars": 5, "time": "الآن", "text": "فرق معي بشكل واضح، والأهم أنه خلاني أرجع أحس براحة وثقة أكبر."}, {"name": "نادر إبراهيم", "stars": 4, "time": "الآن", "text": "التحسن كان سريع، لكن أحب دايمًا أعطيه وقت مع الاستمرار."}, {"name": "حسام إبراهيم", "stars": 5, "time": "الآن", "text": "تجربة ممتازة مع الدعم. تواصل محترم وحلول مباشرة."}, {"name": "خالد منصور", "stars": 5, "time": "الآن", "text": "صار عندي إحساس أقوى بالثقة والاستقرار. منتج محترم ويستاهل."}, {"name": "محمود السعدي", "stars": 4, "time": "الآن", "text": "ممتاز جدًا ونتيجته واضحة، بس أتمنى لو يكون فيه خيار حجم أكبر. غير كذا كل شيء ممتاز."}, {"name": "طارق العتيبي", "stars": 4, "time": "الآن", "text": "تجربة جيدة والنتيجة واضحة، بس أتمنى يكون فيه باقات أو حجم أكبر بسعر أفضل."}, {"name": "أحمد فواز", "stars": 2, "time": "الآن", "text": "المنتج ما عليه كلام، لكن التوصيل كان كارثي. انتظرت أكثر من اللازم."}, {"name": "رامي الديري", "stars": 1, "time": "الآن", "text": "ولا مرة جاني تحديث صحيح عن الشحنة. وصلت فجأة بعد تأخير طويل."}, {"name": "ناصر عبد الله", "stars": 4, "time": "الآن", "text": "المنتج ممتاز، لكن كنت أتمنى يكون السعر أقل شوي. ومع ذلك الجودة تستاهل والنتيجة مرضية جدًا."}, {"name": "يوسف ناصر", "stars": 5, "time": "الآن", "text": "لاحظت تحسّن واضح في الثبات والثقة بعد الاستخدام المنتظم. التجربة كانت إيجابية جدًا."}, {"name": "كريم صبحي", "stars": 4, "time": "الآن", "text": "النتيجة ممتازة بشكل عام، بس أتمنى يكون فيه إرشادات مختصرة أكثر."}, {"name": "إياد صبحي", "stars": 4, "time": "الآن", "text": "ممتاز من ناحية الجودة، بس أتمنى لو يكون السعر أقل شوي أو عروض للشراء المتكرر."}, {"name": "رائد منصور", "stars": 5, "time": "الآن", "text": "منتج محترم وساعدني كثير. غير لي الموضوع من توتر إلى ثقة."}, {"name": "רועי ח.", "stars": 5, "time": "الآن", "text": "תוצאה יציבה אצלי עם שימוש עקבי. שווה."}, {"name": "أحمد السالمي", "stars": 5, "time": "الآن", "text": "صراحة حسّيت بالفرق بسرعة، ما توقعت يكون التأثير بهذه السرعة."}, {"name": "תומר ב.", "stars": 4, "time": "الآن", "text": "תוצאה טובה, אבל המחיר קצת גבוה. עדיין מרוצה."}, {"name": "أحمد حمدان", "stars": 5, "time": "الآن", "text": "خدمة العملاء ممتازة جدًا. ردّوا بسرعة وشرحوا لي كل شيء بدون تعقيد."}, {"name": "ناصر الديري", "stars": 2, "time": "الآن", "text": "بصراحة ما حسيت بفرق. الاسترداد تم بسرعة، لكن رجع المبلغ ناقص التوصيل."}, {"name": "محمود شهاب", "stars": 2, "time": "الآن", "text": "المنتج ما كان فعال معي نهائيًا. خدمة العملاء تجاوبوا، بس سياسة الاسترداد خصم التوصيل ما عجبتني."}, {"name": "سامر خليل", "stars": 4, "time": "الآن", "text": "المنتج ممتاز وفرق معي، لكن أتمنى لو يكون فيه شرح أكثر داخل العلبة. غير كذا كل شيء تمام والنتيجة مرضية."}, {"name": "باسل خليل", "stars": 4, "time": "الآن", "text": "التغليف ممتاز والتوصيل سريع، المنتج نفسه جيد لكن السعر شوي مرتفع مقارنة بالكمية."}, {"name": "سامر عادل", "stars": 4, "time": "الآن", "text": "التحسن جيد جدًا، بس احتجت وقت بسيط عشان يبان الفرق بشكل كامل."}, {"name": "عبد الرحمن حمدان", "stars": 5, "time": "الآن", "text": "بصراحة ارتحت نفسيًا بعد ما شفت تحسن. فرق معي في الثقة أكثر من أي شيء."}, {"name": "رائد يوسف", "stars": 5, "time": "الآن", "text": "من ناحية الصلابة والثبات لاحظت تحسن واضح، خصوصًا مع الالتزام بالطريقة."}, {"name": "كريم شادي", "stars": 1, "time": "الآن", "text": "انتظرت كثير، وبالأخير وصلت متأخرة جدًا. سيئين في الالتزام."}, {"name": "ياسر حمدي", "stars": 5, "time": "الآن", "text": "منتج ممتاز، فرق معي بسرعة وخلاني مرتاح."}, {"name": "سامي الدوسري", "stars": 4, "time": "الآن", "text": "الخدمة ممتازة، بس كان فيه انتظار بسيط. غير كذا الأمور تمام."}, {"name": "طارق يوسف", "stars": 5, "time": "الآن", "text": "كنت متردد، لكن التجربة طلعت إيجابية. تحكم أفضل مع مرور الوقت."}, {"name": "أحمد خليل", "stars": 5, "time": "الآن", "text": "المركز مرتب ونظيف، والاستقبال متعاون جدًا. تجربة مريحة."}, {"name": "ياسر العتيبي", "stars": 1, "time": "الآن", "text": "بدون مبالغة: التوصيل متعب جدًا. تأخير وتأجيل وما في التزام."}, {"name": "عبد الرحمن منصور", "stars": 5, "time": "الآن", "text": "كنت متردد بالبداية، لكن التجربة طلعت أفضل مما توقعت. نتيجة ممتازة مع الاستمرار."}, {"name": "مازن شهاب", "stars": 4, "time": "الآن", "text": "فعّال، بس مو فوري 100% عندي. بعد كم مرة صار الفرق أوضح."}, {"name": "سامر ناصر", "stars": 5, "time": "الآن", "text": "تواصلت معهم قبل الطلب وكان الرد محترم وواضح. حسّيت بثقة من أول تعامل."}, {"name": "سامي الدوسري", "stars": 4, "time": "الآن", "text": "الخدمة ممتازة، بس كان فيه انتظار بسيط. غير كذا الأمور تمام."}, {"name": "אמיר כ.", "stars": 5, "time": "الآن", "text": "קל לשימוש והתוצאה מורגשת. ממליץ בחום."}, {"name": "أحمد شهاب", "stars": 5, "time": "الآن", "text": "أفضل شيء بالنسبة لي هو الإحساس بالثبات. النتيجة كانت تدريجية لكنها واضحة."}, {"name": "سامر حمدان", "stars": 4, "time": "الآن", "text": "النتيجة جيدة جدًا، بس احتجت كم مرة عشان يبدأ يبان الفرق بشكل واضح."}, {"name": "سامر خليل", "stars": 4, "time": "الآن", "text": "النتيجة جيدة جدًا، بس احتجت كذا مرة عشان أوصل للفرق اللي أبغاه."}, {"name": "محمد عادل", "stars": 5, "time": "الآن", "text": "جودة المنتج ممتازة جدًا، والشي اللي عجبني إنه ما يحتاج وقت طويل عشان تحس بالفرق. خدمة العملاء ردّوا علي بسرعة لما سألت عن طريقة الاستخدام."}, {"name": "عبد الرحمن يوسف", "stars": 5, "time": "الآن", "text": "شرحوا لي التفاصيل بشكل واضح، وما حسّيت بأي إحراج. احترام عالي."}, {"name": "باسل خليل", "stars": 4, "time": "الآن", "text": "التغليف ممتاز والتوصيل سريع، المنتج نفسه جيد لكن السعر شوي مرتفع مقارنة بالكمية."}, {"name": "ناصر عادل", "stars": 5, "time": "الآن", "text": "جودة ممتازة ونتيجة مرضية. لاحظت تحسّن في الثبات مع الاستخدام."}, {"name": "خالد شريف", "stars": 4, "time": "الآن", "text": "الدعم سريع ومتعاون، بس كنت أتمنى يكون فيه رد آلي يوضح الأسئلة الشائعة."}, {"name": "أحمد شريف", "stars": 5, "time": "الآن", "text": "كنت أعاني من مشكلة تزعجني، وبعد الاستخدام المنتظم صار فيه تحسن ملحوظ."}, {"name": "شادي الزعبي", "stars": 5, "time": "الآن", "text": "واضح من أول استخدام إنه منتج قوي ونتيجته سريعة."}, {"name": "حسام نصر", "stars": 3, "time": "الآن", "text": "مش سيء، بس معايا النتيجة كانت أبطأ من اللي توقعتها. ممكن يختلف من شخص لشخص."}, {"name": "تامر مصطفى", "stars": 1, "time": "الآن", "text": "طلبت بوقت محدد ووصل بعده بأيام. أسوأ جزء بالتجربة كان التوصيل."}, {"name": "جهاد مصطفى", "stars": 4, "time": "الآن", "text": "تجربة عامة إيجابية، لكن تمنيت لو فيه حجم أكبر أو خيار اقتصادي."}, {"name": "ياسر العتيبي", "stars": 1, "time": "الآن", "text": "استخدمته أكثر من مرة وما فاد. رجعوا المبلغ ناقص التوصيل."}, {"name": "أحمد فواز", "stars": 2, "time": "الآن", "text": "المنتج ما عليه كلام، لكن التوصيل كان كارثي. انتظرت أكثر من اللازم."}, {"name": "رائد القحطاني", "stars": 5, "time": "الآن", "text": "أسرع منتج جربته من ناحية النتيجة. فعلاً فرق معي فورًا."}, {"name": "طارق إبراهيم", "stars": 5, "time": "الآن", "text": "كنت متردد بالبداية، لكن بعد كم استخدام صار فيه تحسن ملحوظ وواضح."}, {"name": "نادر إبراهيم", "stars": 2, "time": "الآن", "text": "ما شفت فرق يذكر. الاسترداد خطوة إيجابية، لكن خصم التوصيل يقلل الثقة."}, {"name": "ناصر الغامدي", "stars": 5, "time": "الآن", "text": "النتيجة كانت فورية تقريبًا، وهذا أكثر شيء خلاني راضي."}, {"name": "طارق منصور", "stars": 5, "time": "الآن", "text": "راحة نفسية وتعامل ممتاز. واضح أنهم يهمهم رضا العميل."}, {"name": "אלעד ר.", "stars": 5, "time": "الآن", "text": "שיפור מורגש עם הזמן. מאוד מרוצה."}, {"name": "بهاء يوسف", "stars": 5, "time": "الآن", "text": "النتيجة ممتازة بالنسبة لي. استخدامه سهل ومفعوله واضح."}, {"name": "מיכאל ל.", "stars": 5, "time": "الآن", "text": "ממש הופתעתי לטובה. מרגיש איכותי והתוצאה מורגשת."}, {"name": "איתן ר.", "stars": 5, "time": "الآن", "text": "תוצאה מהירה ומוצר נוח לשימוש. ממליץ."}, {"name": "גיל א.", "stars": 4, "time": "الآن", "text": "מוצר טוב מאוד, אבל הייתי רוצה אפשרות לגודל/כמות גדולה יותר."}, {"name": "رائد سليمان", "stars": 5, "time": "الآن", "text": "أنا جرّبت أشياء كثير قبل وما كنت مقتنع، هذا الوحيد اللي حسّيت معاه براحة ونتيجة واضحة. أهم شيء الالتزام بالطريقة."}, {"name": "محمود السعدي", "stars": 4, "time": "الآن", "text": "ممتاز جدًا ونتيجته واضحة، بس أتمنى لو يكون فيه خيار حجم أكبر. غير كذا كل شيء ممتاز."}, {"name": "حسام فوزي", "stars": 4, "time": "الآن", "text": "تحسن واضح، لكن لازم التزام بالطريقة وعدم استعجال النتيجة."}, {"name": "خالد منصور", "stars": 5, "time": "الآن", "text": "صار عندي إحساس أقوى بالثقة والاستقرار. منتج محترم ويستاهل."}, {"name": "فواز حمدان", "stars": 4, "time": "الآن", "text": "النتيجة ممتازة بشكل عام، بس أتمنى لو الإرشادات تكون أوضح داخل العبوة."}, {"name": "حسن أبو علي", "stars": 2, "time": "الآن", "text": "المنتج ممتاز لكن التوصيل خرب التجربة. تأخير وإرباك كثير."}, {"name": "عمر الحداد", "stars": 5, "time": "الآن", "text": "مفعول قوي ومرضي. أهم شيء تتبع التعليمات."}, {"name": "كريم شادي", "stars": 1, "time": "الآن", "text": "انتظرت كثير، وبالأخير وصلت متأخرة جدًا. سيئين في الالتزام."}, {"name": "محمد ناصر", "stars": 5, "time": "الآن", "text": "فرق معي بشكل واضح من ناحية التحكم. مع الوقت حسّيت بثقة أكبر وراحة."}, {"name": "حسام الدالي", "stars": 5, "time": "الآن", "text": "تجربة إيجابية جدًا. حسّيت بفرق سريع وراحة."}, {"name": "ياسر أبو عمر", "stars": 4, "time": "الآن", "text": "النتيجة كانت جيدة جدًا، بس أنا احتجت أكثر من استخدام عشان توضح معي بالكامل. بشكل عام منتج محترم ويستاهل."}, {"name": "ياسر أبو عمر", "stars": 4, "time": "الآن", "text": "جيد جدًا، بس أتمنى لو التعليمات تكون أوضح أكثر. النتيجة بالمجمل ممتازة."}, {"name": "حسام الدالي", "stars": 5, "time": "الآن", "text": "تجربتي ممتازة. أكثر شيء عجبني إن المنتج يعطي نتيجة سريعة وما حسّيت بأي إزعاج. والتوصيل كان سريع."}, {"name": "طارق يوسف", "stars": 5, "time": "الآن", "text": "تحسّن ملحوظ عندي من ناحية القوة والثقة. أنصح فيه للي يعاني من التذبذب."}, {"name": "محمود شريف", "stars": 5, "time": "الآن", "text": "كنت مستعجل أشوف فرق، والحمد لله لاحظته بسرعة."}, {"name": "سامر حمدان", "stars": 4, "time": "الآن", "text": "النتيجة جيدة جدًا، بس احتجت كم مرة عشان يبدأ يبان الفرق بشكل واضح."}, {"name": "كريم منصور", "stars": 5, "time": "الآن", "text": "المنتج أعطاني إحساس بالتحسن من أول استخدام، ممتاز."}, {"name": "נמרוד ס.", "stars": 5, "time": "الآن", "text": "הגיע ארוז יפה ובזמן. התוצאה הייתה טובה מהציפיות."}, {"name": "أحمد حمدان", "stars": 5, "time": "الآن", "text": "خدمة العملاء ممتازة جدًا. ردّوا بسرعة وشرحوا لي كل شيء بدون تعقيد."}, {"name": "ناصر الزعبي", "stars": 5, "time": "الآن", "text": "جودة ممتازة ونتيجة قوية. حسّيت بثبات أعلى وثقة أكبر."}, {"name": "رائد شريف", "stars": 5, "time": "الآن", "text": "أول مرة أحس بنتيجة بهالسرعة. ممتاز."}, {"name": "زياد ناصر", "stars": 1, "time": "الآن", "text": "أكثر شيء أزعجني هو التوصيل: تأخير وتحديثات غير دقيقة."}, {"name": "عبد الرحمن عادل", "stars": 1, "time": "الآن", "text": "اشتريته بسبب التقييمات، لكن ما فادني. الاسترداد تم بس ناقص حق الشحن."}, {"name": "ياسر العتيبي", "stars": 1, "time": "الآن", "text": "بدون مبالغة: التوصيل متعب جدًا. تأخير وتأجيل وما في التزام."}, {"name": "إيهاب خليل", "stars": 2, "time": "الآن", "text": "وصلني بعد انتظار طويل جدًا. أتمنى تحسين شركة الشحن/التوصيل."}, {"name": "يوسف ناصر", "stars": 5, "time": "الآن", "text": "لاحظت تحسّن واضح في الثبات والثقة بعد الاستخدام المنتظم. التجربة كانت إيجابية جدًا."}, {"name": "דניאל פ.", "stars": 4, "time": "الآن", "text": "בסך הכול טוב מאוד. הייתי שמח להוראות קצת יותר ברורות."}, {"name": "ناصر عبد الله", "stars": 4, "time": "الآن", "text": "المنتج ممتاز، لكن كنت أتمنى يكون السعر أقل شوي. ومع ذلك الجودة تستاهل والنتيجة مرضية جدًا."}, {"name": "فادي إبراهيم", "stars": 5, "time": "الآن", "text": "تجربة ممتازة، وميزة المنتج إنه ما يحتاج تعقيد… التزام بسيط ونتيجة محترمة."}, {"name": "بشار حسن", "stars": 1, "time": "الآن", "text": "التوصيل جدًا سيء، ما في تنسيق ولا اتصال، ووصل بعد أيام."}, {"name": "محمد العتيبي", "stars": 5, "time": "الآن", "text": "مفعول ممتاز ونتيجة واضحة. راح أعيد الطلب."}, {"name": "بهاء عوض", "stars": 4, "time": "الآن", "text": "تحسن ممتاز في الثبات، فقط السعر كان مرتفع شوي بالنسبة لي."}, {"name": "رامي أبو زيد", "stars": 3, "time": "الآن", "text": "يؤدي الغرض، بس لاحظت إن النتيجة مو ثابتة كل مرة. يحتاج التزام بالطريقة."}, {"name": "ناصر الزعبي", "stars": 5, "time": "الآن", "text": "جودة ممتازة ونتيجة قوية. حسّيت بثبات أعلى وثقة أكبر."}, {"name": "زياد منصور", "stars": 5, "time": "الآن", "text": "فرق سريع وملحوظ. تجربة ممتازة وبأمان."}, {"name": "رامي أبو زيد", "stars": 3, "time": "الآن", "text": "يؤدي الغرض، بس لاحظت إن النتيجة مو ثابتة كل مرة. يحتاج التزام بالطريقة."}, {"name": "طارق عز الدين", "stars": 4, "time": "الآن", "text": "التجربة إيجابية جدًا. النتيجة واضحة والخدمة ممتازة، فقط تأخر التوصيل يوم واحد عندي لكن وصل بالنهاية تمام."}, {"name": "خالد أبو زيد", "stars": 1, "time": "الآن", "text": "للأسف ما اشتغل معي. تواصلت على الاسترداد ورجعوا المبلغ، بس خصموا حق التوصيل وهذا خفّض رضاي."}, {"name": "رائد أبو زيد", "stars": 3, "time": "الآن", "text": "حسّيت بفرق، لكن السعر خلاني أتردد أعيد الشراء."}, {"name": "حسام الدالي", "stars": 5, "time": "الآن", "text": "تجربة إيجابية جدًا. حسّيت بفرق سريع وراحة."}, {"name": "يزن عبد الله", "stars": 3, "time": "الآن", "text": "كويس، لكن احتجت وقت أطول عشان أحس بالفرق. ما أقدر أقول ممتاز ولا سيء."}, {"name": "خالد العتيبي", "stars": 5, "time": "الآن", "text": "الشي اللي عجبني إنه يعطي إحساس فوري بالفرق، بدون انتظار طويل."}, {"name": "طارق إبراهيم", "stars": 5, "time": "الآن", "text": "كنت متردد بالبداية، لكن بعد كم استخدام صار فيه تحسن ملحوظ وواضح."}, {"name": "رائد منصور", "stars": 5, "time": "الآن", "text": "فرق معي بشكل ملحوظ، خصوصًا لما استخدمته بانتظام."}, {"name": "تامر مصطفى", "stars": 1, "time": "الآن", "text": "طلبت بوقت محدد ووصل بعده بأيام. أسوأ جزء بالتجربة كان التوصيل."}, {"name": "محمود كنعان", "stars": 1, "time": "الآن", "text": "تجربة التوصيل سيئة للغاية. لا تتبع، ولا تواصل، وتأخير كبير."}, {"name": "سامي الدروبي", "stars": 3, "time": "الآن", "text": "خدمة العملاء محترمة وردّوا بسرعة، المنتج مقبول لكن ما كانت النتيجة بنفس السرعة اللي توقعتها."}, {"name": "طلال العبدلي", "stars": 3, "time": "الآن", "text": "مقبول، لكن يحتاج توضيح أكثر لمن يناسبه وكيف أفضل طريقة استخدام."}, {"name": "علي الزعبي", "stars": 5, "time": "الآن", "text": "منتج قوي وعملي. ما فيه تعقيد بالاستخدام، والفرق واضح. أنصح فيه خصوصًا للي متردد."}, {"name": "حسام فوزي", "stars": 4, "time": "الآن", "text": "تحسن واضح، لكن لازم التزام بالطريقة وعدم استعجال النتيجة."}, {"name": "خالد العتيبي", "stars": 5, "time": "الآن", "text": "الشي اللي عجبني إنه يعطي إحساس فوري بالفرق، بدون انتظار طويل."}, {"name": "سامي منصور", "stars": 4, "time": "الآن", "text": "المنتج فعّال عندي، لكن السعر عالي. لو ينزل شوي راح يكون ممتاز."}, {"name": "فارس يوسف", "stars": 5, "time": "الآن", "text": "من أول مرة حسّيت إن فيه فرق حقيقي. يستاهل."}, {"name": "طارق يوسف", "stars": 5, "time": "الآن", "text": "تحسّن ملحوظ عندي من ناحية القوة والثقة. أنصح فيه للي يعاني من التذبذب."}, {"name": "خالد الزهراني", "stars": 3, "time": "الآن", "text": "استخدمته أكثر من مرة، حسّيت بتحسن بسيط. يمكن لو استمريت أكثر تكون النتيجة أفضل."}, {"name": "وليد حمدان", "stars": 5, "time": "الآن", "text": "مفعول سريع ونتيجة مرضية جدًا من البداية."}, {"name": "أحمد العبدالله", "stars": 5, "time": "الآن", "text": "مفعوله واضح من أول كم استخدام. حسّيت بفرق حقيقي وارتحت."}, {"name": "فادي شرف", "stars": 2, "time": "الآن", "text": "التوصيل تأخر بشكل غير منطقي. لو يتحسن كان التقييم أعلى."}, {"name": "أحمد زيدان", "stars": 5, "time": "الآن", "text": "فرق معي من ناحية الصلابة والاستمرارية. أهم شيء الالتزام بالطريقة."}, {"name": "אלעד ר.", "stars": 5, "time": "الآن", "text": "שיפור מורגש עם הזמן. מאוד מרוצה."}, {"name": "محمود السعدي", "stars": 4, "time": "الآن", "text": "ممتاز جدًا ونتيجته واضحة، بس أتمنى لو يكون فيه خيار حجم أكبر. غير كذا كل شيء ممتاز."}, {"name": "سامر خليل", "stars": 4, "time": "الآن", "text": "المنتج ممتاز وفرق معي، لكن أتمنى لو يكون فيه شرح أكثر داخل العلبة. غير كذا كل شيء تمام والنتيجة مرضية."}, {"name": "سامر منصور", "stars": 5, "time": "الآن", "text": "نتيجة سريعة جدًا وبدون تعقيد. أعجبني."}, {"name": "مازن الدوسري", "stars": 4, "time": "الآن", "text": "مفعوله كويس وسريع، بس أتمنى لو السعر يكون أقل شوي."}, {"name": "طارق الدوسري", "stars": 4, "time": "الآن", "text": "لاحظت تأثير سريع، لكن يبان أكثر مع تكرار الاستخدام."}, {"name": "نادر السعدي", "stars": 1, "time": "الآن", "text": "التوصيل سيء جدًا، وتواصلهم ضعيف. حسّيت إني ألاحق الطلب."}, {"name": "سامر خليل", "stars": 5, "time": "الآن", "text": "النتيجة كانت أفضل من اللي توقعتها. أهم شيء الالتزام بالطريقة."}, {"name": "خالد ناصف", "stars": 2, "time": "الآن", "text": "التوصيل أخذ وقت طويل جدًا، وكل يوم يقولون بكرة. مزعج."}, {"name": "יונתן ד.", "stars": 4, "time": "الآن", "text": "מוצר טוב, לא תמיד אותו אפקט בכל פעם, אבל ברוב הפעמים כן."}, {"name": "ناصر داود", "stars": 2, "time": "الآن", "text": "تجربة التوصيل كانت عشوائية. أتمنى تحسين الخدمة بأسرع وقت."}, {"name": "أحمد رشيد", "stars": 5, "time": "الآن", "text": "الشي اللي يميّزه إنه ما يحتاج وقت طويل، النتيجة تبان بسرعة."}, {"name": "ברק ד.", "stars": 5, "time": "الآن", "text": "ממש מרוצה. התוצאה ברורה והשירות היה מהיר."}, {"name": "وائل عوض", "stars": 1, "time": "الآن", "text": "تأخروا بشكل مبالغ فيه. لازم يكون فيه احترام لوقت العميل."}, {"name": "שחר מ.", "stars": 5, "time": "الآن", "text": "איכות מעולה והתוצאה הופיעה מהר. חוויה חיובית."}, {"name": "سامر حمدان", "stars": 4, "time": "الآن", "text": "النتيجة جيدة جدًا، بس احتجت كم مرة عشان يبدأ يبان الفرق بشكل واضح."}, {"name": "خالد شريف", "stars": 5, "time": "الآن", "text": "صراحة ارتحت نفسيًا بعد ما شفت تحسّن. صار الموضوع أهدى وثقتي أعلى."}, {"name": "رائد حمدي", "stars": 5, "time": "الآن", "text": "المركز يهتم بالتفاصيل ويعطيك إحساس بالثقة. تجربة إيجابية."}, {"name": "خالد عادل", "stars": 5, "time": "الآن", "text": "الطاقم محترم جدًا، والتعامل احترافي. هذا أهم شيء عندي."}, {"name": "باسل خليل", "stars": 4, "time": "الآن", "text": "التغليف ممتاز والتوصيل سريع، المنتج نفسه جيد لكن السعر شوي مرتفع مقارنة بالكمية."}, {"name": "عبد الرحمن شريف", "stars": 5, "time": "الآن", "text": "صراحة المنتج فاجأني. أول استخدام حسّيت بفرق واضح، وموضوع الضمان والوضوح في التعامل خلاني مطمئن."}, {"name": "ناصر عادل", "stars": 5, "time": "الآن", "text": "جودة ممتازة ونتيجة مرضية. لاحظت تحسّن في الثبات مع الاستخدام."}, {"name": "فواز حمدان", "stars": 4, "time": "الآن", "text": "النتيجة ممتازة بشكل عام، بس أتمنى لو الإرشادات تكون أوضح داخل العبوة."}, {"name": "رامي الديري", "stars": 1, "time": "الآن", "text": "ولا مرة جاني تحديث صحيح عن الشحنة. وصلت فجأة بعد تأخير طويل."}, {"name": "هشام عادل", "stars": 4, "time": "الآن", "text": "تأثيره سريع، بس كنت أتمنى يكون فيه عروض أكثر."}, {"name": "سامي الزهراني", "stars": 4, "time": "الآن", "text": "النتيجة كانت سريعة عندي، بس أفضل شي الاستمرار عشان تثبت أكثر."}, {"name": "إياد صبحي", "stars": 4, "time": "الآن", "text": "ممتاز من ناحية الجودة، بس أتمنى لو يكون السعر أقل شوي أو عروض للشراء المتكرر."}, {"name": "حسام شريف", "stars": 2, "time": "الآن", "text": "للأسف التجربة ما كانت مثل المتوقع. دعم العملاء محترم، لكن الاسترداد يكون بعد خصم التوصيل."}, {"name": "ياسر أبو عمر", "stars": 4, "time": "الآن", "text": "جيد جدًا، بس أتمنى لو التعليمات تكون أوضح أكثر. النتيجة بالمجمل ممتازة."}, {"name": "خالد ناصر", "stars": 5, "time": "الآن", "text": "مفعول سريع وواضح، والتجربة بشكل عام ممتازة."}, {"name": "طارق يوسف", "stars": 5, "time": "الآن", "text": "من أكثر الأشياء اللي عجبتني إن المفعول واضح بدون تعقيد."}, {"name": "تامر مصطفى", "stars": 1, "time": "الآن", "text": "طلبت بوقت محدد ووصل بعده بأيام. أسوأ جزء بالتجربة كان التوصيل."}, {"name": "أحمد زيدان", "stars": 5, "time": "الآن", "text": "فرق معي من ناحية الصلابة والاستمرارية. أهم شيء الالتزام بالطريقة."}, {"name": "سامي الحربي", "stars": 1, "time": "الآن", "text": "التوصيل سيّئ جدًا. تأخر كثير ووصلني بدون أي تحديثات واضحة."}, {"name": "אורן ג.", "stars": 5, "time": "الآن", "text": "שירות מעולה והמוצר עושה את העבודה. מרוצה."}, {"name": "بشار حسن", "stars": 1, "time": "الآن", "text": "التوصيل جدًا سيء، ما في تنسيق ولا اتصال، ووصل بعد أيام."}, {"name": "رائد حمدي", "stars": 5, "time": "الآن", "text": "المركز يهتم بالتفاصيل ويعطيك إحساس بالثقة. تجربة إيجابية."}, {"name": "عبد الرحمن شريف", "stars": 5, "time": "الآن", "text": "كنت متردد بالبداية، لكن بعد التجربة اقتنعت. النتيجة مرضية."}, {"name": "فادي إبراهيم", "stars": 5, "time": "الآن", "text": "شي مرتب من كل النواحي: طلب، توصيل، تغليف، ونتيجة. أهم نقطة عندي إنه فعلاً يعطي فرق خلال وقت قصير."}, {"name": "ناصر الزعبي", "stars": 4, "time": "الآن", "text": "مفعوله كويس جدًا، بس أتمنى يكون فيه شرح مختصر أكثر داخل العلبة."}, {"name": "رائد أبو زيد", "stars": 5, "time": "الآن", "text": "صار عندي استفسار بعد الشراء وردّوا خلال دقائق. تعامل راقي جدًا."}, {"name": "محمود شهاب", "stars": 2, "time": "الآن", "text": "المنتج ما كان فعال معي نهائيًا. خدمة العملاء تجاوبوا، بس سياسة الاسترداد خصم التوصيل ما عجبتني."}, {"name": "ناصر الزعبي", "stars": 4, "time": "الآن", "text": "مفعوله سريع ومرضي، بس السعر غالي شوي. مع الخصم ممكن يكون مناسب."}, {"name": "أحمد زيدان", "stars": 5, "time": "الآن", "text": "فرق معي من ناحية الصلابة والاستمرارية. أهم شيء الالتزام بالطريقة."}, {"name": "ناصر حمدان", "stars": 4, "time": "الآن", "text": "النتيجة مرضية بنسبة كبيرة، بس صار عندي تأخير يوم بالتوصيل. غير كذا الأمور تمام."}, {"name": "طارق يوسف", "stars": 5, "time": "الآن", "text": "كنت متردد، لكن التجربة طلعت إيجابية. تحكم أفضل مع مرور الوقت."}, {"name": "حسام نصر", "stars": 3, "time": "الآن", "text": "مش سيء، بس معايا النتيجة كانت أبطأ من اللي توقعتها. ممكن يختلف من شخص لشخص."}, {"name": "سامر منصور", "stars": 5, "time": "الآن", "text": "نتيجة سريعة جدًا وبدون تعقيد. أعجبني."}, {"name": "طارق منصور", "stars": 5, "time": "الآن", "text": "راحة نفسية وتعامل ممتاز. واضح أنهم يهمهم رضا العميل."}, {"name": "فادي ناصر", "stars": 3, "time": "الآن", "text": "مفعوله موجود، لكن كنت أتوقع أكثر مقابل السعر."}, {"name": "بهاء خليل", "stars": 4, "time": "الآن", "text": "التأثير سريع عندي، بس مو كل مرة بنفس القوة. عمومًا ممتاز."}, {"name": "فارس يوسف", "stars": 5, "time": "الآن", "text": "من أول مرة حسّيت إن فيه فرق حقيقي. يستاهل."}, {"name": "وليد إبراهيم", "stars": 3, "time": "الآن", "text": "فرق معي، لكن لو ما فيه خصم ما أظن أكرر الطلب بسبب السعر."}, {"name": "ناصر الدالي", "stars": 4, "time": "الآن", "text": "حلّوا مشكلتي بسرعة وبأسلوب محترم. تجربة دعم إيجابية."}, {"name": "ياسر العتيبي", "stars": 1, "time": "الآن", "text": "استخدمته أكثر من مرة وما فاد. رجعوا المبلغ ناقص التوصيل."}, {"name": "طارق العتيبي", "stars": 4, "time": "الآن", "text": "تجربة جيدة والنتيجة واضحة، بس أتمنى يكون فيه باقات أو حجم أكبر بسعر أفضل."}, {"name": "أحمد السالمي", "stars": 5, "time": "الآن", "text": "صراحة حسّيت بالفرق بسرعة، ما توقعت يكون التأثير بهذه السرعة."}, {"name": "سامر عادل", "stars": 4, "time": "الآن", "text": "التحسن جيد جدًا، بس احتجت وقت بسيط عشان يبان الفرق بشكل كامل."}, {"name": "فادي شرف", "stars": 2, "time": "الآن", "text": "التوصيل تأخر بشكل غير منطقي. لو يتحسن كان التقييم أعلى."}, {"name": "فواز إبراهيم", "stars": 4, "time": "الآن", "text": "ممتاز من ناحية الإحساس بالثبات، فقط تمنيت لو التعليمات داخل العلبة تكون أوضح شوي."}, {"name": "رائد العتيبي", "stars": 5, "time": "الآن", "text": "منتج محترم وساعدني كثير. الفرق كان تدريجي لكن واضح."}, {"name": "فواز إبراهيم", "stars": 4, "time": "الآن", "text": "ممتاز من ناحية الإحساس بالثبات، فقط تمنيت لو التعليمات داخل العلبة تكون أوضح شوي."}, {"name": "مروان حمدان", "stars": 5, "time": "الآن", "text": "أنا عادة ما أكتب تقييمات، بس هذا يستاهل. التغليف احترافي، والطريقة سهلة، والنتيجة كانت مثل ما توقعت وأكثر."}, {"name": "طلال منصور", "stars": 1, "time": "الآن", "text": "التوصيل مرهق… لا مواعيد واضحة ولا التزام. تجربة سيئة."}, {"name": "زياد ناصر", "stars": 1, "time": "الآن", "text": "أكثر شيء أزعجني هو التوصيل: تأخير وتحديثات غير دقيقة."}, {"name": "خالد ناصر", "stars": 5, "time": "الآن", "text": "وصلني خلال يومين والتغليف كان نظيف ومحكم. استخدمته مرتين ولاحظت فرق واضح من أول مرة، وبصراحة راح أعيد الطلب."}, {"name": "سامر خليل", "stars": 5, "time": "الآن", "text": "النتيجة كانت أفضل من اللي توقعتها. أهم شيء الالتزام بالطريقة."}, {"name": "إياد خليل", "stars": 2, "time": "الآن", "text": "المنتج مو فعال بالنسبة لي. تعاملهم كويس، بس كنت أتمنى يرجع كامل بدون خصم التوصيل."}, {"name": "مؤيد عيسى", "stars": 3, "time": "الآن", "text": "بصراحة توقعت أكثر، لكنه ما يزال جيد. يمكن تجربتي تختلف عن غيري."}, {"name": "رامي منصور", "stars": 1, "time": "الآن", "text": "ما لاحظت أي تحسن. طلبت استرجاع وتم، لكن خصموا مبلغ التوصيل."}, {"name": "رائد أبو زيد", "stars": 3, "time": "الآن", "text": "حسّيت بفرق، لكن السعر خلاني أتردد أعيد الشراء."}, {"name": "نادر شريف", "stars": 4, "time": "الآن", "text": "كل شيء كان منظم وواضح، فقط أتمنى مواعيد أكثر مرونة."}, {"name": "إياد خليل", "stars": 2, "time": "الآن", "text": "المنتج مو فعال بالنسبة لي. تعاملهم كويس، بس كنت أتمنى يرجع كامل بدون خصم التوصيل."}, {"name": "مروان حمدان", "stars": 5, "time": "الآن", "text": "أنا عادة ما أكتب تقييمات، بس هذا يستاهل. التغليف احترافي، والطريقة سهلة، والنتيجة كانت مثل ما توقعت وأكثر."}, {"name": "زياد ناصر", "stars": 1, "time": "الآن", "text": "أكثر شيء أزعجني هو التوصيل: تأخير وتحديثات غير دقيقة."}, {"name": "وليد إبراهيم", "stars": 3, "time": "الآن", "text": "فرق معي، لكن لو ما فيه خصم ما أظن أكرر الطلب بسبب السعر."}, {"name": "محمود شريف", "stars": 5, "time": "الآن", "text": "كنت مستعجل أشوف فرق، والحمد لله لاحظته بسرعة."}, {"name": "أحمد منصور", "stars": 5, "time": "الآن", "text": "طلبته وأنا متردد، لكن بصراحة طلع أفضل مما توقعت. استخدمته بالضبط حسب التعليمات وكانت النتيجة واضحة بسرعة. التغليف مرتب ووصلني بدون أي مشكلة."}, {"name": "رائد العتيبي", "stars": 5, "time": "الآن", "text": "منتج محترم وساعدني كثير. الفرق كان تدريجي لكن واضح."}, {"name": "حسام الدالي", "stars": 5, "time": "الآن", "text": "فرق معي بشكل واضح، والأهم أنه خلاني أرجع أحس براحة وثقة أكبر."}, {"name": "كريم الدالي", "stars": 5, "time": "الآن", "text": "الفرق واضح، وأكثر شيء عجبني إنه التحسن كان طبيعي وتدريجي."}, {"name": "מיכאל ל.", "stars": 5, "time": "الآن", "text": "ממש הופתעתי לטובה. מרגיש איכותי והתוצאה מורגשת."}, {"name": "محمود شهاب", "stars": 4, "time": "الآن", "text": "الرد كان سريع، بس أتمنى لو يكون فيه رقم/واتساب مخصص للاستفسارات."}, {"name": "فادي إبراهيم", "stars": 5, "time": "الآن", "text": "تجربة ممتازة، وميزة المنتج إنه ما يحتاج تعقيد… التزام بسيط ونتيجة محترمة."}, {"name": "דניאל פ.", "stars": 4, "time": "الآن", "text": "בסך הכול טוב מאוד. הייתי שמח להוראות קצת יותר ברורות."}, {"name": "مؤيد ناصر", "stars": 4, "time": "الآن", "text": "النتيجة فورية تقريبًا، بس أتمنى لو يكون فيه إرشادات أوضح داخل العبوة."}, {"name": "عمر حمدان", "stars": 4, "time": "الآن", "text": "مفعوله واضح وصار عندي فرق، لكن السعر بصراحة مرتفع شوي مقارنة بالكمية."}, {"name": "رائد منصور", "stars": 5, "time": "الآن", "text": "منتج محترم وساعدني كثير. غير لي الموضوع من توتر إلى ثقة."}, {"name": "سامر خليل", "stars": 4, "time": "الآن", "text": "النتيجة جيدة جدًا، بس احتجت كذا مرة عشان أوصل للفرق اللي أبغاه."}, {"name": "عبد الرحمن العبدلي", "stars": 5, "time": "الآن", "text": "من أول تجربة حسّيت بفرق واضح. أنصح فيه للي يبغى نتيجة سريعة."}, {"name": "عمر سليمان", "stars": 1, "time": "الآن", "text": "بصراحة التوصيل خيّب أملي. تأخير كبير وكأن الطلب ضايع."}, {"name": "كريم شهاب", "stars": 4, "time": "الآن", "text": "النتيجة كويسة، بس كنت أتمنى يكون فيه شرح داخل العلبة أو كود يودّي لفيديو توضيحي."}, {"name": "محمد عادل", "stars": 5, "time": "الآن", "text": "جودة المنتج ممتازة جدًا، والشي اللي عجبني إنه ما يحتاج وقت طويل عشان تحس بالفرق. خدمة العملاء ردّوا علي بسرعة لما سألت عن طريقة الاستخدام."}, {"name": "مؤيد نجم", "stars": 2, "time": "الآن", "text": "ما عندي مشكلة بالمنتج، المشكلة كلها بالتوصيل: تأخير بدون سبب واضح."}, {"name": "مازن شريف", "stars": 4, "time": "الآن", "text": "جيد جدًا، النتيجة ما كانت فورية عندي لكن مع الوقت صارت أفضل."}, {"name": "عمر الحداد", "stars": 4, "time": "الآن", "text": "المنتج جيد وفرق معي، لكن احتجت أكثر من مرة عشان يبان بشكل أوضح. بشكل عام راضي."}, {"name": "حسام نصر", "stars": 3, "time": "الآن", "text": "مش سيء، بس معايا النتيجة كانت أبطأ من اللي توقعتها. ممكن يختلف من شخص لشخص."}, {"name": "أحمد السالمي", "stars": 5, "time": "الآن", "text": "صراحة حسّيت بالفرق بسرعة، ما توقعت يكون التأثير بهذه السرعة."}, {"name": "طلال منصور", "stars": 1, "time": "الآن", "text": "التوصيل مرهق… لا مواعيد واضحة ولا التزام. تجربة سيئة."}, {"name": "حسام شريف", "stars": 2, "time": "الآن", "text": "للأسف التجربة ما كانت مثل المتوقع. دعم العملاء محترم، لكن الاسترداد يكون بعد خصم التوصيل."}, {"name": "אייל נ.", "stars": 5, "time": "الآن", "text": "אחלה מוצר, מרגיש שינוי ברור. אקנה שוב."}, {"name": "فواز العتيبي", "stars": 4, "time": "الآن", "text": "المنتج جيد جدًا، فقط تمنيت يكون فيه تعليمات مختصرة وواضحة أكثر داخل العلبة."}, {"name": "ياسر أبو عمر", "stars": 4, "time": "الآن", "text": "جيد جدًا، بس أتمنى لو التعليمات تكون أوضح أكثر. النتيجة بالمجمل ممتازة."}, {"name": "ياسر أبو عمر", "stars": 4, "time": "الآن", "text": "النتيجة كانت جيدة جدًا، بس أنا احتجت أكثر من استخدام عشان توضح معي بالكامل. بشكل عام منتج محترم ويستاهل."}, {"name": "رائد يوسف", "stars": 5, "time": "الآن", "text": "من ناحية الصلابة والثبات لاحظت تحسن واضح، خصوصًا مع الالتزام بالطريقة."}, {"name": "كريم الدالي", "stars": 1, "time": "الآن", "text": "للأسف غير فعّال عندي. تواصلت للاسترداد وتم، لكن المبلغ رجع ناقص حق الشحن."}, {"name": "خالد شريف", "stars": 5, "time": "الآن", "text": "صراحة ارتحت نفسيًا بعد ما شفت تحسّن. صار الموضوع أهدى وثقتي أعلى."}, {"name": "محمود كنعان", "stars": 1, "time": "الآن", "text": "تجربة التوصيل سيئة للغاية. لا تتبع، ولا تواصل، وتأخير كبير."}, {"name": "תומר ב.", "stars": 4, "time": "الآن", "text": "תוצאה טובה, אבל המחיר קצת גבוה. עדיין מרוצה."}, {"name": "יונתן ד.", "stars": 4, "time": "الآن", "text": "מוצר טוב, לא תמיד אותו אפקט בכל פעם, אבל ברוב הפעמים כן."}, {"name": "אייל נ.", "stars": 5, "time": "الآن", "text": "אחלה מוצר, מרגיש שינוי ברור. אקנה שוב."}, {"name": "محمود كنعان", "stars": 1, "time": "الآن", "text": "تجربة التوصيل سيئة للغاية. لا تتبع، ولا تواصل، وتأخير كبير."}, {"name": "إياد عوض", "stars": 4, "time": "الآن", "text": "النتيجة سريعة، لكن لازم تلتزم بالطريقة عشان تكون أفضل."}, {"name": "أحمد شهاب", "stars": 5, "time": "الآن", "text": "أفضل شيء بالنسبة لي هو الإحساس بالثبات. النتيجة كانت تدريجية لكنها واضحة."}, {"name": "عادل الزهراني", "stars": 1, "time": "الآن", "text": "تجربة توصيل سيئة للغاية. لو ما تحسنت ما راح أكرر الطلب."}, {"name": "عمر الحداد", "stars": 4, "time": "الآن", "text": "المنتج جيد وفرق معي، لكن احتجت أكثر من مرة عشان يبان بشكل أوضح. بشكل عام راضي."}, {"name": "عبد الرحمن خليل", "stars": 5, "time": "الآن", "text": "فرق معي أكثر من ناحية الثبات والقوة، وخلاني أرتاح نفسيًا كثير."}, {"name": "عبد الرحمن حمدان", "stars": 5, "time": "الآن", "text": "بصراحة ارتحت نفسيًا بعد ما شفت تحسن. فرق معي في الثقة أكثر من أي شيء."}, {"name": "ناصر حمدان", "stars": 4, "time": "الآن", "text": "النتيجة مرضية بنسبة كبيرة، بس صار عندي تأخير يوم بالتوصيل. غير كذا الأمور تمام."}, {"name": "كريم شادي", "stars": 1, "time": "الآن", "text": "انتظرت كثير، وبالأخير وصلت متأخرة جدًا. سيئين في الالتزام."}, {"name": "مؤيد نجم", "stars": 2, "time": "الآن", "text": "ما عندي مشكلة بالمنتج، المشكلة كلها بالتوصيل: تأخير بدون سبب واضح."}, {"name": "خالد عادل", "stars": 5, "time": "الآن", "text": "أهم شيء بالنسبة لي كان الإحساس بالتحكم، وهذا اللي لاحظته. تجربة ممتازة."}, {"name": "ناصر عادل", "stars": 5, "time": "الآن", "text": "جودة ممتازة ونتيجة مرضية. لاحظت تحسّن في الثبات مع الاستخدام."}, {"name": "مازن شهاب", "stars": 4, "time": "الآن", "text": "فعّال، بس مو فوري 100% عندي. بعد كم مرة صار الفرق أوضح."}, {"name": "علي الزعبي", "stars": 5, "time": "الآن", "text": "منتج قوي وعملي. ما فيه تعقيد بالاستخدام، والفرق واضح. أنصح فيه خصوصًا للي متردد."}, {"name": "עידן פ.", "stars": 4, "time": "الآن", "text": "תוצאה טובה, רק צריך התמדה. בסך הכול מומלץ."}, {"name": "عبد الرحمن العبدلي", "stars": 5, "time": "الآن", "text": "من أول تجربة حسّيت بفرق واضح. أنصح فيه للي يبغى نتيجة سريعة."}, {"name": "بهاء يوسف", "stars": 5, "time": "الآن", "text": "استخدمته حسب التعليمات وكانت النتيجة ممتازة. حسّيت براحة من أول مرة، وهذا الشي اللي كنت أدور عليه."}, {"name": "فهد المطيري", "stars": 5, "time": "الآن", "text": "ما كنت مقتنع بموضوع ‘نتيجة سريعة’، لكن طلع الكلام صحيح."}, {"name": "خالد شريف", "stars": 4, "time": "الآن", "text": "الدعم سريع ومتعاون، بس كنت أتمنى يكون فيه رد آلي يوضح الأسئلة الشائعة."}, {"name": "مازن خليل", "stars": 4, "time": "الآن", "text": "المنتج جيد جدًا، بس النتيجة ما كانت فورية عندي—احتجت وقت بسيط واستمرارية."}, {"name": "يوسف ناصر", "stars": 5, "time": "الآن", "text": "لاحظت تحسّن واضح في الثبات والثقة بعد الاستخدام المنتظم. التجربة كانت إيجابية جدًا."}, {"name": "وليد حمدان", "stars": 1, "time": "الآن", "text": "للأسف ما حصلت على النتيجة اللي توقعتها. رجعوا المبلغ ناقص التوصيل، وما أظن أعيد الطلب."}, {"name": "عبد الرحمن خليل", "stars": 5, "time": "الآن", "text": "فرق معي أكثر من ناحية الثبات والقوة، وخلاني أرتاح نفسيًا كثير."}, {"name": "طلال العبدلي", "stars": 3, "time": "الآن", "text": "مقبول، لكن يحتاج توضيح أكثر لمن يناسبه وكيف أفضل طريقة استخدام."}, {"name": "أحمد شهاب", "stars": 5, "time": "الآن", "text": "أفضل شيء بالنسبة لي هو الإحساس بالثبات. النتيجة كانت تدريجية لكنها واضحة."}, {"name": "طلال العبدلي", "stars": 3, "time": "الآن", "text": "مقبول، لكن يحتاج توضيح أكثر لمن يناسبه وكيف أفضل طريقة استخدام."}, {"name": "رامي منصور", "stars": 1, "time": "الآن", "text": "ما لاحظت أي تحسن. طلبت استرجاع وتم، لكن خصموا مبلغ التوصيل."}, {"name": "ליאור ש.", "stars": 5, "time": "الآن", "text": "מרגיש איכותי, והתוצאה הייתה ברורה אצלי. אחלה קנייה."}, {"name": "ناصر داود", "stars": 2, "time": "الآن", "text": "تجربة التوصيل كانت عشوائية. أتمنى تحسين الخدمة بأسرع وقت."}, {"name": "كريم الدالي", "stars": 1, "time": "الآن", "text": "للأسف غير فعّال عندي. تواصلت للاسترداد وتم، لكن المبلغ رجع ناقص حق الشحن."}, {"name": "خالد ناصر", "stars": 5, "time": "الآن", "text": "مفعول سريع وواضح، والتجربة بشكل عام ممتازة."}, {"name": "ناصر الزعبي", "stars": 4, "time": "الآن", "text": "مفعوله كويس جدًا، بس أتمنى يكون فيه شرح مختصر أكثر داخل العلبة."}, {"name": "عبد الرحمن خليل", "stars": 4, "time": "الآن", "text": "التحسن واضح، بس السعر مرتفع. لو فيه عروض للشراء المتكرر بيكون ممتاز."}, {"name": "بهاء عوض", "stars": 4, "time": "الآن", "text": "تحسن ممتاز في الثبات، فقط السعر كان مرتفع شوي بالنسبة لي."}, {"name": "أنس الدالي", "stars": 5, "time": "الآن", "text": "مفعوله سريع ومريح. صراحة تجربة إيجابية جدًا."}, {"name": "خالد ناصف", "stars": 2, "time": "الآن", "text": "التوصيل أخذ وقت طويل جدًا، وكل يوم يقولون بكرة. مزعج."}, {"name": "ناصر الدالي", "stars": 4, "time": "الآن", "text": "حلّوا مشكلتي بسرعة وبأسلوب محترم. تجربة دعم إيجابية."}, {"name": "רן ג.", "stars": 5, "time": "الآن", "text": "מוצר מצוין, פשוט ונוח. התוצאה מורגשת מהר."}, {"name": "حسام شريف", "stars": 3, "time": "الآن", "text": "المنتج جيد ويؤدي الغرض، لكن السعر أعلى من المتوقع."}, {"name": "مازن خليل", "stars": 4, "time": "الآن", "text": "المنتج جيد جدًا، بس النتيجة ما كانت فورية عندي—احتجت وقت بسيط واستمرارية."}, {"name": "ناصر الديري", "stars": 2, "time": "الآن", "text": "بصراحة ما حسيت بفرق. الاسترداد تم بسرعة، لكن رجع المبلغ ناقص التوصيل."}, {"name": "مازن السالمي", "stars": 4, "time": "الآن", "text": "المنتج جيد وعملي، بس كنت أتمنى لو يجي معه ملحق/أداة تساعد على الاستخدام."}, {"name": "نادر منصور", "stars": 4, "time": "الآن", "text": "المنتج ممتاز من ناحية المفعول، بس السعر مرتفع—لو ينزل بيصير خيار ثابت عندي."}, {"name": "أحمد خليل", "stars": 5, "time": "الآن", "text": "المركز مرتب ونظيف، والاستقبال متعاون جدًا. تجربة مريحة."}, {"name": "خالد عادل", "stars": 5, "time": "الآن", "text": "أهم شيء بالنسبة لي كان الإحساس بالتحكم، وهذا اللي لاحظته. تجربة ممتازة."}, {"name": "عبد الرحمن خليل", "stars": 5, "time": "الآن", "text": "فرق معي أكثر من ناحية الثبات والقوة، وخلاني أرتاح نفسيًا كثير."}, {"name": "عبد الرحمن يوسف", "stars": 5, "time": "الآن", "text": "شرحوا لي التفاصيل بشكل واضح، وما حسّيت بأي إحراج. احترام عالي."}, {"name": "محمد الحربي", "stars": 5, "time": "الآن", "text": "من أول استخدام لاحظت نتيجة واضحة. تجربة ممتازة."}, {"name": "فادي منصور", "stars": 5, "time": "الآن", "text": "شرحوا لي طريقة الاستخدام خطوة بخطوة، وتأكدوا إني فاهم قبل ما أقفل."}, {"name": "عمر سليمان", "stars": 1, "time": "الآن", "text": "بصراحة التوصيل خيّب أملي. تأخير كبير وكأن الطلب ضايع."}, {"name": "مؤيد عيسى", "stars": 3, "time": "الآن", "text": "بصراحة توقعت أكثر، لكنه ما يزال جيد. يمكن تجربتي تختلف عن غيري."}, {"name": "ליאור ש.", "stars": 5, "time": "الآن", "text": "מרגיש איכותי, והתוצאה הייתה ברורה אצלי. אחלה קנייה."}, {"name": "مازن شريف", "stars": 4, "time": "الآن", "text": "جيد جدًا، النتيجة ما كانت فورية عندي لكن مع الوقت صارت أفضل."}, {"name": "ناصر حمدان", "stars": 4, "time": "الآن", "text": "النتيجة مرضية بنسبة كبيرة، بس صار عندي تأخير يوم بالتوصيل. غير كذا الأمور تمام."}, {"name": "عبد الرحمن منصور", "stars": 5, "time": "الآن", "text": "كنت متردد بالبداية، لكن التجربة طلعت أفضل مما توقعت. نتيجة ممتازة مع الاستمرار."}, {"name": "سامي الزهراني", "stars": 4, "time": "الآن", "text": "النتيجة كانت سريعة عندي، بس أفضل شي الاستمرار عشان تثبت أكثر."}, {"name": "עידן פ.", "stars": 4, "time": "الآن", "text": "תוצאה טובה, רק צריך התמדה. בסך הכול מומלץ."}, {"name": "أحمد رشيد", "stars": 5, "time": "الآن", "text": "الشي اللي يميّزه إنه ما يحتاج وقت طويل، النتيجة تبان بسرعة."}, {"name": "فادي شرف", "stars": 2, "time": "الآن", "text": "التوصيل تأخر بشكل غير منطقي. لو يتحسن كان التقييم أعلى."}, {"name": "عبد الرحمن عادل", "stars": 1, "time": "الآن", "text": "اشتريته بسبب التقييمات، لكن ما فادني. الاسترداد تم بس ناقص حق الشحن."}, {"name": "محمد العبدلي", "stars": 5, "time": "الآن", "text": "تعامل المركز ممتاز وراقي. حسّيت بالاهتمام من أول لحظة."}, {"name": "عبد الرحمن حمدان", "stars": 5, "time": "الآن", "text": "بصراحة ارتحت نفسيًا بعد ما شفت تحسن. فرق معي في الثقة أكثر من أي شيء."}, {"name": "يوسف العتيبي", "stars": 5, "time": "الآن", "text": "أكثر شيء عجبني الاحترام والمتابعة. ما حسّيت إني ألاحقهم."}, {"name": "يوسف العتيبي", "stars": 5, "time": "الآن", "text": "أكثر شيء عجبني الاحترام والمتابعة. ما حسّيت إني ألاحقهم."}, {"name": "ياسر حمدي", "stars": 5, "time": "الآن", "text": "منتج ممتاز، فرق معي بسرعة وخلاني مرتاح."}, {"name": "وليد حمدان", "stars": 5, "time": "الآن", "text": "منتج محترم ويستاهل. فرق معي بشكل واضح."}, {"name": "אבי ש.", "stars": 4, "time": "الآن", "text": "עובד טוב, אבל לקח לי כמה פעמים עד שהבנתי את השגרה הכי טובה."}, {"name": "بهاء عوض", "stars": 4, "time": "الآن", "text": "تحسن ممتاز في الثبات، فقط السعر كان مرتفع شوي بالنسبة لي."}, {"name": "زياد منصور", "stars": 5, "time": "الآن", "text": "مفعول واضح وتجربة ممتازة من ناحية النتيجة."}, {"name": "خالد أبو زيد", "stars": 1, "time": "الآن", "text": "للأسف ما اشتغل معي. تواصلت على الاسترداد ورجعوا المبلغ، بس خصموا حق التوصيل وهذا خفّض رضاي."}, {"name": "خالد الزهراني", "stars": 3, "time": "الآن", "text": "استخدمته أكثر من مرة، حسّيت بتحسن بسيط. يمكن لو استمريت أكثر تكون النتيجة أفضل."}, {"name": "وائل عوض", "stars": 1, "time": "الآن", "text": "تأخروا بشكل مبالغ فيه. لازم يكون فيه احترام لوقت العميل."}, {"name": "خالد ناصف", "stars": 2, "time": "الآن", "text": "التوصيل أخذ وقت طويل جدًا، وكل يوم يقولون بكرة. مزعج."}, {"name": "أحمد شريف", "stars": 5, "time": "الآن", "text": "كنت أعاني من مشكلة تزعجني، وبعد الاستخدام المنتظم صار فيه تحسن ملحوظ."}, {"name": "رائد العتيبي", "stars": 5, "time": "الآن", "text": "منتج محترم وساعدني كثير. الفرق كان تدريجي لكن واضح."}, {"name": "سامي الحربي", "stars": 1, "time": "الآن", "text": "التوصيل سيّئ جدًا. تأخر كثير ووصلني بدون أي تحديثات واضحة."}, {"name": "نادر شريف", "stars": 4, "time": "الآن", "text": "كل شيء كان منظم وواضح، فقط أتمنى مواعيد أكثر مرونة."}, {"name": "דוד כ.", "stars": 5, "time": "الآن", "text": "איכות גבוהה ותוצאה ברורה. מרוצה מאוד מהקנייה."}, {"name": "فادي حمدان", "stars": 1, "time": "الآن", "text": "توقعت نتيجة واضحة مثل اللي مكتوب، لكن ما حصل. استرجعت فلوسي بالنهاية، بس خصموا قيمة الشحن."}, {"name": "مؤيد منصور", "stars": 2, "time": "الآن", "text": "للأسف ما كان فعال معي. دعمهم سريع، بس موضوع خصم التوصيل مزعج."}, {"name": "يزن عبد الله", "stars": 3, "time": "الآن", "text": "كويس، لكن احتجت وقت أطول عشان أحس بالفرق. ما أقدر أقول ممتاز ولا سيء."}, {"name": "ياسر العتيبي", "stars": 1, "time": "الآن", "text": "بدون مبالغة: التوصيل متعب جدًا. تأخير وتأجيل وما في التزام."}, {"name": "كريم الديري", "stars": 3, "time": "الآن", "text": "النتيجة جيدة وموجودة، بس كنت أتمنى يكون السعر أقل أو يكون فيه عروض."}, {"name": "إياد عوض", "stars": 4, "time": "الآن", "text": "النتيجة سريعة، لكن لازم تلتزم بالطريقة عشان تكون أفضل."}, {"name": "يوسف الشمري", "stars": 5, "time": "الآن", "text": "مفعوله سريع جدًا، حسّيت براحة وتحسن من أول مرة."}, {"name": "نادر إبراهيم", "stars": 4, "time": "الآن", "text": "يعطي نتيجة ممتازة بشكل عام، بس تختلف حسب الاستخدام."}, {"name": "هشام عادل", "stars": 4, "time": "الآن", "text": "تأثيره سريع، بس كنت أتمنى يكون فيه عروض أكثر."}, {"name": "سامي ناصر", "stars": 1, "time": "الآن", "text": "للأسف ما شفت أي نتيجة تذكر حتى بعد أكثر من استخدام. تواصلت معهم وطلبت استرداد وتم، لكن رجعوا المبلغ ناقص حق التوصيل."}, {"name": "فادي إبراهيم", "stars": 5, "time": "الآن", "text": "شي مرتب من كل النواحي: طلب، توصيل، تغليف، ونتيجة. أهم نقطة عندي إنه فعلاً يعطي فرق خلال وقت قصير."}, {"name": "فواز ناصر", "stars": 5, "time": "الآن", "text": "نظافة وتنظيم واحترافية. بصراحة مركز محترم."}, {"name": "خالد منصور", "stars": 5, "time": "الآن", "text": "صار عندي إحساس أقوى بالثقة والاستقرار. منتج محترم ويستاهل."}, {"name": "وائل عوض", "stars": 1, "time": "الآن", "text": "تأخروا بشكل مبالغ فيه. لازم يكون فيه احترام لوقت العميل."}, {"name": "אורן ג.", "stars": 5, "time": "الآن", "text": "שירות מעולה והמוצר עושה את העבודה. מרוצה."}, {"name": "خالد شريف", "stars": 5, "time": "الآن", "text": "صراحة ارتحت نفسيًا بعد ما شفت تحسّن. صار الموضوع أهدى وثقتي أعلى."}, {"name": "طارق يوسف", "stars": 5, "time": "الآن", "text": "تحسّن ملحوظ عندي من ناحية القوة والثقة. أنصح فيه للي يعاني من التذبذب."}, {"name": "مازن السالمي", "stars": 4, "time": "الآن", "text": "المنتج جيد وعملي، بس كنت أتمنى لو يجي معه ملحق/أداة تساعد على الاستخدام."}, {"name": "نادر منصور", "stars": 4, "time": "الآن", "text": "المنتج ممتاز من ناحية المفعول، بس السعر مرتفع—لو ينزل بيصير خيار ثابت عندي."}, {"name": "فواز العتيبي", "stars": 4, "time": "الآن", "text": "المنتج جيد جدًا، فقط تمنيت يكون فيه تعليمات مختصرة وواضحة أكثر داخل العلبة."}, {"name": "ברק ד.", "stars": 5, "time": "الآن", "text": "ממש מרוצה. התוצאה ברורה והשירות היה מהיר."}, {"name": "رائد أبو زيد", "stars": 5, "time": "الآن", "text": "صار عندي استفسار بعد الشراء وردّوا خلال دقائق. تعامل راقي جدًا."}, {"name": "بهاء خليل", "stars": 4, "time": "الآن", "text": "التأثير سريع عندي، بس مو كل مرة بنفس القوة. عمومًا ممتاز."}, {"name": "كريم الدالي", "stars": 4, "time": "الآن", "text": "التحسن موجود وواضح، لكن يحتاج التزام وعدم استعجال."}, {"name": "رامي أبو زيد", "stars": 3, "time": "الآن", "text": "يؤدي الغرض، بس لاحظت إن النتيجة مو ثابتة كل مرة. يحتاج التزام بالطريقة."}, {"name": "سامي الزهراني", "stars": 5, "time": "الآن", "text": "النتيجة فاجأتني بصراحة. تحسن واضح خلال وقت قصير."}, {"name": "عمر سليمان", "stars": 1, "time": "الآن", "text": "بصراحة التوصيل خيّب أملي. تأخير كبير وكأن الطلب ضايع."}, {"name": "רועי ח.", "stars": 5, "time": "الآن", "text": "תוצאה יציבה אצלי עם שימוש עקבי. שווה."}, {"name": "عبد الرحمن منصور", "stars": 5, "time": "الآن", "text": "كنت متردد بالبداية، لكن التجربة طلعت أفضل مما توقعت. نتيجة ممتازة مع الاستمرار."}, {"name": "رائد يوسف", "stars": 5, "time": "الآن", "text": "من ناحية الصلابة والثبات لاحظت تحسن واضح، خصوصًا مع الالتزام بالطريقة."}, {"name": "فادي إبراهيم", "stars": 5, "time": "الآن", "text": "منتج فعّال بصراحة. حسّيت بتحسن واضح من وقت قصير."}, {"name": "سامي الزهراني", "stars": 5, "time": "الآن", "text": "النتيجة فاجأتني بصراحة. تحسن واضح خلال وقت قصير."}, {"name": "شادي الزعبي", "stars": 5, "time": "الآن", "text": "واضح من أول استخدام إنه منتج قوي ونتيجته سريعة."}, {"name": "طارق إبراهيم", "stars": 5, "time": "الآن", "text": "كنت متردد بالبداية، لكن بعد كم استخدام صار فيه تحسن ملحوظ وواضح."}, {"name": "محمد ناصر", "stars": 5, "time": "الآن", "text": "فرق معي بشكل واضح من ناحية التحكم. مع الوقت حسّيت بثقة أكبر وراحة."}, {"name": "طارق يوسف", "stars": 5, "time": "الآن", "text": "من أكثر الأشياء اللي عجبتني إن المفعول واضح بدون تعقيد."}, {"name": "حسام الدالي", "stars": 5, "time": "الآن", "text": "فرق معي بشكل واضح، والأهم أنه خلاني أرجع أحس براحة وثقة أكبر."}, {"name": "فواز ناصر", "stars": 5, "time": "الآن", "text": "نظافة وتنظيم واحترافية. بصراحة مركز محترم."}, {"name": "ناصر الزعبي", "stars": 5, "time": "الآن", "text": "جودة ممتازة ونتيجة قوية. حسّيت بثبات أعلى وثقة أكبر."}, {"name": "רן ג.", "stars": 5, "time": "الآن", "text": "מוצר מצוין, פשוט ונוח. התוצאה מורגשת מהר."}, {"name": "وليد حمدان", "stars": 5, "time": "الآن", "text": "منتج محترم ويستاهل. فرق معي بشكل واضح."}, {"name": "خالد ناصر", "stars": 5, "time": "الآن", "text": "وصلني خلال يومين والتغليف كان نظيف ومحكم. استخدمته مرتين ولاحظت فرق واضح من أول مرة، وبصراحة راح أعيد الطلب."}, {"name": "أحمد فواز", "stars": 2, "time": "الآن", "text": "المنتج ما عليه كلام، لكن التوصيل كان كارثي. انتظرت أكثر من اللازم."}, {"name": "أحمد منصور", "stars": 5, "time": "الآن", "text": "طلبته وأنا متردد، لكن بصراحة طلع أفضل مما توقعت. استخدمته بالضبط حسب التعليمات وكانت النتيجة واضحة بسرعة. التغليف مرتب ووصلني بدون أي مشكلة."}, {"name": "محمد العبدلي", "stars": 5, "time": "الآن", "text": "تعامل المركز ممتاز وراقي. حسّيت بالاهتمام من أول لحظة."}, {"name": "مازن السبيعي", "stars": 4, "time": "الآن", "text": "مفعوله سريع ومرضي جدًا، بس أتمنى لو يكون فيه شرح مختصر أكثر."}, {"name": "فواز العتيبي", "stars": 4, "time": "الآن", "text": "المنتج جيد جدًا، فقط تمنيت يكون فيه تعليمات مختصرة وواضحة أكثر داخل العلبة."}, {"name": "مؤيد ناصر", "stars": 4, "time": "الآن", "text": "النتيجة فورية تقريبًا، بس أتمنى لو يكون فيه إرشادات أوضح داخل العبوة."}, {"name": "عبد الرحمن شريف", "stars": 5, "time": "الآن", "text": "صراحة المنتج فاجأني. أول استخدام حسّيت بفرق واضح، وموضوع الضمان والوضوح في التعامل خلاني مطمئن."}, {"name": "حسام ناصر", "stars": 5, "time": "الآن", "text": "لاحظت فرق واضح في القوة والثبات مع الاستمرار. التجربة كانت مريحة ومرضية."}, {"name": "عمر حمدان", "stars": 4, "time": "الآن", "text": "مفعوله واضح وصار عندي فرق، لكن السعر بصراحة مرتفع شوي مقارنة بالكمية."}, {"name": "بهاء ناصر", "stars": 2, "time": "الآن", "text": "التجربة ما كانت ناجحة معي. سياسة الاسترداد واضحة بس خصم التوصيل يزعّل."}, {"name": "فادي ناصر", "stars": 3, "time": "الآن", "text": "مفعوله موجود، لكن كنت أتوقع أكثر مقابل السعر."}, {"name": "رامي ناصر", "stars": 5, "time": "الآن", "text": "فعلاً يعطي نتيجة سريعة. ما توقعت يكون بهذا الوضوح."}, {"name": "مازن شريف", "stars": 4, "time": "الآن", "text": "جيد جدًا، النتيجة ما كانت فورية عندي لكن مع الوقت صارت أفضل."}, {"name": "علي الزعبي", "stars": 5, "time": "الآن", "text": "منتج قوي وعملي. ما فيه تعقيد بالاستخدام، والفرق واضح. أنصح فيه خصوصًا للي متردد."}, {"name": "رامي ناصر", "stars": 5, "time": "الآن", "text": "فعلاً يعطي نتيجة سريعة. ما توقعت يكون بهذا الوضوح."}, {"name": "أحمد شريف", "stars": 5, "time": "الآن", "text": "كنت أعاني من مشكلة تزعجني، وبعد الاستخدام المنتظم صار فيه تحسن ملحوظ."}, {"name": "عمر الزعبي", "stars": 2, "time": "الآن", "text": "ما أقدر أقول إنه أعطاني نتيجة. الاسترداد موجود وهذا شيء يحسب لهم، لكن خصم التوصيل مزعج."}, {"name": "رائد شريف", "stars": 5, "time": "الآن", "text": "أول مرة أحس بنتيجة بهالسرعة. ممتاز."}, {"name": "بشار حسن", "stars": 1, "time": "الآن", "text": "التوصيل جدًا سيء، ما في تنسيق ولا اتصال، ووصل بعد أيام."}, {"name": "عمر الحداد", "stars": 4, "time": "الآن", "text": "المنتج جيد وفرق معي، لكن احتجت أكثر من مرة عشان يبان بشكل أوضح. بشكل عام راضي."}, {"name": "كريم شهاب", "stars": 4, "time": "الآن", "text": "النتيجة كويسة، بس كنت أتمنى يكون فيه شرح داخل العلبة أو كود يودّي لفيديو توضيحي."}, {"name": "مروان حمدان", "stars": 5, "time": "الآن", "text": "أنا عادة ما أكتب تقييمات، بس هذا يستاهل. التغليف احترافي، والطريقة سهلة، والنتيجة كانت مثل ما توقعت وأكثر."}, {"name": "حسام الخالدي", "stars": 5, "time": "الآن", "text": "فرق معي بسرعة وبشكل واضح. تجربة مريحة."}, {"name": "عادل الزهراني", "stars": 1, "time": "الآن", "text": "تجربة توصيل سيئة للغاية. لو ما تحسنت ما راح أكرر الطلب."}, {"name": "حسام ناصر", "stars": 5, "time": "الآن", "text": "لاحظت فرق واضح في القوة والثبات مع الاستمرار. التجربة كانت مريحة ومرضية."}, {"name": "إيهاب خليل", "stars": 2, "time": "الآن", "text": "وصلني بعد انتظار طويل جدًا. أتمنى تحسين شركة الشحن/التوصيل."}, {"name": "كريم الدالي", "stars": 5, "time": "الآن", "text": "الفرق واضح، وأكثر شيء عجبني إنه التحسن كان طبيعي وتدريجي."}, {"name": "طارق الزعبي", "stars": 5, "time": "الآن", "text": "خدمة عملاء صادقة وواضحة، ما في مبالغة ولا وعود غير واقعية."}, {"name": "سامر خليل", "stars": 4, "time": "الآن", "text": "النتيجة جيدة جدًا، بس احتجت كذا مرة عشان أوصل للفرق اللي أبغاه."}, {"name": "يوسف حمدان", "stars": 4, "time": "الآن", "text": "يعطي نتيجة جيدة جدًا، بس احتجت أكثر من مرة عشان تثبت معي."}, {"name": "كريم صبحي", "stars": 4, "time": "الآن", "text": "النتيجة ممتازة بشكل عام، بس أتمنى يكون فيه إرشادات مختصرة أكثر."}, {"name": "سامي ناصر", "stars": 1, "time": "الآن", "text": "للأسف ما شفت أي نتيجة تذكر حتى بعد أكثر من استخدام. تواصلت معهم وطلبت استرداد وتم، لكن رجعوا المبلغ ناقص حق التوصيل."}, {"name": "بهاء ناصر", "stars": 2, "time": "الآن", "text": "التجربة ما كانت ناجحة معي. سياسة الاسترداد واضحة بس خصم التوصيل يزعّل."}, {"name": "محمود شهاب", "stars": 4, "time": "الآن", "text": "الرد كان سريع، بس أتمنى لو يكون فيه رقم/واتساب مخصص للاستفسارات."}, {"name": "فادي إبراهيم", "stars": 5, "time": "الآن", "text": "منتج فعّال بصراحة. حسّيت بتحسن واضح من وقت قصير."}, {"name": "بهاء يوسف", "stars": 5, "time": "الآن", "text": "استخدمته حسب التعليمات وكانت النتيجة ممتازة. حسّيت براحة من أول مرة، وهذا الشي اللي كنت أدور عليه."}, {"name": "طارق يوسف", "stars": 5, "time": "الآن", "text": "كنت متردد، لكن التجربة طلعت إيجابية. تحكم أفضل مع مرور الوقت."}, {"name": "طارق يوسف", "stars": 1, "time": "الآن", "text": "جربته بالطريقة المذكورة وما شفت أي فائدة. رجعوا المبلغ ناقص رسوم الشحن."}];

function starsText(n){
  let html = "";
  for(let i=1;i<=5;i++){ html += `<span class="${i<=n ? "on":"off"}">★</span>`; }
  return html;
}

function firstLetter(name){
  const t = (name || "").trim();
  return t ? t[0] : "م";
}

function shuffleArray(arr){
  for(let i=arr.length-1;i>0;i--) {
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


const loadMoreReviewsBtn = document.getElementById("loadMoreReviewsBtn");
const loadMoreBtnText = loadMoreReviewsBtn ? loadMoreReviewsBtn.querySelector(".lm-text") : null;
const loadMoreBtnMeta = loadMoreReviewsBtn ? loadMoreReviewsBtn.querySelector(".lm-meta") : null;

function updateLoadMoreBtnUI(){
  if(!loadMoreReviewsBtn) return;
  const total = demoReviews.length;
  const shown = shownReviewsCount;
  const remaining = Math.max(0, total - shown);
  if(loadMoreBtnText) loadMoreBtnText.textContent = remaining > 0 ? "عرض المزيد" : "تم عرض جميع التعليقات";
  if(loadMoreBtnMeta) loadMoreBtnMeta.textContent = remaining > 0 ? `${shown}/${total}` : "";
  loadMoreReviewsBtn.disabled = remaining <= 0;
}

const REVIEWS_STEP = 5;
let shownReviewsCount = 0;

// اخلط التعليقات ثم رتبها بنمط: (سلبي) ثم (نصف إيجابي) ثم (إيجابي جدًا)
shuffleArray(demoReviews);

function applyPatternAndTime(){
  // ✅ إزالة التعليقات المكررة (الاسم + النجوم + النص)
  // هذا يمنع تكرار نفس التعليق في قائمة الاختبار.
  {
    const seen = new Set();
    const unique = [];
    for(const r of demoReviews){
      const key = `${String(r.name||'').trim()}|${Number(r.stars||0)}|${String(r.text||'').trim()}`;
      if(seen.has(key)) continue;
      seen.add(key);
      unique.push(r);
    }
    if(unique.length !== demoReviews.length){
      demoReviews.splice(0, demoReviews.length, ...unique);
    }
  }

  const negatives = demoReviews.filter(r => (r.stars || 0) <= 2);
  const halfPos   = demoReviews.filter(r => (r.stars || 0) === 3 || (r.stars || 0) === 4);
  const veryPos   = demoReviews.filter(r => (r.stars || 0) === 5);

  // ✅ حذف 100 تعليق سلبي جدًا (★☆☆☆☆) للاختبار
  // نزيل من مجموعة النجمة الواحدة فقط، ونترك باقي السلبي/نصف الإيجابي كما هو
  const veryNegOnly = negatives.filter(r => (r.stars || 0) === 1);
  const otherNeg    = negatives.filter(r => (r.stars || 0) !== 1);
  shuffleArray(veryNegOnly);
  const removeCount = Math.min(100, veryNegOnly.length);
  veryNegOnly.splice(0, removeCount);
  // إعادة بناء قائمة السلبيات بعد الحذف
  negatives.splice(0, negatives.length, ...veryNegOnly, ...otherNeg);

  // تنويع داخل كل مجموعة
  shuffleArray(negatives);
  shuffleArray(halfPos);
  shuffleArray(veryPos);

  // أول 3 تعليقات: سلبي ثم نصف إيجابي ثم إيجابي جدًا
  const first = [];
  if (negatives.length) first.push(negatives.shift());
  if (halfPos.length)   first.push(halfPos.shift());
  if (veryPos.length)   first.push(veryPos.shift());

  // باقي التعليقات: خليط عشوائي بالكامل
  const rest = negatives.concat(halfPos, veryPos);
  shuffleArray(rest);

  const ordered = first.concat(rest);

  // ===== التوقيتات: الأعلى أحدث، الأسفل أقدم =====
  // المطلوب: التعليقات التجريبية "منذ يوم" وأكثر فقط (بدون دقائق/ساعات)
  const n = ordered.length;
  const maxDays = 75; // حتى ~75 يوم (للاختبار)
  function formatAgoDays(days){
    if (days <= 1) return "منذ يوم";
    if (days === 2) return "منذ يومين";
    if (days < 7) return `منذ ${days} أيام`;
    const weeks = Math.round(days / 7);
    if (weeks === 1) return "منذ أسبوع";
    if (weeks === 2) return "منذ أسبوعين";
    const months = Math.max(1, Math.round(days / 30));
    if (months === 1) return "منذ شهر";
    return `منذ ${months} أشهر`;
  }

  // نخزن عمر التعليق بالأيام لاستخدامه لاحقاً في ردود المركز
  for (let i = 0; i < n; i++) {
    const t = (n === 1) ? 0 : (i / (n - 1));
    const baseDays = 1 + Math.round(Math.pow(t, 1.22) * (maxDays - 1));
    // عشوائية خفيفة (لكن نحافظ على الترتيب: أحدث للأعلى)
    const jitter = Math.floor(Math.random() * 2); // 0 أو 1 يوم
    const ageDays = Math.max(1, baseDays + jitter);
    ordered[i]._ageDays = ageDays;
    ordered[i].time = formatAgoDays(ageDays);
  }

  // ===== ردود مركز الارتقاء الطبي (خدمة العملاء) =====
  // - رد على أول 3 تعليقات
  // - ثم رد على 100 تعليق (سلبي + نصف إيجابي) فقط
  // والباقي بدون رد
  const CENTER_NAME = "مركز الارتقاء الطبي";
  const CENTER_ROLE = "(خدمة العملاء)";
  const CENTER_AVATAR = "https://i.ibb.co/dwvH49bc/image.jpg";

  // ✅ لمنع تكرار ردود المركز
  const usedCenterReplyTexts = new Set();

  function formatAgoAny(mins){
    if (mins <= 1) return "منذ دقيقة";
    if (mins < 60) return `منذ ${mins} دقيقة`;
    const hours = Math.round(mins / 60);
    if (hours === 1) return "منذ ساعة";
    if (hours === 2) return "منذ ساعتين";
    if (hours < 24) return `منذ ${hours} ساعات`;
    const days = Math.round(mins / (60 * 24));
    if (days === 1) return "منذ يوم";
    if (days === 2) return "منذ يومين";
    if (days < 7) return `منذ ${days} أيام`;
    const weeks = Math.round(days / 7);
    if (weeks === 1) return "منذ أسبوع";
    if (weeks === 2) return "منذ أسبوعين";
    const months = Math.max(1, Math.round(days / 30));
    if (months === 1) return "منذ شهر";
    return `منذ ${months} أشهر`;
  }

  function centerReplyText(stars){
    // ردود متنوعة (رسمية) لتجنب تكرار نفس النص
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const pickUnique = (arr) => {
      // جرّب اختيار نص غير مستخدم لتقليل التكرار
      for(let i=0;i<30;i++){
        const t = pick(arr);
        if(!usedCenterReplyTexts.has(t)){
          usedCenterReplyTexts.add(t);
          return t;
        }
      }
      // إذا انتهت الخيارات، اسمح بالتكرار بشكل طبيعي
      const t = pick(arr);
      usedCenterReplyTexts.add(t);
      return t;
    };

    const negativeReplies = [
      "نعتذر عن التجربة غير المرضية. فضلاً شاركنا رقم الطلب برسالة خاصة لنقوم بالمتابعة الفورية وتقديم الحل المناسب.",
      "نأسف لأن التجربة لم تكن كما توقعت. يسعدنا مساعدتك بشكل مباشر—أرسل رقم الطلب وسنراجع الحالة معك.",
      "نعتذر عن أي إزعاج. تواصل معنا برقم الطلب ليتم تصعيد الموضوع ومتابعته حتى الوصول لحل واضح.",
      "نأسف لعدم رضاك. نرجو إرسال تفاصيل الطلب وسنتعامل مع الأمر بأسرع وقت وفق سياسة الضمان/الخدمة.",
      "اعتذارنا لك. تواصل معنا برسالة مع رقم الطلب وسنقوم بالمتابعة وتزويدك بتحديث خلال أقرب وقت.",
      "نأسف للتجربة. نؤكد حرصنا على تحسين الخدمة، ويسعدنا استلام رقم الطلب لمتابعة الموضوع فورًا."
    ];

    const mixedReplies = [
      "شكرًا لملاحظتك. يسعدنا توضيح طريقة الاستخدام أو أي استفسار لضمان أفضل تجربة ممكنة.",
      "نقدّر تقييمك. إذا رغبت، تواصل معنا وسنرسل لك إرشادات مختصرة وواضحة تناسب احتياجك.",
      "شكرًا لمشاركتك. يسعدنا مساعدتك بالتوجيه الصحيح وتوضيح أي نقطة لضمان أفضل تجربة.",
      "ممتنون لملاحظتك. سنأخذها بعين الاعتبار، ويمكننا مساعدتك خطوة بخطوة عند التواصل معنا.",
      "شكرًا لتقييمك. إذا احتجت أي توضيح إضافي حول الاستخدام أو الاستفسارات فنحن في خدمتك.",
      "نقدّر رأيك. نعمل دائمًا على تحسين الشرح والخدمة، ويسعدنا دعمك بأي معلومات تحتاجها."
    ];

    const positiveReplies = [
      "شكرًا لتقييمك ومشاركتك. سعدنا بتجربتك الإيجابية ونسعد بخدمتك في أي وقت.",
      "سعدنا جدًا برأيك. شكرًا لثقتك، ونتمنى لك تجربة ممتازة دائمًا.",
      "ممتنون لتقييمك. رضاك يهمنا، وأي استفسار نحن جاهزون لخدمتك.",
      "شكرًا لك. يسعدنا أن التجربة كانت إيجابية، ونتشرف بخدمتك مجددًا.",
      "نقدّر تقييمك. شكرًا لدعمك وثقتك، ونسعد بمساعدتك متى احتجت.",
      "سعيدين بتجربتك. شكرًا لمشاركتك، ونتمنى لك كل التوفيق."
    ];

    const s = (stars || 0);
    if (s <= 2) return pickUnique(negativeReplies);
    if (s === 3 || s === 4) return pickUnique(mixedReplies);
    return pickUnique(positiveReplies);
  }

  function addCenterReplyTo(review){
    const ageDays = Number(review._ageDays || 1);
    const commentMins = ageDays * 24 * 60;

    // رد المركز أحدث من التعليق: بعده بساعة إلى يومين (حسب قدم التعليق)
    const maxGap = Math.min(2 * 24 * 60, Math.max(60, commentMins - 1));
    const gapMins = Math.floor(60 + Math.random() * (maxGap - 60 + 1));
    const replyMins = Math.max(1, commentMins - gapMins);

    if(!Array.isArray(review.replies)) review.replies = [];
    review.replies.unshift({
      isCenter: true,
      name: CENTER_NAME,
      role: CENTER_ROLE,
      avatar: CENTER_AVATAR,
      time: formatAgoAny(replyMins),
      text: centerReplyText(review.stars)
    });
  }

  // أول 3 دائمًا
  for(let i=0;i<Math.min(3, ordered.length);i++){
    addCenterReplyTo(ordered[i]);
  }

  // اختَر 100 تعليق إضافي (سلبي + نصف إيجابي) من الباقي فقط
  const candidates = [];
  for(let i=3;i<ordered.length;i++){
    const st = ordered[i].stars || 0;
    if(st <= 2 || st === 3 || st === 4) candidates.push(ordered[i]);
  }
  shuffleArray(candidates);
  const pickCount = Math.min(100, candidates.length);
  for(let i=0;i<pickCount;i++){
    addCenterReplyTo(candidates[i]);
  }

  // استبدل محتوى demoReviews بنفس الترتيب الجديد
  demoReviews.splice(0, demoReviews.length, ...ordered);
}

// طبّق النمط + التوقيتات مرة عند التحميل
applyPatternAndTime();

function renderDemoReviews(){
  const visible = demoReviews.slice(0, shownReviewsCount);

  reviewsList.innerHTML = visible.map((r, visibleIdx) => {
    const idx = visibleIdx; // فهرس ثابت داخل demoReviews (لأننا نعرض من البداية فقط)
    const replies = Array.isArray(r.replies) ? r.replies : [];
    const repliesHtml = replies.map(entry => {
      const isObj = (typeof entry === "object" && entry);
      const isCenter = !!(isObj && entry.isCenter);
      const rName = (isObj && entry.name ? String(entry.name).trim() : "") || "زائر";
      const rRole = (isObj && entry.role ? String(entry.role).trim() : "");
      const txt = (isObj && "text" in entry ? String(entry.text || "") : String(entry || "")).trim();
      const rTime = (isObj && entry.time ? String(entry.time).trim() : "");

      const avatarHtml = isCenter
        ? `<img src="${entry.avatar || ""}" alt="${rName}" loading="lazy" />`
        : `${firstLetter(rName)}`;

      const nameHtml = isCenter
        ? `<div class="replyName">${rName} <span class="replyRole">${rRole}</span></div>`
        : `<div class="replyName">${rName}</div>`;

      return `
      <div class="replyCard ${isCenter ? "centerReply" : ""}">
        <div class="replyAvatar ${isCenter ? "img" : ""}">${avatarHtml}</div>
        <div class="replyBody">
          <div class="replyTop">
            ${nameHtml}
            <div class="replyTime">${rTime}</div>
          </div>
          <div class="replyText">${txt}</div>
        </div>
      </div>
      `;
    }).join("");

    return `
    <div class="reviewItem" data-idx="${idx}">
      <div class="reviewBody">
        <div class="reviewTop">
          <div class="reviewUser">
            <div class="avatar">${firstLetter(r.name)}</div>
            <div class="reviewName">${r.name}</div>
          </div>
          <div class="reviewTime">${r.time || ""}</div>
        </div>

        <div class="reviewStars">${starsText(r.stars)}</div>
        <div class="reviewText">${r.text}</div>

        <div class="repliesWrap">${repliesHtml}</div>

        <div class="replyToggle" data-action="toggleReply">إضافة رد</div>

        <div class="replyBox" data-replybox style="display:none">
          <input class="replyNameInput" type="text" placeholder="الاسم (اختياري)" />
          <textarea class="replyInput" placeholder="اكتب ردك..." rows="3"></textarea>
          <button class="replySend" type="button" data-action="sendReply" aria-label="إرسال">➤</button>
        </div>
      </div>
    </div>
    `;
  }).join("");

  if(loadMoreReviewsBtn){
    loadMoreReviewsBtn.style.display = shownReviewsCount >= demoReviews.length ? "none" : "inline-flex";
    updateLoadMoreBtnUI();
  }
}

function showMoreReviews(){
  if(!loadMoreReviewsBtn) return;

  // Modern loading feel
  if(loadMoreReviewsBtn.classList.contains("is-loading")) return;
  loadMoreReviewsBtn.classList.add("is-loading");
  loadMoreReviewsBtn.disabled = true;

  setTimeout(() => {
    shownReviewsCount = Math.min(shownReviewsCount + REVIEWS_STEP, demoReviews.length);
    renderDemoReviews();
    loadMoreReviewsBtn.classList.remove("is-loading");
    updateLoadMoreBtnUI();
  }, 280);
}

if(loadMoreReviewsBtn){
  loadMoreReviewsBtn.addEventListener("click", showMoreReviews);
}

// عرض أول 5 تعليقات
showMoreReviews();
updateLoadMoreBtnUI();

// ===== خيار C: تحميل تلقائي عند الوصول لأسفل القائمة (مع إبقاء زر "عرض المزيد" كاحتياطي) =====
const reviewsSentinel = document.getElementById("reviewsSentinel");
if(reviewsSentinel && ("IntersectionObserver" in window)){
  const io = new IntersectionObserver((entries) => {
    const entry = entries && entries[0];
    if(!entry || !entry.isIntersecting) return;
    // لا تُحمّل إذا قسم التعليقات مخفي
    if(reviewsSection && reviewsSection.classList.contains("hidden")) return;
    // إذا انتهت التعليقات لا تفعل شيئا
    if(shownReviewsCount >= demoReviews.length) return;
    showMoreReviews();
  }, { root: null, rootMargin: "250px 0px", threshold: 0.01 });

  io.observe(reviewsSentinel);
}


// ===== الردود على التعليقات (بدون اسم) =====
reviewsList.addEventListener("click", (e) => {
  const toggle = e.target.closest("[data-action='toggleReply']");
  const send = e.target.closest("[data-action='sendReply']");
  const item = e.target.closest(".reviewItem");
  if(!item) return;

  const idx = Number(item.dataset.idx || "0");
  const replyBox = item.querySelector("[data-replybox]");
  const nameInput = item.querySelector(".replyNameInput");
  const input = item.querySelector(".replyInput");

  if(toggle){
    if(replyBox){
      const isHidden = replyBox.style.display === "none" || !replyBox.style.display;
      replyBox.style.display = isHidden ? "flex" : "none";
      if(isHidden){
        if(nameInput) nameInput.focus();
        else if(input) input.focus();
      }
    }
    return;
  }

  if(send){
    const text = (input?.value || "").trim();
    if(!text) return;

    if(!Array.isArray(demoReviews[idx].replies)) demoReviews[idx].replies = [];
    const rName = (nameInput?.value || "").trim() || "زائر";
    demoReviews[idx].replies.push({ name: rName, text });

    // تفريغ الحقل وإغلاقه
    if(nameInput) nameInput.value = "";
    if(input) input.value = "";
    if(replyBox) replyBox.style.display = "none";

    // مودال الرد (بتأخير ثانيتين)
    openModalWithDelay("↩️ تم إرسال الرد", "تم إضافة ردك بنجاح.", 2000);

    renderDemoReviews();
  }
});


// ===== أزرار التنقل =====
if(btnFeatures){
  btnFeatures.addEventListener("click", () => preserveScroll(() => {
    setActive(btnFeatures);
    hideAllSections();
    changeTextWithAnimation("ميزات المنتج: سريع، خفيف، سهل الاستخدام.");
  }));
}

btnReviews.addEventListener("click", () => preserveScroll(() => {
  setActive(btnReviews);
  showReviews();
  changeTextWithAnimation("آراء العملاء: يمكنك قراءة التقييمات وإضافة تعليقك بالأسفل.");
}));

btnPrice.addEventListener("click", () => preserveScroll(() => {
  setActive(btnPrice);
  changeTextWithAnimation("معلومات المنتج: اضغط على أي شارة لعرض التفاصيل.");
  showProductInfo();
}));

// ===== انتقال سريع إلى قسم فوائد المنتج (من سلايدر الأعلى) =====
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-jump='benefits']");
  if(!el) return;
  e.preventDefault();
  try{ tapActive(el); }catch(_){/* ignore */}

  // بدون preserveScroll حتى لا يرجع لفوق
  setActive(btnPrice);
  changeTextWithAnimation("معلومات المنتج: اضغط على أي شارة لعرض التفاصيل.");
  showProductInfo();

  requestAnimationFrame(() => {
    if(productInfoSection) productInfoSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

btnPrivacy.addEventListener("click", () => preserveScroll(() => {
  setActive(btnPrivacy);
  showPrivacy();
  changeTextWithAnimation("الخصوصية: نلتزم بتغليف محايد وحماية بياناتك.");
}));

btnOrder.addEventListener("click", () => preserveScroll(() => {
  setActive(btnOrder);
  showOrder();
  changeTextWithAnimation("املأ نموذج الطلب بالأسفل ثم اضغط إرسال الطلب.");
}));

if(btnWarranty){
  btnWarranty.addEventListener("click", () => preserveScroll(() => {
    setActive(btnWarranty);
    showAbout();
    changeTextWithAnimation("من نحن: مركز الارتقاء الطبي.");
  }));
}
if(btnRefund){
  btnRefund.addEventListener("click", () => preserveScroll(() => {
    setActive(btnRefund);
    showWarrantyRefund();
    changeTextWithAnimation("الضمان والاسترداد: يمكنك الاطلاع على التفاصيل وتقديم طلب استرداد.");
  }));
}
// ===== تقييد رقم الهاتف: أرقام فقط + 10 أرقام =====
phoneInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "");
});

// ===== مساعد أخطاء الحقول =====
function markError(el){
  el.classList.add("fieldError");
  setTimeout(() => el.classList.remove("fieldError"), 900);
}

// ===== سعر حسب الكمية (يظهر فوق زر الإرسال) =====
function updatePriceHint(){
  if(!priceHint || !qtyInput) return;

  const q = Number(qtyInput.value || "0");
  if(!q){
    priceHint.textContent = "";
    priceHint.classList.add("hidden");
    return;
  }

  const price = (q === 1) ? 200 : (q === 2) ? 300 : 400;
  priceHint.textContent = `السعر ${price} شيكل شامل التوصيل`;
  priceHint.classList.remove("hidden");
}

if(qtyInput){
  qtyInput.addEventListener("change", updatePriceHint);
}

// ===== إرسال الطلب =====
submitOrder.addEventListener("click", () => {
  tapActive(submitOrder);

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const address = addressInput.value.trim();
  const country = countrySelect ? countrySelect.value : "";
  const city = cityInput ? cityInput.value.trim() : "";
  const qty = qtyInput.value;
  const pay = paySelect.value;
  const notes = orderNotesInput ? orderNotesInput.value.trim() : "";

  if(!name){
    markError(nameInput);
    changeTextWithAnimation("رجاءً املأ الاسم.");
    return;
  }
  if(countrySelect && !country){
    markError(countrySelect);
    changeTextWithAnimation("رجاءً اختر الدولة.");
    return;
  }
  if(cityInput && !city){
    markError(cityInput);
    changeTextWithAnimation("رجاءً اكتب المدينة.");
    return;
  }
  if(!qty){
    markError(qtyInput);
    changeTextWithAnimation("رجاءً اختر الكمية.");
    return;
  }
  if(!address){
    markError(addressInput);
    changeTextWithAnimation("رجاءً املأ العنوان.");
    return;
  }
  if(phone.replace(/\D/g,"").length < 10){
    markError(phoneInput);
    changeTextWithAnimation("رقم الهاتف غير صحيح.");
    return;
  }

  hideAllSections();

  // ✅ مودال الطلب (بتأخير ثانيتين)
  openModalWithDelay(
    "✅ تم استلام طلبك",
    `سيتم توصيل طلبك خلال <b>48 ساعة</b>.<br><br>
     <b>الاسم:</b> ${name}<br>
     <b>الهاتف:</b> ${phone}<br>
     ${country ? `<b>الدولة:</b> ${country}<br>` : ""}
     ${city ? `<b>المدينة:</b> ${city}<br>` : ""}
     <b>العنوان:</b> ${address}<br>
     <b>الكمية:</b> ${qty}<br>
     <b>الدفع:</b> ${pay === "cash" ? "عند الاستلام" : "بطاقة"}<br>
     ${notes ? `<b>ملاحظات:</b> ${notes}` : ""}`,
    2000
  );

  changeTextWithAnimation("تم استلام طلبك ✅ شكراً لك.");
});

const COMMENTED_KEY = "demo_commented_once";


// ===== زر "تفاصيل" في نموذج الطلب =====
if(policyDetails){
  policyDetails.addEventListener("click", () => {
    if(btnRefund){
      setActive(btnRefund);
      showWarrantyRefund();
    }
    // سكرول للقسم
    setTimeout(() => {
      warrantyRefundSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  });
}

// ===== زر "استخدم موقعي" =====
if(useLocationBtn && navigator.geolocation){
  useLocationBtn.addEventListener("click", () => {
    tapActive(useLocationBtn);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(5);
        const lng = pos.coords.longitude.toFixed(5);
        // تعبئة تقريبية (يمكنك لاحقًا ربطه بخدمة خرائط)
        addressInput.value = `موقعي التقريبي: ${lat}, ${lng}`;
        openModalWithDelay("📍 تم تحديد الموقع", "تم إدراج موقعك التقريبي في العنوان.", 1200);
      },
      () => openModalWithDelay("⚠️ تعذر تحديد الموقع", "يرجى السماح بالوصول للموقع أو اكتب العنوان يدويًا.", 1200),
      { enableHighAccuracy: false, timeout: 8000 }
    );
  });
}

// ===== Accordion (بطاقات بسهم) =====
document.addEventListener("click", (e) => {
  const header = e.target.closest(".accHeader");
  if(!header) return;
  const item = header.closest(".accItem");
  const body = item?.querySelector(".accBody");
  if(!item || !body) return;

  const isOpen = item.classList.contains("open");
  // أغلق الكل داخل نفس الـ accordion
  const wrap = item.closest(".accordion");
  if(wrap){
    wrap.querySelectorAll(".accItem").forEach(it => {
      it.classList.remove("open");
      const b = it.querySelector(".accBody");
      if(b) b.style.maxHeight = "0px";
    });
  }
  if(!isOpen){
    item.classList.add("open");
    body.style.maxHeight = body.scrollHeight + "px";
  }
});

// ===== إرسال طلب الاسترداد =====
if(submitRefund){
  submitRefund.addEventListener("click", () => {
    tapActive(submitRefund);

    const n = (refundName?.value || "").trim();
    const p = (refundPhone?.value || "").trim().replace(/\D/g,"");
    const r = (refundReason?.value || "").trim();

    if(!n){ if(refundName) markError(refundName); return; }
    if(!p){ if(refundPhone) markError(refundPhone); return; }
    if(!r){ if(refundReason) markError(refundReason); return; }

    openModalWithDelay("✅ تم إرسال الطلب", "تم استلام طلب الاسترداد وسيتم التواصل معك قريبًا.", 2000);

    if(refundName) refundName.value = "";
    if(refundPhone) refundPhone.value = "";
    if(refundReason) refundReason.value = "";
    if(refundPhoto) refundPhoto.value = "";
  });
}


// ===== إرسال تعليق (الاسم مطلوب + لازم تقييم + ربط التقييم بالتعليق) =====
sendReply.addEventListener("click", () => {
  tapActive(sendReply);

  const n = commentName.value.trim();
  const text = replyText.value.trim();

  if(!n){
    markError(commentName);
    changeTextWithAnimation("اكتب اسمك ثم التعليق.");
    return;
  }
  if(!text){
    markError(replyText);
    changeTextWithAnimation("اكتب تعليقك ثم اضغط إرسال.");
    return;
  }

  const ratedVal = Number(localStorage.getItem(RATED_VALUE_KEY) || "0");
  const ratedOnce = localStorage.getItem(RATED_KEY) === "1";

  if(!ratedOnce || ratedVal <= 0){
    ratingOverlay.classList.add("shake");
    setTimeout(() => ratingOverlay.classList.remove("shake"), 350);
    openModalWithDelay("⭐ التقييم مطلوب", "رجاءً قم باختيار تقييم بالنجوم قبل إرسال التعليق.", 800);
    changeTextWithAnimation("قيّم المنتج بالنجوم ثم اكتب تعليقك.");
    return;
  }

  demoReviews.unshift({
    name: n,
    stars: ratedVal,
    time: "الآن",
    text
  });

  // اجعل التعليق الجديد يظهر فورًا
  shownReviewsCount = Math.min(Math.max(shownReviewsCount, REVIEWS_STEP), demoReviews.length);


  renderDemoReviews();

  commentName.value = "";
  replyText.value = "";

  // ✅ تعليق مرة واحدة فقط
  localStorage.setItem(COMMENTED_KEY, "1");
  const formWrap = document.getElementById("commentFormWrap");
  if(formWrap) formWrap.style.display = "none";

  // ✅ مودال التعليق (بتأخير ثانيتين)
  openModalWithDelay("💬 تم إضافة تعليقك", `شكراً <b>${n}</b>! تم نشر تعليقك بنجاح.`, 2000);

  changeTextWithAnimation("تم إرسال تعليقك ✅ شكراً لك.");
});

// ✅ عند فتح الصفحة: تفعيل زر آراء العملاء تلقائياً
window.addEventListener("load", () => {
  setActive(btnReviews);
  showReviews();
  changeTextWithAnimation("آراء العملاء: يمكنك قراءة التقييمات وإضافة تعليقك بالأسفل.");
  updateMiniStarsVisibility();

  // ✅ عروض 24 ساعة (عداد يعيد تلقائياً)
  initOfferCountdown();

  // ✅ إظهار أقسام الأكوردين المفتوحة افتراضياً (خصوصاً نموذج الاسترداد)
  document.querySelectorAll(".accItem.open .accBody").forEach(body => {
    body.style.maxHeight = body.scrollHeight + "px";
  });

  // ✅ تأكيد إظهار نجوم 4.5 عند البداية إذا ما في تقييم مستخدم
  if(!locked && savedRating <= 0){
    paintStars(FAKE_AVG_RATING, "on");
  }
});

// =========================
// Offers Countdown (24h)
// =========================
function initOfferCountdown(){
  const countdownEls = Array.from(document.querySelectorAll(".offerCountdown"));
  if(!countdownEls.length) return;

  const KEY = "demo_offer_end_ms";
  const DAY = 24 * 60 * 60 * 1000;

  function getEnd(){
    const saved = Number(localStorage.getItem(KEY) || "0");
    const now = Date.now();
    if(saved && saved > now) return saved;
    const fresh = now + DAY;
    localStorage.setItem(KEY, String(fresh));
    return fresh;
  }

  function pad2(n){ return String(n).padStart(2,"0"); }

  let end = getEnd();

  function tick(){
    const now = Date.now();
    let diff = end - now;

    // إذا انتهى العرض: أعِد ضبطه 24 ساعة تلقائياً
    if(diff <= 0){
      end = now + DAY;
      localStorage.setItem(KEY, String(end));
      diff = end - now;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    const fmt = `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
    countdownEls.forEach(el => el.textContent = fmt);
  }

  tick();
  setInterval(tick, 1000);
}


/* ===== Warranty/Refund: make .wrSub collapsible (one open at a time per card) ===== */
document.addEventListener("DOMContentLoaded", () => {
  bindInfoBadges();
  // روابط السياسات أسفل معلومات المنتج
  const policyLinkWarranty = document.getElementById("policyLinkWarranty");
  const policyLinkPrivacy  = document.getElementById("policyLinkPrivacy");
  if(policyLinkWarranty){
    policyLinkWarranty.addEventListener("click", () => {
      if(btnRefund) btnRefund.click();
    });
  }
  if(policyLinkPrivacy){
    policyLinkPrivacy.addEventListener("click", () => {
      if(btnPrivacy) btnPrivacy.click();
    });
  }

  const subs = Array.from(document.querySelectorAll(".wrCard .wrSub"));
  if (!subs.length) return;

  // Wrap bodies once
  subs.forEach(sub => {
    if (sub.querySelector(".wrSubBody")) return;

    const title = sub.querySelector(".wrSubTitle");
    if (!title) return;

    const body = document.createElement("div");
    body.className = "wrSubBody";

    // move all nodes after title into body
    const nodes = [];
    let n = title.nextSibling;
    while (n) {
      const next = n.nextSibling;
      nodes.push(n);
      n = next;
    }
    nodes.forEach(node => body.appendChild(node));
    sub.appendChild(body);

    // accessibility
    title.setAttribute("role", "button");
    title.setAttribute("tabindex", "0");
  });

  const closeSub = (sub) => {
    sub.classList.remove("open");
    const body = sub.querySelector(".wrSubBody");
    if (body) body.style.maxHeight = null;
  };

  const openSub = (sub) => {
    sub.classList.add("open");
    const body = sub.querySelector(".wrSubBody");
    if (body) body.style.maxHeight = body.scrollHeight + "px";
  };

  const toggle = (sub) => {
    const card = sub.closest(".wrCard");
    // close others in same card
    card?.querySelectorAll(".wrSub.open").forEach(other => {
      if (other !== sub) closeSub(other);
    });

    if (sub.classList.contains("open")) closeSub(sub);
    else openSub(sub);
  };

  document.querySelectorAll(".wrCard .wrSubTitle").forEach(title => {
    const sub = title.closest(".wrSub");
    if (!sub) return;

    title.addEventListener("click", () => toggle(sub));
    title.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(sub); }
    });
  });
});



// ===== About accordion (scoped) =====
(function initAboutAccordion(){
  const run = () => {
    const about = document.getElementById("aboutSection");
    if(!about) return;

    const headers = about.querySelectorAll(".aboutAccH");
    const bodies  = about.querySelectorAll(".aboutAccB");
    if(!headers.length || headers.length !== bodies.length) return;

    const closeAllExcept = (keepIndex) => {
      headers.forEach((h, i) => {
        if(i !== keepIndex){
          h.classList.remove("isOpen");
          h.setAttribute("aria-expanded","false");
          bodies[i].style.maxHeight = null;
          bodies[i].setAttribute("aria-hidden","true");
        }
      });
    };

    headers.forEach((h, i) => {
      h.addEventListener("click", () => {
        const isOpen = h.classList.contains("isOpen");
        closeAllExcept(i);

        if(isOpen){
          h.classList.remove("isOpen");
          h.setAttribute("aria-expanded","false");
          bodies[i].style.maxHeight = null;
          bodies[i].setAttribute("aria-hidden","true");
        }else{
          h.classList.add("isOpen");
          h.setAttribute("aria-expanded","true");
          bodies[i].setAttribute("aria-hidden","false");
          bodies[i].style.maxHeight = bodies[i].scrollHeight + "px";
        }
      });
    });
  };

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", run);
  }else{
    run();
  }
})();


// ===== شاشة ترحيب لمدة ثانيتين (بدون لمس أي شيء آخر) =====
(function(){
  const splash = document.getElementById("welcomeSplash");
  if(!splash) return;

  // اختفاء بعد ثانيتين
  setTimeout(() => {
    splash.classList.add("hide");
    setTimeout(() => { try{ splash.remove(); }catch(e){} }, 450);
  }, 2000);
})();




// ===== Language chips (design only: change active color) =====
document.addEventListener("DOMContentLoaded", () => {
  const chips = Array.from(document.querySelectorAll(".lang-chip"));
  if (!chips.length) return;

  const setActive = (btn) => {
    chips.forEach(c => {
      const active = c === btn;
      c.classList.toggle("is-active", active);
      c.setAttribute("aria-selected", active ? "true" : "false");
    });
  };

  chips.forEach(btn => {
    btn.addEventListener("click", () => setActive(btn));
  });
});


// ===== Header offset helper =====
// Only apply body offset when the header is actually fixed.
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const isFixed = () => {
    const pos = getComputedStyle(header).position;
    return pos === "fixed" || pos === "sticky";
  };

  const applyOffset = () => {
    if (!isFixed()) {
      document.body.style.paddingTop = "0px";
      return;
    }
    const h = Math.ceil(header.getBoundingClientRect().height);
    document.body.style.paddingTop = `${h}px`;
  };

  applyOffset();
  window.addEventListener("resize", applyOffset);
});
