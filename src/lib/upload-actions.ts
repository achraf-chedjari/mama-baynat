"use server";

import { createServerSupabase } from "./supabase-server";

export async function uploadHouseImage(formData: FormData): Promise<string> {
  const file = formData.get("file") as File;
  if (!file) throw new Error("لم يتم اختيار ملف");

  if (!file.type.startsWith("image/")) {
    throw new Error("يرجى اختيار صورة فقط");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("حجم الصورة يجب أن لا يتجاوز 5 ميغابايت");
  }

  const supabase = await createServerSupabase();
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
  const filePath = `houses/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("house-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error("فشل رفع الصورة: " + uploadError.message);
  }

  const { data: urlData } = supabase.storage
    .from("house-images")
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

export async function deleteHouseImage(imageUrl: string) {
  const supabase = await createServerSupabase();
  const pathMatch = imageUrl.match(/house-images\/(.+)$/);
  if (!pathMatch) return;

  await supabase.storage
    .from("house-images")
    .remove([pathMatch[1]]);
}
