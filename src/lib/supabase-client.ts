import { createBrowserClient } from "@supabase/ssr";
import { SITE_CONFIG } from "./config";

export function createBrowserSupabase() {
  const supabaseUrl = SITE_CONFIG.supabase.url;
  const supabaseAnonKey = SITE_CONFIG.supabase.anonKey;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key must be set in .env.local");
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    cookieOptions: {
      name: "sb-mamabaynat-auth",
    },
  });
}
