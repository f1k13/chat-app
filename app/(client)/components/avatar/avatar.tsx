"use client";
import { User } from "@prisma/client";
import Image from "next/image";
const Avatar = ({ user }: { user?: User }) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full h-9 w-9 md:h-11 md:w-11">
        <Image
          alt="avatar"
          src={user?.image || "/images/avatar.png"}
          width={200}
          height={200}
        />
      </div>
      <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 2-2 md:h-3 md:w-3" />
    </div>
  );
};

export default Avatar;
