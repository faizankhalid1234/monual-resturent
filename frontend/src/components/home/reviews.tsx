import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ReviewsGrid } from "@/components/home/reviews-grid";

type FeaturedReview = Prisma.ReviewGetPayload<Record<string, never>>;

export const dynamic = "force-dynamic";

export async function Reviews() {
  let reviews: FeaturedReview[] = [];

  try {
    reviews = await prisma.review.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  } catch (error) {
    console.error("Reviews query failed:", error);
  }

  return <ReviewsGrid reviews={reviews} />;
}
