import { ReactNode } from "react";
import SideBar from "../(client)/components/side-bar/side-bar";
import getUsers from "../actions/get-users";
import UsersList from "./components/users-list";

const Layout = async ({ children }: { children: ReactNode }) => {
  const users = await getUsers();
  return (
    <SideBar>
      <div className="h-full">
        <UsersList users={users!} />
        {children}
      </div>
    </SideBar>
  );
};

export default Layout;
