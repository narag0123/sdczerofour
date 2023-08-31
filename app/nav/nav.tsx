import React from "react";
import NavUnitItems from "./component/navUnitItems";
import Image from "next/image";

const Nav: React.FC = () => {
    return (
        <div className="flex-[0.2] xl:w-[250px] h-[calc(100vh-130px)]">
            <div className="flex flex-col h-full justify-between">
                <NavUnitItems />
                <div
                    className="unit-nav-btn flex 
                                w-full h-[66px] rounded-[20px] justify-start items-center
                                px-[30px] gap-[20px] group transition-all"
                >
                    <Image
                        src={"/asset/img/logout.png"}
                        alt={"e.image"}
                        className="w-[18px] group-hover:scale-[1.2]"
                        width={18}
                        height={18}
                    />
                    <span className="font-nl group-hover:scale-[1.2] group-hover:font-black">
                        로그아웃
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Nav;
