import Image from "next/image";
import React from "react";
import sdc_image from "public/asset/img/sdc_logo.png";

const Header = (): React.JSX.Element => {
    return (
        <div className="w-full h-[90px] flex justify-between items-end pb-[40px]">
            <div className="flex gap-[15px] items-end">
                <Image
                    src={sdc_image}
                    alt={"sdc_image"}
                    className="w-[44px] h-[44px]"
                />
                <span className="text-[32px] font-bl leading-[20px]">
                    공사공사
                </span>
            </div>
            <div className="flex gap-[20px]">
                <span className="rounded-full w-[44px] h-[44px] bg-black80"></span>
                <span className="font-nl flex flex-col items-end">
                    <div className="text-[20px] text-black100 h-[24px]">
                        장지영
                    </div>
                    <div className="text-[15px] text-black60">
                        일반8급
                    </div>
                </span>
            </div>
        </div>
    );
};

export default Header;
