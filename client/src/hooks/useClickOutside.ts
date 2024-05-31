import React, { RefObject } from "react";

export const useClickOutside = (
  modalRef: RefObject<HTMLElement>,
  clickClose: () => void
) => {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        !modalRef.current ||
        modalRef.current.contains(event.target as Node)
      ) {
        clickClose();
        document.querySelector("body")?.classList.remove("hidden");
      }
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [modalRef, clickClose]);
};
