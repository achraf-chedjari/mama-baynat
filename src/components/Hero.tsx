import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      {/* صورة الخلفية */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* المحتوى */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-4 animate-fadeIn">
          {SITE_CONFIG.name}
        </h1>
        <p className="text-xl text-white/90 sm:text-2xl mb-8 animate-slideUp">
          {SITE_CONFIG.tagline}
        </p>

        {/* شريط البحث */}
        <div className="mx-auto max-w-2xl animate-slideUp">
          <Link
            href="/houses"
            className="group flex items-center gap-3 rounded-full bg-white/95 px-6 py-4 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl"
          >
            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="flex-1 text-right text-gray-500">
              ابحث عن وجهتك المثالية...
            </span>
            <span className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-all group-hover:bg-primary/90">
              <Search className="h-4 w-4" />
              بحث
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
