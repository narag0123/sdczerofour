import React from "react";

const Construction = () => {
    return (
        <main className="construction flex-[0.8] bg-[#ffffff] rounded-[20px] p-[40px] scrollbar h-[calc(100vh-130px)]">
            <h1 className="font-nl text-[20px] font-black h-[80px]">
                공사 등록하기
            </h1>
            <form
                action="http://localhost:8081/api/v1/page/construction"
                method="post"
            >
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
                                <input
                                    placeholder="이름"
                                    id="writer"
                                    name="writer"
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
                            </div>
                            <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                                <label
                                    htmlFor="dispatch"
                                    className="text-[15px] font-bold"
                                >
                                    출동인원
                                </label>
                                <input
                                    placeholder="이름1, 이름2, 이름3"
                                    id="dispatch"
                                    // 수정
                                    name="dispatch"
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
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
                                <select
                                    placeholder="이름"
                                    id="region"
                                    // 수정
                                    name="region"
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                >
                                    <option
                                        disabled
                                        selected
                                        value=""
                                    >
                                        지역선택
                                    </option>
                                    <option
                                        value={"분당구"}
                                    >
                                        분당구
                                    </option>
                                    <option
                                        value={"중원구"}
                                    >
                                        중원구
                                    </option>
                                    <option
                                        value={"수정구"}
                                    >
                                        수정구
                                    </option>
                                </select>
                            </div>
                            <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                                <label
                                    htmlFor="place"
                                    className="text-[15px] font-bold"
                                >
                                    위치
                                </label>
                                <select
                                    placeholder="이름"
                                    id="place"
                                    // 수정
                                    name="place"
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                >
                                    <option
                                        disabled
                                        selected
                                        value=""
                                    >
                                        위치 선택
                                    </option>
                                    <option
                                        value={"분당구"}
                                    >
                                        맵으로 조건 걸것
                                    </option>
                                </select>
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
                                <input
                                    placeholder="서울방향 출구부 1차선"
                                    id="placeDetail"
                                    name="placeDetail"
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
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
                                <input
                                    placeholder="2023.01.01"
                                    id="startDate"
                                    name="startDate"
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
                            </div>
                            <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                                <label
                                    htmlFor="startTime"
                                    className="text-[15px] font-bold"
                                >
                                    시작시간
                                </label>
                                <input
                                    placeholder="08:00"
                                    id="startTime"
                                    // 수정
                                    name="startTime"
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
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
                                <input
                                    placeholder="2023.01.01"
                                    id="endDate"
                                    name="endDate"
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
                            </div>
                            <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                                <label
                                    htmlFor="endTime"
                                    className="text-[15px] font-bold"
                                >
                                    종료시간
                                </label>
                                <input
                                    placeholder="17:00"
                                    id="endTime"
                                    // 수정
                                    name="endTime"
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
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
                                <input
                                    placeholder="ABC 테크"
                                    id="company"
                                    name="company"
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
                            </div>
                            <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                                <label
                                    htmlFor="commander"
                                    className="text-[15px] font-bold"
                                >
                                    현장 책임자
                                </label>
                                <input
                                    placeholder="김공사 과장 (010-1234-5678)"
                                    id="commander"
                                    name="commander"
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
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
                                <input
                                    placeholder="3명"
                                    id="workers"
                                    name="workers"
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
                            </div>
                            <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                                <label
                                    htmlFor="equipment"
                                    className="text-[15px] font-bold"
                                >
                                    투입장비
                                </label>
                                <input
                                    placeholder="고소작업차 2대"
                                    id="equipment"
                                    // 수정
                                    name="equipment"
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
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
                                <textarea
                                    placeholder="전등선로공사"
                                    id="content"
                                    name="content"
                                    className="h-[140px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="w-full border-t-[0.5px] border-t-[#D7D7D7] flex py-[15px] pb-[30px]" />
                {/* 버튼임 */}
                <div className="w-full flex justify-center">
                    <button
                        className="w-[160px] h-[35px] bg-point text-[#ffffff] rounded-[10px]
                                        hover:drop-shadow-[4px_4px_10px_rgba(27,95,235,0.25)]"
                    >
                        등록하기
                    </button>
                </div>
            </form>
        </main>
    );
};

export default Construction;
