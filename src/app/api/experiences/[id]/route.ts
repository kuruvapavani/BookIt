import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Experience from "@/models/Experience";
import mongoose from "mongoose";

export async function GET(request: Request, context: any) {
  const url = new URL(request.url);
  const pathnameParts = url.pathname.split("/");
  const id = pathnameParts[pathnameParts.length - 1];
  if (!id) {
    return NextResponse.json(
      { error: "Missing ID in request (URL parsing failed)" },
      { status: 400 }
    );
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    await connectDB();

    const experience = await Experience.findById(id);

    if (!experience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(experience);
  } catch (error) {
    console.error("Error fetching experience:", error);
    return NextResponse.json(
      { error: "Failed to fetch experience" },
      { status: 500 }
    );
  }
}
