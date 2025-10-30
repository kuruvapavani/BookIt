import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import Experience from "@/models/Experience";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    console.log("🟢 Request Body:", body);

    const { experienceId, user, slot, quantity, price, total } = body;

    if (
      !experienceId ||
      !user?.name ||
      !user?.email ||
      !slot?.date ||
      !slot?.time
    ) {
      return NextResponse.json(
        { error: "Missing required fields", body },
        { status: 400 }
      );
    }

    // Prevent double booking for same date/time by same user
    const existing = await Booking.findOne({
      experienceId,
      "user.email": user.email,
      "slot.date": slot.date,
      "slot.time": slot.time,
    });

    if (existing) {
      return NextResponse.json(
        { error: "You already booked this slot" },
        { status: 409 }
      );
    }

    // Create booking
    const booking = await Booking.create({
      experienceId,
      user,
      date: slot.date,
      time: slot.time,
      quantity,
      price,
      total,
    });

    // Decrease slot availability
    await Experience.updateOne(
      { _id: experienceId, "slots.date": slot.date, "slots.time": slot.time },
      { $inc: { "slots.$.left": -quantity } }
    );

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
