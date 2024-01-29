import styled from "styled-components";
import { COLORS, SIZES, TYPES } from "../../global/constants";

export default function Button_Boxtype({
  children,
  onClick,
  type,
  disabled,
  isAlert,
}: {
  children: React.ReactElement | string;
  onClick?: (e: React.SyntheticEvent) => void;
  type?: string;
  disabled?: boolean | undefined;
  isAlert?: string | undefined;
}) {
  return (
    <>
      {type && type === TYPES.SUBMIT && typeof children === "string" && (
        <BoxtypeSubmitButton
          type={type}
          className={type}
          onClick={onClick}
          value={children}
          disabled={disabled}
          $alert={isAlert}
        />
      )}
      {type !== TYPES.SUBMIT && (
        <BoxtypeButton
          className={type}
          onClick={onClick}
          disabled={disabled}
          $alert={isAlert}
        >
          {children}
        </BoxtypeButton>
      )}
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const BoxtypeButton = styled.button<{
  $alert: string | undefined;
}>`
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

  &[disabled] {
    cursor: not-allowed;
    color: ${COLORS.GRAY_04};
    background-color: ${COLORS.GRAY_01_OVERAY};
    opacity: 0.5;
  }
`;

// eslint-disable-next-line react-refresh/only-export-components
const BoxtypeSubmitButton = styled.input<{
  $alert: string | undefined;
}>`
  border: none;
  border-radius: 5px;
  outline: none;
  padding: ${SIZES.XS}px ${SIZES.LG}px;
  font-size: ${SIZES.SM}px;
  line-height: ${SIZES.LG}px;
  font-weight: 700;

  background-color: ${(props) =>
    props.$alert === "true" ? COLORS.VARIATION_RED : COLORS.BRAND_LIGHT};
  color: ${(props) =>
    props.$alert === "true" ? COLORS.BASIC_WHITE : COLORS.GRAY_10};
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
