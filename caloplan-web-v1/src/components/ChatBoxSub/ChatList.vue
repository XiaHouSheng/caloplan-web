<script setup>
import ChatListItem from "./ChatListItem.vue";
import { useChatStore } from "../../stores/useChatStore";
import { formatDate } from "../../utils/date";
const chatStore = useChatStore();
</script>

<template>
  <n-list style="height: calc(100vh - 350px); overflow: auto">
    <ChatListItem
      v-for="item in chatStore.messages"
      :key="item.id"
      :rawMessage="item.content"
      :isUser="item.role === 'user'"
      :time="formatDate(new Date(item.timestamp))"
    />
  </n-list>
</template>

<style scoped></style>
