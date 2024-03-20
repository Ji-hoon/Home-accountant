import styled from "styled-components";
import { LABELS, SIZES, COLORS, URLS } from "../../../global/constants";

const featureContents = [
  {
    title: LABELS.FEATURE_01_TITLE,
    desc: LABELS.FEATURE_01_DESC,
    img: URLS.FEATURE_IMAGE_01,
  },
  {
    title: LABELS.FEATURE_02_TITLE,
    desc: LABELS.FEATURE_02_DESC,
    img: URLS.FEATURE_IMAGE_02,
  },
  {
    title: LABELS.FEATURE_03_TITLE,
    desc: LABELS.FEATURE_03_DESC,
    img: URLS.FEATURE_IMAGE_03,
  },
];

export default function FeatureSection() {
  return (
    <div style={{ padding: "20px 0 40px" }}>
      {featureContents &&
        featureContents.map((feature, index) => (
          <FeatureSectionContainer key={index}>
            <img src={feature.img} />
            <div>
              <h1>{feature.title}</h1>
              <p>{feature.desc}</p>
            </div>
          </FeatureSectionContainer>
        ))}
    </div>
  );
}

const FeatureSectionContainer = styled.section`
  max-width: ${SIZES.MEDIA_QUERY_BP_X_LARGE}px;
  width: calc(100% - 80px);
  padding: ${SIZES.LG}px;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  gap: ${SIZES.XL * 2}px;

  &:nth-child(2) {
    flex-direction: row-reverse;
  }

  & img {
    width: 240px;
    height: 240px;
  }

  & h1 {
    color: ${COLORS.BRAND_DEEP};
    font-size: ${SIZES.XXL}px;
    line-height: ${SIZES.TITLE}px;
    margin: 0;
  }

  & p {
    font-size: ${SIZES.LG}px;
    line-height: ${SIZES.XL + 4}px;
    margin: 0;
    color: ${COLORS.GRAY_07};
    word-break: keep-all;
  }

  & div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: ${SIZES.SM}px;
  }
  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_X_LARGE}px) {
    div {
      gap: ${SIZES.XXS}px;
    }

    img {
      width: 200px;
      height: auto;
    }

    h1 {
      font-size: ${SIZES.SM * 2}px;
      line-height: ${SIZES.XS * 3}px;
    }

    p {
      font-size: ${SIZES.MD}px;
      line-height: ${SIZES.XL}px;
    }
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_LARGE}px) {
    width: calc(100% - 48px);
    gap: ${SIZES.XL * 1}px;
    padding: ${SIZES.SM}px;

    div {
      gap: ${SIZES.XS / 2}px;
    }

    img {
      width: 140px;
      height: auto;
    }

    h1 {
      font-size: ${SIZES.XXS * 2}px;
      line-height: ${SIZES.LG * 1.5}px;
      white-space: normal;
      word-break: keep-all;
    }

    p {
      font-size: ${SIZES.SM}px;
      line-height: ${SIZES.XL}px;
    }
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_SMALL}px) {
    flex-direction: column !important;

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
