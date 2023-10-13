import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useUIState } from "../../../context/UiStateProvider";

export const MainBottom = () => {
  const [message, setMessage] = useState('');
  const { isMobileScreen } = useUIState();
  const handleMessageSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <>
      <div className={`${isMobileScreen ? '' : 'px-10'}`}>
        <form onSubmit={handleMessageSubmit} className="bg-clrShipGrey flex  rounded-xl px-1 py-1">
          <input value={message} onChange={(e) => setMessage(e.target.value)} className="py-2 px-5  bg-transparent outline-none outline-offset-0 w-full" type="text" placeholder="Type a message here" />
          <button className="px-4  rounded-lg hover:bg-clrClearBlue/90 bg-clrClearBlue">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </>
  )
};
