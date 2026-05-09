import Link from "next/link";
import { Heart, Home, Mail, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* معلومات المنصة */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">{SITE_CONFIG.name}</h3>
            </div>
            <p className="text-gray-300 mb-2">{SITE_CONFIG.tagline}</p>
            <p className="text-sm text-gray-400">{SITE_CONFIG.description}</p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                الرئيسية
              </Link>
              <Link
                href="/houses"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                جميع المنازل
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                لوحة التحكم
              </Link>
            </nav>
          </div>

          {/* معلومات التواصل */}
          <div>
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${SITE_CONFIG.owner.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                واتساب
              </a>
              <a
                href={`mailto:${SITE_CONFIG.owner.email}`}
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                البريد الإلكتروني
              </a>
              <div className="flex items-center gap-2 text-gray-300 mt-2">
                <Heart className="h-4 w-4 text-primary" />
                <span>نحبّ ضيوفنا ❤️</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. جميع الحقوق
            محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
