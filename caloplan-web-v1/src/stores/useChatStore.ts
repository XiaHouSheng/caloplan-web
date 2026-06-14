import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { type ChatMessage, createChatMessage } from "../types/ChatMessage";

export const useChatStore = defineStore(
  "chat",
  () => {
    const messages = ref<ChatMessage[]>([]);

    const chatAppSelect = ref("功能1");
    const inputMessage = ref("");
    const apps = ["功能1", "功能2", "功能3", "功能4", "功能5"];

    const lastMessage = computed(() => {
      return messages.value[messages.value.length - 1] ?? null;
    });

    function addMessage(raw: Omit<ChatMessage, "id" | "timestamp">) {
      const message = createChatMessage(raw);
      messages.value.push(message);
      return message
    }

    function updateMessage(message: ChatMessage) {
      messages.value = messages.value.map((m) => {
        if (m.id === message.id) {
          return message;
        }
        return m;
      });
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
      chatAppSelect,
      inputMessage,
      apps,
      addMessage,
      deleteMessage,
      clearMessages,
      updateMessage,
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
