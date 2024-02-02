import ReactDOM from "react-dom";
import { PortalProps } from "../../global/customType";

const DialogPortal = ({ children }: PortalProps) => {
  const dialogRoot = document.getElementById("dialog") as HTMLElement;
  return ReactDOM.createPortal(children, dialogRoot);
};

export default DialogPortal;
