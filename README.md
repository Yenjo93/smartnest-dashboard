# SmartNest Dashboard

داشبورد لزباين Home Assistant: مخطط البيت عليه الأجهزة، وصفحات بتنبني من عناصر، وستايل Apple بهوية SmartNest.

> **EN:** A Home Assistant dashboard panel with an interactive floor plan, Apple-style controls, Arabic/English/Hebrew (RTL), a doorbell popup and a PIN-protected kiosk lock. Install through HACS as a custom repository (category: Integration), then add the "SmartNest Dashboard" integration.

## التركيب عن طريق HACS (الطريقة الأساسية)

1. بـ HA: **HACS → ⋮ → Custom repositories**، وحط رابط هاد الـ repo، والنوع **Integration**.
2. ابحث بـ HACS عن **SmartNest Dashboard**، واضغط **Download**.
3. **Restart** لـ HA.
4. **Settings → Devices & services → Add integration → SmartNest Dashboard**.

بعدها كل نسخة جديدة بتطلع عند الزبون كـ **Update** بـ HACS، وبتنزل بضغطة.

لنشر نسخة جديدة (من جهازك):

```bash
./scripts/release.sh 0.3.0 "شو الجديد"
```

---

## الفولدر

```
smartnest dashboard/
├── custom_components/smartnest/   ← هاد اللي بينسخ عند الزبون (فولدر واحد)
│   ├── __init__.py                ← بيسجّل الـ panel والـ API
│   ├── websocket.py               ← قراءة / حفظ / متابعة الإعدادات (الحفظ للأدمن بس)
│   ├── upload.py                  ← رفع صورة المخطط (PNG/JPG/WebP، للأدمن بس)
│   ├── config_flow.py             ← الإضافة من واجهة HA
│   └── frontend/                  ← الـ build + الخطوط واللوجو
├── src/                           ← كود الداشبورد (Lit + TypeScript)
├── dev/                           ← Home Assistant وهمي للتجربة على جهازك
└── scripts/deploy.sh              ← build ونسخ لزبون بأمر واحد
```

---

## التطوير على جهازك

```bash
npm install
```

```bash
npm run dev
```

افتح `http://localhost:5174/dev/index.html`. فيه أجهزة وهمية ومخطط تجريبي، وأزرار تحت عالشمال:
- **Ring:** يدق الجرس
- **Motion:** حركة بالممر
- **Admin ↔ Client:** تبديل بين الأدمن والزبون
- **Reset:** يرجّع كل شي من الأول

---

## التركيب اليدوي (بدون HACS)

1. عند الزبون، ركّب add-on **Advanced SSH & Web Terminal**.
2. من جهازك:

```bash
./scripts/deploy.sh root@IP-تبع-الزبون --restart
```

3. بـ HA: **Settings → Devices & services → Add integration → SmartNest Dashboard**. بيطلع **SmartNest** بالقائمة الجانبية.
4. اعمل للزبون مستخدم **مش أدمن**. هيك ما بيشوف زر التعديل.
5. على تابلت الحيط: سجّل دخول بحساب الزبون، وافتح `/smartnest`. ومن صفحة البروفايل خبّي باقي عناصر القائمة الجانبية.
6. ادخل بحسابك أنت (أدمن)، واضغط ✏️ عشان تعدّل:
   - **⚙️ الإعدادات:** اسم البيت، اللغة، المظهر، الجرس، شاشة التوقف
   - **المخطط:** ارفع الصورة، وبعدين "أضف جهاز" واسحبه لمكانه
   - **حفظ:** كل الشاشات المفتوحة بتتحدّث لحالها

### التحديث

```bash
./scripts/deploy.sh root@IP-تبع-الزبون
```

بعدها بـ HA: **SmartNest → ⋮ → Reload**. رقم النسخة بيطلع بالإعدادات تحت "حول".

لنسخة جديدة، غيّر `version` بـ `package.json` بس. الـ build بينسخه للـ manifest لحاله.

---

## إعداد ميزات v0.5 عند الزبون

### تابلت الحيط (Fully Kiosk Browser)
1. عالتابلت: ركّب **Fully Kiosk Browser** وفعّل رخصة **PLUS**.
2. بإعدادات Fully:
   - **Remote Administration**: شغّلها وحط password.
   - **Advanced Web Settings → Enable JavaScript Interface**: شغّلها. هيك الداشبورد بيعرف إنه هو التابلت.
   - **Kiosk Mode**: شغّلها، والرمز إلك بس.
3. بـ HA: **Add integration → Fully Kiosk Browser**، وحط IP التابلت والـ password.
4. بالداشبورد: ⚙️ الإعدادات ← "تابلت الحيط". لازم يطلع **✓ هالشاشة هي التابلت**. ومن هون بتظبط:
   - خفّف الإضاءة بالليل
   - اطفي الشاشة بعد قديش
   - صحّي الشاشة لما حدا يقرّب (**اسأل صاحب البيت أول**)

الوقت اللي بيعتبره "ليل" هو نفس أوقات "غامق من/لـ" بالمظهر.

### الأوضاع (طالع / راجع / نوم / سهرة)
1. انسخ [`ha-config/packages/smartnest_modes.yaml`](ha-config/packages/smartnest_modes.yaml) لـ `/config/packages/` عند الزبون.
2. بـ `configuration.yaml`:
   ```yaml
   homeassistant:
     packages: !include_dir_named packages
   ```
3. عدّل الأسطر اللي عليها ✏️ حسب أجهزة البيت، وبعدين Restart.
4. بالداشبورد: ✏️ ← إضافة عنصر ← **الأوضاع**.

### برواز صور العيلة
الـ integration بيعمل فولدر **Media → My media → smartnest-photos** لحاله. حط فيه صور العيلة، وشاشة التوقف بتصير برواز صور. وإذا الفولدر فاضي، بتضل الساعة.

### خلفية الطقس
بتشتغل لحالها من `weather.forecast_home`. بتقدر تغيّر المصدر أو تطفيها من الإعدادات ← الطقس.

### الغرف بتضوي
✏️ ← على المخطط اضغط **الغرف** ← **ارسم غرفة**. اضغط على كل زاوية، وبعدين على أول زاوية عشان تسكّر الغرفة. الزوايا بتلزق ببعض لحالها بين الغرف الجنب بعض. وأي ضو حاططه جوا الغرفة بيخليها تضوي بلونه.

## كيف بيشتغل

| الشي | التفاصيل |
|---|---|
| **الإعدادات** | محفوظة بـ `.storage/smartnest.dashboard`، وبتدخل بالـ backup |
| **صور المخطط** | `/config/smartnest/floorplans/`، بأسماء عشوائية (128-bit) |
| **الصلاحيات** | الكل بيقرأ، والأدمن بس بيحفظ وبيرفع (الفحص على السيرفر، مش بس بالواجهة) |
| **الكاميرات** | صورة بتتحدّث كل 10 ثواني، وبث مباشر MJPEG لما تفتح الكاميرا. بيشتغل مع أي كاميرا بيعرفها HA |
| **الجرس** | entity من نوع `event.*` أو `binary_sensor.*`. لما يدق، بتطلع نافذة على كل الشاشات المفتوحة |
| **القفل** | ما بينفتح بضغطة وحدة أبدًا. لازم ضغطتين، والثانية لازم تكون خلال 4 ثواني |
| **قفل الشاشة (kiosk)** | زر 🔒 بالبار بيخبّي قائمة HA وبيمنع الخروج من الداشبورد إلا بالرمز. الرمز إلك، وبتحطه من الإعدادات. القفل لكل جهاز لحاله. **قفل للبيت (أولاد وضيوف)، مش حماية أمنية**: للقفل الكامل استعمل Fully Kiosk Browser أو Guided Access |
| **اللغات** | عربي، إنجليزي، عبري. RTL كامل، بس المخطط ما بينقلب |
| **الخطوط والأيقونات** | Rubik (فيه عربي وعبري) وMDI، من الـ Design System |

### لازم تعرفها
- **صور المخطط بتنفتح بدون تسجيل دخول** لأي حدا بيوصل لـ HA وبيعرف اسم الملف (الاسم عشوائي وما بينخمّن). هاد نفس سلوك `/local` بـ HA. ما في صور كاميرات هون.
- ملفات **SVG ممنوعة** بالرفع، لأنها ممكن تحمل سكربت.
- لما تغيّر صورة مخطط، القديمة بتضل على الديسك. (التنظيف بنسخة جاية.)

---

## مؤجّل للنسخة الثانية (حسب اتفاقنا)
- إضاءة واقعية للغرف بالمخطط 3D (صورة لكل حالة)
- حكي بالاتجاهين مع الجرس
- layout خاص للجوال
- تكبير وتصغير المخطط بالأصابع

---

© SmartNest. All rights reserved. الكود ظاهر للتركيب عن طريق HACS بس، وممنوع نسخه أو بيعه أو إعادة نشره بدون إذن.
