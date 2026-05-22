"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Calendar, Users, UtensilsCrossed, MessageSquare, DollarSign, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface Stats {
  reservations: number;
  pendingReservations: number;
  customers: number;
  menuItems: number;
  chatSessions: number;
  orders: number;
  revenue: number;
}

interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: string;
  status: string;
  customer?: { name: string; email: string };
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then(setStats);
    fetch("/api/reservations").then((r) => r.json()).then(setReservations);
  }, []);

  const chartData = [
    { name: "Reservations", value: stats?.reservations ?? 0 },
    { name: "Customers", value: stats?.customers ?? 0 },
    { name: "Orders", value: stats?.orders ?? 0 },
    { name: "AI Chats", value: stats?.chatSessions ?? 0 },
  ];

  const statCards = [
    { label: "Reservations", value: stats?.reservations, icon: Calendar },
    { label: "Pending", value: stats?.pendingReservations, icon: Clock },
    { label: "Customers", value: stats?.customers, icon: Users },
    { label: "Menu Items", value: stats?.menuItems, icon: UtensilsCrossed },
    { label: "AI Sessions", value: stats?.chatSessions, icon: MessageSquare },
    { label: "Revenue", value: stats ? formatPrice(stats.revenue) : "—", icon: DollarSign },
  ];

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{value ?? "—"}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip contentStyle={{ background: "#111", border: "1px solid #c9a227" }} />
              <Bar dataKey="value" fill="#c9a227" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reservations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-muted-foreground">
                  <th className="pb-3 pr-4">Guest</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Time</th>
                  <th className="pb-3 pr-4">Guests</th>
                  <th className="pb-3 pr-4">Area</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {reservations.slice(0, 15).map((r) => (
                  <tr key={r.id} className="border-b border-white/5">
                    <td className="py-3 pr-4">{r.customer?.name ?? "—"}</td>
                    <td className="py-3 pr-4">{new Date(r.date).toLocaleDateString()}</td>
                    <td className="py-3 pr-4">{r.time}</td>
                    <td className="py-3 pr-4">{r.guests}</td>
                    <td className="py-3 pr-4">{r.seatingArea}</td>
                    <td className="py-3">
                      <Badge variant={r.status === "CONFIRMED" ? "success" : "secondary"}>{r.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
