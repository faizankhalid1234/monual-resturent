"use client";

import { HERO_POSTER } from "@/lib/images";
import { FoodImage } from "@/components/ui/food-image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, UtensilsCrossed, Wine, Heart } from "lucide-react";

const highlights = [
  { icon: Sparkles, label: "Rooftop views", detail: "City lights at dusk" },
  { icon: UtensilsCrossed, label: "Fine cuisine", detail: "Pakistani & continental" },
  { icon: Wine, label: "Warm ambience", detail: "Soft golden lighting" },
  { icon: Heart, label: "Lovely evenings", detail: "Perfect for celebrations" },
];

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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.14),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.42))]" />
      </div>

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-6 left-4 max-w-[calc(100%-2rem)] rounded-2xl border border-white/15 bg-black/45 p-4 shadow-xl shadow-black/30 backdrop-blur-sm sm:bottom-8 sm:left-6 sm:max-w-md sm:p-6 lg:max-w-lg"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-[11px] font-medium tracking-wide text-gold-light">
            <Sparkles className="h-3 w-3" />
            Lovely rooftop dining
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Where every evening feels{" "}
            <span className="text-gradient-gold">beautifully yours</span>
          </h1>
          <p className="mt-3 text-sm leading-7 text-white/85">
            Calm luxury, soft lighting, premium flavors, and thoughtful details for every moment.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              href="/reservations"
              className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gold-light"
            >
              Book a table
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              View menu
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-4 top-24 w-[210px] rounded-2xl border border-white/15 bg-black/45 p-4 text-white shadow-xl shadow-black/30 backdrop-blur-sm sm:bottom-8 sm:right-6 sm:top-auto sm:w-[230px]"
        >
          <p className="text-[9px] uppercase tracking-[0.28em] text-gold-light/80">Lovely side</p>
          <h2 className="mt-1.5 font-display text-lg font-semibold leading-snug">A charming setting just for you</h2>
          <p className="mt-2 text-[11px] leading-5 text-white/80">
            Plush seating and elegant rooftop ambience.
          </p>
          <div className="mt-3 grid gap-2">
            {highlights.slice(2).map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-[10px] text-white/65">{item.label}</p>
                <p className="mt-0.5 text-xs font-semibold text-gold-light">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 hidden border-t border-white/10 bg-black/40 backdrop-blur-md lg:block">
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-6 px-8 py-5">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold-light">
                <item.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{item.label}</p>
                <p className="text-[11px] text-white/65">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
