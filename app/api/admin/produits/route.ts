// /app/api/admin/produits/route.ts
import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createSupabaseAdmin();
  const { data: products, error } = await supabase
    .from("produits")
    .select("id, name, is_best_seller, is_new_arrival, is_set_or_pack")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }

  return NextResponse.json(products);
}
