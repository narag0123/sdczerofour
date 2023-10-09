"use client";
import { UseContext } from "@/app/store/store";
import React, {
    FormEvent,
    useContext,
    useEffect,
    useState,
} from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css"; // css import
import { IntlProvider } from "react-intl";
import { format } from "date-fns";
import { TData } from "@/app/store/type/TFetchData";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

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
    const [startDate, setStartDate] = useState<Date | any>(
        new Date()
    );
    const [endDate, setEndDate] = useState<Date | any>(
        new Date()
    );
    const [data, setData] = useState<TData>({
        writer: "",
        dispatch: "",
        region: "",
        place: placeValue[0],
        placeDetail: "",
        startDate: format(startDate, "yyyy-MM-dd"),
        startTime: "",
        endDate: format(endDate, "yyyy-MM-dd"),
        endTime: "",
        company: "",
        commander: "",
        workers: "",
        equipment: "",
        content: "",
        hits: "0",
        constFile: [],
    });

    const [toggleCalendar, setToggleCalendar] = useState<{
        tgStd: boolean;
        tgEnd: boolean;
    }>({
        tgStd: false,
        tgEnd: false,
    });

    const postURL: string =
        "http://localhost:8081/api/v1/page/construction";
    const router: AppRouterInstance = useRouter();

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

        setData({
            ...data,
            place: placeValue[0],
            region: regionValue,
        });
        console.log(regionValue);
        console.log(data);
    }, [regionValue, placeValue]);

    const onSubmitHandler = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        // patch code
        e.preventDefault();

        let formData = new FormData();

        if (data.constFile !== undefined) {
            if (data.constFile.length > 0) {
                data.constFile.forEach((file) => {
                    formData.append("constFile", file);
                });
            }
        }

        formData.append("writer", data.writer);
        formData.append("dispatch", data.dispatch);
        formData.append("place", data.place);
        formData.append("placeDetail", data.placeDetail);
        formData.append("startDate", data.startDate);
        formData.append("startTime", data.startTime);
        formData.append("endDate", data.endDate);
        formData.append("endTime", data.endTime);
        formData.append("company", data.company);
        formData.append("commander", data.commander);
        formData.append("workers", data.workers);
        formData.append("equipment", data.equipment);
        formData.append("content", data.content);
        formData.append("region", data.region);
        formData.append("hits", data.hits.toString());

        // -> formData는 console안찍혀서 이렇게 해야 찍힘
        for (let key of formData.keys()) {
            console.log(key);
        }

        for (let value of formData.values()) {
            console.log(value);
        }
        // <-

        try {
            const res = await fetch(postURL, {
                method: "POST",
                body: formData,
                mode: "cors",
            });
            const result = await res.json();
            console.log(result);
            console.log(res);
            if (res.ok) {
                router.push("/page/const-record");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const onChangeHandler = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        e.preventDefault();

        const { name, value, type } = e.target;

        if (type === "file") {
            // img input 처리
            const fileInput = e.target as HTMLInputElement;
            const fileList = fileInput.files
                ? Array.from(fileInput.files)
                : [];

            setData({
                ...data,
                [name]: fileList,
            });
        } else {
            // text input처리
            setData({
                ...data,
                [name]: value,
            });
        }

        console.log(data);
    };

    useEffect(() => {
        // 날짜만 업데이트 하는 함수
        setData({
            ...data,
            startDate: format(startDate, "yyyy-MM-dd"),
            endDate: format(endDate, "yyyy-MM-dd"),
        });
    }, [startDate, endDate]);

    return (
        <>
            <form onSubmit={onSubmitHandler}>
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
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={data.writer}
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
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={data.dispatch}
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
                                        onChangeHandler(e);
                                    }}
                                    // value={data.region}
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
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={data.place}
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
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={data.placeDetail}
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
                                    onChange={
                                        onChangeHandler
                                    }
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

                                {/* 캘린더 */}
                                {toggleCalendar.tgStd && (
                                    <Calendar
                                        locale="en"
                                        onChange={
                                            setStartDate
                                        }
                                        value={startDate}
                                        onClickDay={() => {
                                            setToggleCalendar(
                                                {
                                                    ...toggleCalendar,
                                                    tgStd: !toggleCalendar.tgStd,
                                                }
                                            );
                                        }}
                                    />
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
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={data.startTime}
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
                                    onChange={
                                        onChangeHandler
                                    }
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
                                    <Calendar
                                        locale="en"
                                        onChange={
                                            setEndDate
                                        }
                                        value={endDate}
                                        onClickDay={() => {
                                            setToggleCalendar(
                                                {
                                                    ...toggleCalendar,
                                                    tgEnd: !toggleCalendar.tgEnd,
                                                }
                                            );
                                        }}
                                    />
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
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={data.endTime}
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
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={data.company}
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
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={data.commander}
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
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={data.workers}
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
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={data.equipment}
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
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={data.content}
                                    className="h-[140px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
                                <label
                                    htmlFor="constFile"
                                    className="text-[15px] font-bold"
                                >
                                    사진첨부
                                </label>
                                <input
                                    placeholder="사진을 첨부해 주세요"
                                    type="file"
                                    id="constFile"
                                    name="constFile"
                                    onChange={
                                        onChangeHandler
                                    }
                                    multiple
                                    className="h-[50px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="w-full border-t-[0.5px] border-t-[#D7D7D7] flex py-[15px] pb-[30px]" />
                {/* 버튼임 */}
                <div className="w-full flex justify-center">
                    <button
                        type="submit"
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
