import styled from "styled-components";
import { SIZES, COLORS } from "../../global/constants";

export default function Profile({ url }: { url: string }) {
  return (
    <ProfileContainer>
      <img src={url} />
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  width: ${SIZES.XL * 2}px;
  height: ${SIZES.XL * 2}px;
  border-radius: ${SIZES.XL * 2}px;
  overflow: hidden;
  cursor: pointer;

  -webkit-transition: all 200ms ease-out;
  transition: all 200ms ease-out;

  box-shadow: 0 0 0 1px ${COLORS.GRAY_01_OVERAY};

  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &:hover {
    -webkit-box-shadow: 0 0 0 4px ${COLORS.GRAY_01_OVERAY};
    box-shadow: 0 0 0 4px ${COLORS.GRAY_01_OVERAY};
  }

  &:active {
    filter: brightness(0.95);
  }
`;
