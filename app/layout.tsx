import "./globals.css";
import type { Metadata } from "next";
import Header from "./nav/header";
import Nav from "./nav/nav";
import UseProvider, { UseContext } from "./store/store";

export const metadata: Metadata = {
    title: "공사공사",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="w-[100vw] h-[100vh] bg-[#E8EDF3] py-[30px] overflow-hidden">
                <UseProvider>
                    <div className="wrapper w-[1280px] xl:w-[1080px] mx-auto">
                        <Header />
                        <div className="flex mx-auto gap-[25px]">
                            <Nav />
                            {children}
                        </div>
                    </div>
                </UseProvider>
            </body>
        </html>
    );
}
