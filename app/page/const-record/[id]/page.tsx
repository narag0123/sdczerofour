"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import BtnDelete from "./BtnDelete";
import BtnPatch from "./BtnPatch";
import ReadDetail from "./readDetail";
import PatchDetail from "./patchDetail";

interface getData {
    id: number;
    writer: string;
    dispatch: string;
    region: string;
    place: string;
    placeDetail: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    company: string;
    commander: string;
    workers: string;
    equipment: string;
    content: string;
}

const PageDetail: React.FC = () => {
    const pathName = usePathname();
    const lastURL =
        pathName.split("/")[pathName.split("/").length - 1];
    const [data, setData] = useState<getData | undefined>();
    const [mode, setMode] = useState<string>("readMode");

    useEffect(() => {
        const fetchData = async (url: string) => {
            try {
                const res = await fetch(
                    `http://localhost:8081/api/v1/page/const-record/${lastURL}?lastURL=${lastURL}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        mode: "cors",
                    }
                );

                const pageData = await res.json();
                setData(pageData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData(lastURL);
    }, []);

    // TODO - UPDATE기능도 만들기
    return (
        <main className="construction flex-[0.8] bg-[#ffffff] rounded-[20px] p-[40px] scrollbar h-[calc(100vh-130px)]">
            <div className="flex justify-between">
                <h1 className="font-nl text-[20px] font-black h-[50px]">
                    세부 사항
                </h1>
                <div className="flex justify-center gap-[10px]">
                    {mode === "readMode" && (
                        <BtnPatch
                            lastURL={lastURL}
                            mode={mode}
                            setMode={setMode}
                        />
                    )}

                    <BtnDelete lastURL={lastURL} />
                </div>
            </div>
            {mode === "readMode" ? (
                <ReadDetail data={data} />
            ) : (
                <PatchDetail
                    data={data}
                    lastURL={lastURL}
                    setMode={setMode}
                />
            )}
        </main>
    );
};

export default PageDetail;
