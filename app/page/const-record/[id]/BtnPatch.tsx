import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
    lastURL: string;
    mode: string;
    setMode: React.Dispatch<React.SetStateAction<string>>;
};

const BtnPatch: React.FC<Props> = ({
    lastURL,
    mode,
    setMode,
}) => {
    const router: AppRouterInstance = useRouter();

    const handlePatch = async (
        e: React.MouseEvent<HTMLButtonElement>
    ): Promise<void> => {
        e.preventDefault();
        setMode("patchMode");
    };

    return (
        <button
            className="px-[20px] py-[10px] h-fit bg-point text-[#ffffff] rounded-[10px]
                                        hover:drop-shadow-[4px_4px_10px_rgba(27,95,235,0.25)]
                                        text-[12px]"
            onClick={handlePatch}
        >
            수정하기
        </button>
    );
};

export default BtnPatch;
