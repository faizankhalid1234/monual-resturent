import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AIChatWidget } from "@/components/ai/chat-widget";
import { SITE } from "@/lib/constants";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Luxury Rooftop Dining Lahore`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ["Monal Lahore", "fine dining", "rooftop restaurant", "Lahore restaurant", "luxury dining Pakistan"],
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    type: "website",
    locale: "en_PK",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const content = (
    <html lang="en" suppressHydrationWarning className={`dark ${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Providers>
          <Header />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <AIChatWidget />
        </Providers>
      </body>
    </html>
  );

  if (clerkEnabled) {
    return <ClerkProvider>{content}</ClerkProvider>;
  }

  return content;
}
