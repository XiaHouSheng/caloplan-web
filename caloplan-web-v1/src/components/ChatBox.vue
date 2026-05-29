<script setup>
import { Menu } from "@vicons/ionicons5";
import ChatList from "./ChatBoxSub/ChatList.vue";
import ChatInput from "./ChatBoxSub/ChatInput.vue";
</script>

<template>
  <n-card title="Chatbox">
    <template #header-extra>
      <n-button tertiary circle size="small">
        <n-icon size="24">
          <Menu />
        </n-icon>
      </n-button>
    </template>
    <ChatList />
    <template #footer>
      <ChatInput />
    </template>
  </n-card>
</template>

<style scoped></style>
