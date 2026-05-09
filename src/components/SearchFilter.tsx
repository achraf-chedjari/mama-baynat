"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, DollarSign, Bed, X } from "lucide-react";
import { CITIES, PRICE_RANGES } from "@/lib/config";

export default function SearchFilter() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (priceRange) {
      const range = PRICE_RANGES[parseInt(priceRange)];
      if (range) {
        params.set("minPrice", range.min.toString());
        if (range.max !== Infinity) params.set("maxPrice", range.max.toString());
      }
    }
    if (bedrooms) params.set("bedrooms", bedrooms);

    const query = params.toString();
    router.push(`/houses${query ? `?${query}` : ""}`);
  };

  const clearFilters = () => {
    setCity("");
    setPriceRange("");
    setBedrooms("");
    router.push("/houses");
  };

  const hasFilters = city || priceRange || bedrooms;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* زر الفلترة للجوال */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between md:hidden"
      >
        <span className="text-lg font-bold text-gray-800">بحث وفلترة</span>
        <Search className="h-5 w-5 text-primary" />
      </button>

      <div className={`mt-4 space-y-4 ${isOpen ? "block" : "hidden"} md:block`}>
        {/* المدينة */}
        <div>
          <label className="mb-1.5 flex items-center gap-1 text-sm font-medium text-gray-700">
            <MapPin className="h-4 w-4 text-primary" />
            المدينة
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-right text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">كل المدن</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* السعر */}
        <div>
          <label className="mb-1.5 flex items-center gap-1 text-sm font-medium text-gray-700">
            <DollarSign className="h-4 w-4 text-primary" />
            السعر
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-right text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">كل الأسعار</option>
            {PRICE_RANGES.map((range, i) => (
              <option key={i} value={i}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* عدد الغرف */}
        <div>
          <label className="mb-1.5 flex items-center gap-1 text-sm font-medium text-gray-700">
            <Bed className="h-4 w-4 text-primary" />
            عدد الغرف
          </label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-right text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">كل الغرف</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} غرف
              </option>
            ))}
          </select>
        </div>

        {/* الأزرار */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleSearch}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-white transition-all hover:bg-primary/90"
          >
            <Search className="h-4 w-4" />
            بحث
          </button>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-gray-500 transition-all hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
