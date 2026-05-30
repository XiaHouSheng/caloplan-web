import { type MealType } from "./MealRecord";
import { nanoid } from "nanoid";
interface AiRecommendation {
  id: string;
  date: string;
  mealType?: MealType; // 可选，针对哪一餐的推荐
  items: AiRecommendItem[];
  createdAt: string;
}

interface AiRecommendItem {
  name: string;
  amount: string;
  kcal: number;
  reason?: string; // 推荐理由
  imageUrl?: string;
}

function createRecommendItem(
  name: string,
  amount: string,
  kcal: number,
): AiRecommendItem {
  return {
    name,
    amount,
    kcal,
  };
}

function createRecommendation(
  raw: Omit<AiRecommendation, "id" | "createdAt">,
): AiRecommendation {
  return {
    id: nanoid(),
    date: raw.date,
    mealType: raw.mealType || undefined,
    items: raw.items,
    createdAt: new Date().toISOString(),
  };
}

export type { AiRecommendation, AiRecommendItem };
export { createRecommendItem, createRecommendation };
