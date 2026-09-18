export interface ChatAction {
  label: string;
  href: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: ChatAction[];
  timestamp: number;
}

export interface ChatSession {
  isOpen: boolean;
  messages: ChatMessage[];
}
