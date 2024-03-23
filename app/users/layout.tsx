import { ReactNode } from "react";
import SideBar from "../(client)/components/side-bar/side-bar";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <SideBar>
            <div className="h-full">{children}</div>;
        </SideBar>
    );
};

export default Layout;
