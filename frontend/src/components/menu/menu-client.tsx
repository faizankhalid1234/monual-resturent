"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, ShoppingCart, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FoodImage } from "@/components/ui/food-image";
import { formatPrice, cn } from "@/lib/utils";
import { getMenuImage } from "@/lib/images";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

export interface MenuItemDTO {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  category: { name: string; slug: string };
  isPopular: boolean;
}

interface MenuClientProps {
  items: MenuItemDTO[];
  categories: { id: string; name: string; slug: string }[];
}

export function MenuClient({ items, categories }: MenuClientProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [aiPrefs, setAiPrefs] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPicks, setAiPicks] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const { addItem, items: cartItems, total } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchCat = activeCategory === "all" || item.category.slug === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.category.name.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [items, search, activeCategory]);

  async function getRecommendations() {
    if (!aiPrefs.trim()) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences: aiPrefs }),
      });
      const data = await res.json();
      setAiPicks(data.dishes ?? []);
      toast.success("AI recommendations ready");
    } catch {
      toast.error("Could not fetch recommendations");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 rounded-full glass-gold px-4 py-2 text-gold">
          <ShoppingCart className="h-5 w-5" />
          <span className="text-sm">
            {mounted ? `${cartItems.length} items · ${formatPrice(total())}` : "Loading cart..."}
          </span>
        </div>
      </div>

      <div className="mb-8 glass-gold rounded-xl p-4">
        <div className="flex items-center gap-2 text-gold mb-2">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">AI Menu Recommendations</span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="e.g. spicy Pakistani, date night..."
            value={aiPrefs}
            onChange={(e) => setAiPrefs(e.target.value)}
          />
          <Button onClick={getRecommendations} disabled={aiLoading} variant="outline">
            {aiLoading ? "Thinking..." : "Recommend"}
          </Button>
        </div>
        {aiPicks.length > 0 && (
          <p className="mt-3 text-sm text-muted-foreground">
            Suggested: <span className="text-gold">{aiPicks.join(" · ")}</span>
          </p>
        )}
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {["all", ...categories.map((c) => c.slug)].map((slug) => (
          <button
            key={slug}
            type="button"
            onClick={() => setActiveCategory(slug)}
            className={cn(
              "rounded-full px-4 py-2 text-xs uppercase tracking-wider transition",
              activeCategory === slug ? "bg-gold text-black shadow-lg shadow-gold/20" : "glass hover:border-gold/40"
            )}
          >
            {slug === "all" ? "All" : categories.find((c) => c.slug === slug)?.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <article key={item.id} className="shine-border group overflow-hidden rounded-2xl glass transition hover:-translate-y-1">
            <div className="relative aspect-[4/3] bg-zinc-900">
              <FoodImage src={getMenuImage(item.name)} alt={item.name} className="group-hover:scale-105 transition duration-500" />
              {item.isPopular && <Badge className="absolute left-3 top-3 z-10">Popular</Badge>}
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-widest text-gold/80">{item.category.name}</p>
              <h3 className="font-display text-lg mt-1">{item.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold text-gold">{formatPrice(item.price)}</span>
                <Button
                  size="sm"
                  onClick={() => {
                    addItem({ id: item.id, name: item.name, price: item.price, imageUrl: getMenuImage(item.name) });
                    toast.success(`${item.name} added`);
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-muted-foreground">No dishes match your search.</p>
      )}
    </div>
  );
}
