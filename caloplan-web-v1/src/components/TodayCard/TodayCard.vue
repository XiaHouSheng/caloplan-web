<script setup>
import TSubExpectDecrease from "./TSubExpectDecrease.vue";
import TSubContinue from "./TSubContinue.vue";
import TSubFromTarget from "./TSubFromTarget.vue";
import TSubTodayKilogram from "./TSubTodayKilogram.vue";
import TSubGreetingCard from "./TSubGreetingCard.vue";
import DialogCheckIn from "../Dialog/DialogCheckIn.vue";
import { Pencil } from "@vicons/ionicons5";

const dialogCheckInVisible = ref(false)

</script>

<template>
  <DialogCheckIn :show="dialogCheckInVisible" @update:show="dialogCheckInVisible = $event"/>
  <n-card style="transform: translate(0)">
    <template #default>
      <n-float-button :right="20" :bottom="50" @click="dialogCheckInVisible = true;">
        <n-icon>
          <Pencil />
        </n-icon>
      </n-float-button>
      <n-grid x-gap="0" :cols="5">
        <n-gi>
          <TSubTodayKilogram />
        </n-gi>
        <n-gi>
          <TSubFromTarget />
        </n-gi>
        <n-gi>
          <TSubContinue />
        </n-gi>
        <n-gi>
          <TSubExpectDecrease />
        </n-gi>
        <n-gi>
          <TSubGreetingCard />
        </n-gi>
      </n-grid>
    </template>
  </n-card>
</template>

<style scoped></style>
