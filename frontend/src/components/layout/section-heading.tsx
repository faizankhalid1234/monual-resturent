"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({ subtitle, title, description, className, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("mb-12", align === "center" && "text-center", className)}
    >
      {subtitle && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-gold">{subtitle}</p>
      )}
      <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">{title}</h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">{description}</p>
      )}
      <div className={cn("mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent", align === "center" && "mx-auto")} />
    </motion.div>
  );
}
