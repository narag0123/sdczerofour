import {
    ConstFileTable,
    ConstTable,
} from "@/app/store/type/TFetchData";
import React from "react";

type Props = {
    data: ConstFileTable | undefined;
};

const ReadDetail: React.FC<Props> = ({ data }) => {
    return (
        <>
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
                            <label
                                htmlFor="file"
                                className="text-[15px] font-bold"
                            >
                                사진첨부
                            </label>
                            {data?.fileAttached === 0 ? (
                                <div>사진 없음</div>
                            ) : (
                                <div
                                    className="file w-full grid grid-cols-3 gap-[10px]"
                                    id="file"
                                >
                                    {data?.storedFileName !==
                                        undefined &&
                                        data.storedFileName.map(
                                            (e) => (
                                                <React.Fragment
                                                    key={e}
                                                >
                                                    <a
                                                        href={`http://localhost:8081/img/${e}`}
                                                        target="_blank"
                                                    >
                                                        <img
                                                            className="w-[200px] h-[150px] object-cover rounded-xl"
                                                            src={
                                                                data &&
                                                                `http://localhost:8081/img/${e}`
                                                            }
                                                            alt="이미지"
                                                        />
                                                    </a>
                                                </React.Fragment>
                                            )
                                        )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReadDetail;
