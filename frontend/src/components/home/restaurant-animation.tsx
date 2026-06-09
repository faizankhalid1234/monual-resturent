"use client";

import { HERO_POSTER } from "@/lib/images";
import { FoodImage } from "@/components/ui/food-image";

export function RestaurantAnimation() {
  return (
    <div className="restaurant-hero relative min-h-screen w-full overflow-hidden text-white">
      <div className="absolute inset-0">
        <FoodImage
          src={HERO_POSTER}
          alt="Monal restaurant building"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.24),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.92))]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-10 sm:px-8 lg:px-12">
        <div className="grid w-full gap-8 rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-[1.7fr_1fr]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium tracking-wide text-white/90">
              Lovely rooftop dining
            </span>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
              A warm arrival, elegant dining, and a beautifully styled evening.
            </h1>
            <p className="max-w-xl text-base leading-8 text-white/80 sm:text-lg md:text-xl">
              Experience a calm, luxurious atmosphere with soft lighting, premium flavors, and thoughtful details that make every moment feel special.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/reservations" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
                Book a table
              </a>
              <a href="/menu" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                View menu
              </a>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 text-white shadow-2xl shadow-black/25">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Lovely side</p>
            <h2 className="mt-4 text-3xl font-semibold">A charming setting just for you</h2>
            <p className="mt-4 text-sm leading-7 text-white/80">
              Enjoy a beautifully styled dining corner with plush seating, fresh accents, and an elegant atmosphere designed to make your visit unforgettable.
            </p>
            <div className="mt-6 grid gap-3">
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-sm text-white/80">Soft lighting</p>
                <p className="mt-2 text-lg font-semibold">Warm, inviting glow</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-sm text-white/80">Elegant details</p>
                <p className="mt-2 text-lg font-semibold">Stylish décor & textures</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
