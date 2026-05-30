import { nanoid } from "nanoid";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  relatedEntryId?: string; // 如果 AI 推荐了一条食物、用户"添加到今日菜单"，指向 MealEntry
}

function createChatMessage(
  raw: Omit<ChatMessage, "id" | "timestamp">,
): ChatMessage {
  return {
    id: nanoid(),
    role: raw.role,
    content: raw.content,
    relatedEntryId: raw.relatedEntryId || undefined,
    timestamp: new Date().toISOString(),
  };
}

export type { ChatMessage };
export { createChatMessage };