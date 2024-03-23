import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "/app/globals.css";
import ToastContext from "./context/toast-context";
import AuthContext from "./context/auth-context";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "chat",
    description: "chat",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthContext>
                    <ToastContext />
                    {children}
                </AuthContext>
            </body>
        </html>
    );
}
