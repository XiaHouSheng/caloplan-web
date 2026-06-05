import { nanoid } from "nanoid";
import { formatDate } from "../utils/date";
import type { StoreData } from "../types/StoreData";
import type { UserProfile } from "../types/UserProfile";
import type { NutritionTarget } from "../types/NutritionTarget";
import type { WeightRecord } from "../types/WeightRecord";
import type { MealRecord } from "../types/MealRecord";
import type { MealEntry } from "../types/MealEntry";
import type { ChatMessage } from "../types/ChatMessage";
import type { AiRecommendation } from "../types/AiRecommendation";

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return formatDate(d);
}

const user: UserProfile = {
  id: nanoid(),
  name: "XiaHouSheng",
  height: 185,
  age: 21,
  gender: "male",
  nowWeight: 78,
  targetWeight: 72,
  targetDate: "2026-08-01",
  checkInCount: 1,
  lastCheckInDate: "2026-06-5",
  avatarUrl: undefined,
  createdAt: new Date().toISOString(),
};

const nutritionTarget: NutritionTarget = {
  id: nanoid(),
  dailyKcal: 2000,
  protein: 100,
  carbs: 250,
  fat: 55,
  createdAt: new Date().toISOString(),
};

const weightRecords: WeightRecord[] = [
  { id: nanoid(), date: daysAgo(6), weight: 79.2, createdAt: new Date().toISOString() },
  { id: nanoid(), date: daysAgo(5), weight: 78.8, bodyFatRate: 18.5, createdAt: new Date().toISOString() },
  { id: nanoid(), date: daysAgo(4), weight: 78.5, createdAt: new Date().toISOString() },
  { id: nanoid(), date: daysAgo(3), weight: 78.3, createdAt: new Date().toISOString() },
  { id: nanoid(), date: daysAgo(2), weight: 78.1, bodyFatRate: 18.2, createdAt: new Date().toISOString() },
  { id: nanoid(), date: daysAgo(1), weight: 77.8, createdAt: new Date().toISOString() },
  { id: nanoid(), date: daysAgo(0), weight: 78.0, createdAt: new Date().toISOString() },
];

function entry(name: string, amount: string, kcal: number, protein?: number, carbs?: number, fat?: number): MealEntry {
  return { id: nanoid(), name, amount, kcal, protein, carbs, fat, createdAt: new Date().toISOString() };
}

const mealRecords: MealRecord[] = [
  {
    id: nanoid(),
    date: daysAgo(0),
    time: "08:15",
    mealType: "breakfast",
    entries: [
      entry("全麦面包", "2片", 180, 6, 34, 2),
      entry("鸡蛋", "2个", 140, 12, 1, 10),
      entry("无糖豆浆", "1杯", 35, 3, 2, 1.5),
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: nanoid(),
    date: daysAgo(0),
    time: "12:30",
    mealType: "lunch",
    entries: [
      entry("鸡胸肉", "150g", 247, 46, 0, 5.3),
      entry("糙米饭", "1碗", 220, 5, 45, 1.5),
      entry("西兰花", "100g", 34, 2.8, 6, 0.4),
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: nanoid(),
    date: daysAgo(0),
    time: "18:00",
    mealType: "dinner",
    entries: [
      entry("三文鱼", "120g", 280, 24, 0, 20),
      entry("藜麦沙拉", "1份", 180, 6, 30, 5),
      entry("番茄蛋花汤", "1碗", 65, 4, 6, 2.5),
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: nanoid(),
    date: daysAgo(0),
    time: "15:30",
    mealType: "snack",
    entries: [
      entry("坚果混合", "30g", 170, 5, 8, 14),
      entry("希腊酸奶", "1杯", 120, 12, 4, 6),
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: nanoid(),
    date: daysAgo(1),
    time: "08:00",
    mealType: "breakfast",
    entries: [
      entry("燕麦粥", "1碗", 150, 5, 27, 2.5),
      entry("香蕉", "1根", 105, 1.3, 27, 0.4),
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: nanoid(),
    date: daysAgo(1),
    time: "12:00",
    mealType: "lunch",
    entries: [
      entry("牛肉面", "1碗", 480, 22, 60, 15),
      entry("凉拌黄瓜", "1份", 30, 1, 5, 0.5),
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: nanoid(),
    date: daysAgo(2),
    time: "12:00",
    mealType: "lunch",
    entries: [
      entry("番茄意面", "1份", 420, 14, 65, 12),
      entry("凯撒沙拉", "1份", 180, 8, 10, 13),
    ],
    createdAt: new Date().toISOString(),
  },
];

const chatMessages: ChatMessage[] = [
  {
    id: nanoid(),
    role: "assistant",
    content: "你好！我是 CaloPlan 助手，可以帮你规划饮食、计算营养和推荐食谱。今天有什么可以帮你的？",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: nanoid(),
    role: "user",
    content: "帮我推荐一下今天的午餐，目标摄入600kcal左右",
    timestamp: new Date(Date.now() - 3000000).toISOString(),
  },
  {
    id: nanoid(),
    role: "assistant",
    content: "好的！以下是一个约600kcal的午餐方案：\n\n1️⃣ 鸡胸肉 120g (198kcal)\n2️⃣ 糙米饭 150g (175kcal)\n3️⃣ 清炒时蔬 200g (80kcal)\n4️⃣ 紫菜蛋花汤 1碗 (60kcal)\n\n总计约：513kcal，蛋白质约35g，非常适合减脂期！",
    timestamp: new Date(Date.now() - 2400000).toISOString(),
  },
  {
    id: nanoid(),
    role: "user",
    content: "不错，那晚餐呢？我今天运动了，想多吃点蛋白质",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: nanoid(),
    role: "assistant",
    content: "运动后补充蛋白质非常重要！推荐这个高蛋白晚餐方案：\n\n1️⃣ 三文鱼 150g (347kcal, 30g蛋白)\n2️⃣ 藜麦 100g (120kcal, 4g蛋白)\n3️⃣ 芦笋 150g (45kcal, 3g蛋白)\n4️⃣ 水煮蛋 2个 (140kcal, 12g蛋白)\n\n总计约：652kcal，49g蛋白质，完美满足运动恢复需求！",
    timestamp: new Date(Date.now() - 1200000).toISOString(),
  },
];

const aiRecommendations: AiRecommendation[] = [
  {
    id: nanoid(),
    date: daysAgo(0),
    mealType: "lunch",
    items: [
      { name: "鸡胸肉糙米饭", amount: "1份", kcal: 450, reason: "高蛋白低脂，适合减脂期" },
      { name: "虾仁西兰花", amount: "1份", kcal: 180, reason: "富含膳食纤维和优质蛋白" },
      { name: "紫薯", amount: "1个", kcal: 110, reason: "低GI碳水，饱腹感强" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: nanoid(),
    date: daysAgo(0),
    mealType: "dinner",
    items: [
      { name: "清蒸鲈鱼", amount: "150g", kcal: 220, reason: "优质蛋白，易消化" },
      { name: "杂粮饭", amount: "1小碗", kcal: 160, reason: "复合碳水，稳定血糖" },
      { name: "凉拌菠菜", amount: "1份", kcal: 50, reason: "高纤维低热量" },
    ],
    createdAt: new Date().toISOString(),
  },
];

const mockData: StoreData = {
  version: 1,
  exportedAt: new Date().toISOString(),
  user,
  nutritionTarget,
  weightRecords,
  mealRecords,
  chatMessages,
  aiRecommendations,
};

async function seedMockData(): Promise<void> {
  const { useUserStore } = await import("../stores/useUserStore");
  const { useWeightRecordStore } = await import("../stores/useWeightRecord");
  const { useMealStore } = await import("../stores/useMealStore");
  const { useChatStore } = await import("../stores/useChatStore");

  const userStore = useUserStore();
  const weightStore = useWeightRecordStore();
  const mealStore = useMealStore();
  const chatStore = useChatStore();

  userStore.profile = user;
  userStore.nutritionTarget = nutritionTarget;
  weightStore.weightRecords = weightRecords;
  mealStore.mealRecords = mealRecords;
  chatStore.messages = chatMessages;
}

export { mockData, seedMockData };
