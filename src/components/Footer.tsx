import Link from "next/link";
import { Heart, Home, Mail, Phone, Globe } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { getSettings } from "@/lib/settings-actions";

export default async function Footer() {
  let settings;

  try {
    settings = await getSettings();
  } catch {
    settings = null;
  }

  const ownerPhone = settings?.owner_phone || SITE_CONFIG.owner.phone;
  const ownerEmail = settings?.owner_email || SITE_CONFIG.owner.email;
  const tagline = settings?.tagline || SITE_CONFIG.tagline;
  const description = settings?.description || SITE_CONFIG.description;
  const instagram = settings?.instagram || SITE_CONFIG.social.instagram;
  const twitter = settings?.twitter || "";

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
            <p className="text-gray-300 mb-2">{tagline}</p>
            <p className="text-sm text-gray-400">{description}</p>
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
                href={`https://wa.me/${ownerPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                واتساب
              </a>
              <a
                href={`mailto:${ownerEmail}`}
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                البريد الإلكتروني
              </a>
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  إنستغرام
                </a>
              )}
              {twitter && (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  تويتر
                </a>
              )}
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
