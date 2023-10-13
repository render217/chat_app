import React from "react";
import { MessageItem } from "./MessageItem";
import { messages } from "../../../data/data";
import { useUIState } from "../../../context/UiStateProvider";
export const MainContent = () => {
  const { isMobileScreen } = useUIState();
  let content;
  if (messages.length === 0) {
    content = (
      <div className="h-full w-full grid place-content-center">
        <p>No Message yet</p>
      </div>
    )
  }
  if (messages.length > 0) {
    content = messages.map(data => <MessageItem key={data._id} data={data} />)
  }
  return (
    <>
      <div className={`h-full ${isMobileScreen ? '' : 'px-10'}`}>
        {content}
      </div>
    </>
  )
};
