import { faArrowRightFromBracket, faCaretDown, faCaretUp, faCircle, faExclamationTriangle, faGem, faTextWidth, faTimesRectangle, faTriangleCircleSquare, faTriangleExclamation, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useUIState } from "../../context/UiStateProvider";

export const UserProfile = () => {
  const shortName = 'BE'
  const chatName = "Beamlak"
  const { showDropDown, toggleShowDropDown } = useUIState();


  return (
    <>
      <div className="relative">
        <div className="flex items-center gap-5   flex-nowrap" >
          <div className="ml-1 px-2 py-1  rounded-md  bg-clrBalticSea ">{shortName}</div>
          <h3 className="text-lg overflow-ellipsis text-clrFrenchGray font-semibold">{chatName.toUpperCase()} </h3>
          <div onClick={toggleShowDropDown} className="ml-auto cursor-pointer px-3">
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </div>
        {showDropDown && (
          <div className="  bg-clrBalticSea py-3 px-2 absolute -top-44 -right-1 rounded-xl  border border-clrShipGrey ">
            <div className="flex flex-col gap-3 justify-center mx-4">
              <div className="flex items-center gap-4  py-2 px-3 cursor-pointer hover:bg-clrShipGrey/20 hover:rounded-xl">
                <FontAwesomeIcon icon={faUserCircle} />
                <p >My Profile</p>
              </div>
              <div className="flex items-center gap-4  py-2 px-3 cursor-pointer hover:bg-clrShipGrey/20 hover:rounded-xl">
                <FontAwesomeIcon icon={faGem} />
                <p>Tweeter</p>
              </div>
              <p className="border h-0 -my-1 border-clrShipGrey"></p>
              <div className="flex items-center gap-4  py-2 px-3 cursor-pointer hover:bg-clrShipGrey/20 hover:rounded-xl">
                <FontAwesomeIcon className="text-clrValentineRed" icon={faArrowRightFromBracket} />
                <p className="text-clrValentineRed">Logout</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
};
