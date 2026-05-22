"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/theme-provider";

const Toaster = dynamic(
  () => import("sonner").then((mod) => mod.Toaster),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster theme="dark" position="top-right" richColors />
    </ThemeProvider>
  );
}
