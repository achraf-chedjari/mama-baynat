import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { MESSAGES } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const body = await request.json();

    if (!body.house_id || !body.guest_name || !body.guest_phone || !body.check_in || !body.check_out) {
      return NextResponse.json({ error: MESSAGES.required }, { status: 400 });
    }

    if (body.check_in >= body.check_out) {
      return NextResponse.json(
        { error: "تاريخ المغادرة يجب أن يكون بعد تاريخ الوصول" },
        { status: 400 }
      );
    }

    // Check for date conflicts with confirmed bookings
    const { data: conflicts, error: conflictError } = await supabase
      .from("bookings")
      .select("id, check_in, check_out")
      .eq("house_id", body.house_id)
      .eq("status", "confirmed")
      .or(`check_in.lte.${body.check_out},check_out.gte.${body.check_in}`);

    if (conflictError) throw conflictError;

    if (conflicts && conflicts.length > 0) {
      return NextResponse.json(
        { error: "عذراً، هذه التواريخ محجوزة مسبقاً. يرجى اختيار تواريخ أخرى." },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert([{
        house_id: body.house_id,
        guest_name: body.guest_name,
        guest_phone: body.guest_phone,
        check_in: body.check_in,
        check_out: body.check_out,
        notes: body.notes || null,
        status: "pending",
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: MESSAGES.bookingSuccess,
      booking: data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message === "عذراً، هذه التواريخ محجوزة مسبقاً. يرجى اختيار تواريخ أخرى."
        ? err.message
        : MESSAGES.bookingError },
      { status: err.message?.includes("محجوزة") ? 409 : 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    const houseId = searchParams.get("house_id");

    if (!houseId) {
      return NextResponse.json({ error: "معرف المنزل مطلوب" }, { status: 400 });
    }

    const { data: bookings } = await supabase
      .from("bookings")
      .select("check_in, check_out")
      .eq("house_id", houseId)
      .eq("status", "confirmed");

    return NextResponse.json({ bookings: bookings || [] });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
