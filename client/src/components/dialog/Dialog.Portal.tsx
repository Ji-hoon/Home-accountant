import ReactDOM from "react-dom";

interface DialogPortalProps {
  children?: React.ReactNode;
}

const DialogPortal = ({ children }: DialogPortalProps) => {
  const dialogRoot = document.getElementById("dialog") as HTMLElement;
  return ReactDOM.createPortal(children, dialogRoot);
};

export default DialogPortal;
