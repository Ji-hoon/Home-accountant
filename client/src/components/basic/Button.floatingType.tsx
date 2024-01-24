import { FiPlus } from "react-icons/fi";
import styled from "styled-components";
import { SIZES, COLORS } from "../../global/constants";

export default function Button_Floatingtype({
  onClick,
}: {
  onClick?: (e: React.SyntheticEvent) => void;
}) {
  return (
    <FloatingtypeButton className="floating-button" onClick={onClick}>
      <FiPlus strokeWidth="2" />
    </FloatingtypeButton>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const FloatingtypeButton = styled.button`
  width: ${SIZES.LG * 3}px;
  height: ${SIZES.LG * 3}px;
  background-color: ${COLORS.BRAND_LIGHT};
  border: none;
  outline: none;
  border-radius: ${SIZES.LG * 3}px;
  cursor: pointer;
  -webkit-transition: all 200ms ease-out;
  transition: all 200ms ease-out;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  box-shadow: 0 2px 7px 0 ${COLORS.GRAY_02_OVERAY};

  & svg {
    width: ${SIZES.MD * 2}px;
    height: ${SIZES.MD * 2}px;
  }

  &:hover {
    filter: brightness(0.95);
  }

  &:active {
    filter: brightness(0.92);
    box-shadow: 0 0 3px 0 ${COLORS.GRAY_06_OVERAY};
    -webkit-transform: translateY(2px);
    transform: translateY(2px);
  }
`;
