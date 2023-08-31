"use client";
import { usePathname } from "next/navigation";
import React, { useState, createContext } from "react";

// array type정의
type NavUnitItems = {
    name: string;
    image: string;
    active_image: string;
    url: string;
};

// Context 타입 정의
interface ContextType {
    nav_unit_items: NavUnitItems[];
    wherePage: string;
    setWherePage: React.Dispatch<
        React.SetStateAction<string>
    >;
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
    const nav_unit_items = [
        {
            name: "메인페이지",
            image: "/asset/img/home.png",
            active_image: "/asset/img/home_active.png",
            url: "/",
        },
        {
            name: "일정보기",
            image: "/asset/img/cal.png",
            active_image: "/asset/img/cal_active.png",
            url: "/page/cal",
        },
        {
            name: "공사등록",
            image: "/asset/img/construction.png",
            active_image:
                "/asset/img/construction_active.png",
            url: "/page/construction",
        },
        {
            name: "사고등록",
            image: "/asset/img/accident.png",
            active_image: "/asset/img/accident_active.png",
            url: "/page/accident",
        },
        {
            name: "공사기록",
            image: "/asset/img/const-record.png",
            active_image:
                "/asset/img/const-record_active.png",
            url: "/page/const-record",
        },
        {
            name: "사고기록",
            image: "/asset/img/acc-record.png",
            active_image:
                "/asset/img/acc-record_active.png",
            url: "/page/acc-record",
        },
        {
            name: "환경설정",
            image: "/asset/img/setting.png",
            active_image: "/asset/img/setting_active.png",
            url: "/page/setting",
        },
    ];
    const [wherePage, setWherePage] =
        useState<string>(pathName);

    return (
        <UseContext.Provider
            value={{
                nav_unit_items,
                wherePage,
                setWherePage,
            }}
        >
            {children}
        </UseContext.Provider>
    );
};
export default UseProvider;
