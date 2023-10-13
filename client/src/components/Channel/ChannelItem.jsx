import React from "react";

export const ChannelItem = ({ data }) => {
  const { chatName, _id } = data;
  const shortName = chatName.substring(0, 2).toUpperCase();

  const showDetailPage = (id) => {
    console.log(id)
  }
  return (
    <>
      <div onClick={() => showDetailPage(_id)} className="flex items-center gap-5 py-3 cursor-pointer hover:bg-clrBalticSea/30 flex-nowrap">
        <div className="ml-1 px-2 py-1 text-sm rounded-md  bg-clrBalticSea ">{shortName}</div>
        <h3 className="text-sm overflow-ellipsis text-clrFrenchGray font-semibold">{chatName.toUpperCase()} </h3>
      </div>
    </>
  )
};
