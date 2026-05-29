<script setup lang="ts">
import AiRecommendItem from "./AiRecommendItem.vue";
import { Refresh } from "@vicons/ionicons5";
</script>

<template>
  <n-card>
    <template #header-extra>
      <n-button size="small">
        换一换
        <n-icon :component="Refresh" />
      </n-button>
    </template>
    <template #header>
      <n-text style="font-weight: bold">AI推荐</n-text>
    </template>
    <template #default>
      <n-list style="height: 252px; overflow-y: auto; padding-right: 4px">
        <AiRecommendItem />
        <AiRecommendItem />
        <AiRecommendItem />
      </n-list>
    </template>
  </n-card>
</template>

<style scoped></style>
