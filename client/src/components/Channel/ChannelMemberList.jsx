import React from "react";
import { ChannelMemberItem } from "./ChannelMemberItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import { useUIState } from "../../context/UiStateProvider";
import { Modal } from "../Modal";

export const ChannelMemberList = ({ participants, admin }) => {
  const { openModal, isModalOpen, showAddMemberModal } = useUIState();
  const handleAddMember = (e) => {
    openModal('addmember')

  }
  const onAddMember = () => { }
  return (
    <>
      <div>
        <div className="flex justify-between items-start">
          <h1 className="text-clrPearlBush font-semibold mb-3">{'Memebers'.toUpperCase()}</h1>
          <div className="cursor-pointer px-3 hover:bg-clrSmokyBlack/20" onClick={handleAddMember}>
            <FontAwesomeIcon icon={faPlus} onClick={handleAddMember} />
            <button className="hover:border hover:border-clrShipGrey border border-transparent rounded-md  px-2 ">Join</button>
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
      {isModalOpen && showAddMemberModal && (
        <Modal>
          <div className="grid place-items-center bg-transparent w-screen h-[60vh] z-30">
            <div
              className="bg-clrSmokyBlack  max-lg:min-w-[60%] lg:w-[37.5rem] px-5 py-5 rounded-xl border"
              onClick={(e) => e.stopPropagation()}
            >
              <form className="" onSubmit={onAddMember}>
                <h3 className="text-clrPorcelain text-lg uppercase mb-4">Search For User</h3>
                <div className="bg-clrShipGrey rounded-lg flex items-center">
                  <FontAwesomeIcon className="text-clrPorcelain text-lg px-4" icon={faSearch} />
                  <input
                    className="rounded-lg pl-1 py-3 bg-transparent outline-none  w-full  text-clrPearlBush "
                    name="username"
                    type="text"
                    placeholder="Search username"
                    autoComplete="off"
                  />
                </div>
              </form>
              {/* members to add search result */}
              <div className=" overflow-y-auto min-h-[100px] [300px] custom-common-scroll mt-3">

                <div className='flex items-center gap-5 py-3  flex-nowrap my-2'>
                  <div className="ml-1 px-2 py-1 text-xs rounded-md bg-clrBalticSea text-clrFrenchGray font-extralight ">{'AD'}</div>
                  <h3 className="text-sm overflow-ellipsis text-clrFrenchGray font-semibold">{'Ademe'} </h3>
                  <button className=" ml-auto px-2 rounded-md border border-clrGunsmoke  hover:border-clrFrenchGray text-clrFrenchGray cursor-pointer">Add</button>
                </div>

                <div className='flex items-center gap-5 py-3  flex-nowrap my-2'>
                  <div className="ml-1 px-2 py-1 text-xs rounded-md bg-clrBalticSea text-clrFrenchGray font-extralight ">{'DA'}</div>
                  <h3 className="text-sm overflow-ellipsis text-clrFrenchGray font-semibold">{'Dani'} </h3>
                  <button className=" ml-auto px-2 rounded-md border border-clrGunsmoke  hover:border-clrFrenchGray  text-clrFrenchGray cursor-pointer">Add</button>
                </div>


              </div>

            </div>
          </div>
        </Modal>
      )
      }
    </>
  )
};
