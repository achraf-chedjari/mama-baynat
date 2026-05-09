import { Suspense } from "react";
import HouseCard from "@/components/HouseCard";
import SearchFilter from "@/components/SearchFilter";
import { getHouses } from "@/lib/actions";
import { MESSAGES } from "@/lib/config";
import type { House, SearchFilters } from "@/lib/types";

function filterHouses(houses: House[], filters: SearchFilters): House[] {
  return houses.filter((house) => {
    if (filters.city && house.city !== filters.city) return false;
    if (filters.minPrice !== undefined && house.price_per_night < filters.minPrice)
      return false;
    if (filters.maxPrice !== undefined && house.price_per_night > filters.maxPrice)
      return false;
    if (filters.bedrooms && house.bedrooms < filters.bedrooms) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const matchesTitle = house.title.toLowerCase().includes(q);
      const matchesCity = house.city.toLowerCase().includes(q);
      const matchesDesc = house.description.toLowerCase().includes(q);
      if (!matchesTitle && !matchesCity && !matchesDesc) return false;
    }
    return true;
  });
}

export default async function HousesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const houses = await getHouses();

  const filters: SearchFilters = {
    city: typeof params.city === "string" ? params.city : undefined,
    minPrice:
      typeof params.minPrice === "string"
        ? parseInt(params.minPrice)
        : undefined,
    maxPrice:
      typeof params.maxPrice === "string"
        ? parseInt(params.maxPrice)
        : undefined,
    bedrooms:
      typeof params.bedrooms === "string"
        ? parseInt(params.bedrooms)
        : undefined,
    query: typeof params.query === "string" ? params.query : undefined,
  };

  const filteredHouses = filterHouses(houses, filters);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary">جميع المنازل</h1>
        <p className="mt-1 text-gray-500">
          اختر منزل أحلامك من بين{" "}
          <span className="font-bold text-primary">
            {filteredHouses.length}
          </span>{" "}
          منزل متاح
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full lg:w-72 flex-shrink-0">
          <Suspense fallback={<div className="h-64 rounded-2xl bg-gray-100 animate-pulse" />}>
            <SearchFilter />
          </Suspense>
        </aside>

        <div className="flex-1">
          {filteredHouses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredHouses.map((house) => (
                <HouseCard key={house.id} house={house} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-accent/30 py-20">
              <div className="text-6xl mb-4">🏠</div>
              <p className="text-lg text-gray-600">{MESSAGES.noResults}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
