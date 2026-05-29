<script setup>
import { ArrowDown, ArrowUp } from "@vicons/ionicons5";
</script>

<template>
  <!--今日体重-->
  <!--垂直方向-->
  <n-flex style="height: 100px" vertical size="medium">
    <!--水平方向-header-->
    <n-flex>
      <span>今日体重</span>
    </n-flex>
    <!--水平方向-content-->
    <n-flex align="baseline" :size="8">
      <n-text style="font-size: 24px; font-weight: 700" strong>78.0</n-text>
      <span>kg</span>
    </n-flex>
    <!--水平方向-foot-->
    <n-flex align="center" :size="4">
      <span>较昨日</span>
      <n-text type="primary">-0.2kg</n-text>
      <n-icon color="#18a058" :size="18">
        <ArrowDown />
      </n-icon>
    </n-flex>
  </n-flex>
</template>

<style scoped></style>
