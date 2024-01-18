import styled from "styled-components";
import { COLORS, SIZES, TYPES } from "../../global/constants";

export default function Button_Boxtype({
  children,
  onClick,
  type,
}: {
  children: React.ReactElement | string;
  onClick?: (e: React.SyntheticEvent) => void;
  type?: string;
}) {
  return (
    <>
      {type && type === TYPES.SUBMIT && typeof children === "string" && (
        <BoxtypeSubmitButton
          type={type}
          className={type}
          onClick={onClick}
          value={children}
        />
      )}
      {type !== TYPES.SUBMIT && (
        <BoxtypeButton className={type} onClick={onClick}>
          {children}
        </BoxtypeButton>
      )}
    </>
  );
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
  -webkit-transition: all 200ms ease-out;
  transition: all 200ms ease-out;

  & span + svg {
    margin-right: -${SIZES.XXS / 3}px;
  }

  &:hover {
    filter: brightness(0.95);
  }

  &:active {
    filter: brightness(0.92);
  }
`;

// eslint-disable-next-line react-refresh/only-export-components
const BoxtypeSubmitButton = styled.input`
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
  -webkit-transition: all 200ms ease-out;
  transition: all 200ms ease-out;

  & span + svg {
    margin-right: -${SIZES.XXS / 3}px;
  }

  &:hover {
    filter: brightness(0.95);
  }

  &:active {
    filter: brightness(0.92);
  }
`;
