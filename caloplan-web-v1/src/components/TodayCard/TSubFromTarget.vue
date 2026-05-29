<script setup></script>

<template>
  <!--今日体重-->
    <!--垂直方向-->
    <n-flex style="height: 100px" vertical :size="medium">
      <!--水平方向-header-->
      <n-flex>
        <span>距离目标</span>
      </n-flex>
      <!--水平方向-content-->
      <n-flex align="baseline" :size="8">
        <n-text style="font-size: 24px; font-weight: 700" strong>3.0</n-text>
        <span>kg</span>
      </n-flex>
      <!--水平方向-foot-->
      <n-flex style="margin-top: 8px;" align="center" :size="4">
        <n-progress
          style="width: calc(100% - 40px);"
          type="line"
          status="warning"
          :show-indicator="false"
          :percentage="30"
        />
      </n-flex>
    </n-flex>
</template>

<style scoped></style>
