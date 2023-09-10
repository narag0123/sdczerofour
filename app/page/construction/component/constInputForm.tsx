"use client";
import { UseContext } from "@/app/store/store";
import React, {
    useContext,
    useEffect,
    useState,
} from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css"; // css import
import { IntlProvider } from "react-intl";
import { format } from "date-fns";

var localStorage: string;
const locale: string = "";

const ConstInputForm = () => {
    const context = useContext(UseContext);
    const { tunnel } = context;
    const [regionValue, setRegionValue] =
        useState<string>("분당구");
    const [placeValue, setPlaceValue] = useState<string[]>([
        "광장 지하차도",
    ]);

    const [startDate, setStartDate] = useState<Date>(
        new Date()
    );
    const [endDate, setEndDate] = useState<Date>(
        new Date()
    );
    const [toggleCalendar, setToggleCalendar] = useState<{
        tgStd: boolean;
        tgEnd: boolean;
    }>({
        tgStd: false,
        tgEnd: false,
    });

    useEffect(() => {
        const regionHandler = () => {
            const filteredTunnels = tunnel.filter(
                (item) => item.tunnel_region === regionValue
            );

            const subitems: string[] =
                filteredTunnels[0].subitems;
            setPlaceValue(
                subitems.sort((a, b) => a.localeCompare(b))
            );
        };
        regionHandler();
    }, [regionValue]);

    // useEffect(() => {

    // }, [])

    return (
        <>
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
                                    name="region"
                                    onChange={(e) => {
                                        setRegionValue(
                                            e.target.value
                                        );
                                    }}
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                    defaultValue={"분당구"}
                                >
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
                                    name="place"
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                    defaultValue={
                                        "화랑 지하차도"
                                    }
                                >
                                    <option disabled>
                                        지역을 먼저
                                        선택해주세요
                                    </option>
                                    {placeValue.map((e) => (
                                        <option
                                            value={e}
                                            key={e}
                                        >
                                            {e}
                                        </option>
                                    ))}
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
                                    readOnly
                                    value={`${format(
                                        startDate,
                                        "yyyy-MM-dd"
                                    )}`}
                                    onClick={() => {
                                        setToggleCalendar({
                                            ...toggleCalendar,
                                            tgStd: !toggleCalendar.tgStd,
                                        });
                                    }}
                                    id="startDate"
                                    name="startDate"
                                    className="cursor-pointer h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />

                                {/* TODO : 캘린더 숫자 클릭하면 다시 사라지게 */}
                                {/* 캘린더 */}
                                {toggleCalendar.tgStd && (
                                    <IntlProvider
                                        locale={"en"}
                                    >
                                        <Calendar
                                            locale="en"
                                            onChange={
                                                setStartDate
                                            }
                                            value={
                                                startDate
                                            }
                                        />
                                    </IntlProvider>
                                )}
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
                                    readOnly
                                    value={`${format(
                                        endDate,
                                        "yyyy-MM-dd"
                                    )}`}
                                    id="endDate"
                                    name="endDate"
                                    onClick={() => {
                                        setToggleCalendar({
                                            ...toggleCalendar,
                                            tgEnd: !toggleCalendar.tgEnd,
                                        });
                                    }}
                                    className="cursor-pointer h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
                                {toggleCalendar.tgEnd && (
                                    <IntlProvider
                                        locale={"en"}
                                    >
                                        <Calendar
                                            locale="en"
                                            onChange={
                                                setEndDate
                                            }
                                            value={endDate}
                                        />
                                    </IntlProvider>
                                )}
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
        </>
    );
};

export default ConstInputForm;
