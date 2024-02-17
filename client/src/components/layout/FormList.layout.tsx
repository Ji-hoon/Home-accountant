/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";
import Textfield from "../basic/Textfield";
import { SIZES } from "../../global/constants";
import { FormListLayoutType, popupLayoutType } from "../../global/customType";
import { memo } from "react";

// eslint-disable-next-line react-refresh/only-export-components
function FormListLayout({
  layout,
  type,
  processing,
}: {
  layout: FormListLayoutType[] | popupLayoutType;
  type: string;
  processing?: boolean | undefined;
}) {
  // console.log(layout);
  return (
    <>
      {Array.isArray(layout) && (
        <DoubleColumnLayoutContainer type={type} processing={processing}>
          {layout.length > 0 &&
            layout.map((item, index) => (
              <Textfield
                key={index}
                fieldName={item.fieldName}
                title={item.title}
                type={item.type}
                placeholder={item.placeholder}
                defaultValue={item.defaultValue}
                defaultDate={item.defaultDate}
                options={item.options}
                readonly={item.readonly}
                hidden={item.hidden}
              />
            ))}
        </DoubleColumnLayoutContainer>
      )}
      {Array.isArray(layout) === false && (
        <PopupLayoutContainer>
          <h4>{layout.description}</h4>
        </PopupLayoutContainer>
      )}
    </>
  );
}

export default memo(FormListLayout);

const DoubleColumnLayoutContainer = styled.div<{
  type: string;
  processing: boolean | undefined;
}>`
  width: ${(props) =>
    props.type === "MODAL_DOUBLE_COLUMN"
      ? `${SIZES.MODAL_WIDTH_LARGE}px`
      : `${SIZES.MODAL_WIDTH_MEDIUM}px`};
  //min-height: ${SIZES.MODAL_MIN_HEIGHT}px;
  display: flex;
  flex-wrap: wrap;
  gap: ${SIZES.XL}px;
  padding-bottom: ${SIZES.XL}px;

  & > div {
    width: ${(props) =>
      props.type === "MODAL_DOUBLE_COLUMN" ? "calc(50% - 12px);" : "100%"};
  }
  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_LARGE}px) {
    width: 100%;

    & > div {
      width: 100%;
    }
  }

  opacity: ${(props) => (props.processing ? 0.5 : 1)};
  pointer-events: ${(props) => (props.processing ? "none" : "auto")};
`;

const PopupLayoutContainer = styled.div`
  width: ${SIZES.MODAL_WIDTH_SMALL}px;

  & h4 {
    margin: 0;
    font-size: ${SIZES.LG}px;
    font-weight: 600;
  }
`;
