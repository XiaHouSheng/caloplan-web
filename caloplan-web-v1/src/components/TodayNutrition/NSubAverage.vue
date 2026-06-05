<script setup lang="ts">
import { ref } from "vue";
import VChart from "vue-echarts";
import type { EChartsOption } from "echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { useMealStore } from "../../stores/useMealStore";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

const mealStore = useMealStore()

const option = ref<EChartsOption>({
  tooltip: {
    trigger: "axis",
    formatter: (params: any) => {
      const date = params?.[0]?.axisValue ?? "";
      let html = `<div style="font-weight:600;margin-bottom:4px;">${date}</div>`;
      params.forEach((p: any) => {
        const color = p.color;
        const name = p.seriesName;
        const value = Array.isArray(p.value) ? p.value[1] : p.value;
        html += `
          <div style="display:flex;align-items:center;gap:6px;line-height:1.8;">
            <span style="width:10px;height:10px;border-radius:50%;background:${color};display:inline-block;"></span>
            <span>${name}: ${value}</span>
          </div>
        `;
      });
      return html;
    },
  },
  legend: {
    data: ["摄入", "消耗"],
    top: 10,
    right: 20,
    textStyle: {
      fontSize: 10,
    },
  },
  grid: {
    left: "10%",
    right: "10%",
    bottom: "15%",
    top: "20%",
  },
  xAxis: {
    type: "category",
    data: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    axisLabel: { fontSize: 10 },
    axisLine: { show: true },
    axisTick: { show: false },
  },
  yAxis: {
    type: "value",
    min: 0,
    max: 2000,
    interval: 300,
    axisLabel: { fontSize: 10 },
    splitLine: { show: false },
    axisLine: { show: false },
    axisTick: { show: false },
  },
  series: [
    {
      name: "摄入",
      type: "line",
      symbol: "circle",
      symbolSize: 8,
      itemStyle: { color: "#F37F24" },
      lineStyle: { color: "#F37F24", width: 2 },
      data: [
        ...mealStore.day7KcalData.ylabel,
        {
          value: 900,
          itemStyle: {
            color: "#fff",
            borderColor: "#F37F24",
            borderWidth: 2,
          },
        },
      ],
    },
    {
      name: "消耗",
      type: "line",
      symbol: "circle",
      symbolSize: 8,
      itemStyle: { color: "#14B89B" },
      lineStyle: { color: "#14B89B", width: 2 },
      data: [
        520,
        580,
        620,
        480,
        400,
        520,
        {
          value: 420,
          itemStyle: {
            color: "#fff",
            borderColor: "#14B89B",
            borderWidth: 2,
          },
        },
      ],
    },
  ],
});
</script>

<template>
  <n-card
    :segmented="{
      content: true,
    }"
  >
    <template #header>
      <n-text style="font-weight: bold">本周趋势</n-text>
    </template>
    <template #default>
      <n-flex vertical :size="0">
        <n-grid x-gap="8" :cols="3">
          <n-gi>
            <n-flex vertical :size="0">
              <span>平均摄入</span>
              <n-flex :size="4" align="center" inline>
                <n-text style="font-size: 18px; font-weight: bold">1200</n-text>
                <span>kcal/天</span>
              </n-flex>
            </n-flex>
          </n-gi>
          <n-gi>
            <n-flex vertical :size="0">
              <span>平均消耗</span>
              <n-flex :size="4" align="center" inline>
                <n-text style="font-size: 18px; font-weight: bold">420</n-text>
                <span>kcal/天</span>
              </n-flex>
            </n-flex>
          </n-gi>
          <n-gi>
            <n-flex vertical :size="0">
              <span>预计下降</span>
              <n-flex :size="4" align="center" inline>
                <n-text style="font-size: 18px; font-weight: bold">0.4</n-text>
                <span>kg</span>
              </n-flex>
            </n-flex>
          </n-gi>
        </n-grid>
        <VChart class="chart" :option="option" autoresize />
      </n-flex>
    </template>
  </n-card>
</template>

<style scoped>
.chart {
  width: 100%;
  height: 163.1px;
}
</style>
