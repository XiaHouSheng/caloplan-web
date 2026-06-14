import chatboxApi from "./ApiConfig"
import type { UserProfile } from "../../types/UserProfile"
import type { NutritionTarget } from "../../types/NutritionTarget"
import type { MealRecord } from "../../types/MealRecord"
import type { MealEntry } from "../../types/MealEntry"

async function chatSendMsg(
    input: string,
    body_data: UserProfile,
    nutrition_target: NutritionTarget,
    meal_record: MealRecord[],
    history_food: MealEntry[]
){
    const params = {
        input: input,
        body_data: body_data,
        nutrition_target: nutrition_target,
        meal_record: meal_record,
        history_food: history_food,
    }
    return await chatboxApi.post("/agent/chat", params)
}

export default chatSendMsg



