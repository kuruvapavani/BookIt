"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface Slot {
  date: string;
  time: string;
  left: number;
  available: boolean;
}

interface Experience {
  _id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  price: number;
  slots: Slot[];
}

export default function ExperienceDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const tax = 59;
  const isConfirmEnabled = selectedDate && selectedTime;
  const total = experience ? experience.price * quantity + tax : 0;

  // 🔹 Fetch experience details
  useEffect(() => {
    if (!id) return;
    const fetchExperience = async () => {
      try {
        const res = await fetch(`/api/experiences/${id}`);
        if (!res.ok) throw new Error("Failed to fetch experience");
        const data = await res.json();
        setExperience(data);
      } catch (err) {
        console.error("Error fetching experience:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id]);

  if (loading)
    return (
      <main className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading experience...
      </main>
    );

  if (!experience)
    return (
      <main className="flex justify-center items-center h-screen text-red-600 text-lg">
        Experience not found.
      </main>
    );

  // 🔹 Unique available dates
  const uniqueDates = [...new Set(experience.slots.map((s) => s.date))];

  // 🔹 Filter times based on selected date
  const availableTimes = selectedDate
    ? experience.slots.filter((s) => s.date === selectedDate)
    : [];

  return (
    <>
      <Navbar onSearch={(val) => console.log(val)} />

      <main className="min-h-screen bg-white px-4 sm:px-6 py-8 md:py-10 md:max-w-6xl mx-auto space-y-8">
        {/* 🔙 Back button */}
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-700 flex items-center gap-1 mb-5 hover:underline"
        >
          <span>←</span> Details
        </button>

        <div className="grid md:grid-cols-[1.5fr_0.9fr] gap-8 md:gap-10">
          {/* 🌅 Left Section */}
          <section>
            <div className="w-full h-[250px] sm:h-[320px] md:h-[400px] rounded-xl overflow-hidden mb-5">
              <img
                src={experience.image || "/fallback.jpg"}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
              {experience.title}
            </h1>
            <p className="text-sm text-gray-500 mb-3">{experience.location}</p>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-8">
              {experience.description}
            </p>

            {/* 📅 Choose Date */}
            <div className="mb-6">
              <p className="font-medium text-gray-900 mb-2">Choose date</p>
              <div className="flex flex-wrap gap-2">
                {uniqueDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime(null);
                    }}
                    className={`px-3 py-[6px] border rounded-md text-sm font-medium transition-all ${
                      selectedDate === date
                        ? "bg-[#FFD84D] border-[#FFD84D] text-gray-900"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* ⏰ Choose Time */}
            {selectedDate && (
              <div className="mb-6">
                <p className="font-medium text-gray-900 mb-2">Choose time</p>
                <div className="flex flex-wrap gap-2">
                  {availableTimes.map((slot) => (
                    <button
                      key={`${slot.date}-${slot.time}`}
                      disabled={!slot.available || slot.left <= 0}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`px-3 py-[6px] border rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
                        !slot.available || slot.left <= 0
                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                          : selectedTime === slot.time
                          ? "bg-[#FFD84D] border-[#FFD84D] text-gray-900"
                          : "border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{slot.time}</span>
                      {slot.available && slot.left > 0 && (
                        <span className="text-[11px] text-red-500 font-medium">
                          {slot.left} left
                        </span>
                      )}
                      {!slot.available && (
                        <span className="text-[11px] text-gray-500 font-medium">
                          Sold out
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  All times are in IST (GMT +5:30)
                </p>
              </div>
            )}

            {/* ℹ️ About */}
            <div>
              <p className="font-medium text-gray-900 mb-2">About</p>
              <p className="text-[14px] text-gray-600 bg-gray-100 px-3 py-2 rounded-md inline-block">
                Scenic routes, trained guides, and safety briefing. Minimum age:
                10.
              </p>
            </div>
          </section>

          {/* 💰 Right Section */}
          <aside className="w-full max-w-md md:ml-auto">
            <div className="rounded-xl p-5 bg-[#EFEFEF] shadow-sm sticky top-20 md:static">
              <div className="space-y-3">
                <div className="flex justify-between text-[15px] text-gray-700">
                  <span>Starts at</span>
                  <span className="font-semibold">₹{experience.price}</span>
                </div>

                <div className="flex justify-between items-center text-[15px] text-gray-700">
                  <span>Quantity</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 border rounded-md flex items-center justify-center hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-7 h-7 border rounded-md flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex justify-between text-[15px] text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{experience.price * quantity}</span>
                </div>

                <div className="flex justify-between text-[15px] text-gray-700">
                  <span>Taxes</span>
                  <span>₹{tax}</span>
                </div>

                <hr className="my-3" />

                <div className="flex justify-between text-[17px] font-semibold text-gray-900">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                {/* ✅ Confirm Button */}
                <button
                  disabled={!isConfirmEnabled}
                  onClick={() =>
                    alert(
                      `Booking confirmed for ${selectedDate} at ${selectedTime}`
                    )
                  }
                  className={`w-full mt-3 py-2.5 rounded-md font-medium transition-all duration-200 ${
                    isConfirmEnabled
                      ? "bg-[#FFD643] hover:bg-[#f5c932] text-gray-900 cursor-pointer"
                      : "bg-[#E5E5E5] text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
