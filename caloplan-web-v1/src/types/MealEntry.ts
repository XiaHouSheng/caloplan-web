import { nanoid } from "nanoid";

interface MealEntry {
  id: string;
  name: string; // "鸡蛋"
  amount: string; // "2x"
  kcal: number;
  protein?: number; // g
  carbs?: number; // g
  fat?: number; // g
  imageUrl?: string; // 后端存储
  createdAt: string;
}

function createMealEntry(
  raw: Omit<MealEntry, "id" | "createdAt">,
): MealEntry {
  return {
    id: nanoid(),
    name: raw.name,
    amount: raw.amount,
    kcal: raw.kcal,
    protein: raw.protein || undefined,
    carbs: raw.carbs || undefined,
    fat: raw.fat || undefined,
    imageUrl: raw.imageUrl || undefined,
    createdAt: new Date().toISOString(),
  };
}

export type { MealEntry };
export { createMealEntry };
