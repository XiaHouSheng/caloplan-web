import { type WeightRecord } from './WeightRecord'
import { type MealRecord } from './MealRecord'
import { type ChatMessage } from './ChatMessage'
import { type AiRecommendation } from './AiRecommendation'
import { type NutritionTarget } from './NutritionTarget'
import { type UserProfile } from './UserProfile'

interface StoreData {
  version: 1
  exportedAt: string        // 导出时间
  user: UserProfile
  nutritionTarget: NutritionTarget
  weightRecords: WeightRecord[]
  mealRecords: MealRecord[]
  chatMessages: ChatMessage[]
  aiRecommendations: AiRecommendation[]
}

export type {StoreData}