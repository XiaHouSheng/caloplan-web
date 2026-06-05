<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import VChart from "vue-echarts";
import { ref } from "vue";
import type { EChartsOption } from "echarts";
import { useWeightRecordStore } from "../../stores/useWeightRecord";

// 注册 line 图、grid、tooltip、canvas renderer
use([CanvasRenderer, LineChart, GridComponent, TooltipComponent]);

const weightRecordStore = useWeightRecordStore();
const records = weightRecordStore.weekWeightRecords;
const weights = records.map((record) => record ? record.weight : null);
const option = ref<EChartsOption>({
  grid: {
    left: 0,
    right: 0,
    top: 4,
    bottom: 2,
    containLabel: false,
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    show: false,
    boundaryGap: false,
  },
  yAxis: {
    type: "value",
    show: false,
    scale: true,
  },
  tooltip: {
    trigger: "axis",
    confine: true,
    backgroundColor: "rgba(17,24,39,0.92)",
    borderWidth: 0,
    textStyle: {
      color: "#fff",
    },
    axisPointer: {
      type: "line",
      lineStyle: {
        color: "#a78bfa",
      },
    },
  },
  series: [
    {
      name: "Trend",
      data: weights,
      type: "line",
      connectNulls: false,
      smooth: 0.2,
      symbol: "none",
      lineStyle: {
        width: 3,
        color: "#7c3aed",
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(124,58,237,0.45)",
            },
            {
              offset: 1,
              color: "rgba(124,58,237,0.02)",
            },
          ],
        },
      },
    },
  ],
  animationDuration: 700,
});
</script>

<template>
  <!--今日体重-->
  <!--垂直方向-->
  <n-flex style="height: 100px" vertical size="small">
    <!--水平方向-header-->
    <n-flex>
      <span>本周预计下降</span>
    </n-flex>
    <!--水平方向-content-->
    <n-flex align="baseline" :size="8">
      <n-text style="font-size: 24px; font-weight: 700" strong>0.4</n-text>
      <span>kg</span>
    </n-flex>
    <!--水平方向-foot-->
    <n-flex align="center" :size="4">
      <VChart class="chart" :option="option" autoresize />
    </n-flex>
  </n-flex>
</template>

<style scoped>
.chart {
  width: calc(100% - 30px);
  height: 30px;
}
</style>
