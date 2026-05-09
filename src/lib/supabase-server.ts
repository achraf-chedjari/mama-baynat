import { createServerClient as createSSRServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SITE_CONFIG } from "./config";

export async function createServerSupabase() {
  const supabaseUrl = SITE_CONFIG.supabase.url;
  const supabaseAnonKey = SITE_CONFIG.supabase.anonKey;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key must be set in .env.local");
  }

  const cookieStore = await cookies();
  return createSSRServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {}
      },
    },
  });
}

export async function getSession() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getSession();
  return data.session;
}
