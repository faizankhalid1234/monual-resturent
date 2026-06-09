import { prisma } from "@/lib/prisma";
import { PopularDishesGrid } from "@/components/home/popular-dishes-grid";

export async function PopularDishes() {
  const dishes = await prisma.menuItem.findMany({
    where: { isPopular: true, isAvailable: true },
    take: 6,
    include: { category: true },
  });

  const serialized = dishes.map((dish) => ({
    id: dish.id,
    name: dish.name,
    description: dish.description,
    price: Number(dish.price),
    category: { name: dish.category.name },
  }));

  return <PopularDishesGrid dishes={serialized} />;
}
