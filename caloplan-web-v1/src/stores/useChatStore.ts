import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { type ChatMessage, createChatMessage } from "../types/ChatMessage";

export const useChatStore = defineStore(
  "chat",
  () => {
    const messages = ref<ChatMessage[]>([]);

    const chatAppSelect = ref("chat");
    const inputMessage = ref("");
    const apps = ["chat", "meal_recommend", "nutrition", "功能4", "功能5"];
    const names = ["聊天", "推荐餐食", "营养素分配", "功能4", "功能5"];

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
      names,
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
