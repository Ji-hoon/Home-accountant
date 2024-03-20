import ReactDOM from "react-dom";
import { PortalProps } from "../../global/customType";
import { Toaster } from "react-hot-toast";
import { COLORS } from "../../global/constants";

export default function ToasterPortalComponent() {
  const ToasterPortal = ({ children }: PortalProps) => {
    return ReactDOM.createPortal(
      children,
      document.getElementById("toaster") as HTMLElement,
    );
  };

  return (
    <ToasterPortal>
      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: COLORS.GRAY_09,
            color: COLORS.BASIC_WHITE,
          },

          // Default options for specific types
          success: {
            duration: 1500,
          },
        }}
        containerStyle={{
          top: 24,
          left: 20,
          bottom: 20,
          right: 20,
        }}
      />
    </ToasterPortal>
  );
}
