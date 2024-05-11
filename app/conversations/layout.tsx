import { ReactNode } from "react";
import SideBar from "../(client)/components/side-bar/side-bar";
import ConversationList from "./components/conversation-list";
import getConversations from "../actions/get-conversations";

const Layout = async ({ children }: { children: ReactNode }) => {
  const conversations = await getConversations();

  return (
    <SideBar>
      <ConversationList initialItems={conversations} />
      <div className="h-full">{children}</div>
    </SideBar>
  );
};

export default Layout;
