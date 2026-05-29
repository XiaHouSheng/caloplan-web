<script setup lang="ts"></script>

<template>
  <n-list-item>
    <n-flex :size="0">
      <n-image
        lazy
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        :width="50"
        :height="50"
        style="border-radius: 6px; padding: 8px"
      ></n-image>
      <n-flex :size="0" justify="center" vertical style="flex-grow: 1">
        <n-flex :size="4" align="center" inline>
          <n-text style="font-weight: bold; font-size: 16px">早餐</n-text>
          <n-text
            type="primary"
            style="font-size: 18px; font-weight: bold; margin-left: auto"
            >210</n-text
          >
          <n-text type="primary" style="font-size: 18px; font-weight: bold"
            >kcal</n-text
          >
        </n-flex>
        <n-flex align="center">
          <n-text style="font-size: 12px">2x鸡蛋 + 无糖豆浆</n-text>
          <n-text style="margin-left: auto">8:00</n-text>
        </n-flex>
      </n-flex>
    </n-flex>
  </n-list-item>
</template>

<style scoped></style>
