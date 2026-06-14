<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { FastFood, Add, TrashOutline, Cafe, Sunny, Moon, Pizza, TimeOutline, Camera, Sparkles } from "@vicons/ionicons5";
import { useMealStore } from "../../stores/useMealStore";
import type { MealType } from "../../types/MealRecord";
import type { MealEntry } from "../../types/MealEntry";

const mealStore = useMealStore();

const props = defineProps<{
  show: boolean;
  presetEntries?: Omit<MealEntry, "id" | "createdAt">[];
  presetMealType?: MealType;
}>();

const emit = defineEmits<{
  (e: "update:show", val: boolean): void;
  (e: "addMeal", data: { mealType: MealType; time: string; entries: Omit<MealEntry, "id" | "createdAt">[] }): void;
}>();

const mealOptions: { label: string; value: MealType; icon: any }[] = [
  { label: "早餐", value: "breakfast", icon: Cafe },
  { label: "午餐", value: "lunch", icon: Sunny },
  { label: "晚餐", value: "dinner", icon: Moon },
  { label: "加餐", value: "snack", icon: Pizza },
];

const selectedMealType = ref<MealType>("breakfast");

// 新增食物表单
const foodName = ref("");
const foodAmount = ref<number | null>(null);
const foodKcal = ref<number | null>(null);
const foodProtein = ref<number | null>(null);
const foodCarbs = ref<number | null>(null);
const foodFat = ref<number | null>(null);

// 已添加的食物列表
interface TempFood {
  id: number;
  name: string;
  amount: string;
  kcal: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

let nextId = 1;
const tempFoods = ref<TempFood[]>([]);

// 预填数据：对话框打开时如有 presetEntries 则填入
watch(
  () => props.show,
  (val) => {
    if (val && props.presetEntries && props.presetEntries.length > 0) {
      console.log(props.presetEntries[0])
      tempFoods.value = props.presetEntries.map((entry) => ({
        id: nextId++,
        name: entry.name,
        amount: entry.amount,
        kcal: entry.kcal,
        protein: entry.protein,
        carbs: entry.carbs,
        fat: entry.fat,
      }));
      selectedMealType.value = props.presetMealType || "breakfast";
    }
  },
);

// 历史食物去重
const historyFoods = computed(() => {
  const map = new Map<string, { name: string; kcal: number; protein?: number; carbs?: number; fat?: number }>();
  for (const entry of mealStore.mealEntries) {
    if (!map.has(entry.name)) {
      map.set(entry.name, { name: entry.name, kcal: entry.kcal, protein: entry.protein, carbs: entry.carbs, fat: entry.fat });
    }
  }
  return Array.from(map.values()).slice(0, 50);
});

function addFood() {
  if (!foodName.value || foodKcal.value === null) return;
  tempFoods.value.push({
    id: nextId++,
    name: foodName.value,
    amount: foodAmount.value ? `${foodAmount.value}份` : "1份",
    kcal: foodKcal.value,
    protein: foodProtein.value || undefined,
    carbs: foodCarbs.value || undefined,
    fat: foodFat.value || undefined,
  });
  foodName.value = "";
  foodAmount.value = null;
  foodKcal.value = null;
  foodProtein.value = null;
  foodCarbs.value = null;
  foodFat.value = null;
}

function addHistoryFood(name: string, kcal: number, protein?: number, carbs?: number, fat?: number) {
  tempFoods.value.push({
    id: nextId++,
    name,
    amount: "1份",
    kcal,
    protein,
    carbs,
    fat,
  });
}

function removeFood(id: number) {
  tempFoods.value = tempFoods.value.filter((f) => f.id !== id);
}

function removeHistoryFood(name: string) {
  const entry = mealStore.mealEntries.find((e) => e.name === name);
  if (entry) {
    mealStore.dropTargetEntry(entry.id);
  }
}

function handleSave() {
  if (tempFoods.value.length === 0) return;

  emit("addMeal", {
    mealType: selectedMealType.value,
    time: new Date().toISOString(),
    entries: tempFoods.value.map((f) => ({
      name: f.name,
      amount: f.amount,
      kcal: f.kcal,
      protein: f.protein,
      carbs: f.carbs,
      fat: f.fat,
    })),
  });

  tempFoods.value = [];
  emit("update:show", false);
}

function handleCancel() {
  tempFoods.value = [];
  emit("update:show", false);
}
</script>

<template>
  <n-modal
    :show="show"
    preset="card"
    style="width: 800px"
    :bordered="false"
    :mask-closable="false"
    :segmented="false"
    header-style="padding: 20px 24px 0 24px;"
    content-style="padding: 0 24px;"
    footer-style="padding: 0 24px 20px 24px;"
    @update:show="(val: boolean) => emit('update:show', val)"
  >
    <template #header>
      <n-flex align="center" :gap="10">
        <n-icon size="22" color="#18a058">
          <FastFood />
        </n-icon>
        <n-text strong style="font-size: 18px">添加餐食</n-text>
      </n-flex>
    </template>

    <n-grid :cols="2" x-gap="16">
      <!-- 左栏：添加表单 + 已添加食物 -->
      <n-gi>
        <n-flex vertical :gap="12" style="margin: 8px 0">
          <!-- 餐次选择 -->
          <n-flex vertical :gap="6">
            <n-text depth="3" style="font-size: 14px; font-weight: 500"
              >选择餐次</n-text
            >
            <n-button-group size="small" style="width: 100%">
              <n-button
                v-for="opt in mealOptions"
                :key="opt.value"
                :type="selectedMealType === opt.value ? 'primary' : 'default'"
                :ghost="selectedMealType !== opt.value"
                style="flex: 1; font-size: 13px"
                @click="selectedMealType = opt.value"
              >
                {{ opt.label }}
              </n-button>
            </n-button-group>
          </n-flex>

          <!-- 添加表单 -->
          <n-flex vertical :gap="8">
            <n-text depth="3" style="font-size: 14px; font-weight: 500"
              >添加食物</n-text
            >
            <n-input
              v-model:value="foodName"
              placeholder="食物名称"
              clearable
            />
            <n-flex :size="8">
              <n-input-number
                v-model:value="foodAmount"
                placeholder="份数"
                :min="0"
                :max="100"
                :show-button="false"
                clearable
                style="flex: 1"
              >
                <template #suffix>
                  <n-text depth="3" style="font-size: 13px">份</n-text>
                </template>
              </n-input-number>
              <n-input-number
                v-model:value="foodKcal"
                placeholder="卡路里"
                :min="0"
                :max="10000"
                :show-button="false"
                clearable
                style="flex: 1"
              >
                <template #suffix>
                  <n-text depth="3" style="font-size: 13px">kcal</n-text>
                </template>
              </n-input-number>
              <n-button
                type="primary"
                :disabled="!foodName || foodKcal === null"
                @click="addFood"
              >
                <template #icon>
                  <n-icon :component="Add" />
                </template>
                添加
              </n-button>
            </n-flex>
            <!-- 营养信息 -->
            <n-flex :size="8">
              <n-input-number
                v-model:value="foodProtein"
                placeholder="蛋白质"
                :min="0"
                :max="1000"
                :show-button="false"
                clearable
                style="flex: 1"
              >
                <template #suffix>
                  <n-text depth="3" style="font-size: 13px">g</n-text>
                </template>
              </n-input-number>
              <n-input-number
                v-model:value="foodCarbs"
                placeholder="碳水"
                :min="0"
                :max="1000"
                :show-button="false"
                clearable
                style="flex: 1"
              >
                <template #suffix>
                  <n-text depth="3" style="font-size: 13px">g</n-text>
                </template>
              </n-input-number>
              <n-input-number
                v-model:value="foodFat"
                placeholder="脂肪"
                :min="0"
                :max="1000"
                :show-button="false"
                clearable
                style="flex: 1"
              >
                <template #suffix>
                  <n-text depth="3" style="font-size: 13px">g</n-text>
                </template>
              </n-input-number>
            </n-flex>
            <!-- AI 功能 -->
            <n-flex :size="8">
              <n-button strong dashed disabled style="flex: 1">
                <template #icon>
                  <n-icon :component="Camera" />
                </template>
                拍照识别
              </n-button>
              <n-button strong dashed disabled style="flex: 1">
                <template #icon>
                  <n-icon :component="Sparkles" />
                </template>
                根据名称自动生成
              </n-button>
            </n-flex>
          </n-flex>

          <!-- 已添加食物 -->
          <n-flex vertical :gap="6">
            <n-flex align="center" style="justify-content: space-between">
              <n-text depth="3" style="font-size: 14px; font-weight: 500"
                >已添加</n-text
              >
              <n-text v-if="tempFoods.length > 0" depth="3" style="font-size: 13px">
                {{ tempFoods.length }} 项 · 总计
                {{ tempFoods.reduce((s, f) => s + f.kcal, 0) }} kcal
              </n-text>
            </n-flex>

            <n-list style="max-height: 240px; overflow-y: auto; padding-right: 4px">
              <n-list-item
                v-for="food in tempFoods"
                :key="food.id"
                style="padding: 6px 0"
              >
                <n-flex align="center" :size="0">
                  <n-flex vertical :size="2" style="flex: 1">
                    <n-text style="font-weight: 500; font-size: 14px">{{
                      food.name
                    }}</n-text>
                    <n-text depth="3" style="font-size: 12px">{{
                      food.amount
                    }}</n-text>
                    <n-flex v-if="food.protein || food.carbs || food.fat" :size="4" style="margin-top: 2px">
                      <n-text v-if="food.protein" depth="3" style="font-size: 11px">蛋白质 {{ food.protein }}g</n-text>
                      <n-text v-if="food.carbs" depth="3" style="font-size: 11px">碳水 {{ food.carbs }}g</n-text>
                      <n-text v-if="food.fat" depth="3" style="font-size: 11px">脂肪 {{ food.fat }}g</n-text>
                    </n-flex>
                  </n-flex>
                  <n-flex align="baseline" :size="2" style="margin-right: 8px">
                    <n-text type="primary" style="font-size: 18px; font-weight: 800">{{
                      food.kcal
                    }}</n-text>
                    <n-text depth="3" style="font-size: 12px">kcal</n-text>
                  </n-flex>
                  <n-button
                    quaternary
                    circle
                    size="tiny"
                    type="error"
                    @click="removeFood(food.id)"
                  >
                    <template #icon>
                      <n-icon :component="TrashOutline" />
                    </template>
                  </n-button>
                </n-flex>
              </n-list-item>

              <n-empty
                v-if="tempFoods.length === 0"
                description="暂未添加食物"
                style="padding: 16px 0"
              />
            </n-list>
          </n-flex>
        </n-flex>
      </n-gi>

      <!-- 右栏：历史食物 -->
      <n-gi>
        <n-flex vertical :gap="8" style="margin: 8px 0; height: 100%">
          <n-flex align="center" :gap="6">
            <n-icon size="16" color="#6b7280">
              <TimeOutline />
            </n-icon>
            <n-text depth="3" style="font-size: 14px; font-weight: 500"
              >历史食物</n-text
            >
          </n-flex>

          <n-list
            v-if="historyFoods.length > 0"
            style="max-height: 400px; overflow-y: auto; padding-right: 4px"
            :bordered="true"
          >
            <n-list-item
              v-for="food in historyFoods"
              :key="food.name"
              style="padding: 6px 8px; cursor: pointer"
              @click="addHistoryFood(food.name, food.kcal, food.protein, food.carbs, food.fat)"
            >
              <n-flex align="center" :size="0">
                <n-flex vertical :size="2" style="flex: 1">
                  <n-text style="font-size: 14px">{{ food.name }}</n-text>
                  <n-flex v-if="food.protein || food.carbs || food.fat" :size="4">
                    <n-text v-if="food.protein" depth="3" style="font-size: 11px">蛋白质{{ food.protein }}g</n-text>
                    <n-text v-if="food.carbs" depth="3" style="font-size: 11px">碳水{{ food.carbs }}g</n-text>
                    <n-text v-if="food.fat" depth="3" style="font-size: 11px">脂肪{{ food.fat }}g</n-text>
                  </n-flex>
                </n-flex>
                <n-text type="primary" style="font-size: 14px; font-weight: 600; margin-right: 4px">{{
                  food.kcal
                }}</n-text>
                <n-text depth="3" style="font-size: 12px; margin-right: 8px">kcal</n-text>
                <n-button
                  quaternary
                  circle
                  size="tiny"
                  type="error"
                  @click.stop="removeHistoryFood(food.name)"
                >
                  <template #icon>
                    <n-icon :component="TrashOutline" />
                  </template>
                </n-button>
              </n-flex>
            </n-list-item>
          </n-list>

          <n-empty
            v-else
            description="暂无历史记录"
            style="padding: 40px 0"
          />
        </n-flex>
      </n-gi>
    </n-grid>

    <template #footer>
      <n-flex justify="end" :gap="12" style="padding-top: 8px">
        <n-button quaternary size="large" @click="handleCancel">
          取消
        </n-button>
        <n-button
          type="primary"
          size="large"
          :disabled="tempFoods.length === 0"
          :style="{ borderRadius: '6px' }"
          @click="handleSave"
        >
          保存
        </n-button>
      </n-flex>
    </template>
  </n-modal>
</template>
