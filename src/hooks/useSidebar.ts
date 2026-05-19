import { useState } from "react";

const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    toggle,
    open,
    close,
  };
};

export default useSidebar;
