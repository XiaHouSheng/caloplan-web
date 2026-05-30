import { nanoid } from "nanoid";
import { getTodayDate } from "../utils/date";
import { type MealEntry } from "./MealEntry";

type MealType = "breakfast" | "lunch" | "dinner" | "snack";

interface MealRecord {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // "08:00"
  mealType: MealType;
  entries: MealEntry[];
  createdAt: string;
}

function createMealRecord(
  raw: Omit<MealRecord, "id" | "createdAt" | "date">,
): MealRecord {
  return {
    id: nanoid(),
    date: getTodayDate(),
    time: raw.time,
    mealType: raw.mealType,
    entries: raw.entries,
    createdAt: new Date().toISOString(),
  };
}

export type { MealRecord, MealType };
export { createMealRecord };
