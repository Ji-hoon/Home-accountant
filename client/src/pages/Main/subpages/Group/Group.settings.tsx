import styled from "styled-components";
import FormListLayout from "../../../../components/layout/FormList.layout";
import { TYPES, SIZES, LABELS } from "../../../../global/constants";
import { InputFormType } from "../../../../global/customType";

import { GroupSettingLayout } from "../../../../global/layout";
import Button_Boxtype from "../../../../components/basic/Button.boxType";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useHandleDialog } from "../../../../components/hooks/useHandleDialog";
import { useDialogSubmit } from "../../../../components/hooks/useDialogSubmit";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../../../atoms/globalAtoms";
import { useGroups } from "./Group.hooks";
import { useIsMutating } from "@tanstack/react-query";

export default function Group_Settings() {
  const isMutating = useIsMutating();
  const currentUser = useRecoilValue(currentUserAtom);
  const { data, fetchStatus } = useGroups(currentUser.currentGroup);
  const groupInfo = data.data?.groupInfo;
  const { id, code, name, members } = groupInfo;

  const { handleSubmit } = useForm<InputFormType>();
  const { getDialogFormData } = useHandleDialog();
  const groupFormRef = useRef<HTMLFormElement>(null);
  const { submitDialog } = useDialogSubmit();

  async function onSubmit() {
    if (groupFormRef.current) {
      const currentFormData = getDialogFormData(groupFormRef.current);
      console.log("submit!", currentFormData);

      await submitDialog({
        action: LABELS.LABEL_UPDATE_GROUP_INFO,
        data: currentFormData,
      });
    }
  }

  return (
    <section className={fetchStatus === "fetching" ? "fetching" : ""}>
      <SettingLayoutContainer
        ref={groupFormRef}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormListLayout
          type={TYPES.MODAL_SINGLE_COL}
          layout={GroupSettingLayout({ id, code, name, members })}
          $processing={isMutating > 0}
        />
        <Button_Boxtype type={TYPES.SUBMIT} processing={!!isMutating}>
          {LABELS.LABEL_UPDATE_GROUP_INFO}
        </Button_Boxtype>
      </SettingLayoutContainer>
    </section>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const SettingLayoutContainer = styled.form`
  padding: ${SIZES.XS}px ${SIZES.XL}px;

  & > div {
    width: auto;
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_MEDIUM}px) {
    button {
      width: 100%;
      justify-content: center;
    }
  }
`;
