import styled from "styled-components";
import Textfield from "../../basic/Textfield";
import { SIZES } from "../../../global/constants";

export default function DoubleColumnLayout({
  layout,
}: {
  layout: Array<{
    title: string;
    type: string;
    placeholder: string;
    default?: undefined | string;
  }>;
}) {
  return (
    <DoubleColumnLayoutContainer>
      {layout.length > 0 &&
        layout.map((item, index) => (
          <Textfield
            key={index}
            title={item.title}
            type={item.type}
            placeholder={item.placeholder}
            defaultValue={item.default}
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
`;
