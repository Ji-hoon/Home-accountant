import styled from "styled-components";
import { LABELS, SIZES } from "../../global/constants";
import Button_Boxtype from "../../components/basic/Button.boxType";
import { FiChevronRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <HeroSectionContainer>
      <img src="/img-hero-1600.png" />
      <HeroSectionTaglineContainer>
        <h1>{LABELS.TAGLINE}</h1>
        <Button_Boxtype>
          <>
            {LABELS.LABEL_GOTO_LOGIN}
            <FiChevronRight />
          </>
        </Button_Boxtype>
      </HeroSectionTaglineContainer>
    </HeroSectionContainer>
  );
}

const HeroSectionContainer = styled.section`
  border-radius: ${SIZES.LG}px;
  max-width: 1200px;
  width: calc(100% - 80px);
  height: calc(100% - 20vh);
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  align-items: flex-end;

  & img {
    position: relative;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const HeroSectionTaglineContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
`;
