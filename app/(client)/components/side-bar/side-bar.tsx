import { ReactNode } from "react";

const SideBar = ({ children }: { children: ReactNode }) => {
    return (
        <div className="h-full">
            <div className="lg:pl-20 h-full">{children}</div>
        </div>
    );
};

export default SideBar;
