import Avatar from "@/app/(client)/components/avatar/avatar";
import { FullMessageType } from "@/app/types/prisma-table-types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";
const MessageItem = ({
  isLast,
  item,
}: {
  isLast?: boolean;
  item: FullMessageType;
}) => {
  const session = useSession();
  const isOwn = session?.data?.user?.email === item?.sender.email;

  const seenList = (item.seen || [])
    .filter((user) => user.email !== item.sender.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    item.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );
  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={item.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <h3 className="text-sm text-gray-500">{item.sender.name}</h3>
          <p className="text-sx text-gray-400">
            {format(new Date(item.createdAt), "p")}
          </p>
        </div>
        <div className={message}>
          {item.image ? (
            <Image
              alt="Image"
              height={288}
              width={288}
              src={item.image}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <div>{item.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-sx font-light text-gray-500">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
