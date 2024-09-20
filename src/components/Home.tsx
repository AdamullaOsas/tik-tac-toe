import React, { useState } from "react";
import logo from "../assets/logo.svg";
import iks from "../assets/icon-x.svg";
import ou from "../assets/icon-o.svg";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState<string>("X");

    const handleClick = () => {
        setActive(active === "X" ? "O" : "X");
    };

    return (
        <div className="min-h-screen bg-darkNavy w-full flex items-center justify-center">
            <div className="w-[328px] sm:w-[460px] flex flex-col items-center text-center gap-8 sm:gap-10">
                <img src={logo} alt="logo" className="" />
                <div className="bg-navy w-full rounded-[15px] h-[205px] flex flex-col py-6 shadow-[inset_0_-8px_0_#10212A]">
                    <h1 className="headingXS mb-6">PICK PLAYER 1'S MARK</h1>
                    <div className="p-2 h-[72px] flex bg-darkNavy mx-6 rounded-[15px]">
                        <button
                            className={`flex justify-center items-center flex-1 ${
                                active === "X" ? "bg-silver rounded-[10px]" : ""
                            }`}
                            onClick={active === "O" ? handleClick : () => {}}
                        >
                            <img
                                src={iks}
                                alt="X icon"
                                className="size-8"
                                style={{
                                    filter:
                                        active === "X"
                                            ? "brightness(0) saturate(100%) invert(13%) sepia(47%) saturate(421%) hue-rotate(157deg) brightness(93%) contrast(94%)"
                                            : "brightness(0) saturate(100%) invert(81%) sepia(20%) saturate(233%) hue-rotate(153deg) brightness(90%) contrast(89%)",
                                }}
                            />
                        </button>
                        <button
                            className={`flex justify-center items-center flex-1 ${
                                active === "O" ? "bg-silver rounded-[10px]" : ""
                            }`}
                            onClick={active === "X" ? handleClick : () => {}}
                        >
                            <img
                                src={ou}
                                alt="O icon"
                                className="size-8"
                                style={{
                                    filter:
                                        active === "O"
                                            ? "brightness(0) saturate(100%) invert(13%) sepia(47%) saturate(421%) hue-rotate(157deg) brightness(93%) contrast(94%)"
                                            : "brightness(0) saturate(100%) invert(81%) sepia(20%) saturate(233%) hue-rotate(153deg) brightness(90%) contrast(89%)",
                                }}
                            />
                        </button>
                    </div>
                    <p className="body mt-4">REMEMBER : X GOES FIRST</p>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <button
                        className="w-full h-14 sm:h-[67px] bg-orange text-darkNavy headingXS shadow-[inset_0_-8px_0_#CC8B13] pb-2 rounded-[15px]"
                        onClick={() =>
                            navigate("/single", {
                                state: { playerMark: active },
                            })
                        }
                    >
                        NEW GAME (VS CPU)
                    </button>
                    <button
                        className="w-full h-14 sm:h-[67px] bg-blue text-darkNavy headingXS shadow-[inset_0_-8px_0_#118C87] pb-2 rounded-[15px]"
                        onClick={() => navigate("/multi")}
                    >
                        NEW GAME (VS PLAYER)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
