import React from "react";
import { useUIState } from "../../context/UiStateProvider";
import { Modal } from "../Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong, faBackward, faPlus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { ChannelDetail } from "../Channel/ChannelDetail";
import { ChannelSearch } from "../Channel/ChannelSearch";
import { UserProfile } from "../UserProfile";




export const Sidebar = () => {
  const {
    isMobileScreen,
    closeSideBar,
    isChannelOpen,
    openChannel,
    closeChannel,
    isModalOpen,
    showAddChannelModal,
    openModal,
    closeShowDropDown,
  } = useUIState();

  return (
    <>
      <div className="flex flex-col h-full">

        {/* Sidebar Header */}
        <div className=" py-3 px-4 shadow-md shadow-clrNight">
          {isChannelOpen ? (
            <div className="flex items-center justify-between">
              <p onClick={closeChannel} className="py-1">
                <FontAwesomeIcon icon={faArrowLeftLong} />
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p>All Channels</p>
              <button className="text-white bg-clrBalticSea px-2 py-1 rounded-md hover:bg-clrBalticSea/90" onClick={() => openModal('addchannel')}>
                <FontAwesomeIcon icon={faPlus} className="bg-tranparent" />
              </button>
              {/* {isMobileScreen && <p onClick={closeSideBar}>|||</p>} */}
            </div>
          )}
        </div>
        {/* Sidebar Header */}


        {/* Sidebar Body */}
        <div className="flex-1 px-4 overflow-x-hidden overflow-y-auto custom-sidebar-scroll" onClick={closeShowDropDown}>
          {isChannelOpen ? (
            <div>
              <ChannelDetail />
            </div>
          ) : (
            <div>
              <ChannelSearch />
            </div>
          )}
        </div>
        {/* Sidebar Body */}

        {/* Sidebar Bottom */}
        <div className="py-4 bg-clrNight border-t border-clrBalticSea shadow-md shadow-clrNight">
          <div className="px-4">
            <UserProfile />
          </div>
        </div>
        {/* Sidebar Bottom */}

      </div >

      {isModalOpen && showAddChannelModal && (
        <Modal>
          <div className="grid place-items-center bg-transparent w-screen h-[60vh] z-30">
            <div
              className="bg-clrSmokyBlack  max-lg:min-w-[60%] lg:w-[600px] px-5 py-5 rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form>
                <h3 className="text-clrPorcelain text-lg uppercase mb-4">
                  New Channel
                </h3>
                <input
                  className="rounded-lg px-4 py-2  bg-clrShipGrey w-full  text-clrPearlBush mb-4"
                  name="channelName"
                  type="text"
                  placeholder="Channel name"
                />
                <textarea
                  className="rounded-lg px-4 py-2  bg-clrShipGrey w-full text-clrPearlBush resize-none"
                  name="channelDescription"
                  id=""
                  cols="30"
                  rows="5"
                  placeholder="Channel Description"
                ></textarea>
                <div className="flex justify-end">
                  <button className="bg-clrClearBlue text-clrPorcelain text-lg py-2 px-4 rounded-xl">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )
      }
    </>
  );
};
