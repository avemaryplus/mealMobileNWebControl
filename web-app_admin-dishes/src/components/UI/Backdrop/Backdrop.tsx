import { MouseEventHandler } from "react";
import "./Backdrop.css";

type Props = {
  show: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
};

const Backdrop = ({ show, onClick }: Props) => {
  return show ? <div onClick={onClick} className="Backdrop"></div> : null;
};

export default Backdrop;
