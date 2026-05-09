import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Users, Bed } from "lucide-react";
import type { House } from "@/lib/types";
import WishlistButton from "./WishlistButton";

interface HouseCardProps {
  house: House;
}

export default function HouseCard({ house }: HouseCardProps) {
  return (
    <Link
      href={`/houses/${house.id}`}
      className="group block rounded-2xl bg-white shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
    >
      {/* صورة المنزل */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={house.images[0]}
          alt={house.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <WishlistButton houseId={house.id} />

        {/* السعر */}
        <div className="absolute bottom-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-sm font-bold text-secondary shadow-sm">
          {house.price_per_night} د.ج / ليلة
        </div>
      </div>

      {/* تفاصيل المنزل */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-3.5 w-3.5" />
            <span>{house.city}</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
            <Star className="h-4 w-4 fill-amber-500" />
            <span>{house.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
          {house.title}
        </h3>

        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {house.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            {house.bedrooms} غرف
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {house.max_guests} ضيوف
          </span>
        </div>
      </div>
    </Link>
  );
}
