import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

import { useUIState } from "../context/UiStateProvider";

const AppLayout = () => {

    const { closeSideBar, isMobileScreen, showSideBar } = useUIState();
    return (
        <>
            <div className="bg-clrBalticSea font-NotoSans min-h-screen">
                <div className="flex text-white h-screen relative">
                    {isMobileScreen ? (
                        showSideBar ? (
                            <div className="fixed top-0 bottom-0  min-w-[16rem] max-w-[16rem]  bg-clrSmokyBlack z-30">
                                <Sidebar />
                            </div>
                        ) : null
                    ) : (
                        <div className=" w-64 bg-clrSmokyBlack">
                            <Sidebar />
                        </div>
                    )}
                    {showSideBar && isMobileScreen && <div onClick={closeSideBar} className="absolute bg-clrBalticSea/90 inset-0 z-10"></div>}
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppLayout;
