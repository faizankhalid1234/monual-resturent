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

export async function chatCompletion(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  options?: { language?: string }
) {
  if (!openai) {
    return {
      content:
        options?.language === "ur"
          ? "معذرت، AI سروس عارضی طور پر دستیاب نہیں۔ برائے مہربانی بعد میں دوبارہ کوشش کریں۔"
          : "Our AI concierge is temporarily offline. Please try again later.",
      model: "fallback",
    };
  }

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4o",
    messages: [{ role: "system", content: MONAL_SYSTEM_PROMPT }, ...messages],
    temperature: 0.7,
    max_tokens: 800,
  });

  return {
    content: response.choices[0]?.message?.content ?? "",
    model: response.model,
  };
}

export async function recommendDishes(preferences: string) {
  if (!openai) return ["Mutton Karahi", "Seekh Kebab Platter", "Grilled Atlantic Salmon"];

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4o",
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

  try {
    const parsed = JSON.parse(response.choices[0]?.message?.content ?? "{}");
    return (parsed.dishes ?? parsed.recommendations ?? []) as string[];
  } catch {
    return ["Mutton Karahi", "Chocolate Lava Cake", "Karak Chai"];
  }
}
