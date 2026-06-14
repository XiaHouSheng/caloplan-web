import chatSendMsg from "../api/ChatBoxApi";
import { useChatStore } from "../../stores/useChatStore";
import { useUserStore } from "../../stores/useUserStore";
import { useMealStore } from "../../stores/useMealStore";
import { createChatMessage, type ChatMessage } from "../../types/ChatMessage";

function sendMessage() {
  const userStore = useUserStore();
  const mealStore = useMealStore();
  const chatStore = useChatStore();
  if (chatStore.inputMessage.trim() === "") return;

  // 发送用户消息
  const messageBuild = {
    role: "user",
    content: chatStore.inputMessage,
    messageType: "markdown",
    application: chatStore.chatAppSelect,
    isLoading: false,
  } as Omit<ChatMessage, "id" | "timestamp">;
  chatStore.addMessage(messageBuild);
  
  // 助手占用消息
  const tempMessageData = {
    role: "assistant",
    content: "",
    messageType: "markdown",
    application: chatStore.chatAppSelect,
    isLoading: true,
  } as Omit<ChatMessage, "id" | "timestamp">;
  const tempMessage = chatStore.addMessage(tempMessageData);
  
  // 请求Agent回复
  chatSendMsg(
    chatStore.inputMessage,
    userStore.profile,
    userStore.nutritionTarget,
    mealStore.todayMealRecords,
    mealStore.mealEntries,
  )
    .then((res) => res.data)
    .then((data) => {
      const messageBuild = {
        ...tempMessage,
        role: "assistant",
        content: data.content,
        messageType: "markdown",
        isLoading: false,
        application: chatStore.chatAppSelect,
        additionalInfo: {
          meal_record: data.mealRecord,
        },
      } as ChatMessage;
      chatStore.updateMessage(messageBuild);
    })
    .catch((err) => {
      console.error(err);
      chatStore.deleteMessage(tempMessage.id);
    })
}

export default sendMessage;
