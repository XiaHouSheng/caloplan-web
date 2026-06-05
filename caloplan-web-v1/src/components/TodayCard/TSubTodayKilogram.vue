<script setup>
import { ArrowDown, ArrowUp } from "@vicons/ionicons5";
import { useWeightRecordStore } from '../../stores/useWeightRecord'
const weightRecordStore = useWeightRecordStore()
const todayWeightRecord = weightRecordStore.todayWeightRecord.weight || 0
const yesterdayWeightRecord = weightRecordStore.yesterdayWeightRecord.weight || 0
const deltaWeight = (todayWeightRecord - yesterdayWeightRecord).toFixed(1)
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
      <n-text style="font-size: 24px; font-weight: 700" strong>{{ todayWeightRecord }}</n-text>
      <span>kg</span>
    </n-flex>
    <!--水平方向-foot-->
    <n-flex align="center" :size="4">
      <span>较昨日</span>
      <n-text type="primary">{{ deltaWeight }}kg</n-text>
      <n-icon color="#18a058" :size="18">
        <ArrowDown />
      </n-icon>
    </n-flex>
  </n-flex>
</template>

<style scoped></style>
