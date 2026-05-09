import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: "المنزل غير موجود" }, { status: 404 });
    }
    return NextResponse.json({ house: data });
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ" },
      { status: 500 }
    );
  }
}
