'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<{ sender: string; text: string }[]>([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages`);
      setChat(res.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { sender: "user", text: input };
    setChat((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat`, {
        message: input,
      });

      const botMessage = {
        sender: "bot",
        text: res.data.reply.content,
      };
      setChat((prev) => [...prev, botMessage]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong 😢" },
      ]);
      console.log("Error:", err);
    }
  };

  return (
    <div style={{ padding: 30, margin: "auto" }}>
      <h2>🤖 Rania&apos;s Chatbot</h2>
      <ChatWindow chat={chat} />
      <ChatInput input={input} setInput={setInput} onSend={sendMessage} />
    </div>
  );
}
