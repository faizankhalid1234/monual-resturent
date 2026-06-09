"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="group flex flex-col">
          <span className="font-display text-2xl font-bold tracking-wider text-gold transition group-hover:text-gold-light">
            MONAL
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Luxury Rooftop Dining · Lahore
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm uppercase tracking-widest transition hover:text-gold",
                pathname === link.href ? "text-gold" : "text-foreground/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Language">
            <Globe className="h-4 w-4" />
          </Button>
          <Button asChild>
            <Link href="/reservations">Book Table</Link>
          </Button>
        </div>

        <button className="lg:hidden text-gold" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-black/95 lg:hidden"
          >
            <nav className="flex flex-col gap-4 p-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn("text-lg tracking-wide", pathname === link.href && "text-gold")}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-4">
                <Link href="/reservations" onClick={() => setOpen(false)}>
                  Book Table
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
