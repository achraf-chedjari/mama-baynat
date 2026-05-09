import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star, MapPin, Bed, Users, Bath, Check, ArrowRight, Phone, MessageCircle, Map as MapIcon,
} from "lucide-react";
import { getHouseById } from "@/lib/actions";
import { SITE_CONFIG } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import BookingForm from "./BookingForm";

const amenityLabels: Record<string, string> = {
  "واي فاي": "واي فاي مجاني",
  "تلفاز": "تلفاز",
  "مكيف هواء": "مكيف هواء",
  "مطبخ مجهز": "مطبخ مجهز",
  "مطبخ صغير": "مطبخ صغير",
  شرفة: "شرفة",
  حديقة: "حديقة",
  "موقف سيارات": "موقف سيارات",
  شواية: "شواية",
  "غسالة ملابس": "غسالة ملابس",
  ثلاجة: "ثلاجة",
  "ماء ساخن": "ماء ساخن",
  "مولد كهربائي": "مولد كهربائي",
};

export const dynamic = "force-dynamic";

export default async function HouseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const house = await getHouseById(id);

  if (!house) notFound();

  const contactPhone = house.phone || SITE_CONFIG.owner.phone;
  const whatsappUrl = `https://wa.me/${contactPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`${SITE_CONFIG.owner.whatsappMessage} - ${house.title}`)}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/houses"
        className="mb-6 flex items-center gap-1 text-gray-500 hover:text-primary transition-colors w-fit"
      >
        <ArrowRight className="h-4 w-4" />
        العودة إلى المنازل
      </Link>

      <div className="mb-8 grid gap-3 overflow-hidden rounded-2xl sm:grid-cols-2 sm:max-h-[400px]">
        <div className="relative h-64 sm:h-full sm:min-h-[400px]">
          <Image
            src={house.images[0]}
            alt={house.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
        <div className="hidden sm:grid grid-cols-2 gap-3">
          {house.images.slice(1, 3).map((img, i) => (
            <div key={i} className="relative h-[193px]">
              <Image
                src={img}
                alt={`${house.title} - ${i + 2}`}
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-secondary">
                {house.title}
              </h1>
              <div className="mt-2 flex items-center gap-2 text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>{house.city}</span>
              </div>
              {house.address && (
                <p className="mt-1 text-sm text-gray-400">{house.address}</p>
              )}
            </div>
            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-amber-600">
              <Star className="h-5 w-5 fill-amber-400" />
              <span className="font-bold">{house.rating}</span>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2 text-gray-700">
              <Bed className="h-5 w-5 text-primary" />
              <span>{house.bedrooms} غرف نوم</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2 text-gray-700">
              <Bath className="h-5 w-5 text-primary" />
              <span>{house.bathrooms} حمامات</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2 text-gray-700">
              <Users className="h-5 w-5 text-primary" />
              <span>حتى {house.max_guests} ضيوف</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-3 text-xl font-bold text-gray-800">عن المنزل</h2>
            <p className="leading-relaxed text-gray-600">{house.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="mb-3 text-xl font-bold text-gray-800">المرافق</h2>
            <div className="flex flex-wrap gap-3">
              {house.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="flex items-center gap-2 rounded-full bg-accent/30 px-4 py-2 text-sm text-gray-700"
                >
                  <Check className="h-4 w-4 text-booking" />
                  {amenityLabels[amenity] || amenity}
                </span>
              ))}
            </div>
          </div>

          {house.map_url && (
            <div className="mb-6">
              <h2 className="mb-3 text-xl font-bold text-gray-800">الموقع على الخريطة</h2>
              <a
                href={house.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-secondary/10 px-5 py-3 text-secondary font-medium transition-all hover:bg-secondary/20 w-fit"
              >
                <MapIcon className="h-5 w-5" />
                عرض على Google Maps
              </a>
            </div>
          )}
        </div>

        <aside className="w-full lg:w-96">
          <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
            <div className="mb-4 text-center">
              <p className="text-3xl font-bold text-primary">
                {formatPrice(house.price_per_night)} د.ج
              </p>
              <p className="text-sm text-gray-500">/ لكل ليلة</p>
            </div>

            <BookingForm houseId={house.id} pricePerNight={house.price_per_night} />

            <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
              {/* Phone */}
              <a
                href={`tel:${contactPhone}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
              >
                <Phone className="h-5 w-5 text-green-600" />
                {contactPhone}
              </a>
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary px-6 py-3 font-medium text-primary transition-all hover:bg-primary hover:text-white"
              >
                <MessageCircle className="h-5 w-5" />
                تواصل مع المالك
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
