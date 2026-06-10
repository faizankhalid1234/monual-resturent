"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { HERO_POSTER } from "@/lib/images";
import { Button } from "@/components/ui/button";

export function RestaurantAnimation() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_POSTER}
          alt="Monal luxury rooftop dining at golden hour"
          fill
          priority
          unoptimized
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-4 pb-28 pt-32 sm:px-6 lg:px-8 lg:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/30 px-4 py-1.5 text-xs font-medium tracking-wide text-gold-light backdrop-blur-[2px]">
            <Sparkles className="h-3.5 w-3.5" />
            Lovely rooftop dining · Lahore
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Dine above the city with{" "}
            <span className="text-gradient-gold">warm golden evenings</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Premium rooftop views, soft candlelight, and elegant flavours — a lovely setting for every special moment.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/reservations">Book a table</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-white/40 px-8 text-white hover:bg-white/10">
              <Link href="/menu">View menu</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
