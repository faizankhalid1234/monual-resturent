"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECT_IMAGES } from "@/lib/images";
import { FoodImage } from "@/components/ui/food-image";

const SLIDES = [
  {
    ...PROJECT_IMAGES[0],
    title: "Welcome to Monal",
    subtitle: "Enter the rooftop restaurant and feel the warm welcome.",
  },
  {
    ...PROJECT_IMAGES[1],
    title: "Your waiter greets you",
    subtitle: "A personal welcome as you step into the dining experience.",
  },
  {
    ...PROJECT_IMAGES[2],
    title: "Roaring ambience",
    subtitle: "Soft lights, city breeze, and cozy family warmth.",
  },
  {
    ...PROJECT_IMAGES[3],
    title: "Menu discovery",
    subtitle: "Explore a curated selection of chef specialties and desserts.",
  },
  {
    ...PROJECT_IMAGES[4],
    title: "Back to ambience",
    subtitle: "The evening returns to glowing rooftop luxury.",
  },
];

export function SlideshowBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % SLIDES.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const slide = SLIDES[currentIndex];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        >
          <FoodImage src={slide.src} alt={slide.alt} className="scale-110" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22),rgba(0,0,0,0.95))]" />

          <motion.div
            key={slide.title}
            className="pointer-events-none absolute inset-x-0 bottom-16 mx-auto flex max-w-3xl justify-center px-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.9 }}
          >
            <div className="w-full rounded-[2rem] border border-white/10 bg-black/50 px-7 py-5 text-center shadow-2xl shadow-black/50 backdrop-blur-2xl">
              <p className="text-xs uppercase tracking-[0.4em] text-gold">{slide.title}</p>
              <p className="mt-3 text-base text-white/85 sm:text-lg">{slide.subtitle}</p>
            </div>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 h-full"
            animate={{ x: ["-30%", "100%"] }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          >
            <div className="h-full w-[40%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
