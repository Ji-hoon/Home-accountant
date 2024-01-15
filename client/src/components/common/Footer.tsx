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
  max-width: 1200px;
  width: calc(100% - 80px);
  margin: 0 auto;
  padding: ${SIZES.MD * 2}px ${SIZES.MD}px;
  display: flex;
  justify-content: space-between;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${SIZES.MD}px;

  & a {
    color: ${COLORS.GRAY_10};
  }
`;
