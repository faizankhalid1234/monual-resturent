import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [
    reservations,
    customers,
    menuItems,
    chatSessionRows,
    orders,
    revenue,
    pendingReservations,
  ] = await Promise.all([
    prisma.reservation.count(),
    prisma.customer.count(),
    prisma.menuItem.count(),
    prisma.aIChatHistory.findMany({
      distinct: ["sessionId"],
      select: { sessionId: true },
    }),
    prisma.order.count(),
    prisma.payment.aggregate({ _sum: { amount: true }, where: { status: "PAID" } }),
    prisma.reservation.count({ where: { status: "PENDING" } }),
  ]);

  return NextResponse.json({
    reservations,
    pendingReservations,
    customers,
    menuItems,
    chatSessions: chatSessionRows.length,
    orders,
    revenue: Number(revenue._sum.amount ?? 0),
  });
}
