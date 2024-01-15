import styled from "styled-components";
import { LABELS, SIZES, COLORS, URLS } from "../../global/constants";

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
  max-width: 900px;
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
    font-size: ${SIZES.XL}px;
    line-height: ${SIZES.XXL}px;
    margin: 0;
  }

  & div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: ${SIZES.SM}px;
  }
`;
