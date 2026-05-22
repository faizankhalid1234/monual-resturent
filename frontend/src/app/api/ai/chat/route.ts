import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { chatCompletion } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  message: z.string().min(1).max(2000),
  sessionId: z.string(),
  language: z.enum(["en", "ur"]).optional(),
  history: z.array(z.object({ role: z.string(), content: z.string() })).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = schema.parse(await req.json());
    const history = (body.history ?? []).map((m) => ({
      role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
      content: m.content,
    }));

    await prisma.aIChatHistory.create({
      data: {
        sessionId: body.sessionId,
        role: "user",
        content: body.message,
        language: body.language ?? "en",
      },
    });

    const { content } = await chatCompletion(
      [...history, { role: "user", content: body.message }],
      { language: body.language }
    );

    await prisma.aIChatHistory.create({
      data: {
        sessionId: body.sessionId,
        role: "assistant",
        content,
        language: body.language ?? "en",
      },
    });

    return NextResponse.json({ reply: content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
