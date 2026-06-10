"use client";

import { Star } from "lucide-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { StaggerGrid, StaggerItem } from "@/components/motion/scroll-reveal";
import { motion } from "framer-motion";

type Review = {
  id: string;
  name: string;
  comment: string;
  rating: number;
};

export function ReviewsGrid({ reviews }: { reviews: Review[] }) {
  return (
    <section className="py-24 px-4 bg-[var(--section-alt)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle="Testimonials"
          title="Guest Experiences"
          description="Stories from those who've dined above the clouds."
        />
        <StaggerGrid className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <StaggerItem key={review.id}>
              <motion.blockquote
                whileHover={{ y: -4, borderColor: "rgba(212, 175, 55, 0.3)" }}
                transition={{ duration: 0.3 }}
                className="glass h-full rounded-2xl border border-transparent p-8"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed italic">&ldquo;{review.comment}&rdquo;</p>
                <footer className="mt-6 font-display text-gold">— {review.name}</footer>
              </motion.blockquote>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
