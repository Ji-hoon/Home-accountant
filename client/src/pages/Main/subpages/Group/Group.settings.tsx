import styled from "styled-components";
import FormListLayout from "../../../../components/layout/FormList.layout";
import { TYPES, SIZES, LABELS } from "../../../../global/constants";
import { InputFormType, groupInfoType } from "../../../../global/customType";

import { GroupSettingLayout } from "../../../../global/layout";
import Button_Boxtype from "../../../../components/basic/Button.boxType";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useHandleDialog } from "../../../../components/hooks/useHandleDialog";

export default function Group_Settings({
  id,
  code,
  name,
  members,
}: groupInfoType) {
  //console.log(id, code, name, members);
  const groupFormRef = useRef<HTMLFormElement>(null);
  const { handleSubmit } = useForm<InputFormType>();
  const { getDialogFormData, submitDialog } = useHandleDialog();

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
    <SettingLayoutContainer
      ref={groupFormRef}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormListLayout
        type={TYPES.MODAL_SINGLE_COL}
        layout={GroupSettingLayout({ id, code, name, members })}
      />
      <Button_Boxtype type={TYPES.SUBMIT}>
        {LABELS.LABEL_UPDATE_GROUP_INFO}
      </Button_Boxtype>
    </SettingLayoutContainer>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const SettingLayoutContainer = styled.form`
  padding: ${SIZES.XS}px ${SIZES.XL}px;

  & > div {
    width: auto;
  }
`;
