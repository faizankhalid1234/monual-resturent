import { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { SITE } from "@/lib/constants";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Monal Lahore — reservations, events, and inquiries.",
};

export default function ContactPage() {
  return (
    <div className="pb-24 px-4">
      <section className="py-16 text-center">
        <SectionHeading subtitle="Reach Us" title="Contact" description="We look forward to welcoming you above Lahore." />
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="glass rounded-xl p-6 flex gap-4">
            <MapPin className="h-6 w-6 text-gold shrink-0" />
            <div>
              <h3 className="font-display text-gold">Address</h3>
              <p className="mt-2 text-muted-foreground">{SITE.address}</p>
            </div>
          </div>
          <div className="glass rounded-xl p-6 flex gap-4">
            <Phone className="h-6 w-6 text-gold shrink-0" />
            <div>
              <h3 className="font-display text-gold">Phone</h3>
              <a href={`tel:${SITE.phone}`} className="mt-2 block hover:text-gold">{SITE.phone}</a>
            </div>
          </div>
          <div className="glass rounded-xl p-6 flex gap-4">
            <Mail className="h-6 w-6 text-gold shrink-0" />
            <div>
              <h3 className="font-display text-gold">Email</h3>
              <a href={`mailto:${SITE.email}`} className="mt-2 block hover:text-gold">{SITE.email}</a>
            </div>
          </div>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 py-4 text-emerald-400 hover:bg-emerald-600/30 transition"
          >
            <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
          </a>
        </div>

        <ContactForm />
      </div>

      <div className="mx-auto mt-16 max-w-7xl overflow-hidden rounded-2xl border border-white/10 aspect-[21/9]">
        <iframe
          title="Monal Lahore Map"
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403!2d${SITE.coordinates.lng}!3d${SITE.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zTGFob3Jl!5e0!3m2!1sen!2spk!4v1`}
          className="h-full w-full min-h-[400px] border-0 grayscale hover:grayscale-0 transition"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
