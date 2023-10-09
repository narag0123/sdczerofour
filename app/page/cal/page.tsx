"use client";
import { UseContext } from "@/app/store/store";
import { usePathname, useRouter } from "next/navigation";
import React, {
    useContext,
    useEffect,
    useState,
} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
    DateSelectArg,
    EventChangeArg,
    EventClickArg,
    EventContentArg,
    EventSourceInput,
} from "@fullcalendar/core";
import { addDays, format } from "date-fns";
import { ConstTable } from "@/app/store/type/TFetchData";

type ApiResponse = {
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
    constCreatedTime: string;
    constUpdatedTime: null;
};

type TtransformData = {
    id: number;
    title: string;
    start: string;
    end: string;
};

const Cal = () => {
    const context = useContext(UseContext);
    const { wherePage, setWherePage } = context;

    let pathName = usePathname();
    const router = useRouter();
    const getURL = `http://localhost:8081/api/v1/page/cal`;

    const [constData, setConstData] = useState<
        ConstTable[]
    >([]);
    const [patchData, setPatchData] = useState<
        ApiResponse | {}
    >({});

    // READ - const Table
    useEffect(() => {
        setWherePage(pathName);

        const fetchConstData = async (): Promise<void> => {
            try {
                const res = await fetch(getURL, {
                    method: "GET",
                    mode: "cors",
                });

                const result = await res.json();
                setConstData(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchConstData();
    }, []);

    const renderEventContent = (
        eventInfo: EventContentArg
    ) => {
        console.log(eventInfo.event.extendedProps);
        return (
            <>
                <b>{eventInfo.timeText}</b>
                {eventInfo.event.title ? (
                    <>
                        <div>{eventInfo.event.title}</div>
                    </>
                ) : (
                    <div>없음</div>
                )}
            </>
        );
    };

    const handleDateClick = (arg: EventClickArg) => {
        // bind with an arrow function

        const confirm: boolean = window.confirm(
            `${arg.event.title} 이벤트를 확인 하시겠습니까?`
        );

        if (confirm) {
            router.push(
                `/page/const-record/${arg.event.extendedProps.id}`
            );
        }
    };

    const handleDateSelect = (
        selectInfo: DateSelectArg
    ) => {
        let title = prompt(
            "Please enter a new title for your event"
        );
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection

        if (title) {
            calendarApi.addEvent({
                //  id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
            });
        }
    };

    // const table
    const transformData: EventSourceInput | undefined =
        constData?.map((e) => ({
            // backgroundColor: "#8dc6ff",
            borderColor: "#181818",
            textColor: "#000000",
            extendedProps: {
                id: e.id !== undefined && e.id.toString(),
            },
            title: e.place,
            start: e.startDate,
            end: format(
                addDays(new Date(e.endDate), 1),
                "yyyy-MM-dd"
            ),
        }));

    // PATCH
    const patchHandler = async (
        e: ConstTable
    ): Promise<void> => {
        try {
            const res = await fetch(
                `http://localhost:8081/api/v1/page/cal/${e.id}`,
                {
                    method: "PATCH",
                    body: JSON.stringify(e),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                }
            );

            const result = await res.json();
            console.log(e);
        } catch (error) {
            console.log(error);
        }
    };

    const eventChangeHandler = (
        changeInfo: EventChangeArg
    ): void => {
        const patchStartDate: string = format(
            changeInfo.event.start ?? new Date(),
            "yyyy-MM-dd"
        );
        const patchEndDate: string = format(
            addDays(changeInfo.event.end ?? new Date(), -1),
            `yyyy-MM-dd`
        );

        const findData: ConstTable | undefined =
            constData.find(
                (item) =>
                    item.id ===
                    parseInt(
                        changeInfo.event.extendedProps.id
                    )
            );

        const newPatchConstData: ConstTable = {
            ...(findData as ConstTable),
            startDate: patchStartDate,
            endDate: patchEndDate,
        };

        patchHandler(newPatchConstData);
    };

    return (
        <div className="flex-[0.8] h-[100vh]">
            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                ]}
                initialView="dayGridMonth"
                editable={true}
                selectable={false}
                selectMirror={true}
                dayMaxEvents={true}
                eventClick={handleDateClick}
                // select={handleDateSelect}
                eventContent={renderEventContent}
                events={transformData}
                eventChange={eventChangeHandler}
            />
        </div>
    );
};

export default Cal;
