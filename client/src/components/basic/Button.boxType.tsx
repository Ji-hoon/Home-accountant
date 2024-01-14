import styled from "styled-components";
import { COLORS, SIZES } from "../../global/constants";

export default function Button_Boxtype({
  children,
}: {
  children: React.ReactElement | string;
}) {
  return <BoxtypeButton>{children}</BoxtypeButton>;
}

// eslint-disable-next-line react-refresh/only-export-components
const BoxtypeButton = styled.button`
  border: none;
  border-radius: 5px;
  outline: none;
  padding: ${SIZES.SM}px ${SIZES.LG}px;
  font-size: ${SIZES.SM}px;
  line-height: ${SIZES.LG}px;
  font-weight: 700;
  background-color: ${COLORS.GRAY_01};
  color: ${COLORS.GRAY_10};
  cursor: pointer;

  &:hover {
    filter: brightness(0.95);
  }
`;
