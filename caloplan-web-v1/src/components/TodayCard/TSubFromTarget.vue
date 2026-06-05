<script setup>
import { useUserStore } from '../../stores/useUserStore'
import { useWeightRecordStore } from '../../stores/useWeightRecord'
const weightRecordStore = useWeightRecordStore()
const userStore = useUserStore()
const targetWeight = userStore.profile.targetWeight || 0
const todayWeight = weightRecordStore.todayWeightRecord.weight || 0
const deltaWeight = (todayWeight - targetWeight).toFixed(1)
//这里的进度还需要根据目标体重进行调整
//例如我一开始的体重为80现在是78则进度就是 2 / （80 - 70） * 100 = 20
const progress = (deltaWeight / 10) * 100
const maxProgress = 100
</script>

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
        <n-text style="font-size: 24px; font-weight: 700" strong>{{ deltaWeight }}</n-text>
        <span>kg</span>
      </n-flex>
      <!--水平方向-foot-->
      <n-flex style="margin-top: 8px;" align="center" :size="4">
        <n-progress
          style="width: calc(100% - 40px);"
          type="line"
          status="warning"
          :show-indicator="false"
          :percentage="progress"
        />
      </n-flex>
    </n-flex>
</template>

<style scoped></style>
