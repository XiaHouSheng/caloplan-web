<script setup lang="ts">
import ChatListItem from "./ChatListItem.vue";
import { useChatStore } from "../../stores/useChatStore";
import { formatDate } from "../../utils/date";

const chatStore = useChatStore();

</script>

<template>
  <n-scrollbar style="height: calc(100vh - 350px);padding-right: 12px;">
     <n-list :show-divider="false" ref="scrollContainer"> 
    <ChatListItem
      v-for="item in chatStore.messages"
      :key="item.id"
      :rawMessage="item.content"
      :isUser="item.role === 'user'"
      :isLoading="item.isLoading"
      :time="formatDate(new Date(item.timestamp))"
      :additionalInfo="item.additionalInfo"
      :application="item.application"
    />
  </n-list>
  </n-scrollbar>
</template>

<style scoped></style>
