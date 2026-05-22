import { Router } from "express";
import { z } from "zod";
import { sendConfirmationEmail } from "../lib/integrations.js";

export const contactRouter = Router();

contactRouter.post("/", async (req, res) => {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    message: z.string(),
  });
  try {
    const data = schema.parse(req.body);
    await sendConfirmationEmail({
      to: process.env.GMAIL_USER ?? data.email,
      name: data.name,
      date: "Contact Form",
      time: "—",
      guests: 0,
      seatingArea: data.message.slice(0, 200),
    });
    res.json({ ok: true });
  } catch {
    res.status(400).json({ error: "Invalid contact" });
  }
});
