"use client";
import clsx from "clsx";
import EmptyState from "../(client)/components/empty-state/empty-state";
import useConversation from "../hooks/useConversation";

const Page = () => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx(
        "lg:pl-80 h-full lg:block  bg-white",
        isOpen ? "block" : "hidden"
      )}
    >
      <EmptyState />
    </div>
  );
};

export default Page;
