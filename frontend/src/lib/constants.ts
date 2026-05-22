export const SITE = {
  name: "Monal Lahore",
  tagline: "Where Lahore meets the sky",
  description:
    "Pakistan's premier rooftop dining destination — luxury cuisine, panoramic views, and AI-powered hospitality.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://monallahore.com",
  phone: "+92 42 111 666 625",
  email: "reservations@monallahore.com",
  whatsapp: "https://wa.me/9242111666625",
  address: "Monal Restaurant, Pir Sohawa Road, Islamabad-Lahore Highway, Lahore",
  coordinates: { lat: 31.4704, lng: 74.0821 },
  hours: "12:00 PM – 12:00 AM (Daily)",
  social: {
    instagram: "https://instagram.com/monalrestaurant",
    facebook: "https://facebook.com/monalrestaurant",
  },
} as const;

export const SEATING_AREAS = [
  "Rooftop Terrace",
  "Indoor Fine Dining",
  "Private Hall",
  "Garden Lounge",
  "VIP Sky Lounge",
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/reservations", label: "Reservations" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const EVENT_TYPES = [
  { id: "WEDDING", title: "Wedding Events", description: "Elegant celebrations with bespoke menus and dedicated coordinators." },
  { id: "BIRTHDAY", title: "Birthday Events", description: "Memorable milestones with custom décor and curated dining." },
  { id: "CORPORATE", title: "Corporate Meetings", description: "Executive boardrooms and conference-ready private spaces." },
  { id: "ROOFTOP", title: "Rooftop Bookings", description: "Exclusive skyline experiences for intimate gatherings." },
  { id: "PRIVATE_HALL", title: "Private Hall", description: "Grand halls for up to 500 guests with full catering." },
] as const;
