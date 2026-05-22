"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/layout/section-heading";
import { FoodImage } from "@/components/ui/food-image";
import { GALLERY_IMAGES, HERO_POSTER } from "@/lib/images";

const tabs = ["All", "Food", "Interior", "Rooftop", "Videos"] as const;

export default function GalleryPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const filtered = tab === "All" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((g) => g.type === tab);

  return (
    <div className="pb-24 px-4">
      <section className="py-16">
        <SectionHeading subtitle="Visual Journey" title="Gallery" />
      </section>

      <div className="mx-auto mb-10 flex max-w-7xl flex-wrap justify-center gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2 text-xs uppercase tracking-widest transition ${
              tab === t ? "bg-gold text-black" : "glass hover:border-gold/40"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Videos" ? (
        <div className="mx-auto max-w-4xl aspect-video rounded-2xl overflow-hidden glass shine-border">
          <video controls className="h-full w-full" poster={HERO_POSTER}>
            <source src="https://assets.mixkit.co/videos/preview/mixkit-waiter-serving-food-in-a-restaurant-4275-large.mp4" type="video/mp4" />
          </video>
        </div>
      ) : (
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="relative aspect-square overflow-hidden rounded-xl shine-border"
            >
              <FoodImage src={item.src} alt={item.alt} sizes="300px" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
