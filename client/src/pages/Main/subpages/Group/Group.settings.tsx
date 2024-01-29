import styled from "styled-components";
import FormListLayout from "../../../../components/layout/FormList.layout";
import { TYPES, SIZES, LABELS } from "../../../../global/constants";
import { groupInfoType } from "../../../../global/customType";

import { GroupSettingLayout } from "../../../../global/layout";
import Button_Boxtype from "../../../../components/basic/Button.boxType";

export default function Group_Settings({
  id,
  code,
  name,
  members,
}: groupInfoType) {
  //console.log(id, code, name, members);
  return (
    <SettingLayoutContainer>
      <FormListLayout
        type={TYPES.MODAL_SINGLE_COL}
        layout={GroupSettingLayout({ id, code, name, members })}
      />
      <Button_Boxtype
        onClick={(event: React.SyntheticEvent) => {
          event.preventDefault();
          //setIndex(index);
          //console.log(dialogFormRef.current);
        }}
        type={TYPES.SUBMIT}
      >
        {LABELS.LABEL_SAVE_DIFF}
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
