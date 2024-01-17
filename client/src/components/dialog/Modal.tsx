import styled from "styled-components";
import ModalPortal from "./Modal.Portal";
import { useRecoilValue } from "recoil";
import { currentDialogAtom } from "../../atoms/globalAtoms";
import { COLORS, LABELS, SIZES, TYPES } from "../../global/constants";
import { useHandleModal } from "../hooks/useHandleModal";
import DoubleColumnLayout from "./layout/DoubleColumnModal.layout";
import Button_Icontype from "../basic/Button.iconType";
import { FiX } from "react-icons/fi";
import Button_Boxtype from "../basic/Button.boxType";

export default function Modal() {
  const modal = useRecoilValue(currentDialogAtom);
  const { hideModal } = useHandleModal();

  return (
    <ModalPortal>
      {modal.isOpen &&
        modal.content.length > 0 &&
        modal.content.map((item, index) => (
          <ModalContainer key={index}>
            <BackdropModal onClick={() => hideModal({ order: index })} />
            <ModalLayoutContainer>
              <section className="modal-header">
                <h3>{item.title}</h3>
                <Button_Icontype onClick={() => hideModal({ order: index })}>
                  <FiX />
                </Button_Icontype>
              </section>
              <section className="modal-contents">
                {item.type === "MODAL_DOUBLE_COLUMN" && (
                  <DoubleColumnLayout layout={item.layout} />
                )}
              </section>
              <section className="modal-actions">
                <Button_Boxtype onClick={() => hideModal({ order: index })}>
                  {LABELS.LABEL_CANCEL}
                </Button_Boxtype>
                <Button_Boxtype type={TYPES.CONFIRM}>
                  {item.title}
                </Button_Boxtype>
              </section>
            </ModalLayoutContainer>
          </ModalContainer>
        ))}
    </ModalPortal>
  );
}

const ModalContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
`;

const BackdropModal = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${COLORS.GRAY_08_OVERAY};
  z-index: 99;
`;

const ModalLayoutContainer = styled.div`
  position: absolute;
  z-index: 101;
  background-color: ${COLORS.BASIC_WHITE};
  box-shadow: 0 2px 7px 0 ${COLORS.GRAY_02_OVERAY};
  max-width: ${SIZES.MAX_WIDTH * 0.65}px;
  max-height: calc(100% - 120px);
  border-radius: 5px;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & .modal-header {
    display: flex;
    align-items: center;
    gap: ${SIZES.SM / 2}px;
    padding: ${SIZES.XXS}px;
    background-color: inherit;
    position: sticky;
    top: 0;
    z-index: 1;

    & h3 {
      margin: 0;
      font-size: ${SIZES.XL}px;
      padding-left: ${SIZES.XXS}px;
      flex-grow: 1;
      text-align: left;
    }
  }

  & .modal-contents {
    overflow-y: auto;
    padding: ${SIZES.XXS}px ${SIZES.XL}px ${SIZES.XXL}px;
  }

  & .modal-actions {
    display: flex;
    justify-content: center;
    gap: ${SIZES.SM / 2}px;
    padding: ${SIZES.XXS}px ${SIZES.XXS}px ${SIZES.MD}px;

    & .confirm {
      background-color: ${COLORS.BRAND_LIGHT};
    }
  }
`;
