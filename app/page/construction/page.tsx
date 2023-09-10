import React from "react";
import ConstInputForm from "./component/constInputForm";

const Construction = () => {
    return (
        <main className="construction flex-[0.8] bg-[#ffffff] rounded-[20px] p-[40px] scrollbar h-[calc(100vh-130px)]">
            <h1 className="font-nl text-[20px] font-black h-[80px]">
                공사 등록하기
            </h1>
            <ConstInputForm />
        </main>
    );
};

export default Construction;
