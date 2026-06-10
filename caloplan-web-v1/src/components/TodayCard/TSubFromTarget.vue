<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "../../stores/useUserStore";
import { useWeightRecordStore } from "../../stores/useWeightRecord";
const weightRecordStore = useWeightRecordStore();

const userStore = useUserStore();

const targetWeight = computed(() => userStore.profile?.targetWeight ?? 0);

const todayWeight = computed(
  () => weightRecordStore.todayWeightRecord?.weight ?? 0,
);

const deltaWeight = computed(() =>
  Number((todayWeight.value - targetWeight.value).toFixed(1)),
);
//这里的进度还需要根据目标体重进行调整
//例如我一开始的体重为80现在是78则进度就是 2 / （80 - 70） * 100 = 20
const progress = computed(() => (deltaWeight.value / 10) * 100);
</script>

<template>
  <!--今日体重-->
  <!--垂直方向-->
  <n-flex style="height: 100px" vertical>
    <!--水平方向-header-->
    <n-flex>
      <span>距离目标</span>
    </n-flex>
    <!--水平方向-content-->
    <n-flex align="baseline" :size="8">
      <n-text
        v-if="todayWeight == 0"
        style="font-size: 24px; font-weight: 700"
        strong
        >未记录</n-text
      >
      <template v-else>
        <n-text style="font-size: 24px; font-weight: 700" strong>{{
          deltaWeight
        }}</n-text>
        <span>kg</span>
      </template>
    </n-flex>
    <!--水平方向-foot-->
    <n-flex style="margin-top: 8px" align="center" :size="4">
      <n-progress
        style="width: calc(100% - 40px)"
        type="line"
        status="warning"
        :show-indicator="false"
        :percentage="progress"
      />
    </n-flex>
  </n-flex>
</template>

<style scoped></style>
