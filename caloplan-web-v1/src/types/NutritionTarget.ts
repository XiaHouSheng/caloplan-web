import { nanoid } from "nanoid";

interface NutritionTarget {
  id: string;
  dailyKcal: number;
  protein: number; // g
  carbs: number; // g
  fat: number; // g
  createdAt: string;
}

export type { NutritionTarget };
