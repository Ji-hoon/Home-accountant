import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { LABELS, SIZES, COLORS, URLS, PATH } from "../../../global/constants";
import Button_Boxtype from "../../../components/basic/Button.boxType";
import { FiChevronRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <HeroSectionContainer>
      <img src={URLS.HERO_IMAGE} />
      <HeroSectionTaglineContainer>
        <h2>{LABELS.TAGLINE}</h2>
        <NavLink to={PATH.LOGIN}>
          <Button_Boxtype>
            <>
              <span>{LABELS.LABEL_GOTO_LOGIN}</span>
              <FiChevronRight />
            </>
          </Button_Boxtype>
        </NavLink>
      </HeroSectionTaglineContainer>
    </HeroSectionContainer>
  );
}

const HeroSectionContainer = styled.section`
  border-radius: ${SIZES.LG}px;
  max-width: 1200px;
  max-height: 640px;
  min-height: 400px;
  width: calc(100% - 80px);
  height: calc(100% - 30vh);
  position: relative;
  margin: ${SIZES.SM / 2}px auto;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  box-shadow: 0 3px 10px 0 ${COLORS.GRAY_02};

  & img {
    position: relative;
    object-fit: cover;
    width: 100%;
  }
`;

const HeroSectionTaglineContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  color: ${COLORS.BASIC_WHITE};
  border-radius: ${SIZES.SM}px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  gap: ${SIZES.XXL / 2}px;

  padding: ${SIZES.XL * 1.8}px ${SIZES.LG * 2}px;

  & h2 {
    margin: 0;
    font-size: ${SIZES.XXL}px;
    line-height: ${SIZES.XL * 2}px;
    white-space: break-spaces;
  }

  & button {
    background-color: ${COLORS.BRAND_DEEP};
    color: ${COLORS.BASIC_WHITE};
  }
`;
