<script setup lang="ts">
import { ref, onMounted } from "vue";
import ChatListItem from "./ChatListItem.vue";
import { useChatStore } from "../../stores/useChatStore";
import { formatDate } from "../../utils/date";
const chatStore = useChatStore();

const emit = defineEmits<{
  (e: "addToMeal", data: { mealRecord: any; application: string }): void;
}>();

const scrollContainer = ref<HTMLElement | null>(null)
onMounted(() => {
});
</script>

<template>
  <n-list :show-divider="false" ref="scrollContainer" style="height: calc(100vh - 350px); overflow: auto">
    <ChatListItem
      v-for="item in chatStore.messages"
      :key="item.id"
      :rawMessage="item.content"
      :isUser="item.role === 'user'"
      :isLoading="item.isLoading"
      :time="formatDate(new Date(item.timestamp))"
      :additionalInfo="item.additionalInfo"
      :application="item.application"
      @addToMeal="(data: any) => emit('addToMeal', data)"
    />
  </n-list>
</template>

<style scoped></style>
