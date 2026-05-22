import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [reservations, customers, menuItems, chatSessions, orders, revenue] = await Promise.all([
    prisma.reservation.count(),
    prisma.customer.count(),
    prisma.menuItem.count(),
    prisma.aIChatHistory.groupBy({ by: ["sessionId"] }).then((g) => g.length),
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
