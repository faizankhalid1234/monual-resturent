"use client";

import { HERO_POSTER } from "@/lib/images";
import { FoodImage } from "@/components/ui/food-image";

export function RestaurantAnimation() {
  return (
    <div className="restaurant-hero relative min-h-screen w-full overflow-hidden text-white">
      <div className="absolute inset-0">
        <FoodImage
          src={HERO_POSTER}
          alt="Monal rooftop terrace"
          priority
          quality={100}
          unoptimized
          sizes="100vw"
          className="hero-image-vivid absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="hero-gold-wash pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.12),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.38))]" />
      </div>

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute bottom-6 left-4 max-w-[calc(100%-2rem)] rounded-2xl border border-white/10 bg-black/50 p-4 shadow-xl shadow-black/30 sm:bottom-8 sm:left-6 sm:max-w-md sm:p-5 lg:max-w-lg">
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wide text-white/90">
            Lovely rooftop dining
          </span>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            A warm arrival, elegant dining, and a beautifully styled evening.
          </h1>
          <p className="mt-2 text-xs leading-6 text-white/80 sm:text-sm sm:leading-7">
            Calm luxury, soft lighting, premium flavors, and thoughtful details for every moment.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <a
              href="/reservations"
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90 sm:text-sm"
            >
              Book a table
            </a>
            <a
              href="/menu"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10 sm:text-sm"
            >
              View menu
            </a>
          </div>
        </div>

        <div className="absolute right-4 top-24 w-[200px] rounded-2xl border border-white/10 bg-black/50 p-3.5 text-white shadow-xl shadow-black/30 sm:bottom-8 sm:right-6 sm:top-auto sm:w-[220px] sm:p-4">
          <p className="text-[9px] uppercase tracking-[0.28em] text-white/65">Lovely side</p>
          <h2 className="mt-1.5 text-base font-semibold leading-snug">A charming setting just for you</h2>
          <p className="mt-1.5 text-[11px] leading-5 text-white/75">
            Plush seating and elegant rooftop ambience.
          </p>
          <div className="mt-3 grid gap-1.5">
            <div className="rounded-xl bg-white/5 px-2.5 py-2">
              <p className="text-[10px] text-white/70">Soft lighting</p>
              <p className="mt-0.5 text-xs font-semibold">Warm glow</p>
            </div>
            <div className="rounded-xl bg-white/5 px-2.5 py-2">
              <p className="text-[10px] text-white/70">Elegant details</p>
              <p className="mt-0.5 text-xs font-semibold">Stylish décor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
