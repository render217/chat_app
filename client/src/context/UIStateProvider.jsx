import React, { createContext, useContext, useState } from "react";
import useScreenSize from "../hooks/useScreenSize";
import { useEffect } from "react";

const UIStateContext = createContext({
  showSideBar: Boolean,
  isMobileScreen: Boolean,
  isChannelOpen: Boolean,
  isModalOpen: Boolean,
  showUserProfile: Boolean,
  showDropDown: Boolean,
  openSideBar: () => { },
  closeSideBar: () => { },
  openChannel: () => { },
  closeChannel: () => { },
  closeModal: () => { },
  openModal: () => { },
  openShowDropDown: () => { },
  closeShowDropDown: () => { },
  toggleShowDropDown: () => { }
});

const SCREEN_BREAKPOINT = 730;
const UIStateProvider = ({ children }) => {
  const [screenWidth] = useScreenSize();
  const [showSideBar, setShowSideBar] = useState(false);
  const [isChannelOpen, setIsChannelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);


  useEffect(() => {
    if (screenWidth >= SCREEN_BREAKPOINT) {
      setShowSideBar(true);
    }
    if (screenWidth < SCREEN_BREAKPOINT) {
      setShowSideBar(false);
    }
  }, [screenWidth]);

  const isMobileScreen = screenWidth < SCREEN_BREAKPOINT;

  const openSideBar = () => setShowSideBar(true);
  const closeSideBar = () => setShowSideBar(false);
  //
  const openChannel = () => setIsChannelOpen(true);
  const closeChannel = () => setIsChannelOpen(false);
  //
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //
  const openshowDropDown = () => setShowDropDown(true);
  const closeShowDropDown = () => setShowDropDown(false);
  const toggleShowDropDown = () => setShowDropDown(prev => !prev);
  return (
    <UIStateContext.Provider
      value={{
        showSideBar,
        isMobileScreen,
        isChannelOpen,
        isModalOpen,
        showDropDown,
        openChannel,
        closeChannel,
        openSideBar,
        closeSideBar,
        openModal,
        closeModal,
        openshowDropDown,
        closeShowDropDown,
        toggleShowDropDown
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
};

export default UIStateProvider;

export const useUIState = () => useContext(UIStateContext);
