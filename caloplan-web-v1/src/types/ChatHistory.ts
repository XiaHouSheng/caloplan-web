import { nanoid } from "nanoid";
import { type ChatMessage } from "./ChatMessage";

interface ChatHistory {
  id: string;
  name: string;
  messages: ChatMessage[];
  type: string;
  createdAt: string;
}

function createChatHistory(
  raw: Omit<ChatHistory, "id" | "createdAt">,
): ChatHistory {
  return {
    id: nanoid(),
    name: raw.name,
    messages: raw.messages,
    type: raw.type,
    createdAt: new Date().toISOString(),
  };
}

export type { ChatHistory };
export { createChatHistory };

