import React from 'react'

export const ChannelMemberItem = ({ particpant }) => {
    const { username } = particpant;
    const shortName = username.substring(0, 2).toUpperCase();
    return (
        <div className='flex items-center gap-5 py-3 cursor-pointer hover:bg-clrBalticSea/30 flex-nowrap'>
            <div className="ml-1 px-2 py-1 text-sm rounded-md bg-clrBalticSea ">{shortName}</div>
            <h3 className="text-sm overflow-ellipsis text-clrFrenchGray font-semibold">{username} </h3>
        </div>
    )
}
