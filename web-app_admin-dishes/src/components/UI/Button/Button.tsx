import { MouseEventHandler, ReactNode } from "react";
import "./Button.css";

type Props = {
  type: "Danger" | "Success" | "Add";
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ children, type, onClick }: Props) => {
  return (
    <button className={["Button", type].join(" ")} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
