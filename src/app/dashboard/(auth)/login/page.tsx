"use client";
import { useState } from "react";
import { Home, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { SITE_CONFIG, MESSAGES } from "@/lib/config";
import { loginAdmin } from "@/lib/auth-actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await loginAdmin(email, password);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Home className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-secondary">{SITE_CONFIG.name}</h1>
          <p className="mt-1 text-gray-500">تسجيل الدخول إلى لوحة التحكم</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mamabaynat.com"
                className="w-full rounded-xl border border-gray-200 py-2.5 pr-10 pl-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
                dir="ltr"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              كلمة السر
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 py-2.5 pr-10 pl-10 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? MESSAGES.loading : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
