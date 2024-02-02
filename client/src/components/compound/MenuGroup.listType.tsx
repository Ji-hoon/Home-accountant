import React from "react";
import styled from "styled-components";
import { COLORS, SIZES } from "../../global/constants";

export function MenuGroup_ListType({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <MenuGroupContainer>
      <h5>{title}</h5>
      <ul>{children}</ul>
    </MenuGroupContainer>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const MenuGroupContainer = styled.div`
  padding: ${SIZES.XXS / 2}px 0;

  &:not(:first-child) {
    border-top: 1px solid ${COLORS.GRAY_02};
  }

  & h5,
  ul {
    margin: 0;
    padding: 0;
  }

  & h5 {
    padding: 6px 12px;
    color: ${COLORS.GRAY_04};
    font-weight: 500;
  }

  & button {
    width: 100%;
    background-color: #fff;
    text-align: center;
    border-radius: 0;

    & > p {
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      & span {
        font-size: ${SIZES.XS}px;
        font-weight: 400;
        color: ${COLORS.GRAY_03};
      }
    }
  }

  & *.active {
    color: ${COLORS.BRAND_DEEP};
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;
