import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MenuClient } from "@/components/menu/menu-client";
import { SectionHeading } from "@/components/layout/section-heading";

export const metadata: Metadata = {
  title: "Menu",
  description: "Explore Monal Lahore's premium menu — Pakistani, BBQ, Chinese, Continental, desserts & drinks.",
};

export default async function MenuPage() {
  const [items, categories] = await Promise.all([
    prisma.menuItem.findMany({
      where: { isAvailable: true },
      include: { category: true },
      orderBy: { name: "asc" },
    }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const dto = items.map((i) => ({
    id: i.id,
    name: i.name,
    description: i.description,
    price: Number(i.price),
    imageUrl: i.imageUrl,
    isPopular: i.isPopular,
    category: { name: i.category.name, slug: i.category.slug },
  }));

  return (
    <div className="pb-24">
      <section className="border-b border-white/10 bg-gradient-to-b from-gold/5 to-transparent py-20 px-4 text-center">
        <SectionHeading subtitle="Culinary Excellence" title="Our Menu" description="Six cuisines. One unforgettable skyline." />
      </section>
      <MenuClient items={dto} categories={categories} />
    </div>
  );
}
