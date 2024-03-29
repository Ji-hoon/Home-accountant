import styled from "styled-components";
import { COLORS, SIZES, TYPES } from "../../global/constants";
import { Loader } from "rsuite";

// eslint-disable-next-line react-refresh/only-export-components
export default function Button_Boxtype({
  children,
  onClick,
  type, //className으로 활용
  disabled,
  isAlert,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title,
  processing,
  testid,
}: {
  children: React.ReactElement | string;
  onClick?: (e: React.SyntheticEvent) => void;
  type?: string;
  disabled?: boolean | undefined;
  isAlert?: string | undefined;
  title?: string | undefined;
  processing?: boolean;
  className?: string;
  testid?: string;
}) {
  return (
    <>
      {type && type === TYPES.SUBMIT && typeof children === "string" && (
        <BoxtypeSubmitButton
          type={type}
          className={type}
          onClick={onClick}
          disabled={disabled || processing}
          $alert={isAlert}
          data-testid={testid}
        >
          {processing && <Loader size="sm" />}
          {children}
        </BoxtypeSubmitButton>
      )}
      {type !== TYPES.SUBMIT && (
        <BoxtypeButton
          className={type}
          onClick={onClick}
          disabled={disabled}
          $alert={isAlert}
          id={title}
          data-testid={testid}
        >
          {children}
        </BoxtypeButton>
      )}
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const BoxtypeButton = styled.button<{
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

  &:active,
  &.active {
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
const BoxtypeSubmitButton = styled(BoxtypeButton)<{
  $alert: string | undefined;
}>`
  background-color: ${(props) =>
    props.$alert === "true" ? COLORS.VARIATION_RED : COLORS.BRAND_LIGHT};
  color: ${(props) =>
    props.$alert === "true" ? COLORS.BASIC_WHITE : COLORS.GRAY_10};

  & span + svg {
    margin-right: -${SIZES.XXS / 3}px;
  }

  &:hover {
    filter: brightness(0.95);
  }

  &:active,
  &.active {
    filter: brightness(0.92);
  }

  &[disabled] {
    color: ${(props) =>
      props.$alert === "true" ? COLORS.BASIC_WHITE : COLORS.GRAY_10};
    background-color: ${(props) =>
      props.$alert === "true" ? COLORS.VARIATION_RED : COLORS.BRAND_LIGHT};
    opacity: 0.8;
  }

  & .rs-loader-wrapper {
    margin-left: -${SIZES.SM / 4}px;

    & .rs-loader-spin::before {
      border-color: ${(props) =>
        props.$alert === "true"
          ? COLORS.GRAY_06_OVERAY
          : COLORS.GRAY_06_OVERAY};
    }

    & .rs-loader-spin::after {
      border-color: ${(props) =>
          props.$alert === "true" ? COLORS.BASIC_WHITE : COLORS.GRAY_10_OVERAY}
        transparent transparent;
    }
  }
`;
