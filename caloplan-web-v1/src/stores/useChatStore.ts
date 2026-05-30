import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { type ChatMessage, createChatMessage } from "../types/ChatMessage";

export const useChatStore = defineStore(
  "chat",
  () => {
    const messages = ref<ChatMessage[]>([]);

    const lastMessage = computed(() => {
      return messages.value[messages.value.length - 1] ?? null;
    });

    function addMessage(raw: Omit<ChatMessage, "id" | "timestamp">) {
      messages.value.push(createChatMessage(raw));
    }

    function deleteMessage(id: string) {
      messages.value = messages.value.filter((m) => m.id !== id);
    }

    function clearMessages() {
      messages.value = [];
    }

    return {
      messages,
      lastMessage,
      addMessage,
      deleteMessage,
      clearMessages,
    };
  },
  {
    persist: {
      key: "chat-store",
      storage: localStorage,
      pick: ["messages"],
    },
  },
);
