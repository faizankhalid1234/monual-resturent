import { Metadata } from "next";
import { SectionHeading } from "@/components/layout/section-heading";
import { Award, Target, Eye } from "lucide-react";
import { ABOUT_HERO, CHEF_IMAGES } from "@/lib/images";
import { FoodImage } from "@/components/ui/food-image";

export const metadata: Metadata = {
  title: "About",
  description: "Discover the story, chefs, and vision behind Monal Lahore.",
};

const chefs = [
  { name: "Executive Chef Ali Raza", specialty: "Pakistani & BBQ", image: CHEF_IMAGES.aliRaza },
  { name: "Chef Maria Santos", specialty: "Continental", image: CHEF_IMAGES.mariaSantos },
  { name: "Chef Li Wei", specialty: "Chinese", image: CHEF_IMAGES.liWei },
];

const awards = [
  "Best Rooftop Restaurant — Pakistan Luxury Awards 2025",
  "TripAdvisor Travellers' Choice — Hall of Fame",
  "Forbes Middle East — Top 50 Dining Experiences",
  "Lahore Tourism Excellence Award",
];

export default function AboutPage() {
  return (
    <div className="pb-24">
      <section className="relative flex min-h-[50vh] items-end overflow-hidden">
        <FoodImage src={ABOUT_HERO} alt="Monal Lahore" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-black/60 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16">
          <h1 className="font-display text-5xl font-bold text-gold md:text-6xl">Our Story</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Born from a vision to elevate Lahore&apos;s dining skyline, Monal has become synonymous with luxury,
            hospitality, and breathtaking views.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <SectionHeading
          subtitle="Heritage"
          title="A Legacy Above Lahore"
          description="Since opening our Lahore destination, Monal has welcomed dignitaries, celebrities, and families seeking unforgettable evenings."
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading subtitle="Culinary Team" title="Meet Our Chefs" align="left" />
        <div className="grid gap-8 md:grid-cols-3">
          {chefs.map((chef) => (
            <article key={chef.name} className="shine-border overflow-hidden rounded-2xl glass">
              <div className="relative aspect-[4/5] min-h-[320px] bg-zinc-900">
                <FoodImage src={chef.image} alt={chef.name} sizes="33vw" className="object-top" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-gold">{chef.name}</h3>
                <p className="text-sm text-muted-foreground">{chef.specialty}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2">
        <div className="glass-gold rounded-2xl p-8">
          <Target className="mb-4 h-8 w-8 text-gold" />
          <h3 className="font-display text-2xl text-gold">Mission</h3>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            To deliver world-class dining experiences rooted in Pakistani hospitality, using technology and
            craftsmanship to exceed every guest expectation.
          </p>
        </div>
        <div className="glass-gold rounded-2xl p-8">
          <Eye className="mb-4 h-8 w-8 text-gold" />
          <h3 className="font-display text-2xl text-gold">Vision</h3>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            To be South Asia&apos;s most iconic rooftop restaurant brand — where cuisine, culture, and skyline views unite.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <SectionHeading subtitle="Recognition" title="Awards & Achievements" />
        <ul className="space-y-4">
          {awards.map((award) => (
            <li key={award} className="flex items-start gap-3 glass rounded-lg px-6 py-4">
              <Award className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span>{award}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
