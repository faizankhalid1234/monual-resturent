import { prisma } from "@/lib/prisma";
import { ReviewsGrid } from "@/components/home/reviews-grid";

export async function Reviews() {
  const reviews = await prisma.review.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return <ReviewsGrid reviews={reviews} />;
}
