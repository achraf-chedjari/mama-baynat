"use server";

import { createServerSupabase } from "./supabase-server";
import type { HouseFormData } from "./types";
import { revalidatePath } from "next/cache";

function cleanFormData(data: Record<string, unknown>): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== "") {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

export async function createHouse(formData: HouseFormData): Promise<HouseFormData> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("houses")
    .insert([cleanFormData(formData as unknown as Record<string, unknown>)])
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/houses");
  revalidatePath("/houses");
  revalidatePath("/");
  return data as HouseFormData;
}

export async function updateHouse(id: string, formData: Partial<HouseFormData>): Promise<void> {
  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from("houses")
    .update(cleanFormData(formData as unknown as Record<string, unknown>))
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/houses");
  revalidatePath("/houses");
  revalidatePath("/");
}

export async function deleteHouse(id: string): Promise<void> {
  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from("houses")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/houses");
  revalidatePath("/houses");
  revalidatePath("/");
}

export async function updateBookingStatus(
  id: string,
  status: "pending" | "confirmed" | "cancelled"
): Promise<void> {
  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);

  // When confirming a booking, check for date conflicts first
  if (status === "confirmed") {
    const { data: booking } = await supabase
      .from("bookings")
      .select("house_id, check_in, check_out")
      .eq("id", id)
      .single();

    if (booking) {
      // Check for conflicts with other confirmed bookings
      const { data: conflicts } = await supabase
        .from("bookings")
        .select("id")
        .eq("house_id", booking.house_id)
        .eq("status", "confirmed")
        .neq("id", id)
        .lt("check_in", booking.check_out)
        .gt("check_out", booking.check_in);

      if (conflicts && conflicts.length > 0) {
        // Revert the status back to pending
        await supabase.from("bookings").update({ status: "pending" }).eq("id", id);
        throw new Error("تعارض في التواريخ مع حجز مؤكد آخر!");
      }

      // Update house status to booked
      await supabase
        .from("houses")
        .update({ status: "booked" })
        .eq("id", booking.house_id);
    }
  }

  if (status === "cancelled") {
    const { data: booking } = await supabase
      .from("bookings")
      .select("house_id")
      .eq("id", id)
      .single();

    if (booking) {
      // Check if there are other confirmed bookings for this house
      const { data: otherConfirmed } = await supabase
        .from("bookings")
        .select("id")
        .eq("house_id", booking.house_id)
        .eq("status", "confirmed")
        .neq("id", id);

      if (!otherConfirmed || otherConfirmed.length === 0) {
        await supabase
          .from("houses")
          .update({ status: "available" })
          .eq("id", booking.house_id);
      }
    }
  }

  revalidatePath("/dashboard/bookings");
  revalidatePath("/houses");
}

export async function markContactRead(id: string): Promise<void> {
  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from("contacts")
    .update({ status: "read" })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/messages");
}
