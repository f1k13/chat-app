"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types/prisma-table-types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationItem from "./conversation-item";
const ConversationList = ({
  initialItems,
}: {
  initialItems: FullConversationType[];
}) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();
  return (
    <aside
      className={clsx(
        `bg-white fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="flex justify-between flex-col mb-4 p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-neutral-800">Messages</h3>
          <div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item) => (
          <ConversationItem key={item.id} item={item} />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
