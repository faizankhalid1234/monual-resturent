"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { HERO_POSTER } from "@/lib/images";
import { FoodImage } from "@/components/ui/food-image";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <FoodImage src={HERO_POSTER} alt="Monal Lahore" priority sizes="100vw" className="scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-[#070707]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#070707_75%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-gold"
        >
          Luxury Rooftop Dining · Lahore
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="font-display text-5xl font-bold leading-tight md:text-7xl lg:text-8xl text-gradient-gold"
        >
          {SITE.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/85 md:text-xl"
        >
          {SITE.tagline}. Experience world-class cuisine with panoramic views of the City of Gardens.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button asChild size="lg">
            <Link href="/reservations">Book a Table</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/menu">Explore Menu</Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold/60"
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </section>
  );
}
