import { faArrowRightFromBracket, faCaretDown, faCaretUp, faCircle, faExclamationTriangle, faGem, faTextWidth, faTimesRectangle, faTriangleCircleSquare, faTriangleExclamation, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useUIState } from "../../context/UiStateProvider";
import { Modal } from "../Modal";

export const UserProfile = () => {
  const shortName = 'BE'
  const chatName = "Beamlak"
  const { showDropDown, toggleShowDropDown, isModalOpen, openModal, showMyProfileModal } = useUIState();
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const onshowMyProfile = () => {
    openModal('myprofile');
  }
  const onEditProfileSubmit = (e) => {
    e.preventDefault();
    setIsProfileEdit(false);
  }
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
              <div onClick={onshowMyProfile} className="flex items-center gap-4  py-2 px-3 cursor-pointer hover:bg-clrShipGrey/20 hover:rounded-xl">
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
      {isModalOpen && showMyProfileModal && (
        <Modal>
          {isProfileEdit ? (<div className="grid place-items-center bg-transparent w-screen h-[60vh] z-30">
            <div
              className="bg-clrSmokyBlack  max-lg:min-w-[60%] lg:w-[600px] px-5 py-5 rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form className="" onSubmit={onEditProfileSubmit}>
                <h3 className="text-clrPorcelain text-lg uppercase mb-4">
                  Edit My Profile
                </h3>
                <input
                  className="rounded-lg px-4 py-2  bg-clrShipGrey w-full  text-clrPearlBush mb-4"
                  name="username"
                  type="text"
                  placeholder="Enter new username"
                />
                <textarea
                  className="rounded-lg px-4 py-2  bg-clrShipGrey w-full text-clrPearlBush resize-none"
                  name="bio"
                  id=""
                  cols="30"
                  rows="5"
                  placeholder="Enter new bio"
                ></textarea>
                <div className="flex justify-end">
                  <button className="bg-clrClearBlue text-clrPorcelain text-lg mt-2 py-2 px-4 rounded-xl">
                    Save profile
                  </button>
                </div>
              </form>
            </div>
          </div>) : (<div className="grid place-items-center bg-transparent w-screen h-[60vh] z-30">
            <div
              className="bg-clrSmokyBlack  max-lg:min-w-[60%] lg:w-[37.5rem] px-5 py-5 rounded-xl border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className='max-w-lg mx-auto'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-clrGunsmoke text=xs'>Name</p>
                    <h3 className="text-clrPorcelain text-lg mb-4">Beamlak Samson</h3>
                  </div >
                  <div>
                    <div className="ml-1 px-4 py-3 text-lg rounded-md uppercase text-clrPorcelain bg-clrBalticSea ">be</div>
                  </div>
                </div >
                <div>
                  <p className='text-clrGunsmoke'>Bio</p>
                  <p className='rounded-lg  py-2 w-full  text-clrPearlBush mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi delectus ipsam ea quae libero! Provident ipsum asperiores nulla ea dolore!</p>
                </div>
                <div onClick={() => setIsProfileEdit(true)} className="text-clrPorcelain cursor-pointer bg-clrBalticSea w-fit px-2 py-2 rounded-md hover:bg-clrBalticSea/80">Edit Profile</div>
              </div >
            </div >
          </div >)}

        </Modal>
      )
      }
    </>
  )
};
