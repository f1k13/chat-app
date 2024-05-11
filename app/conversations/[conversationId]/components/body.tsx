"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types/prisma-table-types";
import { useEffect, useRef, useState } from "react";
import MessageItem from "./message-item";
import axios from "axios";

const Body = ({ initialMessages }: { initialMessages: FullMessageType[] }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((item, index) => (
        <MessageItem
          isLast={index === messages.length - 1}
          key={item.id}
          item={item}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
