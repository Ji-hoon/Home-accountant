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
  max-width: ${SIZES.MAX_WIDTH}px;
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
    height: 100%;
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_LARGE}px) {
    height: calc(100% - 50vh);
    width: calc(100% - 48px);

    img {
      height: 125%;
    }
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_SMALL}px) {
    height: calc(100% - 50vh);
    min-height: 360px;

    img {
      height: 115%;
    }
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

  padding: ${SIZES.XL * 1.5}px ${SIZES.LG * 2}px;

  & h2 {
    margin: 0;
    font-size: ${SIZES.XXL}px;
    line-height: ${SIZES.XL * 2}px;
    white-space: break-spaces;
  }

  & a {
    width: 100%;
  }

  & button {
    background-color: ${COLORS.BRAND_DEEP};
    color: ${COLORS.BASIC_WHITE};
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_X_LARGE}px) {
    padding: ${SIZES.XL * 1.2}px ${SIZES.XL * 1.5}px;

    h2 {
      font-size: ${SIZES.SM * 2}px;
      line-height: ${SIZES.XS * 3}px;
    }
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_LARGE}px) {
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 0;

    h2 {
      font-size: ${SIZES.XS * 2}px;
      line-height: ${SIZES.XXS * 3}px;
      max-width: 100%;
      word-wrap: break-word;
      white-space: normal;
      word-break: keep-all;
    }
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_SMALL}px) {
    flex-direction: column !important;
    padding: ${SIZES.XL}px;

    div {
      align-items: center;
      text-align: center;
    }

    img {
      width: 120px;
      height: auto;
    }
  }
`;
