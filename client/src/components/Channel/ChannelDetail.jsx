import React from 'react'
import { groupDetail } from '../../data/data'
import { ChannelMemberList } from './ChannelMemberList';
export const ChannelDetail = () => {
  const { _id, chatName, chatDescription, participants, admin } = groupDetail;
  const view = {
    _id: "6525d7e12156de34f6f0395d",
    chatName: "Front-end developers",
    chatDescription: "Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan quis. In gravida mollis purus, at interdum arcu tempor non",
    isGroupChat: true,
    participants: [
      {
        _id: "65259c1b2a225b951f9d374a",
        username: "beamlak",
        email: "test@test",
      },
      {
        _id: "65259c63bbc4f27c43e7e0f0",
        username: "ademe",
        email: "ademe@test",
      },
    ],
    admin: "65259c1b2a225b951f9d374a",
    createdAt: "2023-10-10T23:01:53.499Z",
    updatedAt: "2023-10-11T20:39:44.721Z",
    __v: 0,
    lastMessage: {
      _id: "65270810cb7e8587d5fba0b5",
      sender: {
        _id: "65259c1b2a225b951f9d374a",
        username: "beamlak",
        email: "test@test",
      },
      content: "Hello everyone welcome to our channel room",
      chat: "6525d7e12156de34f6f0395d",
      createdAt: "2023-10-11T20:39:44.716Z",
      updatedAt: "2023-10-11T20:39:44.716Z",
      __v: 0,
    },
  };
  console.log(groupDetail)
  return (
    <div className='py-4'>
      <h2 className='font-semibold  text-clrPearlBush mb-4'>{chatName.toUpperCase()}</h2>
      <p className='text-clrPearlBush text-sm mb-4'>{chatDescription}</p>
      <ChannelMemberList participants={participants} admin={admin} />
    </div>
  )
}