"use client";
import React, { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { UseContext } from "../store/store";

const Main = () => {
    const context = useContext(UseContext);
    const { wherePage, setWherePage } = context;

    let pathName = usePathname();

    useEffect(() => {
        setWherePage(pathName);
    }, []);

    return (
        <div className="w-full h-full flex flex-col gap-[20px] ">
            {/* 메인 1열 */}
            <div className="flex gap-[25px] w-full">
                {/* 이번달 지역별 발생 건 */}
                <div className="box-border flex-[0.4] h-[190px] bg-[#FDFDFD] rounded-[20px] py-[20px] px-[30px]">
                    <h1 className="font-nl font-black text-[20px]">
                        이번달 지역별 발생 건
                    </h1>
                    <hr className="w-full border-[#C0C0C0] my-[18px]" />
                    <div className="flex justify-beween gap-[90px]">
                        <div className="flex flex-col items-center">
                            <div className="font-nl font-black text-[48px] leading-[48px]">
                                20
                            </div>
                            <div className="font-nl text-[15px]">
                                분당구
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="font-nl font-black text-[48px] leading-[48px]">
                                7
                            </div>
                            <div className="font-nl text-[15px]">
                                중원구
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="font-nl font-black text-[48px] leading-[48px]">
                                3
                            </div>
                            <div className="font-nl text-[15px]">
                                수정구
                            </div>
                        </div>
                    </div>
                </div>
                {/* 현재 진행 중 */}
                <div className="flex-[0.6] h-[190px] bg-[#FDFDFD] rounded-[20px] scrollbar py-[20px] px-[30px]">
                    <h1 className="font-nl font-black text-[20px] mb-[10px]">
                        현재 진행중
                    </h1>
                    <div className="w-full h-full flex flex-col gap-[10px]">
                        <div className="card-unit p-[20px] w-full bg-[#E8EDF3] h-[56px] rounded-[10px] flex justify-between items-center">
                            <div className="font-bold">
                                여수 터널
                            </div>
                            <div>등교체 공사</div>
                        </div>
                        <div className="card-unit p-[20px] w-full bg-[#E8EDF3] h-[56px] rounded-[10px] flex justify-between items-center">
                            <div className="font-bold">
                                시흥 지하차도
                            </div>
                            <div>차량 사고 출동</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 메인 2열 */}
            <div className="w-full">
                {/* 연간 발생 추이 */}
                <div className="w-full h-[300px] bg-[#FDFDFD] rounded-[20px] py-[20px] px-[30px]">
                    <h1 className="font-nl font-black text-[20px] mb-[10px]">
                        연간 발생 추이
                    </h1>
                    <hr className="w-full border-[#C0C0C0] my-[18px]" />
                    {/* 차트 부분 */}
                    <div className="chart flex w-full h-[190px] items-end justify-center gap-[30px] ">
                        {/* 차트의 각 유닛 */}
                        <div className="unit-month flex flex-col items-center justify-end gap-[16px] h-full">
                            <div className="w-[50px] h-full flex items-end">
                                <div className="bg-black20 h-[50%] w-full rounded-[10px]"></div>
                            </div>
                            <div className="font-nl font-bold">
                                1월
                            </div>
                        </div>
                        <div className="unit-month flex flex-col items-center justify-end gap-[16px] h-full">
                            <div className="w-[50px] h-full flex items-end">
                                <div className="bg-black20 h-[20%] w-full rounded-[10px]"></div>
                            </div>
                            <div className="font-nl font-bold">
                                2월
                            </div>
                        </div>
                        <div className="unit-month flex flex-col items-center justify-end gap-[16px] h-full">
                            <div className="w-[50px] h-full flex items-end">
                                <div className="bg-black20 h-[100%] w-full rounded-[10px]"></div>
                            </div>
                            <div className="font-nl font-bold">
                                3월
                            </div>
                        </div>
                        <div className="unit-month flex flex-col items-center justify-end gap-[16px] h-full">
                            <div className="w-[50px] h-full flex items-end">
                                <div className="bg-black20 h-[90%] w-full rounded-[10px]"></div>
                            </div>
                            <div className="font-nl font-bold">
                                4월
                            </div>
                        </div>
                        <div className="unit-month flex flex-col items-center justify-end gap-[16px] h-full">
                            <div className="w-[50px] h-full flex items-end">
                                <div className="bg-black20 h-[80%] w-full rounded-[10px]"></div>
                            </div>
                            <div className="font-nl font-bold">
                                5월
                            </div>
                        </div>
                        <div className="unit-month flex flex-col items-center justify-end gap-[16px] h-full">
                            <div className="w-[50px] h-full flex items-end">
                                <div className="bg-black20 h-[70%] w-full rounded-[10px]"></div>
                            </div>
                            <div className="font-nl font-bold">
                                6월
                            </div>
                        </div>
                        <div className="unit-month flex flex-col items-center justify-end gap-[16px] h-full">
                            <div className="w-[50px] h-full flex items-end">
                                <div className="bg-black20 h-[30%] w-full rounded-[10px]"></div>
                            </div>
                            <div className="font-nl font-bold">
                                7월
                            </div>
                        </div>
                        <div className="unit-month flex flex-col items-center justify-end gap-[16px] h-full">
                            <div className="w-[50px] h-full flex items-end">
                                <div className="bg-black20 h-[20%] w-full rounded-[10px]"></div>
                            </div>
                            <div className="font-nl font-bold">
                                8월
                            </div>
                        </div>
                        <div className="unit-month flex flex-col items-center justify-end gap-[16px] h-full">
                            <div className="w-[50px] h-full flex items-end">
                                <div className="bg-black20 h-[90%] w-full rounded-[10px]"></div>
                            </div>
                            <div className="font-nl font-bold">
                                9월
                            </div>
                        </div>
                        <div className="unit-month flex flex-col items-center justify-end gap-[16px] h-full">
                            <div className="w-[50px] h-full flex items-end">
                                <div className="bg-black20 h-[90%] w-full rounded-[10px]"></div>
                            </div>
                            <div className="font-nl font-bold">
                                10월
                            </div>
                        </div>
                        <div className="unit-month flex flex-col items-center justify-end gap-[16px] h-full">
                            <div className="w-[50px] h-full flex items-end">
                                <div className="bg-black20 h-[0%] w-full rounded-[10px]"></div>
                            </div>
                            <div className="font-nl font-bold">
                                11월
                            </div>
                        </div>
                        <div className="unit-month flex flex-col items-center justify-end gap-[16px] h-full">
                            <div className="w-[50px] h-full flex items-end">
                                <div className="bg-black20 h-[40%] w-full rounded-[10px]"></div>
                            </div>
                            <div className="font-nl font-bold">
                                12월
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 메인 3열 */}
            <div className="w-full">
                {/* 최근 발생 건 */}
                <div className="w-full h-[200px] bg-[#FDFDFD] rounded-[20px] scrollbar py-[20px] px-[30px]">
                    <h1 className="font-nl font-black text-[20px] mb-[10px]">
                        최근 발생 건
                    </h1>
                    <table className="w-full">
                        <thead>
                            <tr className="h-[45px] border-y-[0.5px] border-y-black20">
                                <th>이름</th>
                                <th>위치</th>
                                <th>날짜</th>
                                <th>시간</th>
                                <th>개요</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            <tr className="h-[45px]">
                                <td>장지영</td>
                                <td>여수터널</td>
                                <td>2023.01.01</td>
                                <td>17:00</td>
                                <td>등 교체 공사</td>
                                <td>진행중</td>
                            </tr>
                            <tr className="h-[45px]">
                                <td>김기태</td>
                                <td>둔촌터널</td>
                                <td>2023.10.10</td>
                                <td>08:00</td>
                                <td>준설 공사</td>
                                <td>일시 정지</td>
                            </tr>
                            <tr className="h-[45px]">
                                <td>김기태</td>
                                <td>둔촌터널</td>
                                <td>2023.10.10</td>
                                <td>08:00</td>
                                <td>준설 공사</td>
                                <td>종료</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Main;
