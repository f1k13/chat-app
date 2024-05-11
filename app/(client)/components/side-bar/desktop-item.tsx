"use client";

import { DesktopItemType } from "@/app/types/desktop-item";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const DesktopItem = ({ item }: { item: DesktopItemType }) => {
  const handleClick = () => {
    if (item.onClick) {
      return item.onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        className={clsx(
          `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover-bg-gray-100`,
          item.active && "bg-gray-100 text-black"
        )}
        href={item.href}
      >
        <item.icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{item.label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
