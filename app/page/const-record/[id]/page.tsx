"use client";
import { usePathname } from "next/navigation";
import React, {
    useContext,
    useEffect,
    useState,
} from "react";
import BtnDelete from "./BtnDelete";
import BtnPatch from "./BtnPatch";
import ReadDetail from "./readDetail";
import PatchDetail from "./patchDetail";
import { UseContext } from "@/app/store/store";
import { ConstFileTable } from "@/app/store/type/TFetchData";
import { format } from "date-fns";
const PageDetail: React.FC = () => {
    const context = useContext(UseContext);
    const { wherePage, setWherePage } = context;
    const [isLoading, setIsLoading] =
        useState<boolean>(false);
    const pathName: string = usePathname();
    const lastURL: string =
        pathName.split("/")[pathName.split("/").length - 1];
    const [data, setData] = useState<
        ConstFileTable | undefined
    >();
    const [mode, setMode] = useState<string>("readMode");

    useEffect(() => {
        setWherePage("/page/const-record");
        setIsLoading(true);
        const fetchDetailData = async (
            url: string
        ): Promise<void> => {
            try {
                console.log(data);
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
                const result = await res.json();
                if (res.ok) {
                    const newResult = {
                        ...result,
                        startTime:
                            result.startTime === null
                                ? ""
                                : result.startTime,
                        endTime:
                            result.endTime === null
                                ? ""
                                : result.endTime,
                    };

                    setData(newResult);
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        fetchDetailData(lastURL);
    }, []);

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
                    isLoading={isLoading}
                />
            )}
        </main>
    );
};

export default PageDetail;
