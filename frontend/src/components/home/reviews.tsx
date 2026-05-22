import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/layout/section-heading";

export async function Reviews() {
  const reviews = await prisma.review.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent to-black/40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle="Testimonials"
          title="Guest Experiences"
          description="Stories from those who've dined above the clouds."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <blockquote key={review.id} className="glass rounded-2xl p-8">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed italic">&ldquo;{review.comment}&rdquo;</p>
              <footer className="mt-6 font-display text-gold">— {review.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
