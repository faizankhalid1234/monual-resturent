"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FoodImage } from "@/components/ui/food-image";
import { PROJECT_IMAGES } from "@/lib/images";

const SLIDES = PROJECT_IMAGES;

export function ImageVideoPreview({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % SLIDES.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

  const slide = SLIDES[currentIndex];

  return (
    <div className={cn("mx-auto max-w-3xl", className)}>
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.src}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.7 }}
            className="relative h-64 sm:h-72"
          >
            <FoodImage src={slide.src} alt={slide.alt} sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-4 text-left text-white/90">
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-gold">Entrance Preview</p>
              <p className="mt-2 text-sm text-white/80 line-clamp-2">A moving image sequence from the restaurant gallery showing ambience, menu highlights, and family dining.</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center pt-4">
          <div className="rounded-full border border-white/10 bg-black/30 px-5 py-2 text-xs uppercase tracking-[0.35em] text-white/80 shadow-lg shadow-black/50">
            Ambient slideshow
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-black/70 px-6 py-5 text-center text-sm text-white/80 shadow-inner shadow-black/20">
        <p className="font-medium text-white">Project images merged into a subtle entrance preview.</p>
        <p className="mt-2 text-muted-foreground">This is a video-style slideshow using the restaurant’s existing photos instead of a real MP4 file.</p>
      </div>
    </div>
  );
}
