// /app/api/admin/produits/update/route.ts
import { NextResponse, NextRequest } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { verifyAuth } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { product_id, ...updateData } = await request.json();

  if (!product_id || Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("produits")
    .update(updateData)
    .eq("id", product_id)
    .select()
    .single();

  if (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }

  return NextResponse.json(data);
}
