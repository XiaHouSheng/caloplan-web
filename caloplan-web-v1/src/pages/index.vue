<script setup lang="ts">
import { ref, watch } from "vue";
import { darkTheme } from "naive-ui";
import { LogoGithub, NutritionOutline, Language, Sunny, Moon } from "@vicons/ionicons5";
import ChatBox from "../components/ChatBox.vue";
import DashBoard from "../components/DashBoard.vue";
import { useUserStore } from "../stores/useUserStore";
import { useWeightRecordStore } from "../stores/useWeightRecord";
import { useMealStore } from "../stores/useMealStore";
import { useChatStore } from "../stores/useChatStore";
import { useDialogStore } from "../stores/useDialogStore";

const userStore = useUserStore();
const weightRecordStore = useWeightRecordStore();
const chatStore = useChatStore();
const mealStore = useMealStore();
const dialogStore = useDialogStore();

const darkMode = ref(false);

// 根据时间自动切换（18:00-06:00 为暗色）
function getAutoTheme(): boolean {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
}

function applyTheme(val: boolean) {
  document.documentElement.setAttribute("data-theme", val ? "dark" : "light");
}

// 初始化按时间段自动设置
darkMode.value = getAutoTheme();
applyTheme(darkMode.value);

function toggleTheme() {
  darkMode.value = !darkMode.value;
}

watch(darkMode, applyTheme);
</script>

<template>
  <n-config-provider :theme="darkMode ? darkTheme : undefined">
    <DialogAddMeal
      :show="dialogStore.dialogAddMealVisible"
      :preset-entries="dialogStore.presetEntries"
      :preset-meal-type="dialogStore.presetMealType"
      @addMeal="mealStore.onAddMeal"
      @update:show="dialogStore.onDialogUpdateShow"
    />
    <n-layout style="min-height: 100vh">
      <n-layout-header
        bordered
        style="height: 64px; display: flex; align-items: center; padding: 0 32px"
      >
        <n-flex justify="space-between" align="center" style="width: 100%">
          <!-- Left: Brand -->
          <n-flex align="center" :wrap="false" :gap="10">
            <n-icon size="28" color="#18a058">
              <NutritionOutline />
            </n-icon>
            <n-text strong style="font-size: 24px; letter-spacing: 0.5px">
              CaloPlan
            </n-text>
          </n-flex>

          <!-- Right: Actions -->
          <n-flex align="center" :wrap="false" :gap="8">
            <!-- Theme Switch -->
            <n-button quaternary circle @click="toggleTheme">
              <template #icon>
                <n-icon size="24">
                  <Sunny v-if="!darkMode" />
                  <Moon v-else />
                </n-icon>
              </template>
            </n-button>
            <!-- GitHub -->
            <n-button quaternary circle>
              <template #icon>
                <n-icon size="24">
                  <LogoGithub />
                </n-icon>
              </template>
            </n-button>
            <!-- Language Switch -->
            <n-button quaternary size="small">
              <template #icon>
                <n-icon size="24">
                  <Language />
                </n-icon>
              </template>
            </n-button>
          </n-flex>
        </n-flex>
      </n-layout-header>

      <!-- Main Content Area -->
      <n-layout-content :content-style="{ padding: '12px 24px 0 24px' }">
        <n-grid x-gap="12" :cols="2">
          <n-gi>
            <ChatBox />
          </n-gi>
          <n-gi>
            <DashBoard />
          </n-gi>
        </n-grid>
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<style scoped>
.n-layout-header {
  background-color: var(--n-color, #fff);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
</style>
