import HouseCard from "@/components/HouseCard";
import Hero from "@/components/Hero";
import { getHouses } from "@/lib/actions";
import { MESSAGES, SITE_CONFIG } from "@/lib/config";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const houses = await getHouses();
  const featuredHouses = houses.filter((h) => h.is_featured);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-secondary sm:text-3xl">
              منازل مميزة
            </h2>
            <p className="mt-1 text-gray-500">أفضل المنازل المختارة لك</p>
          </div>
          <Link
            href="/houses"
            className="hidden sm:flex items-center gap-1 rounded-full border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white"
          >
            عرض الكل
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {featuredHouses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredHouses.map((house) => (
              <HouseCard key={house.id} house={house} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-accent/30 py-16 text-center">
            <p className="text-lg text-gray-600">{MESSAGES.noHouses}</p>
          </div>
        )}
      </section>

      <section className="bg-gradient-to-l from-primary/10 to-secondary/10 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div>
              <p className="text-3xl font-bold text-primary">
                {houses.length}+
              </p>
              <p className="mt-1 text-gray-600">منزل ومنتجع</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary">٪100</p>
              <p className="mt-1 text-gray-600">رضا العملاء</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-booking">3</p>
              <p className="mt-1 text-gray-600">مدن متوفرة</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">24/7</p>
              <p className="mt-1 text-gray-600">دعم متواصل</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <p className="text-lg text-gray-500 mb-2">ثقتكم هي أساس نجاحنا</p>
          <h3 className="text-2xl font-bold text-secondary">
            {SITE_CONFIG.tagline}
          </h3>
        </div>
      </section>
    </>
  );
}
