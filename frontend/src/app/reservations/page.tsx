import { Metadata } from "next";
import { SectionHeading } from "@/components/layout/section-heading";
import { ReservationForm } from "@/components/reservations/reservation-form";

export const metadata: Metadata = {
  title: "Reservations",
  description: "Book your table at Monal Lahore with AI-powered reservation assistance.",
};

export default function ReservationsPage() {
  return (
    <div className="pb-24 px-4">
      <section className="py-16 text-center">
        <SectionHeading
          subtitle="Book Your Evening"
          title="Reservations"
          description="Select your date, time, and seating. Instant confirmations when integrations are enabled."
        />
      </section>
      <ReservationForm />
    </div>
  );
}
