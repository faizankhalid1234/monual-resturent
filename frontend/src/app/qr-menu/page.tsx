import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { getMenuImage } from "@/lib/images";
import { FoodImage } from "@/components/ui/food-image";

export const metadata: Metadata = {
  title: "QR Menu",
  description: "Scan & browse Monal Lahore menu on your phone.",
};

export default async function QRMenuPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { items: { where: { isAvailable: true }, orderBy: { name: "asc" } } },
  });

  return (
    <div className="min-h-screen bg-[#070707] px-4 py-8 pb-24">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Digital Menu</p>
        <h1 className="font-display text-3xl font-bold text-gold mt-2">Monal Lahore</h1>
        <Link href="/menu" className="mt-4 inline-block text-sm text-gold underline">
          Full menu & ordering →
        </Link>
      </div>
      <div className="mx-auto mt-10 max-w-lg space-y-10">
        {categories.map((cat) => (
          <section key={cat.id}>
            <h2 className="font-display text-xl text-gold border-b border-gold/30 pb-2">{cat.name}</h2>
            <ul className="mt-4 space-y-6">
              {cat.items.map((item) => (
                <li key={item.id} className="flex gap-4 glass rounded-xl p-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                    <FoodImage src={getMenuImage(item.name)} alt={item.name} sizes="80px" className="rounded-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{item.name}</p>
                    {item.description && (
                      <p className="text-muted-foreground text-xs mt-0.5 line-clamp-2">{item.description}</p>
                    )}
                    <p className="text-gold font-semibold mt-1">{formatPrice(Number(item.price))}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
