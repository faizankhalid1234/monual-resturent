import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { EventType } from "@prisma/client";

const schema = z.object({
  type: z.nativeEnum(EventType),
  title: z.string().min(2),
  description: z.string().optional(),
  contactName: z.string().min(2),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  guestCount: z.number().optional(),
  date: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const data = schema.parse(await req.json());
    const event = await prisma.event.create({
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });
    return NextResponse.json({ id: event.id });
  } catch {
    return NextResponse.json({ error: "Invalid event data" }, { status: 400 });
  }
}
