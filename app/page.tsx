"use client";

import OrderSystem from "@/components/order-system";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-900 text-white p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Bar Order System
        </h1>
        <OrderSystem />
      </div>
    </main>
  );
}
