import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { nanoid } from "nanoid";
import { type UserProfile } from "../types/UserProfile";
import { type NutritionTarget } from "../types/NutritionTarget";

export const useUserStore = defineStore(
  "user",
  () => {
    // 初始化用户信息
    const profile = ref<UserProfile>({
      id: nanoid(),
      name: "XiaHouSheng",
      height: 185,
      age: 21,
      gender: "male",
      nowWeight: 70,
      targetWeight: 70,
      checkInCount: 0,
      lastCheckInDate: "2026-06-05",
      avatarUrl: undefined,
      createdAt: new Date().toISOString(),
    });

    // 是否自动计算BMR
    const autoCalBmr = ref(true);

    // BMR
    const bmr = computed(() => {
      const { nowWeight, height, age, gender } = profile.value;
      const base = 10 * nowWeight + 6.25 * height - 5 * age;
      return gender === "male" ? base + 5 : base - 161;
    });

    // 初始化营养目标
    const nutritionTarget = computed<NutritionTarget>(() => ({
      dailyKcal: autoCalBmr.value ? Math.round(bmr.value) : 2000,
      protein: 100,
      carbs: 200,
      fat: 50,
      id: nanoid(),
      createdAt: new Date().toISOString(),
    }));
    // BMI
    const bmi = computed(() => {
      return profile.value.nowWeight / ((profile.value.height / 100) ** 2);
    });

    function updateProfile(newProfile: UserProfile) {
      profile.value = newProfile;
    }

    function updateNutritionTarget(
      dailyKcal: number,
      protein: number,
      carbs: number,
      fat: number,
    ) {
      nutritionTarget.value.dailyKcal = dailyKcal;
      nutritionTarget.value.protein = protein;
      nutritionTarget.value.carbs = carbs;
      nutritionTarget.value.fat = fat;
    }

    function updateWeight(newWeight: number) {
      profile.value.nowWeight = newWeight;
    }

    return {
      profile,
      nutritionTarget,
      bmi,
      bmr,
      updateProfile,
      updateNutritionTarget,
      updateWeight,
    };
  },
  {
    persist: {
      key: "user-store",
      storage: localStorage,
      pick: ["profile", "nutritionTarget"],
    },
  },
);
