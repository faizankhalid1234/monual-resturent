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

async function saveChatMessage(data: {
  sessionId: string;
  role: string;
  content: string;
  language: string;
}) {
  try {
    await prisma.aIChatHistory.create({ data });
  } catch (error) {
    console.warn("AI chat history not saved:", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = schema.parse(await req.json());
    const language = body.language ?? "en";
    const history = (body.history ?? []).map((m) => ({
      role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
      content: m.content,
    }));

    await saveChatMessage({
      sessionId: body.sessionId,
      role: "user",
      content: body.message,
      language,
    });

    const { content } = await chatCompletion(
      [...history, { role: "user", content: body.message }],
      { language }
    );

    await saveChatMessage({
      sessionId: body.sessionId,
      role: "assistant",
      content,
      language,
    });

    return NextResponse.json({ reply: content });
  } catch (error) {
    console.error("AI chat error:", error);
    const message =
      error instanceof z.ZodError
        ? "Invalid message."
        : "Sorry, the AI assistant could not respond. Please try again.";
    return NextResponse.json({ reply: message }, { status: 200 });
  }
}
