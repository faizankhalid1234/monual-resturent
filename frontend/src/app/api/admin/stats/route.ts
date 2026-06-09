import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // fetch chat sessions separately to avoid inline-then typing issues
  const chatGroups = await prisma.aIChatHistory.groupBy({ by: ["sessionId"] as const });
  const chatSessions = chatGroups.length;

  const [reservations, customers, menuItems, orders, revenue] = await Promise.all([
    prisma.reservation.count(),
    prisma.customer.count(),
    prisma.menuItem.count(),
    prisma.order.count(),
    prisma.payment.aggregate({ _sum: { amount: true }, where: { status: "PAID" } }),
  ]);

  const pendingReservations = await prisma.reservation.count({ where: { status: "PENDING" } });

  return NextResponse.json({
    reservations,
    pendingReservations,
    customers,
    menuItems,
    chatSessions,
    orders,
    revenue: Number(revenue._sum.amount ?? 0),
  });
}
