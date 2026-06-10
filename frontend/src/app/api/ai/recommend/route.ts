import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { recommendDishes } from "@/lib/ai";

const schema = z.object({ preferences: z.string().min(3).max(500) });

export async function POST(req: NextRequest) {
  try {
    const { preferences } = schema.parse(await req.json());
    const dishes = await recommendDishes(preferences);
    return NextResponse.json({ dishes });
  } catch (error) {
    console.error("AI recommend error:", error);
    return NextResponse.json({
      dishes: ["Mutton Karahi", "Seekh Kebab Platter", "Grilled Atlantic Salmon"],
    });
  }
}
