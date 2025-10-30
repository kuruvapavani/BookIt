"use client";

import { Suspense } from "react";
import CheckoutPage from "@/components/CheckoutPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-600">Loading checkout...</div>}>
      <CheckoutPage />
    </Suspense>
  );
}
