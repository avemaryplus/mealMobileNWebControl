import type { MouseEventHandler, ReactNode } from "react";
import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

type Props = {
  children: ReactNode;
  show: boolean;
  close: MouseEventHandler<HTMLElement>;
};

const Modal = ({ children, show, close }: Props) => {
  return (
    <>
      <div
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? 1 : 0,
        }}
        className="Modal"
      >
        {children}
      </div>
      <Backdrop show={show} onClick={close} />
    </>
  );
};

export default Modal;
