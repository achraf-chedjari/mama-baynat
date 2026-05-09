"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

function createSessionToken(id: string, role: string): string {
  const payload = JSON.stringify({
    id,
    role,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
  const base64 = Buffer.from(payload).toString("base64");
  const signature = crypto
    .createHmac("sha256", process.env.SESSION_SECRET || "mama-baynat-default-secret")
    .update(base64)
    .digest("hex");
  return `${base64}.${signature}`;
}

function verifySessionToken(token: string): { id: string; role: string } | null {
  try {
    const [base64, signature] = token.split(".");
    if (!base64 || !signature) return null;
    const expected = crypto
      .createHmac("sha256", process.env.SESSION_SECRET || "mama-baynat-default-secret")
      .update(base64)
      .digest("hex");
    if (signature !== expected) return null;
    const payload = JSON.parse(Buffer.from(base64, "base64").toString());
    if (payload.exp < Date.now()) return null;
    return { id: payload.id, role: payload.role };
  } catch {
    return null;
  }
}

export async function loginAdmin(email: string, password: string) {
  const { createServerSupabase } = await import("./supabase-server");
  const supabase = await createServerSupabase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  });

  if (error || !data.user) {
    return { error: "البريد الإلكتروني أو كلمة السر غير صحيحة" };
  }

  const cookieStore = await cookies();
  const token = createSessionToken(data.user.id, "admin");
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
  redirect("/dashboard");
}

export async function logoutAdmin() {
  const { createServerSupabase } = await import("./supabase-server");
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/dashboard/login");
}

export async function checkAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session?.value) return false;
  return verifySessionToken(session.value) !== null;
}
