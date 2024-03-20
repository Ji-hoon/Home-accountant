import styled from "styled-components";
import { COLORS, SIZES, VALUES } from "../../../../../global/constants.ts";
import { BarTooltipProps } from "@nivo/bar";
import { ChartData } from "./Assets.Chart.hooks.ts";

export default function CustomTooltip(tooltip: BarTooltipProps<ChartData>) {
  return (
    <CustomTooltipContainer $color={tooltip.color}>
      <p>
        <em></em>
        <span>
          {tooltip.id} - {tooltip.indexValue}
        </span>
      </p>
      <span>
        {(tooltip.value * VALUES.ASSET_AMOUNTS_UNIT).toLocaleString()}원
      </span>
    </CustomTooltipContainer>
  );
}

const CustomTooltipContainer = styled.div<{
  $color: string;
}>`
  background-color: ${COLORS.BASIC_WHITE};
  box-sizing: border-box;
  box-shadow: 0 1px 5px 0 ${COLORS.GRAY_07_OVERAY};

  border-radius: 5px;
  padding: ${SIZES.XXS}px ${SIZES.XS}px;

  font-size: ${SIZES.SM}px;
  line-height: ${SIZES.LG}px;
  font-weight: 700;

  & p {
    margin: 0;
    font-weight: 500;
    display: flex;
    align-items: center;
    color: ${COLORS.GRAY_06};

    & em {
      width: ${SIZES.SM}px;
      height: ${SIZES.SM}px;
      margin-right: ${SIZES.SM / 4}px;
      background-color: ${(props) => props.$color};
      border-radius: ${SIZES.SM / 4}px;
    }
  }

  & > span {
    color: ${COLORS.GRAY_10};
  }
`;
