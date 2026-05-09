"use server";
import { createServerSupabase } from "./supabase-server";
import type { SiteSettings } from "./types";

const DEFAULT_SETTINGS: Omit<SiteSettings, "id" | "updated_at"> = {
  owner_name: "المالك",
  owner_phone: "213550000000",
  owner_email: "owner@mamabinat.dz",
  whatsapp_message: "مرحباً، أود الاستفسار عن المنزل",
  instagram: "https://instagram.com/mamabinat",
  twitter: "https://twitter.com/mamabinat",
  facebook: "",
  tagline: "بيتك في كل مكان.. مع ماما بينات",
  description: "منصة حجز وتأجير المنازل في ولاية بومرداس والجزائر",
  address: "ولاية بومرداس، الجزائر",
  support_phone: "213550000000",
  support_email: "support@mamabinat.dz",
  support_hours: "من 9 صباحاً إلى 9 مساءً",
  cancellation_policy: "يمكن إلغاء الحجز قبل 24 ساعة من تاريخ الوصول",
  privacy_policy: "نحن نحترم خصوصيتك. لن يتم مشاركة معلوماتك مع أي طرف ثالث.",
  about_us: "ماما بينات هي منصة حجز وتأجير المنازل في الجزائر، نوفر أفضل خيارات الإقامة في ولاية بومرداس.",
};

export async function getSettings() {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .single();

  if (!data) {
    // Create default settings row
    const { data: newData } = await supabase
      .from("site_settings")
      .insert(DEFAULT_SETTINGS)
      .select()
      .single();
    return newData as SiteSettings | null;
  }

  return data as SiteSettings;
}

export async function updateSettings(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData,
) {
  const supabase = await createServerSupabase();
  const raw: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    raw[key] = value.toString();
  }

  const { error } = await supabase
    .from("site_settings")
    .update(raw)
    .eq("id", raw.id);

  if (error) {
    return { error: error.message };
  }
  return { success: true };
}
