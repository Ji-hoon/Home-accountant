import styled from "styled-components";
import { useRecoilState } from "recoil";
import { dropdownOpenAtom } from "../../atoms/globalAtoms";
import ReactDOM from "react-dom";
import { PortalProps } from "../../global/customType";

export default function Dropdown({ children }: { children: React.ReactNode }) {
  const [showDropdown, setShowDropdown] = useRecoilState(dropdownOpenAtom);

  const DropdownPortal = ({ children }: PortalProps) => {
    return ReactDOM.createPortal(
      children,
      document.getElementById("dropdown") as HTMLElement,
    );
  };

  return (
    <DropdownPortal>
      {showDropdown && (
        <DropdownContainer>
          <DropdownBackdrop
            className="dropdown-backdrop"
            onClick={() => setShowDropdown(false)}
          />
          {children}
        </DropdownContainer>
      )}
    </DropdownPortal>
  );
}

const DropdownContainer = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 11;

  & > *:not(.dropdown-backdrop) {
    //TODO: 아래는 임시 스타일. children 컴포넌트에서 지정할 예정.
    z-index: 13;
  }
`;

const DropdownBackdrop = styled(DropdownContainer)`
  z-index: 12;
`;
