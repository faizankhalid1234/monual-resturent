import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CTA_BG } from "@/lib/images";

export function CTASection() {
  return (
    <section className="relative mx-4 mb-24 overflow-hidden rounded-3xl shine-border">
      <Image src={CTA_BG} alt="" fill className="object-cover" sizes="100vw" quality={90} />
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative z-10 px-8 py-20 text-center md:py-28">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Reserve Your Evening</p>
        <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
          Dine Above the City Lights
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/75">
          Let our AI concierge handle your reservation — instant confirmations via email and WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/reservations">Book Now</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/events">Private Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
