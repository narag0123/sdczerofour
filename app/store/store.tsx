"use client";
import { usePathname } from "next/navigation";
import React, { useState, createContext } from "react";
import { tunnel } from "./data/tunnel_data";
import { nav_unit_items } from "./data/nav_unit_items_data";

// array type정의
type NavUnitItems = {
    name: string;
    image: string;
    active_image: string;
    url: string;
};

type TunnelType = {
    tunnel_region: string;
    subitems: string[];
};

// Context 타입 정의
interface ContextType {
    nav_unit_items: NavUnitItems[];
    wherePage: string;
    setWherePage: React.Dispatch<
        React.SetStateAction<string>
    >;
    tunnel: TunnelType[];
}

// 초기값 설정
const initialContext: ContextType = {
    nav_unit_items: [
        {
            name: "",
            image: "",
            active_image: "",
            url: "",
        },
    ],
    wherePage: "",
    tunnel: [
        {
            tunnel_region: "",
            subitems: [""],
        },
    ],
    setWherePage: () => {},
};

// Context Provider 전송할거
export const UseContext =
    createContext<ContextType>(initialContext);

// 전송할거 내용
const UseProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    let pathName = usePathname();
    // 작성할 부분

    const [wherePage, setWherePage] =
        useState<string>(pathName);

    return (
        <UseContext.Provider
            value={{
                nav_unit_items,
                wherePage,
                setWherePage,
                tunnel,
            }}
        >
            {children}
        </UseContext.Provider>
    );
};
export default UseProvider;
