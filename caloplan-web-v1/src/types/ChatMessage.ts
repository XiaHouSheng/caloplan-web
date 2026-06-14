import { nanoid } from "nanoid";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isLoading?: boolean;
  application?: string;
  messageType?: "text" | "markdown";
  additionalInfo?: object; // 额外信息,ai生成的一些json字符串 ,用于存储一些额外的信息
  relatedEntryId?: string; // 如果 AI 推荐了一条食物、用户"添加到今日菜单"，指向 MealEntry
}

function createChatMessage(
  raw: Omit<ChatMessage, "id" | "timestamp">,
): ChatMessage {
  return {
    id: nanoid(),
    role: raw.role,
    content: raw.content,
    isLoading: raw.isLoading || false,
    application: raw.application || undefined,
    messageType: raw.messageType || undefined,
    additionalInfo: raw.additionalInfo || undefined,
    relatedEntryId: raw.relatedEntryId || undefined,
    timestamp: new Date().toISOString(),
  };
}

export type { ChatMessage };
export { createChatMessage };