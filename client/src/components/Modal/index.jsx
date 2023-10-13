import React from "react";
import { createPortal } from "react-dom";
import { useUIState } from "../../context/UiStateProvider";

export const Modal = ({ children }) => {
  const modalRoot = document.getElementById("modal-root");
  const { closeModal } = useUIState();
  return createPortal(
    <>
      <div
        className="bg-clrSmokyBlack/80 absolute inset-0 grid place-content-center z-50"
        onClick={closeModal}
      >
        {children}
      </div>
    </>,
    modalRoot,
  );
};
