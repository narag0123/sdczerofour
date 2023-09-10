"use client";
import { UseContext } from "@/app/store/store";
import React, { useContext } from "react";
import ConstRecordList from "./component/constRecordList";

const ConstRecord = () => {
    const context = useContext(UseContext);
    const { tunnel } = context;

    return (
        <main className="construction flex-[0.8] bg-[#ffffff] rounded-[20px] p-[40px] scrollbar h-[calc(100vh-130px)]">
            <h1 className="font-nl text-[20px] font-black h-[80px]">
                <p className="mb-[20px]">공사 기록</p>
                <ConstRecordList />
            </h1>
        </main>
    );
};

export default ConstRecord;
