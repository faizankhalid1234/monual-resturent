"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { CTA_BG } from "@/lib/images";
import { easeLuxury, fadeUp } from "@/lib/motion";

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  return (
    <section ref={ref} className="relative mx-4 mb-24 overflow-hidden rounded-3xl shine-border">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image src={CTA_BG} alt="" fill className="object-cover" sizes="100vw" quality={90} />
      </motion.div>
      <div className="absolute inset-0 bg-black/75" />
      <motion.div
        style={{ y: contentY }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className="relative z-10 px-8 py-20 text-center md:py-28"
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.7, ease: easeLuxury }}
          className="text-xs uppercase tracking-[0.35em] text-gold"
        >
          Reserve Your Evening
        </motion.p>
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.7, ease: easeLuxury }}
          className="mt-4 font-display text-4xl font-bold text-white md:text-5xl"
        >
          Dine Above the City Lights
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.7, ease: easeLuxury }}
          className="mx-auto mt-4 max-w-xl text-white/75"
        >
          Let our AI concierge handle your reservation — instant confirmations via email and WhatsApp.
        </motion.p>
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.7, ease: easeLuxury }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="lg">
            <Link href="/reservations">Book Now</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/events">Private Events</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
