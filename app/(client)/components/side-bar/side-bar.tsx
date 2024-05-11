import { ReactNode } from "react";
import DesktopSidebar from "./desktop-sidebar";
import MobileFooter from "./mobile-footer";
import getUser from "@/app/actions/get-user";

const SideBar = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();

  return (
    <div className="h-full">
      <DesktopSidebar user={user!} />
      <MobileFooter />
      <div className="lg:pl-20 h-full">{children}</div>
    </div>
  );
};

export default SideBar;
