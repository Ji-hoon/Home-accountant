import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { LABELS, COLORS, SIZES, PATH } from "../../../global/constants";
import Button_Boxtype from "../../../components/basic/Button.boxType";

export default function SignupSection() {
  return (
    <SignupSectionContainer>
      <h2>{LABELS.LABEL_START_TODAY}</h2>
      <NavLink to={PATH.LOGIN}>
        <Button_Boxtype>{LABELS.LABEL_GOTO_LOGIN}</Button_Boxtype>
      </NavLink>
    </SignupSectionContainer>
  );
}

const SignupSectionContainer = styled.section`
  border-radius: ${SIZES.LG}px;

  max-width: 1200px;
  width: calc(100% - 80px);
  position: relative;
  margin: ${SIZES.SM / 2}px auto;
  padding: ${SIZES.MD * 3}px ${SIZES.MD * 3}px ${SIZES.LG * 2}px;
  overflow: hidden;

  background-color: ${COLORS.BRAND_LIGHT};
  color: ${COLORS.GRAY_09};

  display: flex;
  gap: ${SIZES.XL}px;
  flex-direction: column;
  align-items: center;

  & h2 {
    font-size: ${SIZES.XL}px;
    line-height: ${SIZES.XXL}px;
    margin: 0;
  }

  & button {
    background-color: ${COLORS.GRAY_09};
    color: ${COLORS.BASIC_WHITE};
  }
`;
