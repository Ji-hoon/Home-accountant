import styled from "styled-components";
import ModalPortal from "./Modal.Portal";
import { useRecoilValue } from "recoil";
import { currentDialogAtom } from "../../atoms/globalAtoms";
import { Fragment } from "react";
import { COLORS } from "../../global/constants";
import { useHandleModal } from "../hooks/useHandleModal";

export default function Modal() {
  const modal = useRecoilValue(currentDialogAtom);
  const { hideModal } = useHandleModal();
  return (
    <ModalPortal>
      {modal.isOpen &&
        modal.content.length > 0 &&
        modal.content.map((item, index) => (
          <Fragment key={index}>
            <BackdropModal onClick={() => hideModal({ order: index })} />
            <ModalContainer>
              <h3>{item?.type}</h3>
              <p>{item?.title}</p>
            </ModalContainer>
          </Fragment>
        ))}
    </ModalPortal>
  );
}

const BackdropModal = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${COLORS.GRAY_08_OVERAY};
  z-index: 99;
`;

const ModalContainer = styled.div`
  position: relative;
  z-index: 101;
`;
