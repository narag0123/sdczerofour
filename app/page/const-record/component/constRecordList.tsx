"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import magnification from "public/asset/img/magnifyingglass.png";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

interface Data {
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

const ConstRecordList = () => {
    const [data, setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFocused, setIsFocused] = useState(false);
    const [pageQuery, setPageQuery] = useState<number>(1);
    const [numOfPages, setNumOfPages] = useState<number>(1);
    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        setLoading(true);
        const fetchData = async (
            pageQuery: number
        ): Promise<void> => {
            try {
                const res = await fetch(
                    `http://localhost:8081/api/v1/page/const-record?page=${pageQuery}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                    }
                );
                const pageData = await res.json();
                setData(pageData.content);
                setNumOfPages(pageData.totalPages);
                console.log(pageData);

                console.log(pageData.content);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData(pageQuery - 1);
    }, [pageQuery]);

    const pageArr = (): number[] => {
        let returnArr: number[] = [];
        for (var i: number = 0; i < numOfPages; i++) {
            returnArr.push(i);
        }
        return returnArr;
    };

    return (
        <div>
            {/* 검색 바 */}
            <div className="search-bar w-full h-[60px] bg-[#ededed] rounded-[10px] p-[10px] mb-[25px]">
                <div
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    className={`flex px-[15px] py-[10px] w-[250px] h-[40px] bg-[#fdfdfd] items-center
                             rounded-[10px]  ${
                                 !isFocused &&
                                 "drop-shadow-[_2px_2px_10px_rgba(0,0,0,0.1)]"
                             }`}
                >
                    <Image
                        className="w-[15px] object-contain"
                        src={magnification}
                        alt="magnifyingglass.png"
                    />
                    <input
                        placeholder="Search..."
                        className="bg-[#fdfdfd] placeholder:text-[15px] w-full text-[15px] px-[10px]
                        focus:outline-none "
                    />
                </div>
            </div>

            {/* 표 데이터 */}
            <table className="w-full text-[15px] font-nl font-normal">
                <thead className="w-full">
                    <tr
                        className="flex w-full text-center mb-[30px] h-[46px] bg-[#ededed] rounded-[10px]
                                items-center"
                    >
                        <th className="flex-[0.1]">번호</th>
                        <th className="flex-[0.15]">
                            날짜
                        </th>
                        <th className="flex-[0.2]">위치</th>
                        <th className="flex-[0.05]">
                            작성자
                        </th>

                        <th className="flex-[0.2]">
                            업체명
                        </th>
                        <th className="flex-[0.3]">
                            개요/내용
                        </th>
                        <th className="flex-[0.1]">
                            진행상태
                        </th>
                    </tr>
                </thead>
                <tbody className="w-full scrollbar">
                    {!loading &&
                        data?.map((e) => (
                            <tr
                                className="flex w-full text-center items-center mb-[40px]"
                                key={e.id}
                                onClick={() => {
                                    router.push(
                                        `/page/const-record/${e.id}`
                                    );
                                }}
                            >
                                <td className="flex-[0.1]">
                                    {e.id}
                                </td>
                                <td className="flex-[0.15] flex flex-col items-center">
                                    <p>
                                        {e.startDate?.toString()}{" "}
                                    </p>
                                    {e.startDate.toString() !==
                                        e.endDate && (
                                        <p>
                                            {e.endDate?.toString()}
                                        </p>
                                    )}
                                </td>
                                <td className="flex-[0.2]">
                                    {e.place}
                                </td>

                                <td className="flex-[0.05]">
                                    {e.writer}
                                </td>

                                <td className="flex-[0.2]">
                                    {e.company}
                                </td>

                                <td className="flex-[0.3]">
                                    {e.content}
                                </td>
                                <td className="flex-[0.1]">
                                    진행중
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* 페이지 인덱스 */}
            <div>
                <hr className="border-[#000000]" />
                <div className="flex justify-center items-center gap-[10px] p-[10px] mt-[10px]">
                    {/* TODO: Page Index 만들기 */}
                    <span className="px-[5px]">{"<<"}</span>
                    <span className="pr-[15px]">{"<"}</span>
                    {pageArr().map((e) => (
                        <div
                            key={e}
                            className="cursor-pointer font-nl font-normal text-[18px]"
                            onClick={() => {
                                setPageQuery(e + 1);
                            }}
                        >
                            {e + 1}
                        </div>
                    ))}
                    <span className="pl-[15px]">{">"}</span>
                    <span className="px-[5px]">{">>"}</span>
                </div>
            </div>
        </div>
    );
};

export default ConstRecordList;
