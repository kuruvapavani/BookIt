import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Promo from "@/models/Promo";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ valid: false, message: "No promo code provided" });
    }

    const promo = await Promo.findOne({ code: code.toUpperCase(), active: true });

    if (!promo) {
      return NextResponse.json({ valid: false, message: "Invalid promo code" });
    }

    // Check expiry date if present
    if (promo.expiryDate && new Date(promo.expiryDate) < new Date()) {
      return NextResponse.json({ valid: false, message: "Promo code expired" });
    }

    return NextResponse.json({
      valid: true,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      message: "Promo applied successfully",
    });
  } catch (error) {
    console.error("Promo validation error:", error);
    return NextResponse.json({ valid: false, message: "Server error" }, { status: 500 });
  }
}
