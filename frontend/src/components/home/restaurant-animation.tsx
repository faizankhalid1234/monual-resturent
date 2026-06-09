"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECT_IMAGES } from "@/lib/images";
import { FoodImage } from "@/components/ui/food-image";

const SLIDES = [
  {
    key: "entrance",
    src: PROJECT_IMAGES[0].src,
    alt: PROJECT_IMAGES[0].alt,
    title: "Welcome to Monal",
    caption: "A rooftop arrival wrapped in warm light and quiet luxury.",
  },
  {
    key: "waiter",
    src: PROJECT_IMAGES[2].src,
    alt: PROJECT_IMAGES[2].alt,
    title: "Warm hospitality",
    caption: "A gracious greeting, a gentle bow, and the evening begins.",
  },
  {
    key: "ambience",
    src: PROJECT_IMAGES[4].src,
    alt: PROJECT_IMAGES[4].alt,
    title: "Golden ambience",
    caption: "Soft glow, city breeze, and an intimate dining mood.",
  },
  {
    key: "menu",
    src: PROJECT_IMAGES[3].src,
    alt: PROJECT_IMAGES[3].alt,
    title: "Discover the menu",
    caption: "Chef-crafted dishes, seasonal flavors, and elegant choices.",
  },
  {
    key: "return",
    src: PROJECT_IMAGES[5].src,
    alt: PROJECT_IMAGES[5].alt,
    title: "Evening returns",
    caption: "The night settles into relaxed rooftop luxury.",
  },
];

export function RestaurantAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, 5200);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  const slide = SLIDES[activeIndex];

  return (
    <div className="restaurant-animation relative min-h-screen w-full overflow-hidden text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.key}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          <div className="absolute inset-0">
            <FoodImage
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.18),transparent_35%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15),rgba(0,0,0,0.85))]" />
            <motion.div
              className="absolute inset-x-0 top-0 h-full"
              animate={{ x: ["-30%", "100%"] }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            >
              <div className="h-full w-[40%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-end px-6 py-10 sm:px-8 lg:px-12">
        <div className="max-w-3xl rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl sm:p-8">
          <motion.h1
            key={slide.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl"
          >
            {slide.title}
          </motion.h1>
          <motion.p
            key={slide.caption}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="mt-4 text-base leading-8 text-white/80 sm:text-lg md:text-xl"
          >
            {slide.caption}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
