import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MENU_ITEM_IMAGES: Record<string, string> = {
  "Mutton Karahi": "/images/menu/mutton-karahi.jpg",
  "Chicken Handi": "/images/menu/chicken-handi.jpg",
  "Seekh Kebab Platter": "/images/menu/seekh-kebab-platter.jpg",
  "Beef Bihari Boti": "/images/menu/beef-bihari-boti.jpg",
  "Dragon Chicken": "/images/menu/dragon-chicken.jpg",
  "Szechuan Noodles": "/images/menu/szechuan-noodles.jpg",
  "Grilled Atlantic Salmon": "/images/menu/grilled-salmon.jpg",
  "Beef Tenderloin Steak": "/images/menu/beef-steak.jpg",
  "Gulab Jamun Trio": "/images/menu/gulab-jamun.jpg",
  "Chocolate Lava Cake": "/images/menu/chocolate-lava-cake.jpg",
  "Fresh Mint Margarita": "/images/menu/mint-margarita.jpg",
  "Karak Chai": "/images/menu/karak-chai.jpg",
};

const categories = [
  { name: "Pakistani", slug: "pakistani", sortOrder: 1 },
  { name: "BBQ", slug: "bbq", sortOrder: 2 },
  { name: "Chinese", slug: "chinese", sortOrder: 3 },
  { name: "Continental", slug: "continental", sortOrder: 4 },
  { name: "Desserts", slug: "desserts", sortOrder: 5 },
  { name: "Drinks", slug: "drinks", sortOrder: 6 },
];

const menuItems = [
  { name: "Mutton Karahi", category: "pakistani", price: 4500, isPopular: true, description: "Signature Lahori karahi slow-cooked in wok." },
  { name: "Chicken Handi", category: "pakistani", price: 3200, isPopular: true, description: "Creamy handi with aromatic spices." },
  { name: "Seekh Kebab Platter", category: "bbq", price: 2800, isPopular: true, description: "Charcoal-grilled seekh with mint chutney." },
  { name: "Beef Bihari Boti", category: "bbq", price: 3500, description: "Tender marinated beef boti from the tandoor." },
  { name: "Dragon Chicken", category: "chinese", price: 2200, description: "Crispy chicken in sweet-spicy sauce." },
  { name: "Szechuan Noodles", category: "chinese", price: 1800, description: "Wok-tossed noodles with vegetables." },
  { name: "Grilled Atlantic Salmon", category: "continental", price: 5200, isPopular: true, description: "Herb-crusted salmon with lemon butter." },
  { name: "Beef Tenderloin Steak", category: "continental", price: 6500, description: "Premium cut with peppercorn sauce." },
  { name: "Gulab Jamun Trio", category: "desserts", price: 850, description: "Warm milk dumplings in rose syrup." },
  { name: "Chocolate Lava Cake", category: "desserts", price: 1200, isPopular: true, description: "Molten center with vanilla gelato." },
  { name: "Fresh Mint Margarita", category: "drinks", price: 650, description: "House-blend mocktail." },
  { name: "Karak Chai", category: "drinks", price: 350, description: "Strong Pakistani tea with cardamom." },
];

const reviews = [
  { name: "Ayesha Khan", rating: 5, comment: "Breathtaking views of Lahore and impeccable service. The karahi is unforgettable.", isFeatured: true },
  { name: "James Mitchell", rating: 5, comment: "Fine dining at its peak. Rooftop sunset dinner was magical.", isFeatured: true },
  { name: "Hassan Raza", rating: 5, comment: "Best BBQ in Pakistan. Staff made our anniversary truly special.", isFeatured: true },
  { name: "Sarah Ahmed", rating: 4, comment: "Elegant ambiance and diverse menu. Reservations were seamless.", isFeatured: false },
];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.review.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.aIChatHistory.deleteMany();

  for (const cat of categories) {
    await prisma.category.upsert({ where: { slug: cat.slug }, update: {}, create: cat });
  }

  const cats = await prisma.category.findMany();
  const catMap = Object.fromEntries(cats.map((c) => [c.slug, c.id]));

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: {
        name: item.name,
        description: item.description,
        price: item.price,
        isPopular: item.isPopular ?? false,
        categoryId: catMap[item.category],
        imageUrl: MENU_ITEM_IMAGES[item.name],
      },
    });
  }

  for (const review of reviews) {
    await prisma.review.create({ data: review });
  }

  console.log("Seed completed with local images.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
