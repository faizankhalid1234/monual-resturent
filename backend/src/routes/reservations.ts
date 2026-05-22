import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { sendConfirmationEmail, sendWhatsAppConfirmation, createGoogleCalendarEvent } from "../lib/integrations.js";

export const reservationsRouter = Router();

const confirmSchema = z.object({
  reservationId: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  date: z.string(),
  time: z.string(),
  guests: z.number(),
  seatingArea: z.string(),
});

reservationsRouter.post("/confirm", async (req, res) => {
  try {
    const data = confirmSchema.parse(req.body);
    const reservation = await prisma.reservation.findUnique({
      where: { id: data.reservationId },
    });
    if (!reservation) return res.status(404).json({ error: "Not found" });

    const dateStr = new Date(data.date).toLocaleDateString("en-PK", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const emailResult = await sendConfirmationEmail({
      to: data.email,
      name: data.name,
      date: dateStr,
      time: data.time,
      guests: data.guests,
      seatingArea: data.seatingArea,
    });

    const waMessage = `Monal Lahore — Reservation Confirmed\n\n${data.name}\n${dateStr} at ${data.time}\n${data.guests} guests · ${data.seatingArea}\n\nSee you above the city!`;
    const waResult = await sendWhatsAppConfirmation({ phone: data.phone, message: waMessage });

    const start = new Date(`${data.date}T${data.time}`);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const cal = await createGoogleCalendarEvent({
      summary: `Monal Reservation — ${data.name}`,
      description: `${data.guests} guests, ${data.seatingArea}`,
      start: start.toISOString(),
      end: end.toISOString(),
    });

    await prisma.reservation.update({
      where: { id: data.reservationId },
      data: {
        emailSent: emailResult.sent,
        whatsappSent: waResult.sent,
        calendarEventId: cal.eventId ?? undefined,
        status: "CONFIRMED",
      },
    });

    res.json({ ok: true, email: emailResult, whatsapp: waResult, calendar: cal });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Confirmation failed" });
  }
});
