// /app/api/home-collections/route.ts
import { NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabase/client";

export async function GET() {
  const supabase = createSupabaseClient();
  // Fetch best sellers
  const { data: bestSellers, error: bestSellersError } = await supabase
    .from("produits")
    .select("*")
    .eq("is_best_seller", true)
    .limit(4);

  // Fetch new arrivals
  const { data: newArrivals, error: newArrivalsError } = await supabase
    .from("produits")
    .select("*")
    .eq("is_new_arrival", true)
    .limit(4);

  // Fetch sets and packs
  const { data: setsAndPacks, error: setsAndPacksError } = await supabase
    .from("produits")
    .select("*")
    .eq("is_set_or_pack", true)
    .limit(4);

  if (bestSellersError || newArrivalsError || setsAndPacksError) {
    console.error("Error fetching home collections:", {
      bestSellersError,
      newArrivalsError,
      setsAndPacksError,
    });
    return NextResponse.json(
      { error: "Failed to fetch homepage collections" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    bestSellers,
    newArrivals,
    setsAndPacks,
  });
}
