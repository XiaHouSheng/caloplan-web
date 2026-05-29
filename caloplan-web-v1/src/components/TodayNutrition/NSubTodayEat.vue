<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import VChart from "vue-echarts";
import { ref } from "vue";
import type { EChartsOption } from "echarts";
import { Pencil } from "@vicons/ionicons5";

use([CanvasRenderer, PieChart, TooltipComponent]);

const option = ref<EChartsOption>({
  tooltip: {
    trigger: "item",
    formatter: "{b}<br/>{c}g ({d}%)",
  },
  color: ["#7c3aed", "#10b981", "#f59e0b"],
  series: [
    {
      name: "营养摄入",
      type: "pie",
      radius: ["48%", "72%"],
      center: ["50%", "50%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 3,
      },
      label: {
        show: true,
        position: "center",
        formatter: "{total|1200}\n/1400kcal",
        fontSize: 14,
        lineHeight: 22,
        color: "#6b7280",
        rich: {
          total: {
            fontSize: 24,
            fontWeight: 800,
            color: "#111827",
            lineHeight: 34,
          },
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 95, name: "碳水" },
        { value: 45, name: "蛋白质" },
        { value: 25, name: "脂肪" },
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
    <template #header-extra>
      <n-button size="small">
        编辑目标
        <n-icon>
          <Pencil />
        </n-icon>
      </n-button>
    </template>
    <template #header>
      <n-text style="font-weight: bold">今日摄入预览</n-text>
    </template>
    <template #default>
      <n-flex :size="0">
        <!-- 图表 -->
        <VChart class="chart" :option="option" autoresize />
        <!-- 今日摄入预览 -->
        <n-flex justify="center" style="flex-grow: 1" vertical>
          <n-flex :size="8" align="center" inline>
            <n-badge dot color="#16C4FE"></n-badge>
            <n-text>剩余热量</n-text>
            <n-text style="font-weight: bold; margin-left: auto">1200</n-text>
            <n-text>kcal</n-text>
          </n-flex>
          <n-flex :size="8" align="center" inline>
            <n-badge dot color="#7c3aed"></n-badge>
            <n-text>碳水</n-text>
            <n-text style="font-weight: bold; margin-left: auto">1200</n-text>
            <n-text>kcal</n-text>
          </n-flex>
          <n-flex :size="8" align="center" inline>
            <n-badge dot color="#10b981"></n-badge>
            <n-text>蛋白质</n-text>
            <n-text style="font-weight: bold; margin-left: auto">1200</n-text>
            <n-text>kcal</n-text>
          </n-flex>
          <n-flex :size="8" align="center" inline>
            <n-badge dot color="#f59e0b"></n-badge>
            <n-text>脂肪</n-text>
            <n-text style="font-weight: bold; margin-left: auto">1200</n-text>
            <n-text>kcal</n-text>
          </n-flex>
        </n-flex>
        <!-- 进度条 -->
        <n-progress
          type="line"
          color="#16C4FE"
          :percentage="50"
          :height="12"
          :border-radius="12"
          :fill-border-radius="0"
          :show-indicator="false"
        />
        <n-flex style="width: 100%" :size="8" align="center" inline>
          <n-text>已摄入</n-text>
          <n-text>50%</n-text>
          <n-text style="margin-left: auto">目标</n-text>
          <n-text>1469</n-text>
          <n-text>kcal</n-text>
        </n-flex>
      </n-flex>
    </template>
  </n-card>
</template>

<style scoped>
.chart {
  width: 180px;
  height: 180px;
}
</style>
