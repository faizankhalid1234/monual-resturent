import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export const MONAL_SYSTEM_PROMPT = `You are the AI concierge for Monal Lahore, Pakistan's premier luxury rooftop restaurant.
You assist guests in English and Urdu (اردو). Be warm, elegant, and concise.
Capabilities: reservations, menu recommendations, events, hours, directions, dietary guidance.
Restaurant: Pir Sohawa Road area, Lahore skyline views. Hours: 12 PM – 12 AM daily.
Seating: Rooftop Terrace, Indoor Fine Dining, Private Hall, Garden Lounge, VIP Sky Lounge.
For reservations collect: name, email, phone, date, time, guests, seating area.
Never invent prices; suggest popular dishes: Mutton Karahi, Seekh Kebab, Grilled Salmon.`;

function offlineFallback(language?: string) {
  const en =
    process.env.NODE_ENV === "development"
      ? "AI is not configured. Add OPENAI_API_KEY to backend/.env or frontend/.env.local, then restart the dev server."
      : "Our AI concierge is temporarily offline. Please call us or use the reservation form.";
  const ur =
    process.env.NODE_ENV === "development"
      ? "AI کنفیگر نہیں ہے۔ OPENAI_API_KEY backend/.env میں شامل کریں۔"
      : "AI عارضی طور پر بند ہے۔ براہ کرم ریزرویشن فارم استعمال کریں۔";
  return language === "ur" ? ur : en;
}

function quotaFallback(language?: string) {
  const en =
    "Our AI is briefly unavailable (OpenAI quota reached). Hours: 12 PM – 12 AM daily. Popular dishes: Mutton Karahi, Seekh Kebab, Grilled Salmon. Book at /reservations.";
  const ur =
    "AI عارضی طور پر دستیاب نہیں (OpenAI quota ختم)۔ اوقات: 12 PM – 12 AM۔ مشہور ڈishes: مٹن کڑاہی، سیخ کباب۔ /reservations پر بک کریں۔";
  return language === "ur" ? ur : en;
}

function smartFallback(userMessage: string, language?: string) {
  const msg = userMessage.toLowerCase();

  if (/hour|time|open|close|وقت|کھل/.test(msg)) {
    return language === "ur"
      ? "Monal Lahore روزانہ 12 PM سے 12 AM تک کھلا رہتا ہے۔"
      : "Monal Lahore is open daily from 12 PM to 12 AM.";
  }
  if (/book|reserv|table|میز|بک/.test(msg)) {
    return language === "ur"
      ? "میز بک کرنے کے لیے Reservations صفحہ پر جائیں یا نام، تاریخ، وقت اور مہمانوں کی تعداد بھیجیں۔"
      : "To book a table, visit our Reservations page or share your name, date, time, and guest count.";
  }
  if (/menu|food|dish|کھانا|مینو/.test(msg)) {
    return language === "ur"
      ? "مشہور ڈishes: Mutton Karahi، Seekh Kebab Platter، Grilled Salmon، Chusci۔ Menu صفحہ دیکھیں۔"
      : "Popular picks: Mutton Karahi, Seekh Kebab Platter, Grilled Salmon, and Chusci. See our full Menu page.";
  }
  if (/location|address|where|کہاں|پتہ/.test(msg)) {
    return language === "ur"
      ? "Monal Lahore، Pir Sohawa Road area، Lahore — شاندار rooftop views کے ساتھ۔"
      : "Monal Lahore is in the Pir Sohawa Road area, Lahore — with stunning rooftop views.";
  }

  return quotaFallback(language);
}

function isQuotaError(error: unknown) {
  if (error && typeof error === "object" && "status" in error) {
    return (error as { status?: number }).status === 429;
  }
  return false;
}

export async function chatCompletion(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  options?: { language?: string }
) {
  if (!openai) {
    return { content: offlineFallback(options?.language), model: "fallback" };
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [{ role: "system", content: MONAL_SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 800,
    });

    return {
      content: response.choices[0]?.message?.content ?? smartFallback(lastUser, options?.language),
      model: response.model,
    };
  } catch (error) {
    console.error("OpenAI chat error:", error);
    if (isQuotaError(error)) {
      return { content: smartFallback(lastUser, options?.language), model: "fallback-quota" };
    }
    return { content: smartFallback(lastUser, options?.language), model: "fallback-error" };
  }
}

export async function recommendDishes(preferences: string) {
  const defaults = ["Mutton Karahi", "Seekh Kebab Platter", "Grilled Atlantic Salmon"];

  if (!openai) return defaults;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [
        { role: "system", content: MONAL_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Recommend 3 dishes from our menu for: ${preferences}. Return JSON array of dish names only.`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.5,
    });

    const parsed = JSON.parse(response.choices[0]?.message?.content ?? "{}");
    return (parsed.dishes ?? parsed.recommendations ?? defaults) as string[];
  } catch (error) {
    console.error("OpenAI recommend error:", error);
    return defaults;
  }
}
