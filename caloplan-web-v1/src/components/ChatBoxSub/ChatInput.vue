<script setup>
import { Rainy, Send } from "@vicons/ionicons5";
</script>

<template>
  <n-flex vertical style="transform: translate(0)">
    <n-tabs v-model:value="name" type="card">
      <n-tab-pane v-for="i in 5" style="padding: 0" :name="`功能${i}`"></n-tab-pane>
    </n-tabs>
    <n-input
      style="border-radius: 20px; padding: 12px"
      :auto-size="{
        minRows: 1,
        maxRows: 1,
      }"
      type="textarea"
      size="small"
      placeholder="测试placeholder"
    />
    <n-float-button :right="8" :bottom="8">
      <n-icon size="24">
        <Send />
      </n-icon>
    </n-float-button>
  </n-flex>
</template>

<style scoped></style>
