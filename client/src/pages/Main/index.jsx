import React from "react";
import { MainHeader } from "./components/MainHeader";
import { MainContent } from "./components/MainContent";
import { MainBottom } from "./components/MainBottom";

export const Main = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className=" py-4 px-4 shadow-md shadow-clrSmokyBlack">
          <MainHeader />
        </div>
        <div className="flex-1 px-4 mt-2 mb-2 overflow-x-hidden overflow-y-auto custom-main-scroll">
          <MainContent />
        </div>
        <div className="py-8 px-4 ">
          <MainBottom />
        </div>
      </div>
    </>
  );
};
