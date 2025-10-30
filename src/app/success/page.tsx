"use client";

import { Suspense } from "react";
import SuccessPage from "@/components/SuccessPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-600">Loading confirmation...</div>}>
      <SuccessPage />
    </Suspense>
  );
}
