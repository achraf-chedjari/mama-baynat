export interface House {
  id: string;
  created_at?: string;
  title: string;
  description: string;
  city: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  images: string[];
  rating: number;
  is_featured: boolean;
  amenities: string[];
  latitude?: number;
  longitude?: number;
  map_url?: string;
  address?: string;
  phone?: string;
  status: "available" | "booked" | "maintenance";
}

export interface HouseFormData {
  title: string;
  description: string;
  city: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  images: string[];
  rating: number;
  is_featured: boolean;
  amenities: string[];
  map_url?: string;
  address?: string;
  phone?: string;
  status: "available" | "booked" | "maintenance";
}

export interface Booking {
  id: string;
  created_at?: string;
  house_id: string;
  guest_name: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  houses?: House;
}

export interface Contact {
  id: string;
  created_at?: string;
  house_id: string;
  name: string;
  phone: string;
  message: string;
  status: "unread" | "read";
  houses?: House;
}

export interface SearchFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  query?: string;
}

export interface WishlistItem {
  houseId: string;
  addedAt: string;
}

export interface DashboardStats {
  totalHouses: number;
  availableHouses: number;
  bookedHouses: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalContacts: number;
  unreadContacts: number;
  totalRevenue: number;
}

export interface City {
  id: string;
  created_at?: string;
  name: string;
  slug: string;
  is_active: boolean;
}

export interface BookingWithConflictCheck extends Booking {
  conflict?: boolean;
}

export interface SiteSettings {
  id: string;
  updated_at?: string;
  // معلومات التواصل
  owner_name: string;
  owner_phone: string;
  owner_email: string;
  whatsapp_message: string;
  // روابط التواصل الاجتماعي
  instagram: string;
  twitter: string;
  facebook: string;
  // معلومات عامة
  tagline: string;
  description: string;
  address: string;
  // الدعم
  support_phone: string;
  support_email: string;
  support_hours: string;
  // سياسات
  cancellation_policy: string;
  privacy_policy: string;
  about_us: string;
}
