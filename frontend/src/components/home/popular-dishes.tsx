import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PopularDishesGrid } from "@/components/home/popular-dishes-grid";

type PopularDish = Prisma.MenuItemGetPayload<{
  include: { category: true };
}>;

export const dynamic = "force-dynamic";

export async function PopularDishes() {
  let dishes: PopularDish[] = [];

  try {
    dishes = await prisma.menuItem.findMany({
      where: { isPopular: true, isAvailable: true },
      take: 6,
      include: { category: true },
    });
  } catch (error) {
    console.error("PopularDishes query failed:", error);
  }

  const serialized = dishes.map((dish) => ({
    id: dish.id,
    name: dish.name,
    description: dish.description,
    price: Number(dish.price),
    category: { name: dish.category.name },
  }));

  return <PopularDishesGrid dishes={serialized} />;
}
