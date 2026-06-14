<script setup>
import { Alert, Rainy, Send } from "@vicons/ionicons5";
import { ref } from "vue";
import { useChatStore } from "../../stores/useChatStore";
import { createChatMessage } from "../../types/ChatMessage";
import sendMessage from "../../applications/service/ChatBoxService"
const chatStore = useChatStore();

</script>

<template>
  <n-flex vertical style="transform: translate(0)">
    <n-tabs v-model:value="chatStore.chatAppSelect" type="card">
      <n-tab-pane
        v-for="i in chatStore.apps"
        style="padding: 0"
        :name="`${i}`"
      ></n-tab-pane>
    </n-tabs>
    <n-input
      style="border-radius: 20px; padding: 12px"
      :auto-size="{
        minRows: 1,
        maxRows: 1,
      }"
      v-model:value="chatStore.inputMessage"
      type="textarea"
      size="small"
      placeholder="测试placeholder"
    />
    <n-float-button @click="sendMessage" :right="8" :bottom="8">
      <n-icon size="24">
        <Send />
      </n-icon>
    </n-float-button>
  </n-flex>
</template>

<style scoped></style>
