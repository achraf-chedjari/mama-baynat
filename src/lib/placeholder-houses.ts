// ============================================================
// بيانات منازل تجريبية للعرض قبل ربط Supabase
// ============================================================

import type { House } from "./types";

export const PLACEHOLDER_HOUSES: House[] = [
  {
    id: "1",
    title: "فيلا البحر الزرقاء",
    description:
      "فيلا فاخرة تطل على البحر مع مسبح خاص وحديقة واسعة. مثالية لقضاء عطلة عائلية لا تنسى مع إطلالة خلابة على غروب الشمس.",
    city: "جدة",
    price_per_night: 850,
    bedrooms: 4,
    bathrooms: 3,
    max_guests: 8,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    ],
    rating: 4.8,
    is_featured: true,
    status: "available",
    amenities: ["واي فاي", "مسبح", "موقف سيارات", "تكييف", "مطبخ مجهز"],
  },
  {
    id: "2",
    title: "شقة الجبل الخضراء",
    description:
      "شقة عصرية في قلب الطبيعة مع إطلالة رائعة على الجبال. هدوء تام واستجمام في أحضان الطبيعة الخلابة.",
    city: "أبها",
    price_per_night: 450,
    bedrooms: 2,
    bathrooms: 2,
    max_guests: 4,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    rating: 4.6,
    is_featured: true,
    status: "available",
    amenities: ["واي فاي", "مدفأة", "موقف سيارات", "شرفة"],
  },
  {
    id: "3",
    title: "استراحة النخلة الذهبية",
    description:
      "استراحة ريفية فسيحة محاطة بأشجار النخيل. مكان مثالي للاسترخاء والاستمتاع بالأجواء الهادئة بعيداً عن صخب المدينة.",
    city: "الرياض",
    price_per_night: 1200,
    bedrooms: 5,
    bathrooms: 4,
    max_guests: 12,
    images: [
      "https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?w=800",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    ],
    rating: 4.9,
    is_featured: true,
    status: "available",
    amenities: [
      "واي فاي",
      "مسبح",
      "موقف سيارات",
      "تكييف",
      "مطبخ مجهز",
      "حديقة",
    ],
  },
  {
    id: "4",
    title: "شقة الواجهة البحرية",
    description:
      "شقة أنيقة على الواجهة البحرية مع إطلالة بانورامية ساحرة. تصميم عصري وأجواء راقية.",
    city: "الخبر",
    price_per_night: 650,
    bedrooms: 3,
    bathrooms: 2,
    max_guests: 6,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800",
    ],
    rating: 4.7,
    is_featured: false,
    status: "available",
    amenities: ["واي فاي", "موقف سيارات", "تكييف", "صالة رياضية"],
  },
  {
    id: "5",
    title: "منزل الواحة الهادئة",
    description:
      "منزل عائلي واسع في حي هادئ مع حديقة جميلة وأماكن لعب للأطفال. قريب من جميع الخدمات.",
    city: "الدمام",
    price_per_night: 550,
    bedrooms: 3,
    bathrooms: 2,
    max_guests: 6,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800",
    ],
    rating: 4.5,
    is_featured: false,
    status: "available",
    amenities: ["واي فاي", "حديقة", "موقف سيارات", "مطبخ مجهز"],
  },
  {
    id: "6",
    title: "فيلا النخيل الفاخرة",
    description:
      "فيلا راقية مع مسبح أولمبي ومساحة خارجية كبيرة للشواء والتجمعات العائلية. تجربة فاخرة لا تنسى.",
    city: "الرياض",
    price_per_night: 1500,
    bedrooms: 6,
    bathrooms: 5,
    max_guests: 14,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
    ],
    rating: 5.0,
    is_featured: true,
    status: "available",
    amenities: [
      "واي فاي",
      "مسبح أولمبي",
      "موقف سيارات",
      "تكييف",
      "مطبخ مجهز",
      "شواية",
    ],
  },
  {
    id: "7",
    title: "استوديو المدينة المنورة",
    description:
      "استوديو عصري وقريب من الحرم النبوي الشريف. مناسب للعائلات الصغيرة والأفراد.",
    city: "المدينة",
    price_per_night: 350,
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 2,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    rating: 4.4,
    is_featured: false,
    status: "available",
    amenities: ["واي فاي", "تكييف", "مطبخ صغير"],
  },
  {
    id: "8",
    title: "شقة دبي الحديثة",
    description:
      "شقة عصرية في وسط دبي مع إطلالة على برج خليفة. تصميم داخلي أنيق وأعلى مستويات الرفاهية.",
    city: "دبي",
    price_per_night: 950,
    bedrooms: 2,
    bathrooms: 2,
    max_guests: 5,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800",
    ],
    rating: 4.8,
    is_featured: true,
    status: "available",
    amenities: ["واي فاي", "موقف سيارات", "تكييف", "صالة رياضية", "مسبح"],
  },
];

// دوال مساعدة للبيانات
export function getHouseById(id: string): House | undefined {
  return PLACEHOLDER_HOUSES.find((house) => house.id === id);
}

export function getFeaturedHouses(): House[] {
  return PLACEHOLDER_HOUSES.filter((house) => house.is_featured);
}

export function getCities(): string[] {
  return [...new Set(PLACEHOLDER_HOUSES.map((house) => house.city))];
}
