import styled from "styled-components";
import { COLORS, SIZES, URLS } from "../../global/constants";
import { FiArrowUpRight } from "react-icons/fi";

export default function Footer() {
  return (
    <FooterContainer>
      2024 ⓒ가계부를부탁해 all rights reserved.
      <FooterLinks>
        <div>
          <a href={URLS.FOOTER_GITHUB} target="_blank">
            Github
          </a>
          <FiArrowUpRight />
        </div>
        <div>
          <a href={URLS.FOOTER_LINKEDIN} target="_blank">
            Linkedin
          </a>
          <FiArrowUpRight />
        </div>
      </FooterLinks>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  max-width: ${SIZES.MAX_WIDTH}px;
  width: calc(100% - 80px);
  margin: 0 auto;
  padding: ${SIZES.MD * 2}px ${SIZES.MD}px;
  display: flex;
  justify-content: space-between;
  color: ${COLORS.GRAY_05};
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${SIZES.MD}px;

  & > div {
    display: flex;
    gap: ${SIZES.XXS / 2}px;
  }

  & a {
    color: inherit;

    &:hover {
      color: ${COLORS.GRAY_07};
      text-decoration: underline;
    }
  }
`;
