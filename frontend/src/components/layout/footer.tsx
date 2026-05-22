import Link from "next/link";
import { Share2, Mail, Phone, MapPin } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="font-display text-2xl text-gold">MONAL LAHORE</h3>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{SITE.description}</p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Explore</h4>
          <ul className="space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted-foreground hover:text-gold transition">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-gold transition">
                Admin
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-gold mt-0.5" />
              {SITE.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold" />
              <a href={`tel:${SITE.phone}`} className="hover:text-gold">{SITE.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" />
              <a href={`mailto:${SITE.email}`} className="hover:text-gold">{SITE.email}</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Hours</h4>
          <p className="text-sm text-muted-foreground">{SITE.hours}</p>
          <div className="mt-6 flex gap-4">
            <a href={SITE.social.instagram} className="text-gold hover:text-gold-light text-xs uppercase tracking-widest flex items-center gap-1" aria-label="Instagram">
              <Share2 className="h-4 w-4" /> Instagram
            </a>
            <a href={SITE.social.facebook} className="text-gold hover:text-gold-light text-xs uppercase tracking-widest flex items-center gap-1" aria-label="Facebook">
              <Share2 className="h-4 w-4" /> Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved. Crafted with AI-powered hospitality.
      </div>
    </footer>
  );
}
