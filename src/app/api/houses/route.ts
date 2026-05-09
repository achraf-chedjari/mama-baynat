import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { MESSAGES } from "@/lib/config";

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    const { data: houses, error } = await supabase
      .from("houses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ houses });
  } catch {
    return NextResponse.json(
      { error: MESSAGES.error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabase();
    const body = await request.json();

    const { data, error } = await supabase
      .from("houses")
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ house: data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: MESSAGES.error },
      { status: 500 }
    );
  }
}
