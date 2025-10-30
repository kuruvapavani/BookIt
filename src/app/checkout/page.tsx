"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const qty = Number(searchParams.get("qty") || 1);
  const price = Number(searchParams.get("price") || 0);
  const tax = Number(searchParams.get("tax") || 0);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<
    "flat" | "percentage" | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const subtotal = price * qty;
  const total = (() => {
    if (discountType === "percentage") {
      return subtotal - (subtotal * discount) / 100 + tax;
    } else if (discountType === "flat") {
      return subtotal - discount + tax;
    }
    return subtotal + tax;
  })();

  // Apply Promo Code
  const handleApplyPromo = async () => {
    if (!promo.trim()) return;
    setLoading(true);
    setPromoMessage("");

    try {
      const res = await fetch("/api/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promo }),
      });
      const data = await res.json();

      if (data.valid) {
        setDiscount(data.discountValue);
        setDiscountType(data.discountType);
        setPromoMessage(`✅ ${data.message}`);
      } else {
        setDiscount(0);
        setDiscountType(null);
        setPromoMessage(`❌ ${data.message}`);
      }
    } catch {
      setPromoMessage("❌ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar onSearch={(val) => console.log(val)} />
      <main className="min-h-screen bg-white px-4 sm:px-6 py-8 max-w-6xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="text-sm flex items-center gap-1 mb-5 hover:underline"
        >
          ← Checkout
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left section */}
          <div className="flex-1 bg-gray-50 p-6 rounded-xl shadow-sm">
            {/* Full name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 bg-[#DDDDDD] text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 bg-[#DDDDDD] text-sm"
                />
              </div>
            </div>

            {/* Promo Code */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Promo code"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="flex-1 rounded-lg px-3 py-2 bg-[#DDDDDD] text-sm"
              />
              <button
                onClick={handleApplyPromo}
                disabled={!promo || loading}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  !promo || loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {loading ? "Applying..." : "Apply"}
              </button>
            </div>

            {promoMessage && (
              <p
                className={`text-sm mb-4 ${
                  promoMessage.startsWith("✅")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {promoMessage}
              </p>
            )}

            {/* Terms */}
            <div className="flex items-center gap-2 text-sm">
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="agree" className="text-gray-700">
                I agree to the terms and safety policy
              </label>
            </div>
          </div>

          {/* Right section */}
          <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Experience</span>
              <span className="font-medium">{title}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Date</span>
              <span>{date}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Time</span>
              <span>{time}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Qty</span>
              <span>{qty}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Taxes</span>
              <span>₹{tax}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600 font-medium mt-2">
                <span>
                  Discount (
                  {discountType === "percentage"
                    ? `${discount}%`
                    : `₹${discount}`}
                  )
                </span>
                <span>
                  - ₹
                  {discountType === "percentage"
                    ? ((subtotal * discount) / 100).toFixed(0)
                    : discount}
                </span>
              </div>
            )}

            <hr className="my-3" />

            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>₹{Math.max(total, 0).toFixed(0)}</span>
            </div>

            <button
              disabled={!agreed}
              className={`w-full mt-4 py-2 rounded-lg font-medium ${
                agreed
                  ? "bg-[#FFD643] hover:bg-yellow-400 text-black"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Pay and Confirm
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
