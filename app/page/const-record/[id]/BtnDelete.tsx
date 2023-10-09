"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
    lastURL: string;
};

const BtnDelete = ({
    lastURL,
}: Props): React.JSX.Element => {
    const router: AppRouterInstance = useRouter();

    const handleDelete = async (
        e: React.MouseEvent<HTMLButtonElement>
    ): Promise<void> => {
        e.preventDefault();

        const confirm: boolean = window.confirm(
            "해당 이벤트를 삭제 하시겠습니까?"
        );

        if (confirm) {
            try {
                const res: Response = await fetch(
                    `http://localhost:8081/api/v1/page/const-record/${lastURL}`,
                    {
                        method: "POST",
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
        // TODO: color Highligt에서 아래 rgba해결
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
