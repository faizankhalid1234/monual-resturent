import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  date: z.string(),
  time: z.string(),
  guests: z.number().min(1).max(50),
  seatingArea: z.string(),
  specialRequests: z.string().optional(),
  aiAssist: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const data = schema.parse(await req.json());

    const customer = await prisma.customer.upsert({
      where: { email: data.email },
      update: { name: data.name, phone: data.phone },
      create: { name: data.name, email: data.email, phone: data.phone },
    });

    const reservation = await prisma.reservation.create({
      data: {
        date: new Date(data.date),
        time: data.time,
        guests: data.guests,
        seatingArea: data.seatingArea,
        specialRequests: data.specialRequests,
        status: data.aiAssist ? "CONFIRMED" : "PENDING",
        customerId: customer.id,
      },
    });

    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    fetch(`${apiUrl}/api/reservations/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_SECRET_KEY ?? "",
      },
      body: JSON.stringify({ reservationId: reservation.id, ...data }),
    }).catch(() => {});

    return NextResponse.json({
      id: reservation.id,
      message: data.aiAssist
        ? "Reservation confirmed! Check your email and WhatsApp for details."
        : "Reservation received! Our team will confirm shortly.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid reservation data" }, { status: 400 });
  }
}

export async function GET() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { date: "desc" },
    take: 50,
    include: { customer: true },
  });
  return NextResponse.json(reservations);
}
