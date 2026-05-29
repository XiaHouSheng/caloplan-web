<script setup>
import ChatListItem from "./ChatListItem.vue";
</script>

<template>
  <n-list style="height: calc(100vh - 350px); overflow: auto;">
    <ChatListItem rawMessage="测试文本" :isUser="true" time="2026-5-27 22:18" />
    <ChatListItem v-for="item in 10" :key="item"
      rawMessage="测试文本"
      :isUser="false"
      time="2026-5-27 22:18"
    />
  </n-list>
</template>

<style scoped></style>
