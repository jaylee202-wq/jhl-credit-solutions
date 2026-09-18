"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  BUDDY_NAME,
  createGreetingMessage,
  createUserMessage,
  getBuddyResponse,
  QUICK_ACTIONS,
} from "@/lib/chatbot/konnect-buddy";
import { clearChatSession } from "@/lib/chatbot/session";
import type { ChatMessage } from "@/lib/chatbot/types";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

function MessageContent({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <>
      {lines.map((line, index) => (
        <span key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        isUser ? "items-end" : "items-start",
      )}
    >
      <div
        className={cn(
          "max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
          isUser
            ? "rounded-br-md bg-navy text-white"
            : "rounded-bl-md border border-border bg-white text-navy",
        )}
      >
        <MessageContent content={message.content} />
      </div>
      {message.actions && message.actions.length > 0 && (
        <div className="flex flex-wrap gap-2 max-w-[88%]">
          {message.actions.map((action) => (
            <Link
              key={`${action.href}-${action.label}`}
              href={action.href}
              className="inline-flex items-center rounded-lg bg-gold px-3 py-1.5 text-xs font-semibold text-navy-dark transition-colors hover:bg-gold-light"
            >
              {action.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function createFreshChatState(isOpen = false) {
  return {
    isOpen,
    messages: [createGreetingMessage()] as ChatMessage[],
  };
}

export function KonnectBuddy() {
  const panelId = useId();
  const inputId = useId();
  const [chatState, setChatState] = useState(() => createFreshChatState());
  const { isOpen, messages } = chatState;
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const showQuickActions =
    messages.length === 1 && messages[0]?.role === "assistant";

  useEffect(() => {
    // Remove any leftover conversation data from prior persistence behavior
    clearChatSession();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const endChatSession = useCallback(() => {
    clearChatSession();
    setInput("");
    setIsTyping(false);
    setChatState(createFreshChatState(false));
    launcherRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        endChatSession();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, endChatSession]);

  useEffect(() => {
    if (isOpen) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 150);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMessage = createUserMessage(trimmed);
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }));
    setInput("");
    setIsTyping(true);

    await new Promise((resolve) => window.setTimeout(resolve, 400));

    const response = getBuddyResponse(trimmed);
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, response],
    }));
    setIsTyping(false);
  }, [isTyping]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const toggleOpen = () => {
    if (isOpen) {
      endChatSession();
      return;
    }

    clearChatSession();
    setInput("");
    setIsTyping(false);
    setChatState(createFreshChatState(true));
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${panelId}-title`}
          aria-describedby={`${panelId}-desc`}
          className="flex w-[min(calc(100vw-2rem),380px)] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl"
          style={{ maxHeight: "min(70vh, 520px)" }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 bg-navy px-4 py-3.5">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/20"
                  aria-hidden="true"
                >
                  <svg
                    className="h-5 w-5 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                    />
                  </svg>
                </div>
                <div>
                  <h2
                    id={`${panelId}-title`}
                    className="font-serif text-base font-bold text-white"
                  >
                    {BUDDY_NAME}
                  </h2>
                  <p
                    id={`${panelId}-desc`}
                    className="text-xs text-white/70"
                  >
                    {SITE.name} Virtual Assistant
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={endChatSession}
              className="rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto bg-surface px-3 py-4"
            aria-live="polite"
            aria-relevant="additions"
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {showQuickActions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action}
                      type="button"
                      onClick={() => void sendMessage(action)}
                      disabled={isTyping}
                      className="rounded-full border border-gold/40 bg-white px-3 py-1.5 text-left text-xs font-medium text-navy transition-colors hover:border-gold hover:bg-gold/5 disabled:opacity-50"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}

              {isTyping && (
                <div className="flex items-start">
                  <div className="rounded-2xl rounded-bl-md border border-border bg-white px-4 py-3 shadow-sm">
                    <div className="flex gap-1" aria-label="Buddy is typing">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gold [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gold [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gold [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-border bg-white p-3"
          >
            <div className="flex items-center gap-2">
              <label htmlFor={inputId} className="sr-only">
                Type your message
              </label>
              <input
                ref={inputRef}
                id={inputId}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type a message..."
                disabled={isTyping}
                autoComplete="off"
                className="min-w-0 flex-1 rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-navy placeholder:text-muted/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold text-navy-dark transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? "Close chat with Buddy" : "Chat with Buddy"}
        className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-navy-light hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        {isOpen ? (
          <>
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
            <span className="hidden sm:inline">Minimize</span>
          </>
        ) : (
          <>
            <svg
              className="h-5 w-5 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
            <span>Chat with Buddy</span>
          </>
        )}
      </button>
    </div>
  );
}
