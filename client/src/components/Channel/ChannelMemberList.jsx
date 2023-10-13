import React from "react";
import { ChannelMemberItem } from "./ChannelMemberItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";

export const ChannelMemberList = ({ participants, admin }) => {

  const handleAddMember = (e) => {

  }
  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1 className="text-clrPearlBush font-semibold mb-3">{'Memebers'.toUpperCase()}</h1>
          <div className="cursor-pointer" onClick={handleAddMember}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        {/* Admin */}
        <div className='flex items-center  gap-5 py-3 cursor-pointer flex-nowrap  hover:bg-clrBalticSea/30'>
          <div className="ml-1 px-2 py-1 text-sm rounded-md bg-clrBalticSea ">{admin.username.substring(0, 2).toUpperCase()}</div>
          <h3 className="text-sm overflow-ellipsis text-clrFrenchGray font-semibold">{admin.username.toUpperCase()} </h3>
          <div className="ml-auto mr-5">
            <FontAwesomeIcon className="text-blue-500 text-xs" icon={faStar} />
          </div>
        </div>
        {/* Admin */}
        {participants && participants.length > 0 && participants.map(particpant => <ChannelMemberItem particpant={particpant} />)}
      </div>
    </>
  )
};
