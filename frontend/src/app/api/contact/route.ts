import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

export async function POST(req: NextRequest) {
  try {
    const data = schema.parse(await req.json());
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    await fetch(`${apiUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {});
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }
}
