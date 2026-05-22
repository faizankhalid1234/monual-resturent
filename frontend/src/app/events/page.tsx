import { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/layout/section-heading";
import { EVENT_TYPES } from "@/lib/constants";
import { EVENTS_HERO } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { EventInquiryForm } from "@/components/events/event-inquiry-form";
import { FoodImage } from "@/components/ui/food-image";

export const metadata: Metadata = {
  title: "Events & Private Dining",
  description: "Weddings, birthdays, corporate events, and private hall bookings at Monal Lahore.",
};

export default function EventsPage() {
  return (
    <div className="pb-24">
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <FoodImage src={EVENTS_HERO} alt="Private events at Monal" priority sizes="100vw" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-5xl font-bold text-gold">Events & Private Dining</h1>
          <p className="mt-4 max-w-xl text-white/85">Celebrate life&apos;s finest moments above Lahore.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {EVENT_TYPES.map((event) => (
            <article key={event.id} className="shine-border glass rounded-2xl p-8 transition hover:border-gold/40">
              <h3 className="font-display text-xl text-gold">{event.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{event.description}</p>
              <Button variant="outline" className="mt-6" asChild>
                <Link href="#inquiry">Inquire</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section id="inquiry" className="mx-auto max-w-3xl px-4 py-12">
        <SectionHeading subtitle="Plan Your Event" title="Request a Proposal" />
        <EventInquiryForm />
      </section>
    </div>
  );
}
