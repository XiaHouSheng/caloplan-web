<script setup lang="ts">
import { ref } from "vue";
import { Scale, Flash } from "@vicons/ionicons5";

defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: "update:show", val: boolean): void;
  (e: "confirm", weight: number, kcalConsumed: number): void;
}>();

const weight = ref<number | null>(null);
const kcalConsumed = ref<number | null>(null);

function handleConfirm() {
  if (weight.value === null || kcalConsumed.value === null) return;
  emit("confirm", weight.value, kcalConsumed.value);
  resetAndClose();
}

function handleCancel() {
  resetAndClose();
}

function resetAndClose() {
  weight.value = null;
  kcalConsumed.value = null;
  emit("update:show", false);
}
</script>

<template>
  <n-modal
    :show="show"
    preset="card"
    title="每日记录打卡"
    style="width: 420px"
    :bordered="false"
    :mask-closable="false"
    :segmented="false"
    header-style="padding: 20px 24px 0 24px;"
    content-style="padding: 8px 24px;"
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

    <n-flex vertical :gap="20" style="margin: 12px 0">
      <!-- 体重输入 -->
      <n-flex vertical :gap="8">
        <n-flex align="center" :gap="6">
          <n-icon size="18" color="#6b7280">
            <Scale />
          </n-icon>
          <n-text depth="3" style="font-size: 14px; font-weight: 500"
            >今日空腹体重</n-text
          >
        </n-flex>
        <n-input-number
          v-model:value="weight"
          placeholder="请输入今日空腹体重"
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
      </n-flex>

      <!-- 消耗输入 -->
      <n-flex vertical :gap="8">
        <n-flex align="center" :gap="6">
          <n-icon size="18" color="#6b7280">
            <Flash />
          </n-icon>
          <n-text depth="3" style="font-size: 14px; font-weight: 500"
            >今日总消耗</n-text
          >
        </n-flex>
        <n-input-number
          v-model:value="kcalConsumed"
          placeholder="请输入今日总消耗"
          :min="0"
          :max="10000"
          :precision="0"
          clearable
          style="width: 100%"
        >
          <template #suffix>
            <n-text depth="3" style="font-size: 13px">kcal</n-text>
          </template>
        </n-input-number>
      </n-flex>
    </n-flex>

    <template #footer>
      <n-flex justify="end" :gap="12">
        <n-button quaternary size="large" @click="handleCancel">
          取消
        </n-button>
        <n-button
          type="primary"
          size="large"
          :disabled="weight === null || kcalConsumed === null"
          :style="{
            borderRadius: '6px',
          }"
          @click="handleConfirm"
        >
          确认签到
        </n-button>
      </n-flex>
    </template>
  </n-modal>
</template>
