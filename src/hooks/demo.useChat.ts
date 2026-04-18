import { useEffect, useSyncExternalStore } from "react";

export type Message = {
  id: number;
  text: string;
  user: string;
};

const messagesListeners = new Set<() => void>();
let messages: Message[] = [];
let streamStarted = false;

function notifyMessagesListeners() {
  for (const listener of messagesListeners) {
    listener();
  }
}

function appendMessage(message: Message) {
  messages = [...messages, message];
  notifyMessagesListeners();
}

function subscribeToMessages(listener: () => void) {
  messagesListeners.add(listener);

  return () => {
    messagesListeners.delete(listener);
  };
}

function getMessagesSnapshot() {
  return messages;
}

function startStreamConnection(url: string) {
  if (streamStarted) {
    return;
  }

  streamStarted = true;

  const fetchData = async () => {
    const response = await fetch(url);
    const reader = response.body?.getReader();
    if (!reader) {
      return;
    }

    const decoder = new TextDecoder();
    let bufferedChunk = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      bufferedChunk += decoder.decode(value, { stream: true });
      const chunks = bufferedChunk.split("\n");
      bufferedChunk = chunks.pop() ?? "";

      for (const chunk of chunks.filter((part) => part.length > 0)) {
        appendMessage(JSON.parse(chunk));
      }
    }

    if (bufferedChunk.length > 0) {
      appendMessage(JSON.parse(bufferedChunk));
    }
  };

  void fetchData();
}

function useStreamConnection(url: string) {
  useEffect(() => {
    startStreamConnection(url);
  }, [url]);
}

export function useChat() {
  useStreamConnection("/demo/db-chat-api");

  const sendMessage = (message: string, user: string) => {
    fetch("/demo/db-chat-api", {
      method: "POST",
      body: JSON.stringify({ text: message.trim(), user: user.trim() }),
    });
  };

  return { sendMessage };
}

export function useMessages() {
  return useSyncExternalStore(
    subscribeToMessages,
    getMessagesSnapshot,
    () => [],
  );
}
