import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import { useAssets } from "../Assets.hooks.ts";
import { ChartData, useChart } from "./Assets.Chart.hooks.ts";
import CustomTooltip from "./Assets.Chart.customTooltip.tsx";
import Empty from "../../../../../components/common/Empty.tsx";
import { LABELS } from "../../../../../global/constants.ts";
import { FiAlertTriangle } from "react-icons/fi";
import { throttle } from "lodash";

export default function Chart({
  $owner,
  $currentDate,
  $unit,
}: {
  $owner: string;
  $currentDate: Date;
  $unit: string;
}) {
  const { data } = useAssets({
    owner: $owner,
    currentDate: $currentDate,
    unit: $unit,
  });

  const { handleBarClick, generateMonthlyAssetData } = useChart({
    assetResponse: data.assetResponse,
  });
  const { resultArray, uniqueKeyArray } = generateMonthlyAssetData();

  const chartRef = useRef<HTMLDivElement | null>(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = throttle(() => {
    setWindowWidth(window.innerWidth);
  }, 500);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (chartRef?.current) {
      const svgElements = Array.from(
        chartRef.current.getElementsByTagName("svg"),
      );
      if (svgElements.length > 0) {
        svgElements[0].setAttribute("width", "100%");
      }
    }
  }, [windowWidth]);

  return (
    <>
      {resultArray.length > 0 && (
        <ChartContainer ref={chartRef}>
          <ResponsiveBar<
            ChartData & {
              owner: string;
            }
          >
            data={resultArray as unknown as (ChartData & { owner: string })[]}
            keys={uniqueKeyArray}
            indexBy="owner"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.35}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            layout="vertical"
            borderColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            motionConfig="gentle"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendPosition: "middle",
              legendOffset: 32,
              truncateTickAt: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "단위(십만원)",
              legendPosition: "middle",
              legendOffset: -52,
              truncateTickAt: 0,
            }}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 140,
                translateY: 0,
                itemsSpacing: 0,
                itemWidth: 120,
                itemHeight: 30,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="자산"
            barAriaLabel={(e) =>
              e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            }
            onClick={handleBarClick}
            tooltip={CustomTooltip}
          />
        </ChartContainer>
      )}
      {resultArray.length === 0 && (
        <ul>
          <Empty
            icon={<FiAlertTriangle />}
            message={LABELS.MESSAGE_NO_ASSETS}
          />
        </ul>
      )}
    </>
  );
}

const ChartContainer = styled.section`
  height: calc(100vh - 130px);
  width: 100%;

  & svg g rect {
    position: relative;
    cursor: pointer;

    &:hover {
      -webkit-filter: brightness(1.05);
      filter: brightness(1.05);

      -webkit-transition: all 300ms ease-out;
      transition: all 300ms ease-out;
    }
  }
`;