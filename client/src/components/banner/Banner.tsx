import { NavLink } from "react-router-dom";
import { COLORS, SIZES, URLS } from "../../global/constants";
import styled from "styled-components";

export default function Banner() {
  //TODO: 추후 여러 배너 중 랜덤하게 표시토록 기능 구현
  return (
    <BannerContainer>
      <NavLink to={URLS.AD_MOCK_URL} target="_blank">
        <img src={URLS.AD_MOCK_IMAGE} />
      </NavLink>
    </BannerContainer>
  );
}

const BannerContainer = styled.div`
  position: sticky;
  top: 100px;

  & img {
    width: 160px;
    border-radius: 5px;
    border: 1px solid ${COLORS.GRAY_01};

    @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_X_LARGE}px) {
      display: none;
    }
  }
`;
