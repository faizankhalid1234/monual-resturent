"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getMenuImage } from "@/lib/images";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/layout/section-heading";
import { FoodImage } from "@/components/ui/food-image";
import { StaggerGrid, StaggerItem } from "@/components/motion/scroll-reveal";

type Dish = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: { name: string };
};

export function PopularDishesGrid({ dishes }: { dishes: Dish[] }) {
  return (
    <section id="popular-dishes" className="py-24 px-4 theme-section-alt">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle="Chef's Selection"
          title="Popular Dishes"
          description="Signature creations loved by our guests — crafted with premium ingredients and Lahori flair."
        />
        <StaggerGrid className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish, i) => (
            <StaggerItem key={dish.id}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35 }}
                className="group shine-border h-full overflow-hidden rounded-2xl glass transition duration-500 hover:border-gold/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                  <FoodImage
                    src={getMenuImage(dish.name)}
                    alt={dish.name}
                    priority={i < 3}
                    className="transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <Badge className="absolute left-4 top-4 z-10">{dish.category.name}</Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-gold">{dish.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{dish.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold">{formatPrice(dish.price)}</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/menu">View</Link>
                    </Button>
                  </div>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
