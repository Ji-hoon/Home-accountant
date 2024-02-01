import { useNavigate, useSearchParams } from "react-router-dom";
import { FullContentsLayoutContainer } from "../Login/LoginPage";
import styled from "styled-components";
import { FiHome } from "react-icons/fi";
import { LABELS, COLORS, TYPES, PATH } from "../../global/constants";
import Button_Boxtype from "../../components/basic/Button.boxType";
import { isLoginAtom } from "../../atoms/globalAtoms";
import { useRecoilValue } from "recoil";
import { Helmet } from "react-helmet";
import { useInvitation } from "./Inviation.hooks";
import { useEffect } from "react";

export default function InvitationPage() {
  const isLogin = useRecoilValue(isLoginAtom);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let code = "";
  const { results } = useInvitation(code as string);

  const groupName = results.data.groupInfo?.name;

  function handleJoin() {
    if (!isLogin) navigate(PATH.LOGIN);

    //TODO: group에 가입하는 API 호출하고, 정상 응답 시 해당 그룹으로 전환
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    code = searchParams.get("code") as string;
  });

  return (
    <FullContentsLayoutContainer>
      <Helmet>
        <title>가계부를 부탁해 - {`${groupName}`} 그룹에 초대합니다.</title>
        <meta
          name="description"
          property="og:description"
          content={LABELS.FEATURE_01_DESC}
        />
        <meta property="og:url" content={import.meta.env.VITE_FRONTEND_URL} />
        <meta property="og:site_name" content="가계부를 부탁해" />
        <meta
          property="og:title"
          content={`${groupName}훈님의 가계부 그룹에 초대합니다.`}
        />
        <meta
          property="og:image"
          content="https://github.com/Ji-hoon/Home-accountant/raw/master/client/public/img-logo.png"
        />
      </Helmet>
      <FiHome />
      <h3>
        <GroupName>{groupName}</GroupName> {LABELS.TAGLINE_INVITATION}
      </h3>
      <Button_Boxtype type={TYPES.SUBMIT} onClick={handleJoin}>
        {LABELS.LABEL_JOIN_GROUP}
      </Button_Boxtype>
    </FullContentsLayoutContainer>
  );
}

const GroupName = styled.span`
  color: ${COLORS.BRAND_DEEP};
  font-weight: 700;
`;
