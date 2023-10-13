import React from "react";
import { useUIState } from "../../../context/UiStateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

export const MainHeader = () => {
  const { openSideBar, isMobileScreen } = useUIState();
  return (
    <div>
      <div className="flex items-center gap-5">
        {isMobileScreen && (
          <p className="text-xl" onClick={openSideBar}>
            <FontAwesomeIcon icon={faList} />
          </p>
        )}
        <h3 className="text-lg overflow-ellipsis text-clrPearlBush font-semibold">{'front-end developers'.toUpperCase()} </h3>
      </div>
    </div>
  );
};
