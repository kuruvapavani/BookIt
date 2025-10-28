import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import Experience from "@/models/Experience";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { experienceId, user, slot, price } = body;

    if (!experienceId || !user?.name || !user?.email || !slot) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // prevent double booking
    const existing = await Booking.findOne({ experienceId, slot });
    if (existing) {
      return NextResponse.json({ error: "Slot already booked" }, { status: 409 });
    }

    const booking = await Booking.create({ experienceId, user, slot, price });
    await Experience.updateOne(
      { _id: experienceId, "slots.date": slot },
      { $set: { "slots.$.available": false } }
    );

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
