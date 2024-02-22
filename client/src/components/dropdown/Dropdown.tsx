import styled from "styled-components";
import { useRecoilState } from "recoil";
import { dropdownOpenAtom } from "../../atoms/globalAtoms";
import ReactDOM from "react-dom";
import { PortalProps } from "../../global/customType";
import { COLORS, SIZES } from "../../global/constants";

export default function Dropdown({ children }: { children: React.ReactNode }) {
  const [showDropdown, setShowDropdown] = useRecoilState(dropdownOpenAtom);

  const DropdownPortal = ({ children }: PortalProps) => {
    return ReactDOM.createPortal(
      children,
      document.getElementById("dropdown") as HTMLElement,
    );
  };

  const ismobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

  return (
    <DropdownPortal>
      {showDropdown && (
        <DropdownContainer>
          <DropdownBackdrop
            ismobile={ismobile}
            className="dropdown-backdrop"
            onClick={() => setShowDropdown("")}
          />
          {children}
        </DropdownContainer>
      )}
    </DropdownPortal>
  );
}

const DropdownContainer = styled.div<{
  ismobile?: boolean;
}>`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 111; //모달이 101

  & > *:not(.dropdown-backdrop) {
    //TODO: 아래는 임시 스타일. children 컴포넌트에서 지정할 예정.
    z-index: 113;
  }
`;

const DropdownBackdrop = styled(DropdownContainer)`
  z-index: 112;
  position: fixed;

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_SMALL}px) {
    -webkit-transition: opacity 100ms ease-out;
    transition: opacity 100ms ease-out;

    -webkit-backdrop-filter: ${(props) =>
      props.ismobile ? "blur(0.8px)" : "blur(0)"};
    backdrop-filter: ${(props) => (props.ismobile ? "blur(0.8px)" : "blur(0)")};

    opacity: ${(props) => (props.ismobile ? 1 : 0)};

    background-color: ${(props) =>
      props.ismobile ? COLORS.GRAY_07_OVERAY : "transparent"};
  }
`;

export const DropdownUIContainerStyle = styled.div<{
  data: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}>`
  position: absolute;
  left: ${(props) => props.data.x + props.data.width - 200}px;
  top: ${(props) => props.data.y + props.data.height}px;
  height: auto;
  width: 200px;
  max-height: calc(100vh - 100px);

  overflow-x: hidden;
  overflow-y: auto;

  margin-top: 6px;
  background-color: #fff;
  border-radius: 5px;
  background-color: ${COLORS.BASIC_WHITE};
  box-shadow: 0 2px 7px 0 ${COLORS.GRAY_08_OVERAY};
  max-width: ${SIZES.MAX_WIDTH * 0.65}px;

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_SMALL}px) {
    &.mobile {
      background-color: #fff;
      left: 0;
      right: 0;
      bottom: 0;
      top: auto;
      margin: 0;
      border-radius: 10px 10px 0 0;
      overflow-y: auto;
      width: 100%;
      padding-bottom: ${SIZES.SM / 2}px;
      transform: translateY(20vh);
      opacity: 0;

      -webkit-will-change: transform;
      will-change: transform;

      -webkit-animation: bottom-up 200ms 100ms
        cubic-bezier(0.44, 0.13, 0.37, 1.07) forwards;
      animation: bottom-up 200ms 100ms cubic-bezier(0.44, 0.13, 0.37, 1.07)
        forwards;

      button {
        font-size: ${SIZES.MD}px;
        line-height: ${SIZES.XL}px;
        padding-top: ${SIZES.SM}px;
        padding-bottom: ${SIZES.SM}px;

        span {
          flex-grow: 1;
          text-align: left;
        }
      }
    }

    @keyframes bottom-up {
      0% {
        transform: translateY(20vh);
        opacity: 0;
      }
      100% {
        transform: translateY(0px);
        opacity: 1;
      }
    }
  }
`;
