import { FiPlus } from "react-icons/fi";
import styled from "styled-components";
import { SIZES, COLORS } from "../../global/constants";

export default function Button_Floatingtype() {
  return (
    <FloatingtypeButton className="floating-button">
      <FiPlus />
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

  & svg {
    width: ${SIZES.MD * 2}px;
    height: ${SIZES.MD * 2}px;
  }

  &:hover {
    background-color: ${COLORS.BRAND_DEFAULT};
    -webkit-box-shadow: 0 0 0 2px ${COLORS.BRAND_DEFAULT};
    box-shadow: 0 0 0 2px ${COLORS.BRAND_DEFAULT};
  }

  &:active {
    filter: brightness(0.9);
  }
`;
