<script setup lang="ts">
import { useUserStore } from '../../stores/useUserStore';
import { computed } from 'vue';
const userStore = useUserStore();
const checkInCount = computed(() => userStore.profile.checkInCount ?? 0);
</script>

<template>
  <!--今日体重-->
  <!--垂直方向-->
  <n-flex style="height: 100px" vertical size="medium">
    <!--水平方向-header-->
    <n-flex>
      <span>连续达成</span>
    </n-flex>
    <!--水平方向-content-->
    <n-flex align="baseline" :size="8">
      <n-text style="font-size: 24px; font-weight: 700" strong>{{ checkInCount }}</n-text>
      <span>天</span>
    </n-flex>
    <!--水平方向-foot-->
    <n-flex align="center" :size="4"> 
      <n-text>继续坚持！</n-text>
    </n-flex>
  </n-flex>
</template>

<style scoped></style>
