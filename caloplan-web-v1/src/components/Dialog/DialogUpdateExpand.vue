<script setup lang="ts">
import { ref, watch } from "vue";
import { Flash, Walk, Bicycle, Fitness } from "@vicons/ionicons5";
import { useMealStore } from "../../stores/useMealStore";

const mealStore = useMealStore();

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: "update:show", val: boolean): void;
  (e: "updateConsumption", kcal: number): void;
}>();

const kcal = ref<number | null>(null);
const kcalDisplay = ref("");
const kcalInputRef = ref<HTMLInputElement | null>(null);

function focusInput() {
  kcalInputRef.value?.focus();
}

watch(kcalDisplay, (val) => {
  const parsed = parseFloat(val);
  kcal.value = isNaN(parsed) ? null : parsed;
});

watch(
  () => props.show,
  (val) => {
    if (val) {
      kcal.value = null;
      kcalDisplay.value = "";
    }
  },
);

function setQuickKcal(value: number) {
  kcalDisplay.value = String(value);
}

const quickOptions = [
  { label: "散步 30min", value: 100, icon: Walk },
  { label: "慢跑 30min", value: 250, icon: Fitness },
  { label: "骑行 30min", value: 200, icon: Bicycle },
  { label: "高强度 1h", value: 500, icon: Flash },
];

function handleSave() {
  if (kcal.value === null) return;
  mealStore.updateTodayExpend(kcal.value);
  emit("update:show", false);
}

function handleCancel() {
  kcal.value = null;
  kcalDisplay.value = "";
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
        <n-icon size="22" color="#14B89B">
          <Flash />
        </n-icon>
        <n-text strong style="font-size: 18px">更新消耗</n-text>
      </n-flex>
    </template>

    <div class="body">
      <div class="display">
        <div class="value">
          <input
            ref="kcalInputRef"
            v-model="kcalDisplay"
            class="input-hidden"
            type="number"
            step="1"
            min="0"
            max="10000"
            @focus="(e: FocusEvent) => (e.target as HTMLInputElement)?.select()"
          />
          <span v-if="!kcal" class="placeholder" @click="focusInput">0</span>
          <span v-else class="number" @click="focusInput">{{ kcalDisplay }}</span>
          <span class="unit">kcal</span>
        </div>
        <div class="label">今日总消耗</div>
      </div>

      <div class="quick-section">
        <n-text depth="3" style="font-size: 13px; font-weight: 500">快速选择</n-text>
        <n-grid :cols="2" x-gap="8" y-gap="8">
          <n-gi v-for="opt in quickOptions" :key="opt.value">
            <n-button
              size="small"
              dashed
              style="width: 100%"
              :class="{ 'btn-active': kcal === opt.value }"
              @click="setQuickKcal(opt.value)"
            >
              <template #icon>
                <n-icon :component="opt.icon" />
              </template>
              {{ opt.label }} · {{ opt.value }}
            </n-button>
          </n-gi>
        </n-grid>
      </div>
    </div>

    <template #footer>
      <n-flex justify="end" :gap="12" style="padding-top: 8px">
        <n-button quaternary size="large" @click="handleCancel">
          取消
        </n-button>
        <n-button
          type="primary"
          size="large"
          :disabled="kcal === null"
          :style="{ borderRadius: '6px' }"
          @click="handleSave"
        >
          确认
        </n-button>
      </n-flex>
    </template>
  </n-modal>
</template>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0 8px;
  gap: 24px;
}

.display {
  text-align: center;
  user-select: none;
}

.value {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  gap: 6px;
}

.input-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.placeholder {
  font-size: 72px;
  font-weight: 300;
  color: #d0d5dd;
  letter-spacing: 2px;
  cursor: text;
  line-height: 1;
}

.number {
  font-size: 72px;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: 2px;
  cursor: text;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.unit {
  font-size: 28px;
  font-weight: 500;
  color: #9ca3af;
  line-height: 1;
  padding-bottom: 4px;
}

.label {
  margin-top: 12px;
  font-size: 15px;
  color: #9ca3af;
  font-weight: 400;
}

.quick-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}


</style>
