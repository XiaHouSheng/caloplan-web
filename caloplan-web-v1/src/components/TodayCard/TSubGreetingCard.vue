<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "../../stores/useUserStore";

const userStore = useUserStore();
const bmi = computed(() => userStore.bmi.toFixed(1));

</script>

<template>
  <!--今日体重-->
  <!--垂直方向-->
  <n-flex style="height: 100px" vertical size="medium">
    <!--水平方向-header-->
    <n-flex>
      <span>BMI</span>
    </n-flex>
    <!--水平方向-content-->
    <n-flex align="baseline" :size="8">
      <n-text style="font-size: 24px; font-weight: 700" strong>{{
        bmi
      }}</n-text>
      <span>kg/m²</span>
    </n-flex>
    <!--水平方向-foot-->
    <n-flex align="center" :size="4">
      <n-text><span style="color: #009688">正常</span></n-text>
    </n-flex>
  </n-flex>
</template>

<style scoped></style>
