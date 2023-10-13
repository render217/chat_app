import React from 'react'
import { useUIState } from '../../context/UiStateProvider';
import { Modal } from '../Modal';

export const ChannelMemberItem = ({ particpant }) => {
    const { isModalOpen, showUserProfileModal, openModal } = useUIState();
    const { username } = particpant;
    const shortName = username.substring(0, 2).toUpperCase();
    return (
        <>
            <div onClick={() => openModal('userprofile')} className='flex items-center gap-5 py-3 cursor-pointer hover:bg-clrBalticSea/30 flex-nowrap'>
                <div className="ml-1 px-2 py-1 text-sm rounded-md bg-clrBalticSea ">{shortName}</div>
                <h3 className="text-sm overflow-ellipsis text-clrFrenchGray font-semibold">{username} </h3>
            </div>
            {isModalOpen && showUserProfileModal && (
                <Modal>
                    <div className="grid place-items-center bg-transparent w-screen h-[60vh] z-30">
                        <div
                            className="bg-clrSmokyBlack  max-lg:min-w-[60%] lg:w-[37.5rem] px-5 py-5 rounded-xl border"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className='max-w-lg mx-auto'>
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <p className='text-clrGunsmoke text=xs'>Name</p>
                                        <h3 className="text-clrPorcelain text-lg mb-4">Beamlak Samson</h3>
                                    </div>
                                    <div>
                                        <div className="ml-1 px-4 py-3 text-lg rounded-md uppercase text-clrPorcelain bg-clrBalticSea ">be</div>
                                    </div>
                                </div>
                                <div>
                                    <p className='text-clrGunsmoke'>Bio</p>
                                    <p className='rounded-lg  py-2 w-full  text-clrPearlBush mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi delectus ipsam ea quae libero! Provident ipsum asperiores nulla ea dolore!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )
            }
        </>
    )
}
