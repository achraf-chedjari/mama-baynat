// Script إعداد قاعدة بيانات Supabase
// قم بتشغيل هذا الملف: node scripts/setup-db.mjs
// أو اتبع التعليمات يدوياً

const SUPABASE_URL = "https://lovtshehmuxfitnjltlj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_8vH11xAajDXhi6Di50LT5w_5y3tJuOE";
const PROJECT_REF = "lovtshehmuxfitnjltlj";

async function main() {
  console.log("🚀 بدء إعداد قاعدة بيانات ماما بينات...\n");

  // 1. التحقق من الاتصال
  console.log("📡 التحقق من الاتصال بـ Supabase...");
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/settings`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    });
    if (res.ok) {
      console.log("✅ الاتصال بـ Supabase ناجح!\n");
    } else {
      console.log("⚠️  لا يمكن الاتصال، قد تحتاج لتشغيل SQL يدوياً\n");
    }
  } catch {
    console.log("⚠️  فشل الاتصال\n");
  }

  // 2. محاولة إنشاء الجداول عبر API
  console.log("📦 محاولة إنشاء الجداول...");

  const { execSync } = await import("child_process");

  // المحاولة الأولى: استخدام supabase CLI مع --linked
  try {
    console.log("محاولة 1: supabase db query --linked");
    execSync(`npx supabase db query "SELECT 1" --linked`, {
      stdio: "pipe",
      timeout: 15000,
      env: { ...process.env, SUPABASE_ACCESS_TOKEN: SUPABASE_ANON_KEY },
    });
    console.log("✅ CLI متصل! محاولة تشغيل SQL...");

    const sql = require("fs").readFileSync("supabase/migrations/20260101000000_init.sql", "utf8");
    execSync(`npx supabase db query "${sql.replace(/"/g, '\\"')}" --linked`, {
      stdio: "inherit",
      timeout: 30000,
      env: { ...process.env, SUPABASE_ACCESS_TOKEN: SUPABASE_ANON_KEY },
    });
    console.log("✅ تم إنشاء الجداول بنجاح عبر CLI!");
    return;
  } catch (e) {
    console.log("❌ فشلت المحاولة 1:", e.message?.split("\n")[0] || e);
  }

  // المحاولة الثانية: استخدام Management API
  try {
    console.log("\nمحاولة 2: Supabase Management API");
    const sql = require("fs").readFileSync("supabase/migrations/20260101000000_init.sql", "utf8");
    const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ query: sql }),
    });
    if (res.ok) {
      console.log("✅ تم إنشاء الجداول بنجاح عبر Management API!");
      return;
    } else {
      const err = await res.text();
      console.log(`❌ فشلت المحاولة 2: ${err.slice(0, 100)}`);
    }
  } catch (e) {
    console.log("❌ فشلت المحاولة 2:", e.message?.split("\n")[0] || e);
  }

  // المحاولة الثالثة: SQL API endpoint
  try {
    console.log("\nمحاولة 3: SQL API endpoint");
    const sql = require("fs").readFileSync("supabase/migrations/20260101000000_init.sql", "utf8");
    const res = await fetch(`${SUPABASE_URL}/sql/v1/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ query: sql }),
    });
    if (res.ok) {
      console.log("✅ تم إنشاء الجداول بنجاح عبر SQL API!");
      return;
    } else {
      const err = await res.text();
      console.log(`❌ فشلت المحاولة 3: ${err.slice(0, 100)}`);
    }
  } catch (e) {
    console.log("❌ فشلت المحاولة 3:", e.message?.split("\n")[0] || e);
  }

  // جميع المحاولات فشلت
  console.log("\n" + "=".repeat(60));
  console.log("⚠️  لم نتمكن من إنشاء الجداول تلقائياً.");
  console.log("يرجى اتباع الخطوات التالية يدوياً:");
  console.log("=".repeat(60));
  console.log(`
1. اذهب إلى Supabase Dashboard:
   https://supabase.com/dashboard/project/${PROJECT_REF}

2. افتح SQL Editor من القائمة الجانبية

3. انسخ محتوى الملف التالي والصقه في SQL Editor:
   📄 supabase/migrations/20260101000000_init.sql
   (أو الملف الأصلي: supabase-schema.sql)

4. اضغط Run لتشغيل الأمر

5. بعد ذلك، اذهب إلى Authentication > Users
   وأضف مستخدم جديد (بريد إلكتروني + كلمة سر)
   هذا سيكون حساب المدير الخاص بك

6. أدخل بيانات المستخدم في صفحة تسجيل الدخول:
   /dashboard/login
`);
}

main().catch(console.error);
