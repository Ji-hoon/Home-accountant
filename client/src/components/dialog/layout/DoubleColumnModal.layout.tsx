import styled from "styled-components";
import Textfield from "../../basic/Textfield";
import { SIZES } from "../../../global/constants";
import { dialogLayoutType } from "../../../global/customType";

export default function DoubleColumnLayout({
  layout,
}: {
  layout: dialogLayoutType[];
}) {
  return (
    <DoubleColumnLayoutContainer>
      {layout.length > 0 &&
        layout.map((item, index) => (
          <Textfield
            key={index}
            fieldName={item.fieldName}
            title={item.title}
            type={item.type}
            placeholder={item.placeholder}
            defaultValue={item.defaultValue}
            options={item.options}
          />
        ))}
    </DoubleColumnLayoutContainer>
  );
}

const DoubleColumnLayoutContainer = styled.div`
  width: 640px;
  min-height: 300px;
  display: flex;
  flex-wrap: wrap;
  gap: ${SIZES.XL}px;

  & > div {
    width: calc(50% - 12px);
  }
  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_LARGE}px) {
    width: 100%;

    & > div {
      width: 100%;
    }
  }
`;
