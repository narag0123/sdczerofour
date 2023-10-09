"use client";
import { UseContext } from "@/app/store/store";
import React, {
    FormEventHandler,
    useContext,
    useEffect,
    useState,
} from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css"; // css import

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
    ConstFileTable,
    ConstTable,
    TData,
} from "@/app/store/type/TFetchData";

type Props = {
    data?: ConstFileTable | undefined;

    lastURL: string;
    setMode: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
};

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const PatchDetail: React.FC<Props> = ({
    data,
    lastURL,
    setMode,
    isLoading,
}) => {
    const context = useContext(UseContext);
    const { tunnel } = context;
    const router = useRouter();
    const [regionValue, setRegionValue] = useState<string>(
        data?.region == undefined ? "분당구" : data.region
    );
    const [placeValue, setPlaceValue] = useState<string[]>([
        data?.place == undefined
            ? "광장 지하차도"
            : data.place,
    ]);

    const [startDate, setStartDate] = useState<Value | any>(
        data === undefined
            ? new Date()
            : new Date(data?.startDate)
    );
    const [endDate, setEndDate] = useState<Value | any>(
        data === undefined
            ? new Date()
            : new Date(data?.endDate)
    );
    const [toggleCalendar, setToggleCalendar] = useState<{
        tgStd: boolean;
        tgEnd: boolean;
    }>({
        tgStd: false,
        tgEnd: false,
    });
    const [patchData, setPatchData] =
        useState<ConstFileTable>(data as ConstFileTable);

    useEffect(() => {
        console.log(patchData);
        console.log(data);
    }, [data]);

    // 지역변경
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
        setPatchData({
            ...patchData,
            place: placeValue[0],
            region: regionValue,
        });
        console.log(regionValue);
    }, [regionValue, placeValue]);

    // TODO : 위치 변경 안하고 다른것만 변경하면 regionValue[0] 으로 변환됨
    const onChangeHandler = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "file") {
            // img input
            const fileInput = e.target as HTMLInputElement;
            const fileList = fileInput.files
                ? Array.from(fileInput.files)
                : [];

            setPatchData({
                ...patchData,
                [name]: fileList,
            });
        } else {
            // img 없음
            setPatchData({
                ...patchData,
                [name]: value,
                region: regionValue,
            });
        }
        console.log(patchData);
    };

    // 날짜만 바꿔주기
    useEffect(() => {
        patchData !== undefined &&
            setPatchData({
                ...patchData,
                startDate: format(startDate, "yyyy-MM-dd"),
                endDate: format(endDate, "yyyy-MM-dd"),
            });
    }, [startDate, endDate]);

    const patchHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        if (patchData?.constFile !== undefined) {
            if (patchData.constFile.length > 0) {
                patchData.constFile.forEach((file) =>
                    formData.append("constFile", file)
                );
            }
        }

        patchData.id !== undefined &&
            formData.append("id", patchData.id.toString());

        formData.append(
            "writer",
            patchData.writer.toString()
        );
        formData.append(
            "dispatch",
            patchData.dispatch.toString()
        );
        formData.append(
            "place",
            patchData.place.toString()
        );
        formData.append(
            "placeDetail",
            patchData.placeDetail.toString()
        );
        formData.append(
            "startDate",
            patchData.startDate.toString()
        );

        formData.append(
            "startTime",
            patchData.startTime.toString()
        );
        formData.append(
            "endDate",
            patchData.endDate.toString()
        );

        formData.append(
            "endTime",
            patchData.endTime.toString()
        );
        formData.append(
            "company",
            patchData.company.toString()
        );
        formData.append(
            "commander",
            patchData.commander.toString()
        );
        formData.append(
            "workers",
            patchData.workers.toString()
        );
        formData.append(
            "equipment",
            patchData.equipment.toString()
        );
        formData.append(
            "content",
            patchData.content.toString()
        );
        formData.append(
            "region",
            patchData.region.toString()
        );

        const confirm =
            window.confirm("수정 하시겠습니까?");
        if (confirm) {
            try {
                const res = await fetch(
                    `http://localhost:8081/api/v1/page/const-record/${lastURL}`,
                    {
                        method: "PATCH",
                        body: formData,
                        mode: "cors",
                    }
                );
                const result = await res.json();
                console.log(res);

                if (res.ok) {
                    window.location.reload();
                } else {
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <form onSubmit={patchHandler}>
                {/* 출동정보 */}
                <div className="border-t-[0.5px] border-t-[#D7D7D7] flex pt-[15px] pb-[30px]">
                    <h2 className="flex-[0.25] font-nl font-[700] text-[18px]">
                        출동 정보
                    </h2>
                    {/* 오른쪽 유닛 */}
                    <div className="flex-[0.75] flex flex-col gap-[30px]">
                        {/* 1열 */}
                        <div className="flex w-full gap-[20px] row1">
                            <input
                                hidden
                                readOnly
                                id="id"
                                name="id"
                                value={lastURL}
                            />
                            <div className="input-unit flex flex-col w-[300px] gap-[5px]">
                                <label
                                    htmlFor="writer"
                                    className="text-[15px] font-bold"
                                >
                                    작성자
                                </label>
                                <input
                                    placeholder={
                                        data?.writer
                                    }
                                    id="writer"
                                    name="writer"
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={
                                        patchData?.writer
                                    }
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
                                    placeholder={
                                        data?.dispatch ===
                                        ""
                                            ? "없음"
                                            : data?.dispatch
                                    }
                                    id="dispatch"
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={
                                        patchData?.dispatch
                                    }
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
                                    id="region"
                                    name="region"
                                    onChange={(e) => {
                                        setRegionValue(
                                            e.target.value
                                        );
                                        onChangeHandler(e);
                                    }}
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                    defaultValue={
                                        regionValue
                                    }
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
                                    id="place"
                                    name="place"
                                    onChange={
                                        onChangeHandler
                                    }
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
                                    placeholder={
                                        data?.dispatch ===
                                        ""
                                            ? "작성된 내용이 없습니다"
                                            : data?.dispatch
                                    }
                                    id="placeDetail"
                                    name="placeDetail"
                                    value={
                                        patchData?.placeDetail
                                    }
                                    onChange={
                                        onChangeHandler
                                    }
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

                                {/* 캘린더 */}
                                {toggleCalendar.tgStd && (
                                    <div>
                                        <Calendar
                                            locale="en"
                                            onChange={
                                                setStartDate
                                            }
                                            value={
                                                startDate
                                            }
                                            onClickDay={() => {
                                                setToggleCalendar(
                                                    {
                                                        ...toggleCalendar,
                                                        tgStd: !toggleCalendar.tgStd,
                                                    }
                                                );
                                            }}
                                        />
                                    </div>
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
                                    placeholder={
                                        data?.startTime
                                            ? data?.startTime
                                            : "08:00"
                                    }
                                    id="startTime"
                                    name="startTime"
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={
                                        patchData?.startTime
                                            ? patchData?.startTime
                                            : ""
                                    }
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
                                    <div>
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
                                    </div>
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
                                    value={
                                        patchData?.endTime
                                            ? patchData?.endTime
                                            : ""
                                    }
                                    className="h-[40px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
                            </div>
                        </div>
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
                                    placeholder={
                                        data?.company === ""
                                            ? "예:ABC 테크"
                                            : data?.company
                                    }
                                    id="company"
                                    name="company"
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={
                                        patchData?.company
                                    }
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
                                    placeholder={
                                        data?.dispatch ===
                                        ""
                                            ? "예:김공사 과장 (010-1234-5678)"
                                            : data?.dispatch
                                    }
                                    id="commander"
                                    name="commander"
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={
                                        patchData?.commander
                                    }
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
                                    placeholder={
                                        data?.dispatch ===
                                        ""
                                            ? "예:3명"
                                            : data?.dispatch
                                    }
                                    id="workers"
                                    name="workers"
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={
                                        patchData?.workers
                                    }
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
                                    placeholder={
                                        data?.dispatch ===
                                        ""
                                            ? "예:고소작업차 2대"
                                            : data?.dispatch
                                    }
                                    id="equipment"
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={
                                        patchData?.equipment
                                    }
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
                                    onChange={
                                        onChangeHandler
                                    }
                                    value={
                                        patchData?.content
                                    }
                                    className="h-[140px] p-[10px] focus:outline-[#000000] border-[0.5px] rounded-md"
                                />
                                <label
                                    htmlFor="content"
                                    className="text-[15px] font-bold"
                                >
                                    사진 첨부
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
                        className="w-[160px] h-[35px] bg-point text-[#ffffff] rounded-[10px]
                                            hover:drop-shadow-[4px_4px_10px_rgba(27,95,235,0.25)]"
                        type="submit"
                    >
                        수정하기
                    </button>
                </div>
            </form>
        </>
    );
};

export default PatchDetail;
