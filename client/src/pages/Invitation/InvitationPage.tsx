import { useSearchParams } from "react-router-dom";
import { FullContentsLayoutContainer } from "../Login/LoginPage";
import styled from "styled-components";
import { FiHome } from "react-icons/fi";
import { LABELS, URLS, COLORS, TYPES } from "../../global/constants";
import Button_Boxtype from "../../components/basic/Button.boxType";
import { isLoginAtom } from "../../atoms/globalAtoms";
import { useRecoilValue } from "recoil";

export default function InvitationPage() {
  const isLogin = useRecoilValue(isLoginAtom);
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  //TODO: code 값 기준으로 그룹 정보 받아와 그룹명 보여주기
  //TODO : helmet 활용하여 meta 정보 보여주기

  return (
    <FullContentsLayoutContainer>
      <FiHome />
      <h3>
        <GroupName>{code}</GroupName> {LABELS.TAGLINE_INVITATION}
      </h3>
      {!isLogin && (
        <a href={URLS.EXTERNAL_KAKAO_LOGIN}>
          <Button_Boxtype title="kakao">
            {LABELS.LABEL_LOGIN_WITH_KAKAO}
          </Button_Boxtype>
        </a>
      )}
      {isLogin && (
        <Button_Boxtype type={TYPES.SUBMIT}>
          {LABELS.LABEL_JOIN_GROUP}
        </Button_Boxtype>
      )}
    </FullContentsLayoutContainer>
  );
}

const GroupName = styled.span`
  color: ${COLORS.BRAND_DEEP};
  font-weight: 700;
`;
