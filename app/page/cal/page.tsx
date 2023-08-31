"use client";
import { UseContext } from "@/app/store/store";
import { usePathname } from "next/navigation";
import React, {
    useContext,
    useEffect,
    useState,
} from "react";

const Cal = () => {
    const context = useContext(UseContext);
    const { wherePage, setWherePage } = context;

    let pathName = usePathname();

    useEffect(() => {
        setWherePage(pathName);
    }, []);

    return <div>Cal</div>;
};

export default Cal;
