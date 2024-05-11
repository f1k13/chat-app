"use client";

import { FullConversationType } from "@/app/types/prisma-table-types";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import useOtherUser from "@/app/hooks/useOtherUser";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import clsx from "clsx";
import Avatar from "@/app/(client)/components/avatar/avatar";

const ConversationItem = ({
  item,
  selected,
}: {
  item: FullConversationType;
  selected?: boolean;
}) => {
  const router = useRouter();
  const otherUser = useOtherUser(item);
  const session = useSession();
  const handleClick = useCallback(() => {
    router.push(`/conversations/${item.id}`);
  }, [item.id, router]);

  const lastMessage = useMemo(() => {
    const messages = item.messages || [];
    return messages[messages.length - 1];
  }, [item.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenData = lastMessage.seen || [];

    if (!userEmail) return false;

    return seenData.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "Sent and image";
    if (lastMessage?.body) return lastMessage.body;

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative mt-2 flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3`,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {item.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-sm`,
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
