import { Hero } from "@/components/home/hero";
import { PopularDishes } from "@/components/home/popular-dishes";
import { Reviews } from "@/components/home/reviews";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularDishes />
      <Reviews />
      <GalleryPreview />
      <CTASection />
    </>
  );
}
