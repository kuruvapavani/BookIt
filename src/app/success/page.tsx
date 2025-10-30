"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id"); // read ?id= from URL

  return (
    <>
      <Navbar onSearch={(val) => console.log(val)} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
        <Check className="bg-green-500 text-white w-24 h-24 mb-6 rounded-full" />
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Booking Confirmed
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          Ref ID:{" "}
          <span className="font-medium text-gray-700">
            {bookingId || "Generating..."}
          </span>
        </p>

        <button
          onClick={() => router.push("/")}
          className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700 transition"
        >
          Back to Home
        </button>
      </div>
    </>
  );
}
