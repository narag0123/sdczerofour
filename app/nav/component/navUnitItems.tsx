"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { easeInOut, motion } from "framer-motion";
import cal_active from "public/asset/img/cal_active.png";
import { UseContext } from "@/app/store/store";

const NavUnitItems: React.FC = () => {
    const context = useContext(UseContext);
    const { nav_unit_items, wherePage, setWherePage } =
        context;

    const [isHover, setIsHover] =
        useState<string>("default");

    const wherePageHandler = (e: string, text: string) => {
        if (wherePage === e && text === "bg") {
            return { backgroundColor: "#1B5FEB" };
        } else if (wherePage === e && text === "text") {
            return { color: "#ffffff" };
        }
    };

    return (
        <div className="flex flex-col gap-[5px] ">
            {nav_unit_items.map((e) => (
                <a
                    href={e.url}
                    key={e.name}
                    onMouseEnter={() => {
                        setIsHover(e.name);
                    }}
                    onMouseLeave={() => {
                        setIsHover("default");
                    }}
                    className="unit-nav-btn flex hover:bg-point80 hover:drop-shadow-[4px_4px_10px_rgba(27,95,235,0.25)]
                                w-full h-[66px] rounded-[20px] justify-start items-center
                                px-[30px] gap-[20px] group transition-all"
                    style={wherePageHandler(e.url, "bg")}
                >
                    <Image
                        src={
                            wherePage === e.url
                                ? e.active_image
                                : isHover !== "default" &&
                                  isHover === e.name
                                ? e.active_image
                                : e.image
                        }
                        alt={"e.image"}
                        className="w-[18px] object-cover"
                        width={18}
                        height={18}
                    />
                    <span
                        className="font-nl group-hover:text-[#ffffff] transition-all"
                        style={wherePageHandler(
                            e.url,
                            "text"
                        )}
                    >
                        {e.name}
                    </span>
                </a>
            ))}
        </div>
    );
};

export default NavUnitItems;
