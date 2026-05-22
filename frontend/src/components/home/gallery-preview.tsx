"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { FoodImage } from "@/components/ui/food-image";
import { cn } from "@/lib/utils";
import { GALLERY_IMAGES } from "@/lib/images";

export function GalleryPreview() {
  const images = GALLERY_IMAGES.slice(0, 4);

  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle="Ambiance"
          title="A World Above Lahore"
          description="Stunning interiors, rooftop vistas, and culinary artistry."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={cn(
                "relative overflow-hidden rounded-xl shine-border",
                i === 0 && "col-span-2 row-span-2 aspect-square md:min-h-[400px]",
                i !== 0 && "aspect-square"
              )}
            >
              <FoodImage src={img.src} alt={img.alt} sizes="400px" className="hover:scale-105 transition duration-700" />
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
