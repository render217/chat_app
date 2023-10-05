import React from "react";
import { useUIState } from "../../context/UiStateProvider";
import { Modal } from "../Modal";

export const Sidebar = () => {
    const {
        isMobileScreen,
        closeSideBar,
        isChannelOpen,
        openChannel,
        closeChannel,
        isModalOpen,
        openModal,
    } = useUIState();

    return (
        <>
            <div className="flex flex-col h-full">
                <div className=" py-3 px-2 shadow-md shadow-clrNight">
                    {isChannelOpen ? (
                        <div className="flex items-center justify-between">
                            <p onClick={closeChannel}>back</p>
                            <p>FrontEnd Channel</p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <p>Sidebar Header</p>
                            <button
                                className="bg-white text-black"
                                onClick={openModal}
                            >
                                open Modal
                            </button>
                            {isMobileScreen && (
                                <p onClick={closeSideBar}>|||</p>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex-1 px-2 overflow-x-hidden overflow-y-auto custom-sidebar-scroll">
                    {isChannelOpen ? (
                        <div>
                            <p>Show Channel feature</p>
                            <p>Show list member</p>
                            <p>Show Channel feature</p>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <p>Search</p>
                                <p>List of channel....</p>
                                <p onClick={openChannel}>FrontEnd Channel</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="py-4 px-2 bg-clrNight border-t border-clrBalticSea shadow-md shadow-clrNight">
                    <div>SidebarBottom</div>
                </div>
            </div>

            {isModalOpen && (
                <Modal >
                    <div className="grid place-items-center bg-transparent w-screen h-[60vh] z-30">
                        <div
                            className="bg-clrSmokyBlack  max-lg:min-w-[60%] lg:w-[600px] px-5 py-5 rounded-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <form>
                                <h3 className="text-clrPorcelain text-lg uppercase mb-4">New Channel</h3>
                                <input className="rounded-lg px-4 py-2  bg-clrShipGrey w-full  text-clrPearlBush mb-4" name="channelName" type="text" placeholder="Channel name" />
                                <textarea className="rounded-lg px-4 py-2  bg-clrShipGrey w-full text-clrPearlBush resize-none" name="channelDescription" id="" cols="30" rows="5" placeholder="Channel Description"></textarea>
                                <div className="flex justify-end">
                                    <button className="bg-clrClearBlue text-clrPorcelain text-lg py-2 px-4 rounded-xl">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};
