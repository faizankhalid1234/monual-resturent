import { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-4xl text-gold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-10">Reservations, analytics, menu & AI chat management</p>
        <AdminDashboard />
      </div>
    </div>
  );
}
