<script setup lang="ts">
import { ref, watch } from "vue";
import { Scale, Person, NutritionOutline } from "@vicons/ionicons5";
import { useUserStore } from "../../stores/useUserStore";
import { useWeightRecordStore } from "../../stores/useWeightRecord";
import { getTodayDate, convertToDate } from "../../utils/date";
import { checkInCount } from "../../utils/checkIn";

const userStore = useUserStore();
const weightRecordStore = useWeightRecordStore();

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: "update:show", val: boolean): void;
}>();

const activeTab = ref<string>("checkIn");

// Tab 1: 打卡
const weight = ref<number | null>(null);
const weightDisplay = ref("");
const weightInputRef = ref<HTMLInputElement | null>(null);

function focusWeightInput() {
  weightInputRef.value?.focus();
}

// 同步 weightDisplay 字符串 → weight 数字
watch(weightDisplay, (val) => {
  const parsed = parseFloat(val);
  weight.value = isNaN(parsed) ? null : parsed;
});

// Tab 2: 个人设置
const editName = ref("");
const editHeight = ref<number | null>(null);
const editAge = ref<number | null>(null);
const editGender = ref<"male" | "female">("male");
const editNowWeight = ref<number | null>(null);
const editTargetWeight = ref<number | null>(null);
const editTargetDate = ref<number | null>(null);
const editDailyKcal = ref<number | null>(null);
const editProtein = ref<number | null>(null);
const editCarbs = ref<number | null>(null);
const editFat = ref<number | null>(null);

watch(
  () => props.show,
  (val) => {
    if (val) {
      activeTab.value = "checkIn";
      // 从 store 填充编辑表单
      const p = userStore.profile;
      editName.value = p.name || "";
      editHeight.value = p.height || null;
      editAge.value = p.age || null;
      editGender.value = p.gender || "male";
      editNowWeight.value = p.nowWeight || null;
      editTargetWeight.value = p.targetWeight || null;
      editTargetDate.value = p.targetDate
        ? new Date(p.targetDate).getTime()
        : null;

      const nt = userStore.nutritionTarget;
      editDailyKcal.value = nt.dailyKcal || null;
      editProtein.value = nt.protein || null;
      editCarbs.value = nt.carbs || null;
      editFat.value = nt.fat || null;
    }
  },
);

function handleCheckIn() {
  // 校验输入
  if (weight.value === null) return;
  const latestTime = convertToDate(
    weightRecordStore.latestWeightRecord.date,
  ).getTime();
  if (latestTime === convertToDate(getTodayDate()).getTime()) {
    weightRecordStore.updateTodayWeight(weight.value);
  } else {
    weightRecordStore.addWeightRecord({ weight: weight.value });
  }
  checkInCount();
  weight.value = null;
  weightDisplay.value = "";
  emit("update:show", false);
}

function handleSaveProfile() {
  const targetDate = editTargetDate.value
    ? new Date(editTargetDate.value).toISOString().split("T")[0]
    : undefined;

  userStore.updateProfile({
    ...userStore.profile,
    name: editName.value,
    height: editHeight.value ?? userStore.profile.height,
    age: editAge.value ?? userStore.profile.age,
    gender: editGender.value,
    nowWeight: editNowWeight.value ?? userStore.profile.nowWeight,
    targetWeight: editTargetWeight.value ?? userStore.profile.targetWeight,
    targetDate: targetDate,
  });

  userStore.updateNutritionTarget(
    editDailyKcal.value ?? 2000,
    editProtein.value ?? 100,
    editCarbs.value ?? 200,
    editFat.value ?? 50,
  );

  emit("update:show", false);
}

function handleCancel() {
  weight.value = null;
  weightDisplay.value = "";
  emit("update:show", false);
}
</script>

<template>
  <n-modal
    :show="show"
    preset="card"
    style="width: 460px"
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
          <Scale />
        </n-icon>
        <n-text strong style="font-size: 18px">每日签到</n-text>
      </n-flex>
    </template>

    <n-tabs
      v-model:value="activeTab"
      type="line"
      animated
      style="margin-top: 8px"
    >
      <!-- Tab 1: 打卡 -->
      <n-tab-pane name="checkIn" tab="每日打卡">
        <div class="checkin-body">
          <div class="weight-display">
            <div class="weight-value">
              <input
                ref="weightInputRef"
                v-model="weightDisplay"
                class="weight-input-hidden"
                type="number"
                step="0.1"
                min="30"
                max="250"
                @focus="
                  (e: FocusEvent) => (e.target as HTMLInputElement)?.select()
                "
              />
              <span
                v-if="!weight"
                class="weight-placeholder"
                @click="focusWeightInput"
                >00.0</span
              >
              <span v-else class="weight-number" @click="focusWeightInput">{{
                weightDisplay
              }}</span>
              <span class="weight-unit">kg</span>
            </div>
            <div class="weight-label">今日空腹体重</div>
          </div>
        </div>
      </n-tab-pane>

      <!-- Tab 2: 个人设置 -->
      <n-tab-pane name="profile" tab="个人设置">
        <n-flex vertical :gap="20" style="margin: 8px 0">
          <!-- 基础信息 -->
          <n-flex vertical :gap="8">
            <n-flex align="center" :gap="6">
              <n-icon size="18" color="#6b7280">
                <Person />
              </n-icon>
              <n-text depth="3" style="font-size: 14px; font-weight: 500"
                >基础信息</n-text
              >
            </n-flex>
            <n-grid :cols="2" x-gap="12" y-gap="12">
              <n-gi>
                <n-input
                  v-model:value="editName"
                  placeholder="昵称"
                  clearable
                />
              </n-gi>
              <n-gi>
                <n-select
                  v-model:value="editGender"
                  :options="[
                    { label: '男', value: 'male' },
                    { label: '女', value: 'female' },
                  ]"
                />
              </n-gi>
              <n-gi>
                <n-input-number
                  v-model:value="editAge"
                  placeholder="年龄"
                  :min="10"
                  :max="120"
                  clearable
                  style="width: 100%"
                >
                  <template #suffix>
                    <n-text depth="3" style="font-size: 13px">岁</n-text>
                  </template>
                </n-input-number>
              </n-gi>
              <n-gi>
                <n-input-number
                  v-model:value="editHeight"
                  placeholder="身高"
                  :min="100"
                  :max="250"
                  clearable
                  style="width: 100%"
                >
                  <template #suffix>
                    <n-text depth="3" style="font-size: 13px">cm</n-text>
                  </template>
                </n-input-number>
              </n-gi>
              <n-gi>
                <n-input-number
                  v-model:value="editNowWeight"
                  placeholder="当前体重"
                  :min="30"
                  :max="250"
                  :precision="1"
                  :step="0.1"
                  clearable
                  style="width: 100%"
                >
                  <template #suffix>
                    <n-text depth="3" style="font-size: 13px">kg</n-text>
                  </template>
                </n-input-number>
              </n-gi>
            </n-grid>
          </n-flex>

          <!-- 目标设置 -->
          <n-flex vertical :gap="8">
            <n-flex align="center" :gap="6">
              <n-icon size="18" color="#6b7280">
                <NutritionOutline />
              </n-icon>
              <n-text depth="3" style="font-size: 14px; font-weight: 500"
                >目标设置</n-text
              >
            </n-flex>
            <n-grid :cols="2" x-gap="12" y-gap="12">
              <n-gi>
                <n-input-number
                  v-model:value="editTargetWeight"
                  placeholder="目标体重"
                  :min="30"
                  :max="200"
                  :precision="1"
                  :step="0.1"
                  clearable
                  style="width: 100%"
                >
                  <template #suffix>
                    <n-text depth="3" style="font-size: 13px">kg</n-text>
                  </template>
                </n-input-number>
              </n-gi>
              <n-gi>
                <n-date-picker
                  v-model:value="editTargetDate"
                  type="date"
                  placeholder="目标日期"
                  clearable
                  style="width: 100%"
                />
              </n-gi>
              <n-gi>
                <n-input-number
                  v-model:value="editDailyKcal"
                  placeholder="每日目标热量"
                  :min="500"
                  :max="5000"
                  clearable
                  style="width: 100%"
                >
                  <template #suffix>
                    <n-text depth="3" style="font-size: 13px">kcal</n-text>
                  </template>
                </n-input-number>
              </n-gi>
              <n-gi>
                <n-input-number
                  v-model:value="editProtein"
                  placeholder="蛋白质目标"
                  :min="0"
                  :max="500"
                  clearable
                  style="width: 100%"
                >
                  <template #suffix>
                    <n-text depth="3" style="font-size: 13px">g</n-text>
                  </template>
                </n-input-number>
              </n-gi>
              <n-gi>
                <n-input-number
                  v-model:value="editCarbs"
                  placeholder="碳水目标"
                  :min="0"
                  :max="800"
                  clearable
                  style="width: 100%"
                >
                  <template #suffix>
                    <n-text depth="3" style="font-size: 13px">g</n-text>
                  </template>
                </n-input-number>
              </n-gi>
              <n-gi>
                <n-input-number
                  v-model:value="editFat"
                  placeholder="脂肪目标"
                  :min="0"
                  :max="300"
                  clearable
                  style="width: 100%"
                >
                  <template #suffix>
                    <n-text depth="3" style="font-size: 13px">g</n-text>
                  </template>
                </n-input-number>
              </n-gi>
            </n-grid>
          </n-flex>
        </n-flex>
      </n-tab-pane>
    </n-tabs>

    <template #footer>
      <n-flex justify="end" :gap="12" style="padding-top: 8px">
        <n-button quaternary size="large" @click="handleCancel">
          取消
        </n-button>
        <n-button
          v-if="activeTab === 'checkIn'"
          type="primary"
          size="large"
          :disabled="weight === null"
          :style="{ borderRadius: '6px' }"
          @click="handleCheckIn"
        >
          确认签到
        </n-button>
        <n-button
          v-if="activeTab === 'profile'"
          type="primary"
          size="large"
          :style="{ borderRadius: '6px' }"
          @click="handleSaveProfile"
        >
          保存设置
        </n-button>
      </n-flex>
    </template>
  </n-modal>
</template>

<style scoped>
.checkin-body {
  display: flex;
  justify-content: center;
  padding: 32px 0 24px;
}

.weight-display {
  text-align: center;
  user-select: none;
}

.weight-value {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  gap: 6px;
}

.weight-input-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.weight-placeholder {
  font-size: 72px;
  font-weight: 300;
  color: #d0d5dd;
  letter-spacing: 2px;
  cursor: text;
  line-height: 1;
}

.weight-number {
  font-size: 72px;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: 2px;
  cursor: text;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.weight-unit {
  font-size: 28px;
  font-weight: 500;
  color: #9ca3af;
  line-height: 1;
  padding-bottom: 4px;
}

.weight-label {
  margin-top: 12px;
  font-size: 15px;
  color: #9ca3af;
  font-weight: 400;
}
</style>
