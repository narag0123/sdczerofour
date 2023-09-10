"use client";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import BtnDelete from "./BtnDelete";
import BtnPatch from "./BtnPatch";

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

    // TODO - UI 완성하기 : 공사 등록이랑 유사하게 만들면됨.
    // TODO - UPDATE기능도 만들기
    return (
        <main className="construction flex-[0.8] bg-[#ffffff] rounded-[20px] p-[40px] scrollbar h-[calc(100vh-130px)]">
            <div className="flex justify-between">
                <h1 className="font-nl text-[20px] font-black h-[50px]">
                    세부 사항
                </h1>
                <div className="flex justify-center gap-[10px]">
                    <BtnDelete lastURL={lastURL} />
                    <BtnPatch lastURL={lastURL} />
                </div>
            </div>
            {/* 출동정보 */}
            <div className="border-t-[0.5px] border-t-[#D7D7D7] flex pt-[15px] pb-[30px]">
                <h2 className="flex-[0.25] font-nl font-[700] text-[18px]">
                    출동 정보
                </h2>
                {/* 오른쪽 유닛 */}
                <div className="flex-[0.75] flex flex-col gap-[30px]">
                    {/* 1열 */}
                    <div className="flex w-full gap-[20px] row1">
                        <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                            <label
                                htmlFor="writer"
                                className="text-[15px] font-bold"
                            >
                                작성자
                            </label>
                            <div className="h-[40px] py-[0px] ">
                                {data?.writer}
                            </div>
                        </div>
                        <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                            <label
                                htmlFor="dispatch"
                                className="text-[15px] font-bold"
                            >
                                출동인원
                            </label>
                            <div className="h-[40px] py-[0px] ">
                                {data?.dispatch}
                            </div>
                        </div>
                    </div>
                    {/* 2열 */}
                    <div className="flex w-full gap-[20px] row2">
                        <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                            <label
                                htmlFor="region"
                                className="text-[15px] font-bold"
                            >
                                지역
                            </label>
                            <div className="h-[40px] py-[0px] ">
                                {data?.region}
                            </div>
                        </div>
                        <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                            <label
                                htmlFor="place"
                                className="text-[15px] font-bold"
                            >
                                위치
                            </label>
                            <div className="h-[40px] py-[0px] ">
                                {data?.place}
                            </div>
                        </div>
                    </div>
                    {/* 3열 */}
                    <div className="flex w-full gap-[20px] row1">
                        <div className="input-unit flex flex-col w-[620px] gap-[5px]">
                            <label
                                htmlFor="placeDetail"
                                className="text-[15px] font-bold"
                            >
                                위치 추가 설명
                            </label>
                            <div className="h-[40px] py-[0px] ">
                                {data?.placeDetail}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 출동 시간 */}
            <div className="border-t-[0.5px] border-t-[#D7D7D7] flex py-[15px] pb-[30px]">
                <h2 className="flex-[0.25] font-nl font-[700] text-[18px]">
                    출동 시간
                </h2>
                {/* 오른쪽 유닛 */}
                <div className="flex-[0.75] flex flex-col gap-[30px]">
                    {/* 1열 */}
                    <div className="flex w-full gap-[20px] row1">
                        <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                            <label
                                htmlFor="startDate"
                                className="text-[15px] font-bold"
                            >
                                시작일
                            </label>

                            <div className="h-[40px] py-[0px] ">
                                {data?.startDate}
                            </div>

                            {/* TODO : 캘린더 숫자 클릭하면 다시 사라지게 */}
                            {/* 캘린더 */}
                        </div>
                        <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                            <label
                                htmlFor="startTime"
                                className="text-[15px] font-bold"
                            >
                                시작시간
                            </label>
                            <div className="h-[40px] py-[0px] ">
                                {data?.startTime}
                            </div>
                        </div>
                    </div>
                    {/* 2열 */}
                    <div className="flex w-full gap-[20px] row1">
                        <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                            <label
                                htmlFor="endDate"
                                className="text-[15px] font-bold"
                            >
                                종료일
                            </label>
                            <div className="h-[40px] py-[0px] ">
                                {data?.endDate}
                            </div>
                        </div>
                        <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                            <label
                                htmlFor="endTime"
                                className="text-[15px] font-bold"
                            >
                                종료시간
                            </label>
                            <div className="h-[40px] py-[0px] ">
                                {data?.endTime}
                            </div>
                        </div>
                    </div>

                    {/* <button>버튼임</button> */}
                </div>
            </div>
            {/* 업체 정보 */}
            <div className="border-t-[0.5px] border-t-[#D7D7D7] flex py-[15px] pb-[30px]">
                <h2 className="flex-[0.25] font-nl font-[700] text-[18px]">
                    업체 정보
                </h2>
                {/* 오른쪽 유닛 */}
                <div className="flex-[0.75] flex flex-col gap-[30px]">
                    {/* 1열 */}
                    <div className="flex w-full gap-[20px] row1">
                        <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                            <label
                                htmlFor="company"
                                className="text-[15px] font-bold"
                            >
                                업체명
                            </label>
                            <div className="h-[40px] py-[0px] ">
                                {data?.company}
                            </div>
                        </div>
                        <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                            <label
                                htmlFor="commander"
                                className="text-[15px] font-bold"
                            >
                                현장 책임자
                            </label>
                            <div className="h-[40px] py-[0px] ">
                                {data?.commander}
                            </div>
                        </div>
                    </div>
                    {/* 2열 */}
                    <div className="flex w-full gap-[20px] row1">
                        <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                            <label
                                htmlFor="workers"
                                className="text-[15px] font-bold"
                            >
                                작업 인원
                            </label>
                            <div className="h-[40px] py-[0px] ">
                                {data?.workers}
                            </div>
                        </div>
                        <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                            <label
                                htmlFor="equipment"
                                className="text-[15px] font-bold"
                            >
                                투입장비
                            </label>
                            <div className="h-[40px] py-[0px] ">
                                {data?.equipment}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 공사 내용 */}
            {/* TODO - 이미지 input받아야함 */}
            <div className="border-t-[0.5px] border-t-[#D7D7D7] flex py-[15px] pb-[30px]">
                <h2 className="flex-[0.25] font-nl font-[700] text-[18px]">
                    공사 내용
                </h2>
                {/* 오른쪽 유닛 */}
                <div className="flex-[0.75] flex flex-col gap-[30px]">
                    {/* 1열 */}
                    <div className="flex w-full gap-[20px] row1">
                        <div className="input-unit flex flex-col w-[620px] gap-[5px]">
                            <label
                                htmlFor="content"
                                className="text-[15px] font-bold"
                            >
                                개요 / 내용
                            </label>
                            <div className="h-[40px] py-[0px] ">
                                {data?.content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="w-full border-t-[0.5px] border-t-[#D7D7D7] flex py-[15px] pb-[30px]" />
            {/* 버튼임 */}
        </main>
    );
};

export default PageDetail;
