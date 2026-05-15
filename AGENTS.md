<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ماما بينات - سجل التعديلات

## 9 ماي 2026 - تحسين الشريط الجانبي + صفحة إعدادات

### 1. شريط جانبي متجاوب (Responsive Sidebar)
- **قبل**: الشريط الجانبي ثابت (64 بكسل) ويأخذ مساحة حتى في الهاتف
- **بعد**: في الكمبيوتر يظهر عادي، في الهاتف ☺ همبرغر يفتح القائمة من اليسار

**الملفات المعدلة:**
- `src/components/dashboard/Sidebar.tsx` ← إعادة كتابة كاملة مع دعم الهاتف
- `src/app/dashboard/(panel)/layout.tsx` ← تغيير `flex-row` إلى `flex-col md:flex-row`

### 2. صفحة إعدادات الموقع (Site Settings)
- صفحة جديدة: `/dashboard/settings`
- تظهر في القائمة الجانبية (أيقونة الترس)
- فيها تبويبات: معلومات التواصل، روابط اجتماعية، معلومات عامة، الدعم، السياسات
- التغييرات تنعكس تلقائياً على تذييل الصفحة (Footer)

**الملفات الجديدة:**
- `src/lib/settings-actions.ts` ← رفع/تحديث الإعدادات من قاعدة البيانات
- `src/app/dashboard/(panel)/settings/page.tsx` ← صفحة الإعدادات
- `src/app/dashboard/(panel)/settings/SettingsForm.tsx` ← الفورم مقسمة لتبويبات
- `supabase-schema.sql` ← إضافة جدول `site_settings`

**الملفات المعدلة:**
- `src/lib/types.ts` ← إضافة `SiteSettings` interface
- `src/components/Footer.tsx` ← جلب البيانات من قاعدة البيانات

### 3. قاعدة البيانات (Supabase)
- جدول جديد: `site_settings`
- لتنفيذه: Supabase Dashboard → SQL Editor → الصق الكود من `supabase-schema.sql` (آخر جزء)

### 4. سير العمل للنشر (Deploy)
- استخدم Git Bash أو PowerShell
- الأوامر المختصرة:
  ```bash
  cd "C:\Users\pc\Desktop\ME_POGECT\mama-baynat"
  git add .
  git commit -m "وصف التعديل"
  git push
  ```
- أو استخدم ملف `deploy.ps1` (كليك يمين → Run with PowerShell)

### معلومات المشروع
- GitHub: https://github.com/achraf-chedjari/mama-baynat
- Netlify: https://mamabinat.netlify.app
- Supabase: https://app.supabase.com/project/lovtshehmuxfitnjltlj
- تسجيل الدخول: adel@mamabinat.dz / adel123
