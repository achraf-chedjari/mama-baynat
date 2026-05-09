import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { MESSAGES } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const body = await request.json();

    if (!body.house_id || !body.name || !body.phone || !body.message) {
      return NextResponse.json(
        { error: MESSAGES.required },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("contacts")
      .insert([{
        house_id: body.house_id,
        name: body.name,
        phone: body.phone,
        message: body.message,
        status: "unread",
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا",
      contact: data,
    });
  } catch {
    return NextResponse.json(
      { error: MESSAGES.error },
      { status: 500 }
    );
  }
}
