<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from "vue";
import type { ScrollbarInst } from "naive-ui";
import { ChevronDown } from "@vicons/ionicons5";
import ChatListItem from "./ChatListItem.vue";
import { useChatStore } from "../../stores/useChatStore";
import { formatDate } from "../../utils/date";

const chatStore = useChatStore();
const scrollbarRef = ref<ScrollbarInst | null>(null);

const showScrollBottom = ref(false);
const SCROLL_THRESHOLD = 100; // px from bottom

function onScroll(e: Event) {
  const el = e.target as HTMLElement;
  const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
  showScrollBottom.value = distanceFromBottom > SCROLL_THRESHOLD;
}

const scrollToBottom = async (smooth = true): Promise<void> => {
  await nextTick();
  scrollbarRef.value?.scrollTo({
    top: 99999,
    behavior: smooth ? "smooth" : "auto",
  });
};

// 新消息到达时自动滚到底部（仅当用户已在底部时）
watch(
  () => chatStore.messages.length,
  () => {
    if (!showScrollBottom.value) {
      scrollToBottom(false);
    }
  },
);

// 删除消息（预留）
function handleDelete(key: string) {
  chatStore.deleteMessage(key);
}

onMounted(() => {
  scrollToBottom(false);
});
</script>

<template>
  <div style="position: relative; height: calc(100vh - 350px)">
    <n-scrollbar
      ref="scrollbarRef"
      style="height: 100%; padding-right: 12px"
      @scroll="onScroll"
    >
      <n-list :show-divider="false">
        <ChatListItem
          v-for="item in chatStore.messages"
          :key="item.id"
          :rawMessage="item.content"
          :isUser="item.role === 'user'"
          :isLoading="item.isLoading"
          :time="formatDate(new Date(item.timestamp))"
          :additionalInfo="item.additionalInfo"
          :application="item.application"
          @delete="handleDelete(item.id)"
        />
      </n-list>
    </n-scrollbar>

    <!-- 回到底部按钮 -->
    <Transition name="fade-up">
      <n-button
        v-if="showScrollBottom"
        circle
        tertiary
        style="
          position: absolute;
          bottom: 16px;
          right: 50%;
          transform: translateX(50%);
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        "
        @click="scrollToBottom(true)"
      >
        <template #icon>
          <n-icon size="20">
            <ChevronDown />
          </n-icon>
        </template>
      </n-button>
    </Transition>
  </div>
</template>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.25s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateX(50%) translateY(10px);
}
.fade-up-leave-to {
  transform: translateX(50%) translateY(10px);
}
</style>
