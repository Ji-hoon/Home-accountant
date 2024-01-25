import { ResponsiveBar } from "@nivo/bar";
import { dataMock } from "./Chart.mock.ts";
import styled from "styled-components";
import { useRef, useEffect } from "react";
import { useAssets } from "./Assets.hooks.ts";
import { ChartData, useChart } from "./Assets.Chart.hooks.ts";
import CustomTooltip from "./Assets.Chart.customTooltip.tsx";

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

  const { handleBarClick } = useChart({ assetResponse: data.assetResponse });
  //const assetData = generateMonthlyAssetData();

  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef?.current) {
      const svgElements = Array.from(
        chartRef.current.getElementsByTagName("svg"),
      );
      if (svgElements.length > 0) {
        svgElements[0].setAttribute("width", "100%");
      }
    }
  });

  return (
    <ChartContainer ref={chartRef}>
      <ResponsiveBar<ChartData>
        data={dataMock}
        keys={["현금", "주식", "부동산", "비트코인"]}
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
            translateX: 120,
            translateY: 0,
            itemsSpacing: 0,
            itemWidth: 100,
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
  );
}

const ChartContainer = styled.section`
  height: calc(100vh - 130px);
  width: 100%;
`;
