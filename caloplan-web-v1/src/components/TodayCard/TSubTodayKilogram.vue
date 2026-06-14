<script setup lang="ts">
import { computed } from "vue";
import { ArrowDown, ArrowUp } from "@vicons/ionicons5";
import { useWeightRecordStore } from "../../stores/useWeightRecord";
const weightRecordStore = useWeightRecordStore();
const todayWeightRecord = computed(
  () => weightRecordStore.todayWeightRecord?.weight ?? 0,
);
const lastWeightRecord = computed(
  () => weightRecordStore.lastWeightRecord?.weight ?? 0,
);
const deltaWeight = computed(
  () => todayWeightRecord.value - lastWeightRecord.value,
);
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
      <n-text
        v-if="todayWeightRecord === 0"
        style="font-size: 24px; font-weight: 700"
        strong
        >未记录</n-text
      >
      <template v-else>
        <n-text style="font-size: 24px; font-weight: 700" strong>{{
          todayWeightRecord
        }}</n-text>
        <span>kg</span>
      </template>
    </n-flex>
    <!--水平方向-foot-->
    <n-flex align="center" :size="4">
      <span>较昨日</span>
      <span v-if="todayWeightRecord == 0">未记录</span>
      <template v-else>
        <n-text
          :type="deltaWeight > 0 ? 'warning' : 'primary'"
          style="font-size: 16px; font-weight: bold"
          >{{ deltaWeight.toFixed(1) }}kg</n-text
        >
        <n-icon v-if="deltaWeight < 0" color="#18a058" :size="18">
          <ArrowDown />
        </n-icon>
        <n-icon v-else color="#f0a020" :size="18">
          <ArrowUp />
        </n-icon>
      </template>
    </n-flex>
  </n-flex>
</template>

<style scoped></style>
