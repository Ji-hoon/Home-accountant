import styled from "styled-components";
import { FiHome } from "react-icons/fi";
import { LABELS, URLS, SIZES, COLORS, PATH } from "../../global/constants";

import Button_Boxtype from "../../components/basic/Button.boxType";
import { Navigate, useLoaderData, useSearchParams } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginAtom, prevPathAtom } from "../../atoms/globalAtoms";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loginUserType } from "../../global/customType";

export default function LoginPage() {
  const prevPath = useRecoilValue(prevPathAtom);
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const nickname = searchParams.get("nickname");
  const profile = searchParams.get("profile");
  const currentGroup = searchParams.get("group");
  const currentRole = searchParams.get("role");
  const [showToast, setShowToast] = useState(false);
  const { result } = useLoaderData() as loginUserType;

  useEffect(() => {
    const currentUser = {
      userId: userId ? userId : result.userId,
      nickname: nickname ? nickname : result.nickname,
      profile: profile ? profile : result.profile,
      currentGroup: currentGroup ? currentGroup : result.currentGroup,
      currentRole: currentRole ? currentRole : result.currentRole,
    };

    if (!isLogin && currentUser.userId) {
      setIsLogin(true);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    if (isLogin && currentUser.nickname && !showToast) {
      toast.success(
        `${currentUser.nickname}님, ${LABELS.MESSAGE_LOGIN_SUCCESS}`,
      );
      setShowToast(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, showToast, setShowToast, userId, nickname]);

  console.log("prev path: ", prevPath);

  return (
    <>
      {isLogin && showToast && <Navigate to={PATH.MAIN_EXPENSES} />}
      {!isLogin && (
        <>
          <FullContentsLayoutContainer>
            <FiHome />
            <h3>
              {prevPath === ""
                ? LABELS.LABEL_LOGINPAGE_TITLE
                : LABELS.LABEL_LOGINPAGE_TITLE_FROM_INVITE}
            </h3>
            <a href={URLS.EXTERNAL_KAKAO_LOGIN}>
              <Button_Boxtype title="kakao">
                {LABELS.LABEL_LOGIN_WITH_KAKAO}
              </Button_Boxtype>
            </a>
          </FullContentsLayoutContainer>
        </>
      )}
    </>
  );
}

export const FullContentsLayoutContainer = styled.section`
  height: calc(100% - 172px);
  min-height: 240px;
  display: flex;
  gap: ${SIZES.SM * 2}px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  & svg {
    width: ${SIZES.XL * 2}px;
    height: ${SIZES.XL * 2}px;
    color: ${COLORS.BRAND_DEEP};
    margin-top: ${SIZES.XXS}px;
    flex-shrink: 0;
  }

  & h3 {
    margin: 0;
    font-size: ${SIZES.XL}px;
    font-weight: 600;
    line-height: ${SIZES.XXL}px;
    white-space: break-spaces;
  }

  & button[id="kakao"] {
    background-color: ${COLORS.VARIATION_YELLOW};
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_LARGE}px) {
    height: calc(100% - 203px);
  }
`;
