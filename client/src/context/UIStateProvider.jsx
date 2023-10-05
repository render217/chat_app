import React, { createContext, useContext, useState } from 'react'
import useScreenSize from '../hooks/useScreenSize'
import { useEffect } from 'react';

const UIStateContext = createContext({
    showSideBar: Boolean,
    isMobileScreen: Boolean,
    isChannelOpen: Boolean,
    isModalOpen: Boolean,
    showUserProfile: Boolean,
    openSideBar: () => { },
    closeSideBar: () => { },
    openChannel: () => { },
    closeChannel: () => { },
    closeModal: () => { },
    openModal: () => { },
    openShowUserProfile: () => { },
    closeShowUserProfile: () => { },
})

const SCREEN_BREAKPOINT = 730;
const UIStateProvider = ({ children }) => {

    const [screenWidth] = useScreenSize();
    const [showSideBar, setShowSideBar] = useState(false);
    const [isChannelOpen, setIsChannelOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false)
    useEffect(() => {
        if (screenWidth >= SCREEN_BREAKPOINT) {
            setShowSideBar(true);
        }
        if (screenWidth < SCREEN_BREAKPOINT) {
            setShowSideBar(false);
        }
    }, [screenWidth])

    const isMobileScreen = screenWidth < SCREEN_BREAKPOINT;

    const openSideBar = () => setShowSideBar(true);
    const closeSideBar = () => setShowSideBar(false);
    // 
    const openChannel = () => setIsChannelOpen(true)
    const closeChannel = () => setIsChannelOpen(false)
    // 
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false);
    // 
    const openShowUserProfile = () => setShowUserProfile(true);
    const closeShowCloseProfile = () => setShowUserProfile(false)
    return (
        <UIStateContext.Provider value={{
            showSideBar,
            isMobileScreen,
            isChannelOpen,
            isModalOpen,
            showUserProfile,
            openChannel,
            closeChannel,
            openSideBar,
            closeSideBar,
            openModal,
            closeModal,
            openShowUserProfile,
            closeShowCloseProfile
        }}>
            {children}
        </UIStateContext.Provider>
    )
}

export default UIStateProvider

export const useUIState = () => useContext(UIStateContext)