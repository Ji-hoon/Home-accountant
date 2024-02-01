import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { FullContentsLayoutContainer } from "../Login/LoginPage";
import styled from "styled-components";
import { FiHome } from "react-icons/fi";
import { LABELS, COLORS, TYPES, PATH, URLS } from "../../global/constants";
import Button_Boxtype from "../../components/basic/Button.boxType";
import {
  isLoginAtom,
  currentUserAtom,
  prevPathAtom,
} from "../../atoms/globalAtoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Helmet } from "react-helmet";
import { useInvitation } from "./Inviation.hooks";
import { useMemo } from "react";

export default function InvitationPage() {
  const isLogin = useRecoilValue(isLoginAtom);
  const setPrevPath = useSetRecoilState(prevPathAtom);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const code = searchParams.get("code") as string;
  const currentUser = useRecoilValue(currentUserAtom);

  const { results, joinGroup } = useInvitation(code);
  const groupInfo = useMemo(() => {
    return results.data.groupInfo;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleJoin() {
    if (!isLogin) {
      const pathname = location.pathname;
      setPrevPath(pathname);
      navigate(PATH.LOGIN);
      return;
    }

    joinGroup({
      groupId: groupInfo._id as string,
      userId: currentUser.userId,
    });
  }

  return (
    <FullContentsLayoutContainer>
      <Helmet>
        <title>
          {LABELS.LABEL_SERVICE_NAME} - {`${groupInfo.name}`}{" "}
          {LABELS.LABEL_INVITE_TO_GROUP}
        </title>
        <meta
          name="description"
          property="og:description"
          content={LABELS.FEATURE_01_DESC}
        />
        <meta property="og:url" content={import.meta.env.VITE_FRONTEND_URL} />
        <meta property="og:site_name" content={LABELS.LABEL_SERVICE_NAME} />
        <meta
          property="og:title"
          content={`${groupInfo.name} ${LABELS.LABEL_INVITE_TO_GROUP}`}
        />
        <meta property="og:image" content={URLS.META_IMAGE} />
      </Helmet>
      <FiHome />
      <h3>
        <GroupName>{groupInfo.name}</GroupName> {LABELS.TAGLINE_INVITATION}
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
