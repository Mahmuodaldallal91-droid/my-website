(() => {
  // Keep phone inputs numeric-only (helps mobile keyboards and avoids accidental letters)
  function bindPhoneNumeric(el){
    if(!el) return;
    el.addEventListener('input', ()=>{
      const v = (el.value||'').toString();
      const cleaned = v.replace(/\D+/g,'');
      if(v !== cleaned) el.value = cleaned;
    });
  }

  function isValidPhone(v){
    const digits = (v||'').toString().replace(/\D+/g,'');
    return digits.length >= 10;
  }

  const images = [
    "assets/slider/s1.jpeg",
    "assets/slider/s2.jpeg",
    "assets/slider/s3.jpeg",
    "assets/slider/s4.jpeg",
    "assets/slider/s5.jpeg",
  ];

  const dict = {
    title: { ar: "مركز الارتقاء الطبي", en: "Medical Elevation Center", he: "מרכז העלייה הרפואי" },
    // Header subtitle split into two lines (safer than <br> with textContent)
    subtitleLine1: { ar: "منتج رايز مقدم من مركز الارتقاء الطبي", en: "Rise product presented by Medical Elevation Center", he: "מוצר Rise מוצג על ידי מרכז העלייה הרפואי" },
    productImagesTitle: { ar: "صور المنتج", en: "Product Images", he: "תמונות המוצר" },
    badgeCod: { ar: "الدفع عند الاستلام", en: "Cash on delivery", he: "תשלום במשלוח" },
    badgePrivacy: { ar: "خصوصية تامة", en: "Full privacy", he: "פרטיות מלאה" },
    badgeGuarantee: { ar: "ضمان واسترداد", en: "Guarantee & refund", he: "אחריות והחזר" },
    btnOrder: { ar: "اطلب الآن", en: "Order now", he: "הזמן עכשיו" },
    btnReviews: { ar: "آراء العملاء", en: "Customer reviews", he: "חוות דעת" },
    btnLoadMoreReviews: { ar: "عرض المزيد من آراء العملاء", en: "Load more reviews", he: "טען עוד חוות דעת" },
    reviewsCountLabel: { ar: "عدد التقييمات", en: "Ratings count", he: "מספר דירוגים" },
    reviewsAvgLabel: { ar: "متوسط التقييم", en: "Average rating", he: "דירוג ממוצע" },
    langApplying: { ar: "جارٍ تطبيق اللغة…", en: "Applying language…", he: "מיישם שפה…" },
    footerRights: { ar: "جميع الحقوق محفوظة لدى مركز الارتقاء الطبي", en: "All rights reserved to Medical Elevation Center", he: "כל הזכויות שמורות למרכז העלייה הרפואי" },
    btnGuaranteeRefund: { ar: "الضمان والاسترداد", en: "Guarantee & refund", he: "אחריות והחזר" },
    btnUsage: { ar: "طريقة الاستخدام", en: "How to use", he: "אופן שימוש" },
    btnBenefits: { ar: "فوائد المنتج", en: "Benefits", he: "יתרונות" },
    btnSuitable: { ar: "لمن يناسب؟", en: "Who is it for?", he: "למי זה מתאים?" },

    // Generic placeholder
    placeholderDesc: { ar: "ضع وصف الزر هنا", en: "Put the button description here.", he: "הכנס כאן תיאור." },
    // Section rich HTML
    benefitsHtml: { ar: `<ul class='bulletList'><li>يقضي على الارتخاء نهائيًا – يحول القضيب من حالة الضعف إلى انتصاب صلب قوي كالحديد في دقائق.</li><li>انتصاب أقوى وأكبر وأطول مدة – يعزز تدفق الدم بشكل طبيعي ليمنحك صلابة شديدة لا تنهار أثناء العلاقة.</li><li>تأخير القذف بشكل ملحوظ – تمدد الوقت بشكل طبيعي دون أي خدر أو فقدان إحساس، فتستمر أطول وتسيطر أكثر.</li><li>لا يخدر ولا يقلل الحساسية – على عكس السبرايات والكريمات المخدرة، تحافظ على كامل المتعة والإحساس الطبيعي 100%.</li><li>مفعول قوي وسريع – يبدأ التأثير خلال دقائق من الدهن، ويزداد قوة مع الاستخدام المنتظم.</li><li>نتائج فورية + تحسن مستمر – أول استخدام تشعر بالفرق، وبعد أيام/أسابيع تصبح الأداء أقوى بشكل دائم.</li><li>لا آثار جانبية مزعجة – لا صداع، لا احمرار وجه، لا خفقان قلب، لا آثار في الجسم كله – خارجي فقط وآمن.</li><li>تركيبة طبية احترافية – من مركز طبي متخصص في تل أبيب، ليست منتج عشوائي من الإنترنت.</li><li>سهل الاستخدام وسري – دهن بسيط، يمتص بسرعة، بدون رائحة قوية أو لزوجة، يناسب الاستخدام اليومي أو قبل العلاقة مباشرة.</li><li>يعيد الثقة الجنسية بالكامل – يزيل الخوف والقلق من “الفشل”، ويعيد لك السيطرة والرضا الكامل.</li><li>يرضي الشريكة بشكل أكبر – وقت أطول + انتصاب قوي = تجربة أفضل وأكثر إشباعًا لها ولك.</li><li>بديل قوي للفياجرا والسياليس – بدون حبوب، بدون مخاطر قلبية، بدون وصفة طبية، وأكثر طبيعية.</li><li>مناسب لكل الأعمار والحالات –</li></ul>`, en: `<ul class='bulletList'><li>Eliminates softness permanently – transforms the penis from weakness to rock-hard, iron-strong erection in minutes.</li><li>Stronger, bigger, and longer-lasting erection – naturally boosts blood flow to deliver intense firmness that doesn’t collapse during intercourse.</li><li>Noticeable delay of ejaculation – extends time naturally without any numbing or loss of sensation, so you last longer and stay in full control.</li><li>No numbing, no reduced sensitivity – unlike numbing sprays and creams, it preserves 100% of natural pleasure and full feeling.</li><li>Powerful and fast-acting – effects begin within minutes of application and grow stronger with regular use.</li><li>Instant results + ongoing improvement – feel the difference from the first use; after days/weeks, performance becomes permanently stronger.</li><li>No annoying side effects – no headaches, no facial flushing, no heart palpitations, no body-wide effects – topical only and completely safe.</li><li>Professional medical formula – from a specialized medical center in Tel Aviv, not some random internet product.</li><li>Easy &amp; discreet to use – simple application, fast absorption, no strong odor or stickiness, perfect for daily or right-before-intimacy use.</li><li>Fully restores sexual confidence – eliminates fear and anxiety of “failure,” giving you back complete control and satisfaction.</li><li>Greater satisfaction for your partner – longer duration + powerful erection = a better, more fulfilling experience for both of you.</li><li>Strong alternative to Viagra &amp; Cialis – no pills, no cardiac risks, no prescription needed, and far more natural.</li><li>Suitable for all ages and conditions</li></ul>`, he: `<ul class='bulletList'><li>מבטל את הרפיון לחלוטין – הופך את הפין ממצב חולשה לזקפה קשה כמו ברזל תוך דקות.</li><li>זקפה חזקה יותר, גדולה יותר וממושכת יותר – מגביר את זרימת הדם באופן טבעי כדי לתת לך קשיות עזה שלא נופלת במהלך יחסי המין.</li><li>דחיית השפיכה בצורה משמעותית – מאריך את הזמן באופן טבעי ללא כל חוסר תחושה או קהות, כך שאתה נמשך זמן רב יותר ושולט יותר.</li><li>לא ממסטל ולא מפחית רגישות – בניגוד לספריי ולקרמים ממסטלים, שומר על 100% מההנאה והתחושה הטבעית המלאה.</li><li>אפקט חזק ומהיר – ההשפעה מתחילה תוך דקות מהמריחה, ומתחזקת עם השימוש הקבוע.</li><li>תוצאות מיידיות + שיפור מתמשך – כבר בשימוש הראשון מרגישים את ההבדל, ולאחר ימים/שבועות הביצועים הופכים חזקים יותר באופן קבוע.</li><li>ללא תופעות לוואי מטרידות – ללא כאבי ראש, ללא הסמקה בפנים, ללא דופק מהיר, ללא השפעות על כל הגוף – חיצוני בלבד ובטוח לחלוטין.</li><li>נוסחה רפואית מקצועית – ממרכז רפואי מומחה בתל אביב, לא מוצר אקראי מהאינטרנט.</li><li>קל לשימוש ודיסקרטי – מריחה פשוטה, נספג במהירות, ללא ריח חזק או דביקות, מתאים לשימוש יומיומי או ממש לפני יחסי מין.</li><li>מחזיר את הביטחון המיני במלואו – מסלק את הפחד והחרדה מ”כישלון”, ומחזיר לך שליטה מלאה וסיפוק מוחלט.</li><li>מספק יותר את בת הזוג – זמן ארוך יותר + זקפה חזקה = חוויה טובה יותר ומספקת יותר לשניכם.</li><li>תחליף חזק לויאגרה ולסיאליס – ללא כדורים, ללא סיכונים לבביים, ללא מרשם רפואי, וטבעי יותר בהרבה.</li><li>מתאים לכל הגילאים ולכל המצבים –</li></ul>` },
    usageHtml: { ar: `<p class='richIntro'>للحصول على أقصى فعالية ونتائج مثالية، اتبع الخطوات التالية بدقة:</p><ol class='stepList'><li><div class='stepHead'>الإعداد الأولي</div><div class='stepBody'><p>اغسل المنطقة التناسلية بلطف بالماء الفاتر والصابون المعتدل، ثم جففها جيدًا بمنشفة نظيفة. يجب أن تكون البشرة جافة تمامًا قبل وضع المنتج.</p></div></li><li><div class='stepHead'>الكمية الموصى بها</div><div class='stepBody'><p>خذ كمية مناسبة من الدهون (حجم حبة البازلاء الكبيرة إلى حجم حبة العنب تقريبًا – ابدأ بكمية أقل في أول استخدام لاختبار الاستجابة الشخصية).</p></div></li><li><div class='stepHead'>طريقة الدهن</div><div class='stepBody'><ul class='subBullet'><li>وزّع الدهون بالتساوي على القضيب بالكامل (الجذع، الرأس، الحشفة والجلد المحيط).</li><li>دلّك بلطف بحركات دائرية منتظمة لمدة 30–60 ثانية حتى يتم امتصاص المنتج جيدًا في الجلد.</li><li>لا تفرط في الكمية للحصول على امتصاص أمثل.</li></ul></div></li><li><div class='stepHead'>وقت بدء المفعول</div><div class='stepBody'><ul class='subBullet'><li>يبدأ المفعول خلال 15 دقيقة تقريبًا بعد الدهن.</li><li>يصل التأثير إلى ذروته عادةً خلال 20–30 دقيقة، ويستمر لساعات (يزداد التحسن مع الاستخدام المنتظم).</li></ul></div></li><li><div class='stepHead'>لا حاجة للغسل بعد الدهن</div><div class='stepBody'><ul class='subBullet'><li>لا داعي لغسل القضيب أو المنطقة بعد وضع المنتج – يتم امتصاصه بالكامل ولا يترك أي بقايا أو إحساس غير مريح.</li><li>يمكنك الاستمرار في العلاقة الزوجية مباشرة بعد انتهاء فترة الانتظار (15 دقيقة فما فوق).</li></ul></div></li><li><div class='stepHead'>نصائح لنتائج أفضل</div><div class='stepBody'><ul class='subBullet'><li>استخدم المنتج قبل العلاقة بـ15–30 دقيقة للحصول على أقصى تأثير.</li><li>لتحقيق تحسن مستمر في قوة الانتصاب والتحكم في الوقت، يُفضل الاستخدام المنتظم (3–5 مرات أسبوعيًا).</li><li>يمكن استخدامه مع الواقي الذكري بعد امتصاص الدهون تمامًا (انتظر 5–10 دقائق إضافية إذا لزم الأمر).</li><li>احفظ المنتج في مكان بارد وجاف بعيدًا عن أشعة الشمس المباشرة.</li></ul></div></li></ol><div class='innerWarn'>تحذير مهم: المنتج للاستخدام الخارجي فقط. تجنب ملامسة العينين أو الأغشية المخاطية. في حال حدوث أي تهيج أو حساسية غير متوقعة، توقف عن الاستخدام فورًا واستشر طبيبك.</div>`, en: `<p class='richIntro'>For maximum effectiveness and optimal results, follow these steps precisely:</p><ol class='stepList'><li><div class='stepHead'>Initial Preparation</div><div class='stepBody'><p>Gently wash the genital area with lukewarm water and mild soap, then dry thoroughly with a clean towel. The skin must be completely dry before applying the product.</p></div></li><li><div class='stepHead'>Recommended Amount</div><div class='stepBody'><p>Take an appropriate amount of the cream (approximately the size of a large pea to a grape – start with a smaller amount on the first use to test personal response).</p></div></li><li><div class='stepHead'>Application Method</div><div class='stepBody'><ul class='subBullet'><li>Spread the cream evenly over the entire penis (shaft, head, glans, and surrounding skin).</li><li>Gently massage in circular motions for 30–60 seconds until the product is well absorbed into the skin.</li><li>Do not overuse to ensure optimal absorption.</li></ul></div></li><li><div class='stepHead'>Onset of Effect</div><div class='stepBody'><ul class='subBullet'><li>The effect begins within approximately 15 minutes after application.</li><li>It usually reaches its peak within 20–30 minutes and lasts for hours (improves with regular use).</li></ul></div></li><li><div class='stepHead'>No Need to Wash After Application</div><div class='stepBody'><ul class='subBullet'><li>There is no need to wash the penis or the area after applying the product – it is fully absorbed and leaves no residue or uncomfortable feeling.</li><li>You can proceed with intercourse immediately after the waiting period (15 minutes or more).</li></ul></div></li><li><div class='stepHead'>Tips for Better Results</div><div class='stepBody'><ul class='subBullet'><li>Use the product 15–30 minutes before intercourse for maximum effect.</li><li>For continuous improvement in erection strength and time control, regular use is recommended (3–5 times per week).</li><li>It can be used with a condom after the cream is fully absorbed (wait an additional 5–10 minutes if needed).</li><li>Store the product in a cool, dry place away from direct sunlight.</li></ul></div></li></ol><div class='innerWarn'>Important Warning: For external use only. Avoid contact with eyes or mucous membranes. In case of any unexpected irritation or allergic reaction, discontinue use immediately and consult a doctor.</div>`, he: `<p class='richIntro'>כדי להשיג את האפקטיביות המקסימלית ואת התוצאות הטובות ביותר, עקוב אחר השלבים הבאים בדיוק:</p><ol class='stepList'><li><div class='stepHead'>הכנה ראשונית</div><div class='stepBody'><p>שטוף את האזור האינטימי בעדינות במים פושרים וסבון עדין, ולאחר מכן יבש היטב במגבת נקייה. העור חייב להיות יבש לחלוטין לפני מריחת המוצר.</p></div></li><li><div class='stepHead'>הכמות המומלצת</div><div class='stepBody'><p>קח כמות מתאימה מהמשחה (גודל אפונה גדולה עד גודל ענב בערך – התחל בכמות קטנה יותר בשימוש הראשון כדי לבדוק את התגובה האישית).</p></div></li><li><div class='stepHead'>אופן המריחה</div><div class='stepBody'><ul class='subBullet'><li>פזר את המשחה באופן שווה על הפין כולו (הגוף, הראש, העטרה והעור מסביב).</li><li>עסה בעדינות בתנועות סיבוביות סדירות במשך 30–60 שניות עד שהמוצר נספג היטב בעור.</li><li>אל תשתמש בכמות מוגזמת כדי להבטיח ספיגה אופטימלית.</li></ul></div></li><li><div class='stepHead'>זמן תחילת ההשפעה</div><div class='stepBody'><ul class='subBullet'><li>ההשפעה מתחילה תוך כ-15 דקות לאחר המריחה.</li><li>השיא מגיע בדרך כלל תוך 20–30 דקות, וההשפעה נמשכת שעות (משתפרת עם השימוש הקבוע).</li></ul></div></li><li><div class='stepHead'>אין צורך בשטיפה לאחר המריחה</div><div class='stepBody'><ul class='subBullet'><li>אין צורך לשטוף את הפין או את האזור לאחר מריחת המוצר – הוא נספג לחלוטין ולא משאיר שאריות או תחושה לא נעימה.</li><li>ניתן להמשיך לקיים יחסי מין מיד לאחר תקופת ההמתנה (15 דקות ומעלה).</li></ul></div></li><li><div class='stepHead'>טיפים לתוצאות טובות יותר</div><div class='stepBody'><ul class='subBullet'><li>השתמש במוצר 15–30 דקות לפני יחסי מין כדי לקבל את האפקט המקסימלי.</li><li>לשיפור מתמשך בכוח הזקפה ובשליטה על הזמן, מומלץ שימוש קבוע (3–5 פעמים בשבוע).</li><li>ניתן להשתמש עם קונדום לאחר שהמשחה נספגה לחלוטין (חכה 5–10 דקות נוספות במידת הצורך).</li><li>אחסן את המוצר במקום קריר ויבש הרחק מאור שמש ישיר.</li></ul></div></li></ol><div class='innerWarn'>אזהרה חשובה: המוצר לשימוש חיצוני בלבד. הימנע ממגע עם העיניים או עם ריריות. במקרה של גירוי או רגישות בלתי צפויה, הפסק את השימוש מיד והתייעץ עם רופא.</div>` },
    suitableHtml: { ar: `<p class='richIntro'>لمن يناسب هذا المنتج؟
هذا المنتج مصمم خصيصًا ليكون آمنًا وفعالًا لمعظم الرجال، ويناسب الفئات التالية:</p><ul class='bulletList'><li>مناسب لجميع الأعمار – سواء كنت في العشرينيات، الثلاثينيات، الأربعينيات، الخمسينيات أو أكبر، يعمل بشكل ممتاز لتحسين الأداء الجنسي.</li><li>مناسب لمرضى القلب – لا يؤثر على ضغط الدم أو معدل ضربات القلب، ولا يحمل أي مخاطر قلبية معروفة (على عكس بعض الحبوب الفموية).</li><li>مناسب لمرضى السكري – لا يتداخل مع مستويات السكر في الدم، ولا يسبب أي اضطراب في التحكم بالسكري.</li><li>مناسب لمرضى الضغط (ارتفاع أو انخفاض) – لا يرفع أو يخفض الضغط بشكل ملحوظ، ولا يتعارض مع أدوية الضغط الشائعة.</li><li>خالٍ تمامًا من الآثار الجانبية المزعجة – لا صداع، لا احمرار وجه، لا خفقان قلب، لا دوار، ولا أي تأثير سلبي على الجسم.</li><li>خالٍ من المواد الكيميائية الضارة – تركيبة طبية موضعية آمنة، تعتمد على مكونات طبيعية ومدروسة، بدون مواد مخدرة أو كيماويات قاسية.</li></ul>`, en: `<p class='richIntro'>Who is this product suitable for?
This product is specially designed to be safe and effective for most men, and is suitable for the following groups:</p><ul class='bulletList'><li>Suitable for all ages – whether you are in your twenties, thirties, forties, fifties or older, it works excellently to improve sexual performance.</li><li>Suitable for heart patients – does not affect blood pressure or heart rate, and carries no known cardiac risks (unlike some oral pills).</li><li>Suitable for diabetes patients – does not interfere with blood sugar levels, and does not cause any disruption in diabetes control.</li><li>Suitable for blood pressure patients (high or low) – does not noticeably raise or lower blood pressure, and does not conflict with common blood pressure medications.</li><li>Completely free of annoying side effects – no headaches, no facial flushing, no heart palpitations, no dizziness, and no negative impact on the body.</li><li>Free of harmful chemicals – safe topical medical formula, based on natural and studied ingredients, without numbing agents or harsh chemicals.</li></ul>`, he: `<p class='richIntro'>למי מתאים המוצר הזה?
מוצר זה תוכנן במיוחד להיות בטוח ויעיל עבור רוב הגברים, ומתאים לקבוצות הבאות:</p><ul class='bulletList'><li>מתאים לכל הגילאים – בין אם אתה בשנות העשרים, השלושים, הארבעים, החמישים או יותר, הוא פועל מצוין לשיפור הביצועים המיניים.</li><li>מתאים לחולי לב – לא משפיע על לחץ הדם או קצב הלב, ואינו נושא סיכונים לבביים ידועים (בניגוד לכמה כדורים דרך הפה).</li><li>מתאים לחולי סוכרת – לא מפריע לרמות הסוכר בדם, ולא גורם להפרעה בשליטה על הסוכרת.</li><li>מתאים לחולי לחץ דם (גבוה או נמוך) – לא מעלה או מוריד את לחץ הדם באופן משמעותי, ולא מתנגש עם תרופות לחץ דם נפוצות.</li><li>נטול תופעות לוואי מטרידות לחלוטין – ללא כאבי ראש, ללא הסמקה בפנים, ללא דופק מהיר, ללא סחרחורת, וללא השפעה שלילית כלשהי על הגוף.</li><li>נטול חומרים כימיים מזיקים – נוסחה רפואית חיצונית בטוחה, מבוססת על רכיבים טבעיים ומדעיים, ללא חומרים ממסטלים או כימיקלים קשים.</li></ul>` },


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
    orderThanksTitle: { ar: "تم استلام طلبك", en: "Order received", he: "הזמנה התקבלה" },
    orderThanksText: { ar: "شكرًا لك! تم استلام طلبك ✅ سنتواصل معك خلال دقائق.", en: "Thanks! Your order was received ✅ We'll contact you shortly.", he: "תודה! ההזמנה התקבלה ✅ ניצור קשר בקרוב." },
    orderSendFail: { ar: "حصل خطأ أثناء إرسال الطلب. جرّب مرة أخرى.", en: "There was an error sending your order. Please try again.", he: "אירעה שגיאה בשליחת ההזמנה. נסה שוב." },
thanksRated: { ar: "تم استلام تقييمك.", en: "Rating received.", he: "הדירוג התקבל." },
alreadyRated: { ar: "تم استلام تقييمك مسبقًا.", en: "You already rated.", he: "כבר דירגת." },

    badgeCod: { ar: "الدفع عند الاستلام", en: "Cash on delivery", he: "תשלום בעת המסירה" },
    badgePrivacy: { ar: "خصوصية تامة", en: "Total privacy", he: "פרטיות מלאה" },
    badgeGuaranteeRefund: { ar: "ضمان واسترداد", en: "Guarantee & refund", he: "אחריות והחזר" },

  
    orderTrustLine1: { ar: "طلبك يتم عبر جهة طبية موثوقة", en: "Your order is handled by a trusted medical center.", he: "ההזמנה מטופלת על ידי מרכז רפואי אמין." },
    orderTrustLine2: { ar: "نلتزم بالخصوصية التامة، وتأكيد الطلب يتم بسرعة بدون أي تعقيد.", en: "We keep full privacy, and confirm orders quickly with no hassle.", he: "פרטיות מלאה ואישור הזמנה מהיר ללא סיבוך." },
    orderTrustMini: { ar: "بياناتك بأمان 🔒 • تأكيد سريع • شحن سري • دفع عند الاستلام", en: "Your data is safe 🔒 • Fast confirmation • Discreet delivery • Cash on delivery", he: "המידע שלך בטוח 🔒 • אישור מהיר • משלוח דיסקרטי • תשלום במשלוח" },

    ofNameLabel: { ar: "الاسم الكامل", en: "Full name", he: "שם מלא" },
    ofPhoneLabel: { ar: "رقم الهاتف/واتساب", en: "Phone / WhatsApp", he: "טלפון / וואטסאפ" },
    ofCountryLabel: { ar: "الدولة", en: "Country", he: "מדינה" },
    ofCityLabel: { ar: "المدينة", en: "City", he: "עיר" },
    ofAddressLabel: { ar: "العنوان التفصيلي", en: "Detailed address", he: "כתובת מפורטת" },
    ofNoteLabel: { ar: "ملاحظة (اختياري)", en: "Note (optional)", he: "הערה (אופציונלי)" },

    phPhone: { ar: "رقم الهاتف/واتساب", en: "Phone / WhatsApp", he: "טלפון / וואטסאפ" },
    phCity: { ar: "المدينة", en: "City", he: "עיר" },
    phAddress: { ar: "العنوان التفصيلي", en: "Detailed address", he: "כתובת מפורטת" },
    phOrder: { ar: "مثال: 10452", en: "Example: 10452", he: "דוגמה: 10452" },
    phNote: { ar: "ملاحظات إضافية (اختياري)", en: "Additional notes (optional)", he: "הערות נוספות (אופציונלי)" },

    countryIL: { ar: "إسرائيل", en: "Israel", he: "ישראל" },
    countryPS: { ar: "فلسطين", en: "Palestine", he: "פלסטין" },
    countryJO: { ar: "الأردن", en: "Jordan", he: "ירדן" },
    countryEG: { ar: "مصر", en: "Egypt", he: "מצרים" },
    countrySA: { ar: "السعودية", en: "Saudi Arabia", he: "ערב הסעודית" },
    countryAE: { ar: "الإمارات", en: "UAE", he: "איחוד האמירויות" },
    phReason: { ar: "اكتب السبب باختصار...", en: "Write the reason briefly...", he: "כתוב את הסיבה בקצרה..." },

    qtyLabel: { ar: "الكمية", en: "Quantity", he: "כמות" },
    qty1: { ar: "1 عبوة", en: "1 bottle", he: "בקבוק 1" },
    qty2: { ar: "2 عبوتان", en: "2 bottles", he: "2 בקבוקים" },
    qty3: { ar: "3 عبوات", en: "3 bottles", he: "3 בקבוקים" },
    totalLabel: { ar: "السعر الإجمالي", en: "Total price", he: "מחיר כולל" },
    shippingIncluded: { ar: "شامل التوصيل", en: "Delivery included", he: "כולל משלוח" },
    confirmOrder: { ar: "تأكيد الطلب", en: "Confirm order", he: "אישור הזמנה" },
    orderSuccess: { ar: "تم استلام طلبك ✅ سنتواصل معك خلال دقائق.", en: "Order received ✅ We will contact you shortly.", he: "ההזמנה התקבלה ✅ ניצור קשר בקרוב." },

    guarLead: { ar: "نلتزم بتجربة عادلة وواضحة للعميل.", en: "We commit to a fair and clear customer experience.", he: "אנו מחויבים לחוויה הוגנת וברורה ללקוח." },
    guar15min: { ar: "إذا لم تلاحظ المفعول خلال 15 دقيقة من الاستخدام الصحيح في أول تجربة، يمكنك طلب استرداد كامل المبلغ وفق الشروط أدناه.", en: "If you don’t notice an effect within 15 minutes with correct use on the first try, you can request a full refund under the conditions below.", he: "אם לא מורגש אפקט בתוך 15 דקות בשימוש נכון בפעם הראשונה, ניתן לבקש החזר מלא לפי התנאים למטה." },
    guar72h: { ar: "تقديم طلب الاسترداد خلال 72 ساعة من استلام الطلب.", en: "Submit the refund request within 72 hours of receiving the order.", he: "הגישו בקשת החזר בתוך 72 שעות מקבלת ההזמנה." },
    guarUseLimit: { ar: "استخدام المنتج مرة أو مرتين كحد أقصى (بدون استخدام مفرط).", en: "Use the product 1–2 times max (no excessive use).", he: "שימוש 1–2 פעמים לכל היותר (ללא שימוש מופרז)." },
    guarPackage: { ar: "توفر العبوة الأصلية + رقم الطلب/رقم الهاتف للتحقق.", en: "Keep the original package + order/phone number for verification.", he: "שמירת האריזה המקורית + מספר הזמנה/טלפון לאימות." },
    guarPhotos: { ar: "إرسال صور واضحة للمنتج والعبوة (للتوثيق فقط).", en: "Send clear photos of the product and package (for documentation only).", he: "שלחו תמונות ברורות של המוצר והאריזה (לתיעוד בלבד)." },
    guarNoTamper: { ar: "عدم وجود تلف متعمد أو عبث بالمنتج.", en: "No intentional damage or tampering.", he: "ללא נזק מכוון או התעסקות." },
    guarAfter: { ar: "بعد قبول الطلب يتم الرد خلال 24 ساعة واسترداد كامل المبلغ.", en: "After approval, we respond within 24 hours and refund the full amount.", he: "לאחר אישור, נענה תוך 24 שעות ונחזיר את מלוא הסכום." },
    guarPrivacy: { ar: "خصوصيتك محفوظة بالكامل، ويتم التعامل مع طلبات الضمان والاسترداد بسرية تامة.", en: "Your privacy is fully protected, and refund requests are handled confidentially.", he: "הפרטיות שלך מוגנת לחלוטין והבקשות מטופלות בסודיות מלאה." },

    refundFormTitle: { ar: "نموذج طلب الاسترداد", en: "Refund request form", he: "טופס בקשת החזר" },
    refundFormHint: { ar: "املأ البيانات التالية وسنتواصل معك خلال 24 ساعة.", en: "Fill in the details and we’ll contact you within 24 hours.", he: "מלאו את הפרטים וניצור קשר בתוך 24 שעות." },
    rfName: { ar: "الاسم الكامل", en: "Full name", he: "שם מלא" },
    rfPhone: { ar: "رقم الهاتف/واتساب", en: "Phone / WhatsApp", he: "טלפון / וואטסאפ" },
    rfOrder: { ar: "رقم الطلب", en: "Order number", he: "מספר הזמנה" },
    rfReceived: { ar: "تاريخ الاستلام", en: "Received date", he: "תאריך קבלה" },
    rfReason: { ar: "سبب طلب الاسترداد", en: "Reason for refund", he: "סיבת ההחזר" },
    rfPhotos: { ar: "صور المنتج والعبوة", en: "Product & package photos", he: "תמונות המוצר והאריזה" },
    choosePhotos: { ar: "اختيار الصور", en: "Choose photos", he: "בחר תמונות" },
    sendRefund: { ar: "إرسال طلب الاسترداد", en: "Send refund request", he: "שלח בקשת החזר" },
    refundNeedFields: { ar: "يرجى تعبئة الحقول المطلوبة وإرفاق صور.", en: "Please fill required fields and attach photos.", he: "אנא מלאו את השדות הנדרשים וצרפו תמונות." },
    refundSuccess: { ar: "تم استلام طلب الاسترداد ✅", en: "Refund request received ✅", he: "בקשת ההחזר התקבלה ✅" },


    offersTitle: { ar: "عروض اليوم", en: "Today's offers", he: "מבצעי היום" },
    offerEndsIn: { ar: "ينتهي العرض خلال", en: "Offer ends in", he: "ההצעה מסתיימת בעוד" },
    offerExpired: { ar: "انتهى العرض", en: "Offer ended", he: "המבצע הסתיים" },
    offerPack1: { ar: "عبوة واحدة", en: "1 bottle", he: "בקבוק אחד" },
    offerPack2: { ar: "عبوتين", en: "2 bottles", he: "2 בקבוקים" },
    offerPack3: { ar: "3 عبوات", en: "3 bottles", he: "3 בקבוקים" },
    buyNow: { ar: "شراء", en: "Buy", he: "קנה" },
    popularBadge: { ar: "الأكثر طلبًا", en: "Most popular", he: "הכי פופולרי" },
};

  // ---------------- Seeded Reviews (demo content) ----------------
  const seedReviews = [
  {
    "id": 1,
    "name": "יוסי כהן",
    "text": {
      "he": "ניסיתי את הדאון החיצוני הזה מהמרכז הרפואי, אחרי שבועיים כבר הרגשתי זקפה חזקה יותר בלי שום אובדן תחושה.",
      "ar": "جربت الدهون الخارجي ده من المركز الطبي، بعد أسبوعين حسيت بانتصاب أقوى بدون أي فقدان في الإحساس.",
      "en": "I tried this external cream from the medical center, after two weeks I already felt a stronger erection without any loss of sensation."
    },
    "stars": 3
  },
  {
    "id": 2,
    "name": "דניאל לוי",
    "text": {
      "he": "טוב מאוד נגד הרפיון, הזקפה נשארת יציבה והזמן מתארך בלי להרגיש “מת” כמו בספרייים אחרים.",
      "ar": "ممتاز جدًا ضد الارتخاء، الانتصاب بيبقى مستقر والوقت بيطول بدون ما أحس إني “مخدر” زي السبرايات التانية.",
      "en": "Excellent against softness, the erection stays stable and the time lasts longer without feeling “numb” like with other sprays."
    },
    "stars": 3
  },
  {
    "id": 3,
    "name": "אורן מזרחי",
    "text": {
      "he": "המריחה קלה, ספג מהר, והתוצאה – זקפה קשה יותר ויותר שליטה בקצב.",
      "ar": "الدهن سهل، بيتمتص بسرعة، والنتيجة – انتصاب أصلب وتحكم أكتر في السرعة.",
      "en": "Easy to apply, absorbs quickly, and the result — harder erection and better control over speed."
    },
    "stars": 3
  },
  {
    "id": 4,
    "name": "אלון פרץ",
    "text": {
      "he": "אחרי כמה שימושים – שיפור ברור באיכות הזקפה והשהייה ארוכה יותר, בלי תחושת קהות.",
      "ar": "بعد كام استخدام – تحسن واضح في قوة الانتصاب والتأخير، بدون فقدان الإحساس.",
      "en": "After a few uses — clear improvement in erection strength and delay, without losing feeling."
    },
    "stars": 4
  },
  {
    "id": 5,
    "name": "ניר אברמוב",
    "text": {
      "he": "מומלץ למי שרוצה פתרון חיצוני בלי כדורים, עוזר לי מאוד עם הרפיון הקל.",
      "ar": "أنصح بيه للي عايز حل خارجي بدون حبوب، ساعدني كتير في الارتخاء الخفيف.",
      "en": "Highly recommend for anyone wanting an external solution without pills, helped me a lot with mild softness."
    },
    "stars": 5
  },
  {
    "id": 6,
    "name": "רועי בן־דוד",
    "text": {
      "he": "הזקפה חזקה יותר, והקוף לא מהיר כמו פעם – הכי טוב שזה לא מאלחש.",
      "ar": "الانتصاب بقى أقوى، والقذف ما بقاش سريع زي الأول – أحسن حاجة إنه ما بيخدرش.",
      "en": "Erections became stronger, and ejaculation isn’t as quick as before — best part is it doesn’t numb anything."
    },
    "stars": 4
  },
  {
    "id": 7,
    "name": "איתי כץ",
    "text": {
      "he": "השתמשתי לפני והרגשתי את הדם זורם חזק יותר, זמן ארוך יותר בלי לאבד הנאה.",
      "ar": "دهنته قبل وحسيت الدم بيسري أقوى، وقت أطول بدون ما أفقد المتعة.",
      "en": "Applied it before and felt the blood flow stronger, longer duration without losing pleasure."
    },
    "stars": 4
  },
  {
    "id": 8,
    "name": "עידו רוזן",
    "text": {
      "he": "במרכז אמרו שזה טבעי יותר, ואכן – אין תופעות, רק שיפור.",
      "ar": "في المركز قالولي إنه أكتر طبيعية، وفعلاً – ما فيه آثار، بس تحسن.",
      "en": "At the center they said it’s more natural, and indeed — no side effects, just improvement."
    },
    "stars": 4
  },
  {
    "id": 9,
    "name": "נעם לוין",
    "text": {
      "he": "ניסיתי אחרי המלצה, התחיל לעבוד תוך ימים, זקפה מלאה והשהיה משמעותית.",
      "ar": "جربت بعد توصية، بدأ يشتغل خلال أيام، انتصاب كامل وتأخير ملحوظ.",
      "en": "Tried it after a recommendation, started working within days, full erection and noticeable delay."
    },
    "stars": 3
  },
  {
    "id": 10,
    "name": "משה אדרי",
    "text": {
      "he": "טוב יותר ממה שציפיתי, שומר על התחושה הטבעית אבל מאריך את הזמן.",
      "ar": "أحسن مما توقعت، بيحافظ على الإحساس الطبيعي لكن بيطول الوقت.",
      "en": "Better than I expected, preserves natural sensation but extends the time."
    },
    "stars": 3
  },
  {
    "id": 11,
    "name": "אבי מימון",
    "text": {
      "he": "הרפיון נעלם כמעט לגמרי, זקפה קשה והקוף מתעכב בלי בעיה.",
      "ar": "الارتخاء اختفى تقريبًا، انتصاب صلب والقذف بيتأخر بدون مشكلة.",
      "en": "The softness almost disappeared, rock-hard erection and delayed ejaculation without issues."
    },
    "stars": 5
  },
  {
    "id": 12,
    "name": "תומר חדד",
    "text": {
      "he": "מרחתי כרגיל, והתוצאה – יותר ביטחון ויותר זמן ביחד.",
      "ar": "دهنته زي العادة، والنتيجة – ثقة أكتر ووقت أطول مع بعض.",
      "en": "Applied as usual, and the result — more confidence and longer time together."
    },
    "stars": 5
  },
  {
    "id": 13,
    "name": "גיא דיין",
    "text": {
      "he": "לא מרגיש כימי, נעים על העור, והאפקט מצטבר עם הזמן.",
      "ar": "ما بيحسس كيمياوي، مريح على الجلد، والمفعول بيزيد مع الاستخدام.",
      "en": "Doesn’t feel chemical, comfortable on the skin, and the effect builds with use."
    },
    "stars": 4
  },
  {
    "id": 14,
    "name": "אופיר כהן",
    "text": {
      "he": "שיפור גדול באיכות הזקפה, והשהייה ארוכה יותר – בלי להקריב תחושה.",
      "ar": "تحسن كبير في جودة الانتصاب، والتأخير أطول – بدون التضحية بالإحساس.",
      "en": "Big improvement in erection quality, longer delay — without sacrificing sensation."
    },
    "stars": 5
  },
  {
    "id": 15,
    "name": "אלי סוויסה",
    "text": {
      "he": "אשתי שמה לב מיד, אמרה שזה שונה לטובה.",
      "ar": "مراتي لاحظت على طول، قالت إن ده مختلف للأحسن.",
      "en": "My wife noticed right away, said it’s different in a good way."
    },
    "stars": 3
  },
  {
    "id": 16,
    "name": "עמית שחר",
    "text": {
      "he": "פתרון מצוין למי שיש לו בעיה קלה-בינונית, עובד בלי תופעות.",
      "ar": "حل ممتاز للي عنده مشكلة خفيفة إلى متوسطة، شغال بدون آثار.",
      "en": "Great solution for mild to moderate issues, works without side effects."
    },
    "stars": 5
  },
  {
    "id": 17,
    "name": "שי אברהם",
    "text": {
      "he": "אחרי 3-4 שימושים – זקפה חזקה והקוף לא פתאומי.",
      "ar": "بعد 3-4 استخدامات – انتصاب قوي والقذف ما بيجيش فجأة.",
      "en": "After 3–4 applications — strong erection and ejaculation doesn’t come suddenly."
    },
    "stars": 4
  },
  {
    "id": 18,
    "name": "לירן ברק",
    "text": {
      "he": "הכי חשוב – שומר על ההנאה המלאה, לא כמו מאלחשים.",
      "ar": "أهم حاجة – بيحافظ على المتعة الكاملة، مو زي المخدرات.",
      "en": "Most important — keeps full pleasure, unlike numbing products."
    },
    "stars": 3
  },
  {
    "id": 19,
    "name": "יונתן נבון",
    "text": {
      "he": "ממליץ בחום, במיוחד אם רוצים משהו חיצוני וטבעי.",
      "ar": "أنصح بيه جدًا، خاصة لو عايزين حاجة خارجية وطبيعية.",
      "en": "Strongly recommend, especially if you want something external and natural."
    },
    "stars": 4
  },
  {
    "id": 20,
    "name": "אסף פרידמן",
    "text": {
      "he": "הזקפה נשארת קשה יותר זמן, והתחושה נשארת רגישה כמו תמיד.",
      "ar": "الانتصاب بيستمر صلب أطول، والإحساس لسة حساس زي الأول.",
      "en": "Erection stays hard longer, and sensitivity remains just like before."
    },
    "stars": 5
  },
  {
    "id": 21,
    "name": "מאור ביטון",
    "text": {
      "he": "שינוי של 180 מעלות אחרי שבוע, בלי שום קהות.",
      "ar": "تغيير 180 درجة بعد أسبوع، بدون أي خدر.",
      "en": "180-degree change after one week, zero numbness."
    },
    "stars": 4
  },
  {
    "id": 22,
    "name": "חיים עמר",
    "text": {
      "he": "טוב ללחץ לפני, מרגיש יותר רגוע וחזק.",
      "ar": "كويس للتوتر قبل العلاقة، بحس براحة وقوة أكتر.",
      "en": "Good for pre-sex anxiety, feel more relaxed and stronger."
    },
    "stars": 4
  },
  {
    "id": 23,
    "name": "יובל מלכה",
    "text": {
      "he": "ניסיתי כמה דברים, זה היחיד שלא הרגיש “מלאכותי”.",
      "ar": "جربت حاجات كتير، ده الوحيد اللي ما حسيتش إنه “صناعي”.",
      "en": "Tried many things, this is the only one that didn’t feel “artificial”."
    },
    "stars": 5
  },
  {
    "id": 24,
    "name": "נדב אשכנזי",
    "text": {
      "he": "האפקט נבנה עם השימוש, עכשיו אני שולט יותר.",
      "ar": "المفعول بيتراكم مع الاستخدام، دلوقتي أتحكم أكتر.",
      "en": "Effect accumulates with use, now I have much better control."
    },
    "stars": 3
  },
  {
    "id": 25,
    "name": "שחר אמסלם",
    "text": {
      "he": "זקפה מלאה וחזקה, זמן ארוך יותר – מושלם.",
      "ar": "انتصاب كامل وقوي، وقت أطول – مثالي.",
      "en": "Full and powerful erection, longer time — perfect."
    },
    "stars": 5
  },
  {
    "id": 26,
    "name": "קובי חן",
    "text": {
      "he": "בלי ריח חזק, סופג מהר, תוצאה אמיתית.",
      "ar": "بدون ريحة قوية، بيتمتص بسرعة، نتيجة حقيقية.",
      "en": "No strong smell, absorbs fast, real results."
    },
    "stars": 3
  },
  {
    "id": 27,
    "name": "בן לוי",
    "text": {
      "he": "עוזר גם כשעייף, הזקפה חוזרת חזק.",
      "ar": "يساعد حتى لو تعبان، الانتصاب بيرجع قوي.",
      "en": "Helps even when tired, erection comes back strong."
    },
    "stars": 5
  },
  {
    "id": 28,
    "name": "אייל גולדמן",
    "text": {
      "he": "שיפור הדרגתי אבל יציב, שווה את זה.",
      "ar": "تحسن تدريجي لكن ثابت، يستاهل.",
      "en": "Gradual but steady improvement, worth it."
    },
    "stars": 4
  },
  {
    "id": 29,
    "name": "מיכאל אזולאי",
    "text": {
      "he": "אשתי מרוצה, זה החזיר לנו את הניצוץ.",
      "ar": "مراتي راضية، رجع لنا النار شوية.",
      "en": "My wife is satisfied, it brought back some spark."
    },
    "stars": 4
  },
  {
    "id": 30,
    "name": "רפאל שטרן",
    "text": {
      "he": "פשוט מורחים ומחכים קצת – זקפה טובה והשהיה.",
      "ar": "بس ندهن ونستنى شوية – انتصاب كويس وتأخير.",
      "en": "Just apply and wait a bit — good erection and delay."
    },
    "stars": 3
  },
  {
    "id": 31,
    "name": "סהר מזרחי",
    "text": {
      "he": "לא כמו כדורים שגורמים לכאב ראש, זה נקי.",
      "ar": "مو زي الحبوب اللي بتعمل صداع، ده نظيف.",
      "en": "Not like pills that give headaches, this is clean."
    },
    "stars": 5
  },
  {
    "id": 32,
    "name": "אוריאל כהן",
    "text": {
      "he": "התחושה נשארת, אבל השליטה עלתה.",
      "ar": "الإحساس بيستمر، لكن التحكم زاد.",
      "en": "Sensation stays, but control increased."
    },
    "stars": 4
  },
  {
    "id": 33,
    "name": "יותם לנדאו",
    "text": {
      "he": "מומלץ למי שמעל 40, עוזר מאוד.",
      "ar": "أنصح بيه للي فوق الـ40، ساعد جدًا.",
      "en": "Recommend for men over 40, helped a lot."
    },
    "stars": 3
  },
  {
    "id": 34,
    "name": "דודו אברהם",
    "text": {
      "he": "זקפה קשה כמו פעם, והקוף לא מהיר.",
      "ar": "انتصاب صلب زي زمان، والقذف مو سريع.",
      "en": "Hard erection like in the old days, ejaculation not quick anymore."
    },
    "stars": 5
  },
  {
    "id": 35,
    "name": "חנן גרין",
    "text": {
      "he": "אחרי חודש – כבר הרגל טוב.",
      "ar": "بعد شهر – بقى روتين كويس.",
      "en": "After a month — became a good routine."
    },
    "stars": 5
  },
  {
    "id": 36,
    "name": "אלעד אוחנה",
    "text": {
      "he": "בלי תופעות לוואי, רק תוצאות.",
      "ar": "بدون آثار جانبية، بس نتايج.",
      "en": "No side effects, just results."
    },
    "stars": 3
  },
  {
    "id": 37,
    "name": "שמעון כהן",
    "text": {
      "he": "שומר על הכול טבעי, אבל משפר.",
      "ar": "بيحافظ على كل حاجة طبيعية، لكن بيحسن.",
      "en": "Keeps everything natural, but improves it."
    },
    "stars": 5
  },
  {
    "id": 38,
    "name": "רוני הדר",
    "text": {
      "he": "ניסיתי חצי כמות – גם זה עבד.",
      "ar": "جربت نص الكمية – برضو شغال.",
      "en": "Tried half the amount — still worked."
    },
    "stars": 5
  },
  {
    "id": 39,
    "name": "ליאור גרוס",
    "text": {
      "he": "יותר זמן לשנינו, בלי מבוכה.",
      "ar": "وقت أكتر لينا الاتنين، بدون إحراج.",
      "en": "More time for both of us, no embarrassment."
    },
    "stars": 5
  },
  {
    "id": 40,
    "name": "אבי יעקובי",
    "text": {
      "he": "האפקט מהיר יחסית, תוך דקות.",
      "ar": "المفعول سريع نسبيًا، خلال دقايق.",
      "en": "Effect is relatively quick, within minutes."
    },
    "stars": 3
  },
  {
    "id": 41,
    "name": "מתן בן־עמי",
    "text": {
      "he": "זקפה יציבה, לא נופלת באמצע.",
      "ar": "انتصاب مستقر، ما بيسقطش في النص.",
      "en": "Stable erection, doesn’t drop in the middle."
    },
    "stars": 5
  },
  {
    "id": 42,
    "name": "ירון כהן",
    "text": {
      "he": "טוב יותר מהציפיות שלי.",
      "ar": "أحسن من توقعاتي.",
      "en": "Better than my expectations."
    },
    "stars": 4
  },
  {
    "id": 43,
    "name": "אביאל צמח",
    "text": {
      "he": "מרגיש כמו גבר חדש.",
      "ar": "بحس إني راجل جديد.",
      "en": "Feel like a new man."
    },
    "stars": 3
  },
  {
    "id": 44,
    "name": "יובל כהן",
    "text": {
      "he": "אין יותר חשש מהרגע.",
      "ar": "ما فيه خوف من اللحظة الحاسمة بعد كده.",
      "en": "No more fear of the critical moment."
    },
    "stars": 4
  },
  {
    "id": 45,
    "name": "אדיר לוי",
    "text": {
      "he": "פתרון רפואי אמיתי, לא סתם.",
      "ar": "حل طبي حقيقي، مو كلام فاضي.",
      "en": "Real medical solution, not just talk."
    },
    "stars": 5
  },
  {
    "id": 46,
    "name": "ניצן רביב",
    "text": {
      "he": "שיפור באיכות ובכמות הזמן.",
      "ar": "تحسن في الجودة والمدة.",
      "en": "Improvement in quality and duration."
    },
    "stars": 3
  },
  {
    "id": 47,
    "name": "אלישע סבן",
    "text": {
      "he": "נעים לשימוש, לא דביק.",
      "ar": "مريح في الاستخدام، مو لزج.",
      "en": "Comfortable to use, not sticky."
    },
    "stars": 4
  },
  {
    "id": 48,
    "name": "אריאל רז",
    "text": {
      "he": "עוזר גם נפשית.",
      "ar": "يساعد نفسيًا كمان.",
      "en": "Helps mentally too."
    },
    "stars": 5
  },
  {
    "id": 49,
    "name": "עמרי פרץ",
    "text": {
      "he": "תוצאות עקביות.",
      "ar": "نتايج منتظمة.",
      "en": "Consistent results."
    },
    "stars": 5
  },
  {
    "id": 50,
    "name": "איתן פינטו",
    "text": {
      "he": "8/10 – שווה לנסות.",
      "ar": "8/10 – يستاهل التجربة.",
      "en": "8/10 — worth trying."
    },
    "stars": 5
  },
  {
    "id": 51,
    "name": "עידן כהן",
    "text": {
      "he": "זקפה חזקה והשהיה טבעית.",
      "ar": "انتصاب قوي وتأخير طبيعي.",
      "en": "Strong erection and natural delay."
    },
    "stars": 5
  },
  {
    "id": 52,
    "name": "גלעד לוי",
    "text": {
      "he": "בלי אובדן תחושה – זה היתרון הגדול.",
      "ar": "بدون فقدان إحساس – دي الميزة الكبيرة.",
      "en": "No loss of sensation — that’s the big advantage."
    },
    "stars": 5
  },
  {
    "id": 53,
    "name": "יוחאי שפירא",
    "text": {
      "he": "אחרי כמה ימים מרגישים את השינוי.",
      "ar": "بعد كام يوم بتحس بالتغيير.",
      "en": "After a few days you feel the change."
    },
    "stars": 3
  },
  {
    "id": 54,
    "name": "עמוס בן־דוד",
    "text": {
      "he": "מומלץ במרכזים רפואיים.",
      "ar": "موصى بيه في المراكز الطبية.",
      "en": "Recommended in medical centers."
    },
    "stars": 3
  },
  {
    "id": 55,
    "name": "נועם כהן",
    "text": {
      "he": "עובד גם כשלחוץ.",
      "ar": "شغال حتى لو متوتر.",
      "en": "Works even when stressed."
    },
    "stars": 5
  },
  {
    "id": 56,
    "name": "אלמוג אדרי",
    "text": {
      "he": "יותר ביטחון במיטה.",
      "ar": "ثقة أكتر في السرير.",
      "en": "More confidence in bed."
    },
    "stars": 4
  },
  {
    "id": 57,
    "name": "שקד לוי",
    "text": {
      "he": "אשתי שאלה מה עשיתי 😂",
      "ar": "مراتي سألتني عملت إيه 😂",
      "en": "My wife asked me what I did 😂"
    },
    "stars": 5
  },
  {
    "id": 58,
    "name": "ברק מזרחי",
    "text": {
      "he": "פשוט ויעיל.",
      "ar": "بسيط وفعال.",
      "en": "Simple and effective."
    },
    "stars": 5
  },
  {
    "id": 59,
    "name": "אורי כהן",
    "text": {
      "he": "שומר על ההנאה.",
      "ar": "بيحافظ على المتعة.",
      "en": "Preserves the pleasure."
    },
    "stars": 5
  },
  {
    "id": 60,
    "name": "רם פרץ",
    "text": {
      "he": "תוצאות אמיתיות.",
      "ar": "نتايج حقيقية.",
      "en": "Real results."
    },
    "stars": 3
  },
  {
    "id": 61,
    "name": "ניב לוי",
    "text": {
      "he": "אמין וטוב.",
      "ar": "موثوق وكويس.",
      "en": "Reliable and good."
    },
    "stars": 3
  },
  {
    "id": 62,
    "name": "שלומי חן",
    "text": {
      "he": "חזרתי להרגיש חזק.",
      "ar": "رجعت أحس إني قوي.",
      "en": "I feel strong again."
    },
    "stars": 4
  },
  {
    "id": 63,
    "name": "חגי מזרחי",
    "text": {
      "he": "חוויה טובה יותר.",
      "ar": "تجربة أحسن.",
      "en": "Better experience."
    },
    "stars": 5
  },
  {
    "id": 64,
    "name": "אופק כהן",
    "text": {
      "he": "בלי בעיות.",
      "ar": "بدون مشاكل.",
      "en": "No problems."
    },
    "stars": 4
  },
  {
    "id": 65,
    "name": "ישי לוי",
    "text": {
      "he": "יעיל מאוד.",
      "ar": "فعال جدًا.",
      "en": "Very effective."
    },
    "stars": 5
  },
  {
    "id": 66,
    "name": "אליהו דנון",
    "text": {
      "he": "שינוי גדול.",
      "ar": "تغيير كبير.",
      "en": "Big change."
    },
    "stars": 4
  },
  {
    "id": 67,
    "name": "אביב כהן",
    "text": {
      "he": "יציב וחזק.",
      "ar": "مستقر وقوي.",
      "en": "Stable and strong."
    },
    "stars": 4
  },
  {
    "id": 68,
    "name": "שמעון לוי",
    "text": {
      "he": "פתרון אמיתי.",
      "ar": "حل حقيقي.",
      "en": "Real solution."
    },
    "stars": 5
  },
  {
    "id": 69,
    "name": "טל אוחנה",
    "text": {
      "he": "טבעי יחסית.",
      "ar": "طبيعي نسبيًا.",
      "en": "Relatively natural."
    },
    "stars": 3
  },
  {
    "id": 70,
    "name": "אור כהן",
    "text": {
      "he": "הכי טוב שמצאתי – 9/10!",
      "ar": "أحسن حاجة لقيتها – 9/10!",
      "en": "The best I’ve found — 9/10!"
    },
    "stars": 5
  }
];

  const userReviews = [];
  let reviewsShown = 0;
  const INITIAL_REVIEWS = 4;
  const REVIEWS_PAGE = 5;
  let currentLang = "ar";

  function esc(str){
    return String(str)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#39;");
  }

  function avatarInitial(name){
    const n = (name||"").trim();
    if(!n) return "•";
    // For Hebrew/Arabic names, take the first visible char
    return n[0].toUpperCase();
  }

  function starsRow(n){
    const val = Math.max(1, Math.min(5, Number(n)||5));
    return "★★★★★".slice(0,val) + "☆☆☆☆☆".slice(0,5-val);
  }

  function getReviewText(r, lang){
    if(!r || !r.text) return "";
    return r.text[lang] || r.text.he || r.text.ar || r.text.en || "";
  }

  function updateReviewSummary(all, lang){
    const rsStars = document.getElementById("rsStars");
    const rsAvg = document.getElementById("rsAvg");
    const rsCount = document.getElementById("rsCount");
    if(!rsStars || !rsAvg || !rsCount) return;

    const count = (all||[]).length;
    const sum = (all||[]).reduce((a,r)=>a + (Number(r.stars)||0), 0);
    const avg = count ? (sum / count) : 0;
    const avgFixed = avg ? avg.toFixed(1) : "0.0";
    const filled = Math.max(0, Math.min(5, Math.round(avg)));
    rsStars.textContent = "★★★★★".slice(0,filled) + "☆☆☆☆☆".slice(0,5-filled);

    rsAvg.textContent = `${avgFixed}/5`;

    const countLabel = (dict.reviewsCountLabel && dict.reviewsCountLabel[lang]) || "";
    rsCount.textContent = countLabel ? `${countLabel}: ${count}` : String(count);
  }

  function renderReviews(lang, reset){
    const list = document.getElementById("reviewsList");
    const moreBtn = document.getElementById("reviewsMore");
    if(!list) return;

    if(reset){ reviewsShown = 0; }
    const all = userReviews.concat(seedReviews);

    updateReviewSummary(all, lang);

    const nextCount = (reviewsShown === 0)
      ? Math.min(all.length, INITIAL_REVIEWS)
      : all.length; // show all after first click
    const slice = all.slice(0, nextCount);
    reviewsShown = nextCount;

    list.innerHTML = "";
    slice.forEach(r=>{
      const name = r.name || "";
      const text = getReviewText(r, lang);
      const stars = r.stars || 5;

      const card = document.createElement("article");
      card.className = "reviewCard";
      card.innerHTML = `
        <div class="reviewTop">
          <div class="reviewIdentity">
            <div class="reviewAvatar" aria-hidden="true">${esc(avatarInitial(name))}</div>
            <div class="reviewName">${esc(name)}</div>
          </div>
          <div class="reviewStars" aria-label="${stars} / 5">${starsRow(stars)}</div>
        </div>
        <div class="reviewBody">${esc(text)}</div>
      `;
      list.appendChild(card);
    });

    if(moreBtn){
      const hasMore = all.length > reviewsShown;
      moreBtn.hidden = !hasMore;
      moreBtn.onclick = () => {
        // Remove focus to avoid iOS "jump"
        if(typeof moreBtn.blur === "function") moreBtn.blur();
        renderReviews(lang, false);

        // After rendering new cards: keep default scroll (do not move the page automatically)
      };
    }
  }

  const overlayEl = document.getElementById("langOverlay");
  const overlayTextEl = document.getElementById("langOverlayText");
  let overlayFailSafe = null;

  function showLangOverlay(lang){
    if(!overlayEl) return;
    const t = (dict.langApplying && dict.langApplying[lang]) || (dict.langApplying && dict.langApplying.ar) || "جارٍ تطبيق اللغة…";
    if(overlayTextEl) overlayTextEl.textContent = t;
    overlayEl.classList.add("is-on");
    overlayEl.setAttribute("aria-hidden","false");
    clearTimeout(overlayFailSafe);
    overlayFailSafe = setTimeout(hideLangOverlay, 1200);
  }
  function hideLangOverlay(){
    if(!overlayEl) return;
    overlayEl.classList.remove("is-on");
    overlayEl.setAttribute("aria-hidden","true");
    clearTimeout(overlayFailSafe);
    overlayFailSafe = null;
  }

  const setLang = (lang) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "ar" || lang === "he") ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(el => {
      if (el.hasAttribute("data-fixed-ar")) return;
      const key = el.getAttribute("data-i18n");
      const val = dict[key] && dict[key][lang];
      if (val) el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const key = el.getAttribute("data-i18n-html");
      const val = dict[key] && dict[key][lang];
      if (val) el.innerHTML = val;
    });


    
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      const val = dict[key] && dict[key][lang];
      if (val) el.setAttribute("placeholder", val);
    });

    currentLang = lang;

    // Re-render reviews for selected language
    renderReviews(lang, true);

    document.querySelectorAll(".langchip").forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    // notify other parts (pricing UI, etc.)
    try{ document.dispatchEvent(new CustomEvent("lang:changed", { detail: { lang } })); }catch(_e){}
  };

  document.querySelectorAll(".langchip").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = btn.dataset.lang;
      if(!target || target === currentLang) return;
      showLangOverlay(target);
      // let overlay paint first
      requestAnimationFrame(() => {
        try { setLang(target); }
        finally {
          setTimeout(hideLangOverlay, 260);
        }
      });
    });
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
    panels.forEach((p) => {
      const isTarget = p === panelEl;
      p.classList.toggle("is-open", isTarget);
      // Smooth accordion height without clipping on mobile
      if (isTarget) {
        // allow layout to settle then measure
        requestAnimationFrame(() => {
          p.style.maxHeight = p.scrollHeight + "px";
        });
      } else {
        p.style.maxHeight = "0px";
      }
    });
  };

  // Recalculate open accordion height on resize/orientation change (fix iOS clipping)
  window.addEventListener("resize", () => {
    const open = document.querySelector(".sectionPanel.is-open");
    if (open) open.style.maxHeight = open.scrollHeight + "px";
  });
  window.addEventListener("orientationchange", () => {
    const open = document.querySelector(".sectionPanel.is-open");
    if (open) open.style.maxHeight = open.scrollHeight + "px";
  });


  function getStickyOffset(){
    const langbar = document.querySelector(".langbar");
    const h = langbar ? langbar.getBoundingClientRect().height : 0;
    return h;
  }

  function scrollToButtonTop(btn){
    // User requested: do not auto-scroll on any button.
    if(!btn) return;
    if(typeof btn.blur === "function") btn.blur();
  }

  
  // Smooth scroll helpers (cross-browser, duration-controlled)
  function easeInOutCubic(t){ return t<0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }

  function smoothScrollToY(y, durationMs){
    // Default behavior: immediate scroll (no custom animation)
    try{ window.scrollTo(0, Math.max(0, Math.round(y||0))); }catch(_e){}
  }

  function getStickyOffset(){
    // Only consider the small language bar (not the big header)
    const langbar = document.querySelector(".langbar");
    if(!langbar) return 0;
    const rect = langbar.getBoundingClientRect();
    return rect.height || 0;
  }

  function scrollElementToCenter(el, durationMs){
    // Default scrolling: align to the start of the element (no centering, no custom animation)
    if(!el) return;
    try{
      el.scrollIntoView({behavior: "auto", block: "start"});
    }catch(_e){
      // Fallback for older browsers
      const top = (el.getBoundingClientRect().top + (window.pageYOffset||0));
      window.scrollTo(0, top);
    }
  }

  function scrollSectionToCenter(sectionEl, durationMs){
    // Keep name for compatibility with existing code, but use default scrolling behavior
    if(!sectionEl) return;
    scrollElementToCenter(sectionEl, durationMs);
  }

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

      // Scroll to the start of the opened section (stable across Safari/Android)
      try{
        const offset = getStickyOffset ? getStickyOffset() : 0;
        const y = (el.getBoundingClientRect().top + (window.pageYOffset||0)) - offset - 8;
        if (typeof window.scrollTo === "function"){
          try{
            window.scrollTo({ top: Math.max(0, Math.round(y)), behavior: "smooth" });
          // second correction after panel expands (Safari/iOS)
          setTimeout(()=>{
            try{
              const y2 = (el.getBoundingClientRect().top + (window.pageYOffset||0)) - offset - 8;
              window.scrollTo({ top: Math.max(0, Math.round(y2)), behavior: "auto" });
            }catch(_e){}
          }, 260);
          }catch(_e){
            window.scrollTo(0, Math.max(0, Math.round(y)));
          }
        }
      }catch(_e){}

      if(typeof btn.blur === "function") btn.blur();
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
      const avatar = makeAvatarInitial(name);      userReviews.unshift({ name: name, text: { ar: comment, en: comment, he: comment }, stars: ratingForCard });
      renderReviews(currentLang, true);

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



  // ---------- Order quantity & pricing ----------
  const qtySelect = document.getElementById("qtySelect");
  const totalPrice = document.getElementById("totalPrice");
  const prices = { "1": 29, "2": 50, "3": 70 };

  const currencyLabelByLang = {
    ar: "دينار أردني",
    en: "JOD",
    he: "דינר ירדני",
  };

  function formatPrice(amount, lang){
    const c = currencyLabelByLang[lang] || currencyLabelByLang.ar;
    // Arabic keeps the full currency name; other languages use short label
    return lang === "ar" ? `${amount} ${c}` : `${amount} ${c}`;
  }

  const updateTotal = () => {
    if (!qtySelect || !totalPrice) return;
    const v = qtySelect.value || "1";
    const amount = prices[v] ?? prices["1"];
    totalPrice.textContent = formatPrice(amount, currentLang);
  };
  if (qtySelect) qtySelect.addEventListener("change", updateTotal);
  updateTotal();

  function updateOfferPricesUI(lang){
    const l = lang || currentLang;
    document.querySelectorAll(".offerChip").forEach(ch => {
      const q = String(ch.getAttribute("data-offer") || "1");
      const amount = prices[q] ?? prices["1"];
      const priceEl = ch.querySelector(".offerPrice");
      if (priceEl) priceEl.textContent = formatPrice(amount, l);
    });
  }

  // When language changes, refresh currency labels
  document.addEventListener("lang:changed", (e)=>{
    const l = e?.detail?.lang || currentLang;
    try{ updateTotal(); }catch(_e){}
    try{ updateOfferPricesUI(l); }catch(_e){}
  });

  // Initial paint for offers
  updateOfferPricesUI(currentLang);

  // ---------- Offers (bundles) ----------
  const offerTimer = document.getElementById("offerTimer");
  const offersBar = document.querySelector(".offersBar");
  const offerChips = Array.from(document.querySelectorAll(".offerChip"));
  const offerBuyButtons = Array.from(document.querySelectorAll(".offerBuy"));
  const orderPanel = document.getElementById("order");

  const OFFER_KEY = "ertqaa_offerEndsAt_v1";
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  function getOfferEndsAt(){
    try{
      const raw = localStorage.getItem(OFFER_KEY);
      const n = raw ? Number(raw) : 0;
      if (n && Number.isFinite(n) && n > Date.now()) return n;
    }catch(_e){}
    const ends = Date.now() + ONE_DAY_MS;
    try{ localStorage.setItem(OFFER_KEY, String(ends)); }catch(_e){}
    return ends;
  }

  const offerEndsAt = getOfferEndsAt();

  function pad2(x){ return String(Math.max(0, Math.floor(x))).padStart(2, "0"); }

  function updateOfferTimer(){
    if(!offerTimer) return;
    const left = offerEndsAt - Date.now();
    if(left <= 0){
      offerTimer.textContent = t("offerExpired");
      return;
    }
    const h = Math.floor(left / 3600000);
    const m = Math.floor((left % 3600000) / 60000);
    const s = Math.floor((left % 60000) / 1000);
    offerTimer.textContent = `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
  }

  updateOfferTimer();
  setInterval(updateOfferTimer, 1000);

  function selectOffer(qty){
    const q = String(qty || "1");
    // highlight
    offerChips.forEach(ch => ch.classList.toggle("is-selected", ch.getAttribute("data-offer") === q));
    // set qty + update total (uses the pricing logic already in this file)
    if (qtySelect){
      qtySelect.value = q;
      try{ updateTotal(); }catch(_e){}
      // trigger change for any listeners
      try{ qtySelect.dispatchEvent(new Event("change", { bubbles:true })); }catch(_e){}
    }
  }

  function scrollToSectionStart(el){
    if(!el) return;
    const doScroll = (behavior)=>{
      try{
        const offset = (typeof getStickyOffset === "function") ? getStickyOffset() : 0;
        const y = (el.getBoundingClientRect().top + (window.pageYOffset||0)) - offset - 8;
        const top = Math.max(0, Math.round(y));
        try{
          window.scrollTo({ top, behavior });
        }catch(_e){
          window.scrollTo(0, top);
        }
      }catch(_e){}
    };

    // First pass: smooth scroll to the start
    doScroll("smooth");

    // Second pass: after layout/accordion settles (Safari/iOS), correct to exact start
    try{
      setTimeout(()=>doScroll("auto"), 260);
    }catch(_e){}
  }

  offerBuyButtons.forEach((btn)=>{
    btn.addEventListener("click", (e)=>{
      e.preventDefault();
      e.stopPropagation();
      const chip = btn.closest(".offerChip");
      const q = chip ? chip.getAttribute("data-offer") : "1";
      selectOffer(q);

      // Open order panel and scroll to it
      if (orderPanel){
        try{ openPanel(orderPanel); }catch(_e){}
        // Allow accordion to open first, then scroll
        setTimeout(()=>scrollToSectionStart(orderPanel), 60);
        // Safari layout settle fix
        setTimeout(()=>scrollToSectionStart(orderPanel), 240);
      }

      if (typeof btn.blur === "function") btn.blur();
    });
  });



  // Order form submit (FormSubmit AJAX — no redirect)
  const orderForm = document.getElementById("orderForm");
  const ofSubmit = document.getElementById("ofSubmit");
  const ofSuccess = document.getElementById("ofSuccess");
  const orderModal = document.getElementById("orderModal");

  const openOrderModal = () => {
    if (!orderModal) return;
    orderModal.classList.add("is-open");
    orderModal.setAttribute("aria-hidden", "false");
  };
  const closeOrderModal = () => {
    if (!orderModal) return;
    orderModal.classList.remove("is-open");
    orderModal.setAttribute("aria-hidden", "true");
  };

  if (orderModal) {
    orderModal.addEventListener("click", (e) => {
      const t = e.target;
      if (t && (t.hasAttribute("data-order-close") || t.closest?.("[data-order-close]"))) {
        closeOrderModal();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeOrderModal();
    });
  }

  // Numeric-only phone fields (order + refund)
  bindPhoneNumeric(document.getElementById("ofPhone"));
  bindPhoneNumeric(document.getElementById("rfuPhone"));
  if (orderForm && ofSubmit) {
    orderForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Validate required fields + phone length
      ofSuccess && (ofSuccess.hidden = true);

      const name = (document.getElementById("ofName")?.value || "").trim();
      const phone = (document.getElementById("ofPhone")?.value || "").trim();
      const country = (document.getElementById("ofCountry")?.value || "").trim();
      const city = (document.getElementById("ofCity")?.value || "").trim();
      const addr = (document.getElementById("ofAddress")?.value || "").trim();
      const qty = (document.getElementById("qtySelect")?.value || "").trim();

      if (!name || !phone || !country || !city || !addr || !qty || !isValidPhone(phone)) {
        if (orderForm.reportValidity) orderForm.reportValidity();
        return;
      }

      // Fill FormSubmit hidden fields (offer + total) right before submit
      const offerChip = document.querySelector(".offerChip.is-selected") || document.querySelector(".offerChip.is-popular") || document.querySelector(".offerChip");
      const offerName = offerChip?.querySelector(".offerQty")?.textContent?.trim() || "";
      const totalText = document.getElementById("totalPrice")?.textContent?.trim() || "";

      const hiddenOffer = document.getElementById("ofOfferName");
      const hiddenTotal = document.getElementById("ofTotalHidden");
      if (hiddenOffer) hiddenOffer.value = offerName;
      if (hiddenTotal) hiddenTotal.value = totalText;

      // Loading state
      ofSubmit.classList.add("isLoading");
      ofSubmit.disabled = true;

      try {
        const res = await fetch(orderForm.action, {
          method: "POST",
          body: new FormData(orderForm),
          headers: { "Accept": "application/json" }
        });

        if (!res.ok) throw new Error("bad_status");

        // Success
        openOrderModal();
        try { orderForm.reset(); } catch(_e) {}
      } catch (err) {
        // Fallback: small inline message (no redirect)
        if (ofSuccess) {
          ofSuccess.hidden = false;
          ofSuccess.textContent = (dict?.orderSendFail?.[currentLang] || "There was an error sending your order. Please try again.");
        } else {
          alert(dict?.orderSendFail?.[currentLang] || "There was an error sending your order. Please try again.");
        }
      } finally {
        ofSubmit.classList.remove("isLoading");
        ofSubmit.disabled = false;
      }
    });

  // ---------- Refund form: preview + submit ----------
  const rfuPhotos = document.getElementById("rfuPhotos");
  const rfuPreview = document.getElementById("rfuPreview");
  const refundForm = document.getElementById("refundRequestForm");
  const rfuSubmit = document.getElementById("rfuSubmit");
  const rfuError = document.getElementById("rfuError");
  const rfuSuccess = document.getElementById("rfuSuccess");

  const clearPreview = () => {
    if (!rfuPreview) return;
    rfuPreview.innerHTML = "";
  };

  if (rfuPhotos && rfuPreview) {
    rfuPhotos.addEventListener("change", () => {
      clearPreview();
      const files = Array.from(rfuPhotos.files || []);
      files.slice(0, 6).forEach(file => {
        const url = URL.createObjectURL(file);
        const box = document.createElement("div");
        box.className = "pv";
        const img = document.createElement("img");
        img.src = url;
        img.alt = "photo";
        box.appendChild(img);
        rfuPreview.appendChild(box);
      });
    });
  }

  const hasValue = (id) => {
    const el = document.getElementById(id);
    return el && String(el.value || "").trim().length > 0;
  };

  if (refundForm && rfuSubmit) {
    refundForm.addEventListener("submit", (e) => {
      e.preventDefault();
      rfuError && (rfuError.hidden = true);
      rfuSuccess && (rfuSuccess.hidden = true);

      const phoneVal = (document.getElementById("rfuPhone")?.value || "").trim();
      const ok = hasValue("rfuName") && hasValue("rfuPhone") && hasValue("rfuReceived") && hasValue("rfuReason") && isValidPhone(phoneVal);
      const hasPhotos = rfuPhotos && (rfuPhotos.files || []).length > 0;

      if (!ok || !hasPhotos) {
        if (rfuError) rfuError.hidden = false;
        if (refundForm.reportValidity) refundForm.reportValidity();
        return;
      }

      rfuSubmit.classList.add("isLoading");
      rfuSubmit.disabled = true;

      setTimeout(() => {
        rfuSubmit.classList.remove("isLoading");
        rfuSubmit.disabled = false;
        if (rfuSuccess) rfuSuccess.hidden = false;
      }, 750);
    });
  }

}
})();