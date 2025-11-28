// /app/api/admin/produits/route.ts
import { NextResponse, NextRequest } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { verifyAuth } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
