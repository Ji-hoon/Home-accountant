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
  padding: ${SIZES.XS}px ${SIZES.LG}px;
  font-size: ${SIZES.SM}px;
  line-height: ${SIZES.LG}px;
  font-weight: 700;
  background-color: ${COLORS.GRAY_01};
  color: ${COLORS.GRAY_10};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${SIZES.SM / 2}px;
  transition: all 300ms ease-out;

  & span + svg {
    margin-right: -${SIZES.XXS / 3}px;
  }

  &:hover {
    filter: brightness(0.95);
  }
`;
