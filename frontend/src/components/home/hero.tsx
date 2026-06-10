"use client";

import { RestaurantAnimation } from "@/components/home/restaurant-animation";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <RestaurantAnimation />
    </section>
  );
}
