"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
    lastURL: string;
};

const BtnDelete = ({ lastURL }: Props) => {
    const router = useRouter();

    const handleDelete = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();

        const confirm = window.confirm(
            "해당 이벤트를 삭제 하시겠습니까?"
        );

        if (confirm) {
            try {
                const res = await fetch(
                    `http://localhost:8081/api/v1/page/const-record/${lastURL}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        mode: "cors",
                    }
                );
                if (res.ok) {
                    // 리다이렉트 코드
                    router.push("/page/const-record");
                } else {
                    alert(
                        "삭제 실패 : 새로고침 후 다시 시도해 보세요"
                    );
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <button
            className="px-[20px] py-[10px] h-fit bg-[#ff0000] text-[#ffffff] rounded-[10px]
                                        hover:drop-shadow-[4px_4px_10px_rgba(255,0,0,0.25)]
                                        text-[12px]"
            onClick={handleDelete}
        >
            삭제하기
        </button>
    );
};

export default BtnDelete;
