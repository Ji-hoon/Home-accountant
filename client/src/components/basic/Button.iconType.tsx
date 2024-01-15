import styled from "styled-components";
import { COLORS, SIZES } from "../../global/constants";

export default function Button_Icontype({
  children,
}: {
  children: React.ReactElement | string;
}) {
  return <IcontypeButton>{children}</IcontypeButton>;
}

// eslint-disable-next-line react-refresh/only-export-components
const IcontypeButton = styled.button`
  border: none;
  border-radius: 5px;
  outline: none;
  padding: ${SIZES.XXS}px ${SIZES.XS}px;
  font-size: ${SIZES.SM}px;
  line-height: ${SIZES.LG}px;
  font-weight: 700;
  background-color: transparent;
  color: ${COLORS.GRAY_10};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${SIZES.SM / 2}px;
  transition: all 300ms ease-out;

  & svg {
    width: ${SIZES.LG}px;
    height: ${SIZES.LG}px;
  }

  &:hover {
    background-color: ${COLORS.GRAY_01_OVERAY};
  }
`;
