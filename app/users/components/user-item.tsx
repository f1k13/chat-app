"use client";

import Avatar from "@/app/(client)/components/avatar/avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const UserItem = ({ item }: { item: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    await axios.post("/api/conversations", {
      userId: item.id,
    });
    router.push(`/conversations/${item.id}`);
  }, [item, router]);
  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 transition cursor-pointer"
    >
      <Avatar user={item} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">{item.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
