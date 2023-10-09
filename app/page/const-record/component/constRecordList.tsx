"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import magnification from "public/asset/img/magnifyingglass.png";
import { useRouter } from "next/navigation";
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
    hits: number;
}

type TNumberOfPage = {
    total: number;
    quotient: number;
    remainder: number;
};

// TODO : SEARCH FILTER 만들기
const ConstRecordList = (): React.JSX.Element => {
    const [data, setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFocused, setIsFocused] = useState(false);

    const router: AppRouterInstance = useRouter();

    const [pageArr, setPageArr] = useState<number[]>();
    const [queryParams, setQueryParams] = useState({
        page: 0,
        size: 10,
    });
    const [pageInfo, setPageInfo] = useState<any>();

    const fetchURL = `http://localhost:8081/api/v1/page/const-record?page=${queryParams.page}&size=${queryParams.size}`;

    useEffect(() => {
        setLoading(true);
        const fetchData = async (): Promise<void> => {
            try {
                const res = await fetch(fetchURL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await res.json();
                setData(result.content);
                setPageInfo(result);
                console.log(result);
                console.log(pageInfo);

                setPageArr(
                    Array.from(
                        Array(result.totalPages).keys()
                    )
                );

                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [queryParams]);

    const sendQueryHandler = (
        dist: string,
        e: number
    ): void => {
        // SIZE
        if (dist === "size") {
            setQueryParams({
                ...queryParams,
                size: e,
            });
        }

        // PAGE
        if (dist === "page") {
            setQueryParams({
                ...queryParams,
                page: e,
            });
        }
    };

    // 페이지 번호 생성 함수
    // const pageArr = (e: number, tot: number) => {
    //     const returnArr: number[] = [];
    //     var j: number = Math.floor((e - 1) / 10) * 10;
    //     var t: number = Math.floor(tot / 10) * 10;
    //     var r: number = e % 10;
    //     var fr: number = t % 10;

    //     // 마지막 페이지 확인
    //     if (j >= t) {
    //         // 마지막 페이지
    //         for (var i = j; i < tot; i++) {
    //             returnArr.push(i);
    //         }
    //     } else {
    //         // 마지막 페이지 아닌 나머지 페이지들
    //         for (var i = j; i < j + 10; i++) {
    //             returnArr.push(i);
    //         }
    //     }

    //     return returnArr;
    // };

    // const fastForwardHandler = () => {
    //     if (pageQuery % 10 === 0) {
    //         // 10, 20, 30...인경우
    //         setPageQuery(pageQuery + 1 - (pageQuery % 10));
    //     } else if (
    //         Math.floor(pageQuery / 10) ===
    //         Math.floor(numOfPages.total / 10)
    //     ) {
    //         // 마지막 페이지인 경우
    //         null;
    //     } else if (pageQuery < numOfPages.total) {
    //         // 일반적 경우
    //         setPageQuery(pageQuery + 11 - (pageQuery % 10));
    //     } else {
    //         null;
    //     }
    // };

    // const fastBackwardHandler = () => {
    //     if (pageQuery % 10 === 0 && pageQuery !== 10) {
    //         // 20, 30...인경우
    //         setPageQuery(pageQuery - (pageQuery % 10) - 19);
    //     } else if (pageQuery <= 10) {
    //         // 1~10인경우
    //         setPageQuery(1);
    //     } else {
    //         // 그외 일반적 경우
    //         pageQuery > 1 &&
    //             setPageQuery(
    //                 pageQuery - (pageQuery % 10) - 9
    //             );
    //     }
    // };

    return (
        <div>
            {/* 검색 바 */}
            <div className="search-bar w-full h-[60px] bg-[#ededed] rounded-[10px] p-[10px] mb-[25px] flex justify-between">
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
                <select
                    className="text-[12px] font-nl font-normal p-3 rounded-sm"
                    defaultValue={10}
                    onChange={(e) => {
                        sendQueryHandler(
                            "size",
                            Number(e.target.value)
                        );
                    }}
                >
                    <option
                        className="text-[12px]"
                        value={5}
                    >
                        5개씩 보기
                    </option>
                    <option
                        className="text-[12px]"
                        value={10}
                    >
                        10개씩 보기
                    </option>
                    <option
                        className="text-[12px]"
                        value={20}
                    >
                        20개씩 보기
                    </option>
                </select>
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
                                className="flex w-full text-center items-center mb-[40px] cursor-pointer"
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
                                    {e.startDate?.toString() !==
                                        e?.endDate && (
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
                <div className="flex justify-center items-center gap-[20px] p-[10px] mt-[10px]">
                    <span className="px-[5px] cursor-pointer">
                        {"<<"}
                    </span>
                    <span
                        className="pr-[15px] cursor-pointer"
                        onClick={() => {
                            !pageInfo?.first &&
                                sendQueryHandler(
                                    "page",
                                    queryParams.page - 1
                                );
                        }}
                    >
                        {"<"}
                    </span>

                    {pageArr?.map((e) => (
                        <button
                            key={e}
                            className={`cursor-pointer font-nl font-normal`}
                            onClick={() => {
                                sendQueryHandler("page", e);
                            }}
                        >
                            {e + 1}
                        </button>
                    ))}
                    <span
                        className="pl-[15px] cursor-pointer"
                        onClick={() => {
                            !pageInfo?.last &&
                                sendQueryHandler(
                                    "page",
                                    queryParams.page + 1
                                );
                        }}
                    >
                        {">"}
                    </span>
                    <span
                        className="px-[5px] cursor-pointer"
                        onClick={() => {
                            !pageInfo?.last &&
                                sendQueryHandler(
                                    "page",
                                    queryParams.page + 10
                                );
                        }}
                    >
                        {">>"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ConstRecordList;
