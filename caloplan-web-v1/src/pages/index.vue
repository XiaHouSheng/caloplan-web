<script setup lang="ts">
import { onMounted } from "vue";
import { LogoGithub, NutritionOutline, Language } from "@vicons/ionicons5";
import ChatBox from "../components/ChatBox.vue";
import DashBoard from "../components/DashBoard.vue";
import { seedMockData } from "../mock/index";

onMounted(async () => {
  await seedMockData();
});
</script>

<template>
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
</template>

<style scoped>
.n-layout-header {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
</style>
