import { createServerSupabase } from "./supabase-server";
import type { House, Booking, Contact, DashboardStats } from "./types";

export async function getHouses(): Promise<House[]> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("houses")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as House[]) || [];
}

export async function getHouseById(id: string): Promise<House | null> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("houses")
    .select("*")
    .eq("id", id)
    .single();
  return data as House | null;
}

export async function getBookings(): Promise<Booking[]> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("bookings")
    .select("*, houses(*)")
    .order("created_at", { ascending: false });
  return (data as Booking[]) || [];
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("bookings")
    .select("*, houses(*)")
    .eq("id", id)
    .single();
  return data as Booking | null;
}

export async function getContacts(): Promise<Contact[]> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("contacts")
    .select("*, houses(*)")
    .order("created_at", { ascending: false });
  return (data as Contact[]) || [];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createServerSupabase();

  const [
    { count: totalHouses },
    { count: availableHouses },
    { count: bookedHouses },
    { count: pendingBookings },
    { count: confirmedBookings },
    { count: cancelledBookings },
    { count: totalContacts },
    { count: unreadContacts },
  ] = await Promise.all([
    supabase.from("houses").select("*", { count: "exact", head: true }),
    supabase.from("houses").select("*", { count: "exact", head: true }).eq("status", "available"),
    supabase.from("houses").select("*", { count: "exact", head: true }).eq("status", "booked"),
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "confirmed"),
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "cancelled"),
    supabase.from("contacts").select("*", { count: "exact", head: true }),
    supabase.from("contacts").select("*", { count: "exact", head: true }).eq("status", "unread"),
  ]);

  const { data: revenueData } = await supabase
    .from("bookings")
    .select("houses(price_per_night)")
    .eq("status", "confirmed");

  const totalRevenue = (revenueData || []).reduce((sum: number, b: any) => {
    return sum + (b.houses?.price_per_night || 0);
  }, 0);

  return {
    totalHouses: totalHouses || 0,
    availableHouses: availableHouses || 0,
    bookedHouses: bookedHouses || 0,
    pendingBookings: pendingBookings || 0,
    confirmedBookings: confirmedBookings || 0,
    cancelledBookings: cancelledBookings || 0,
    totalContacts: totalContacts || 0,
    unreadContacts: unreadContacts || 0,
    totalRevenue,
  };
}
