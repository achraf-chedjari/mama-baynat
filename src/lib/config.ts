// ============================================================
// ملف الإعدادات المركزية لمنصة "ماما بينات"
// قم بتعديل هذا الملف فقط لتغيير أي إعدادات عامة
// ============================================================

export const SITE_CONFIG = {
  name: "ماما بينات",
  tagline: "بيتك في كل مكان.. مع ماما بينات",
  description: "منصة حجز وتأجير المنازل في ولاية بومرداس والجزائر",
  colors: {
    primary: "#FF6B35",
    secondary: "#004E89",
    accent: "#F7C59F",
    booking: "#2EC4B6",
  },
  owner: {
    name: "المالك",
    phone: "213550000000",
    whatsappMessage: "مرحباً، أود الاستفسار عن المنزل",
    email: "owner@mamabinat.dz",
  },
  social: {
    instagram: "https://instagram.com/mamabinat",
    twitter: "https://twitter.com/mamabinat",
    whatsapp: "https://wa.me/213550000000",
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  },
} as const;

export const CURRENCY = {
  symbol: "د.ج",
  code: "DZD",
  label: "دينار جزائري",
  locale: "ar-DZ",
} as const;

export const CITIES = [
  "بني حواء",
  "الدومية",
  "وادقوسين",
] as const;

export const PRICE_RANGES = [
  { label: `أقل من 3000 ${CURRENCY.symbol}`, min: 0, max: 3000 },
  { label: `3000 - 6000 ${CURRENCY.symbol}`, min: 3000, max: 6000 },
  { label: `6000 - 10000 ${CURRENCY.symbol}`, min: 6000, max: 10000 },
  { label: `أكثر من 10000 ${CURRENCY.symbol}`, min: 10000, max: Infinity },
] as const;

// رسائل الخطأ والحالات المختلفة
export const MESSAGES = {
  noHouses: "لا توجد منازل متاحة حاليًا",
  noResults: "لا توجد نتائج للبحث، حاول بتعديل معايير البحث",
  error: "حدث خطأ، يرجى المحاولة لاحقًا",
  bookingSuccess: "تم إرسال طلب الحجز بنجاح! سنتواصل معك قريبًا",
  bookingError: "عذراً، حدث خطأ أثناء إرسال الحجز",
  loading: "جارٍ التحميل...",
  required: "هذا الحقل مطلوب",
  invalidPhone: "يرجى إدخال رقم هاتف صحيح",
} as const;
