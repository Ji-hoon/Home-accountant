/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";
import ReactDOM from "react-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { currentDialogAtom, modalIndexAtom } from "../../atoms/globalAtoms";
import { COLORS, LABELS, SIZES, TYPES } from "../../global/constants";
import { useHandleDialog } from "../hooks/useHandleDialog";
import FormListLayout from "../layout/FormList.layout";
import Button_Icontype from "../basic/Button.iconType";
import { FiX } from "react-icons/fi";
import Button_Boxtype from "../basic/Button.boxType";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { InputFormType, PortalProps } from "../../global/customType";
import { useDialogSubmit } from "../hooks/useDialogSubmit";
import { useIsMutating } from "@tanstack/react-query";

function Dialog() {
  const DialogPortal = ({ children }: PortalProps) => {
    const dialogRoot = document.getElementById("dialog") as HTMLElement;
    return ReactDOM.createPortal(children, dialogRoot);
  };

  const dialog = useRecoilValue(currentDialogAtom);
  const { hideDialog } = useHandleDialog();
  const { dialogRef, onSubmit } = useDialogSubmit();

  const { handleSubmit } = useForm<InputFormType>();
  const setModalIndex = useSetRecoilState(modalIndexAtom);

  const isMutating = useIsMutating();
  console.log(dialog.content);

  function handleCancleDialog(event: React.SyntheticEvent, index: number) {
    event.preventDefault();
    if (isMutating < 1) hideDialog({ order: index });
  }

  return (
    <DialogPortal>
      <div ref={dialogRef}>
        {dialog.isOpen &&
          dialog.content.length > 0 &&
          dialog.content.map((item, index) => (
            <ModalContainer
              key={index}
              $index={index}
              className="modal-container"
            >
              <BackdropModal
                $index={index}
                $maxindex={dialog.content.length}
                onClick={(event: React.SyntheticEvent) =>
                  handleCancleDialog(event, index)
                }
              />
              <ModalLayoutContainer
                $index={index}
                $type={item.type}
                onSubmit={handleSubmit(onSubmit)}
              >
                <section className="modal-header">
                  <h3>{item.title}</h3>
                  <Button_Icontype
                    onClick={(event: React.SyntheticEvent) =>
                      handleCancleDialog(event, index)
                    }
                  >
                    <FiX />
                  </Button_Icontype>
                </section>

                <section className="modal-contents">
                  <FormListLayout
                    type={item.type}
                    layout={item.layout}
                    $processing={
                      index === dialog.content.length - 1 && isMutating > 0
                    }
                  />
                </section>
                <section className="modal-actions">
                  <Button_Boxtype
                    onClick={(event: React.SyntheticEvent) =>
                      handleCancleDialog(event, index)
                    }
                  >
                    {LABELS.LABEL_CANCEL}
                  </Button_Boxtype>
                  <Button_Boxtype
                    processing={
                      index === dialog.content.length - 1 && isMutating > 0
                    }
                    onClick={() => {
                      setModalIndex(index);
                      //console.log(dialogFormRef.current);
                    }}
                    type={TYPES.SUBMIT}
                    isAlert={
                      item.title.includes(LABELS.LABEL_DELETE) ? "true" : ""
                    }
                  >
                    {item.title}
                  </Button_Boxtype>
                </section>
              </ModalLayoutContainer>
            </ModalContainer>
          ))}
      </div>
    </DialogPortal>
  );
}

export default memo(Dialog);

const ModalContainer = styled.section<{
  $index: number;
}>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  overflow-y: auto;
  z-index: ${(props) => props.$index + 100};
`;

const BackdropModal = styled.div<{
  $index: number;
  $maxindex: number;
}>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${COLORS.GRAY_07_OVERAY};

  /* background-color: ${(props) =>
    props.$index === props.$maxindex - 1
      ? COLORS.GRAY_07_OVERAY
      : "transparent"};
  z-index: ${(props) => props.$index + 100}; */

  -webkit-backdrop-filter: ${(props) =>
    props.$index === props.$maxindex - 1 ? "blur(0.8px)" : "blur(0px)"};
  backdrop-filter: ${(props) =>
    props.$index === props.$maxindex - 1 ? "blur(0.8px)" : "blur(0px)"};
`;

const ModalLayoutContainer = styled.form<{
  $type: string;
  $index: number;
}>`
  position: absolute;
  z-index: ${(props) => props.$index + 101};
  background-color: ${COLORS.BASIC_WHITE};
  box-shadow: 0 2px 7px 0 ${COLORS.GRAY_07_OVERAY};

  border-radius: 12px;
  top: 60px;

  margin-top: ${(props) => props.$index * 24}px;
  //width: ${SIZES.MODAL_WIDTH_LARGE}px;

  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;

  & .modal-header {
    display: ${(props) => (props.$type === "POPUP" ? "none" : "flex")};
    align-items: center;
    gap: ${SIZES.SM / 2}px;
    padding: ${SIZES.XXS}px;
    background-color: inherit;
    position: sticky;
    top: 0;
    z-index: 1;
    border-radius: inherit;

    & h3 {
      margin: 0;
      font-size: ${SIZES.XL}px;
      padding-left: ${SIZES.XXS}px;
      flex-grow: 1;
      text-align: left;
    }

    & button {
      padding: ${SIZES.SM / 2}px;

      & svg {
        width: ${SIZES.XL}px;
        height: ${SIZES.XL}px;
      }
    }
  }

  & .modal-contents {
    overflow-y: auto;
    padding: ${SIZES.XXS}px ${SIZES.XL}px ${SIZES.XXL}px;
    padding-top: ${(props) =>
      props.$type === "POPUP" ? `${SIZES.XXL + SIZES.XS}px` : `${SIZES.XXS}px`};
  }

  & .modal-actions {
    display: flex;
    justify-content: center;
    gap: ${SIZES.SM / 2}px;
    padding: ${SIZES.XXS}px ${SIZES.XXS}px ${SIZES.MD}px;
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_LARGE}px) {
    width: calc(80vw - ${(props) => props.$index * 40}px);
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_MEDIUM}px) {
    width: calc(90vw - ${(props) => props.$index * 40}px);
    top: 40px;

    .modal-contents {
      padding-bottom: 12px;

      div {
        width: 100%;
      }
    }
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_SMALL}px) {
    width: 100vw;

    top: ${(props) => (props.$type === "MODAL_DOUBLE_COLUMN" ? "5vw" : "auto")};
    bottom: 0;

    border-radius: 10px 10px 0 0;

    -webkit-will-change: transform;
    will-change: transform;

    .modal-header h3 {
      font-size: ${SIZES.LG}px;
    }

    .modal-contents {
      flex-grow: ${(props) =>
        props.$type === "MODAL_DOUBLE_COLUMN" ? "1" : "auto"};
    }

    padding-bottom: ${SIZES.SM / 2}px;
    transform: translateY(20vh);
    opacity: 0;

    -webkit-animation: bottom-up-dialog 200ms 100ms
      cubic-bezier(0.44, 0.13, 0.37, 1.07) forwards;
    animation: bottom-up-dialog 200ms 100ms cubic-bezier(0.44, 0.13, 0.37, 1.07)
      forwards;

    @keyframes bottom-up-dialog {
      0% {
        transform: translate(-50%, 20vh);
        opacity: 0;
      }
      100% {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }
  }
`;
