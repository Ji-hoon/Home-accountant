import styled from "styled-components";
import { FiHome } from "react-icons/fi";
import { LABELS, URLS, SIZES, COLORS, PATH } from "../../global/constants";

import Button_Boxtype from "../../components/basic/Button.boxType";
import { Navigate, useSearchParams } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginAtom, prevPathAtom } from "../../atoms/globalAtoms";
import { useEffect } from "react";

export default function LoginPage() {
  const prevPath = useRecoilValue(prevPathAtom);
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const nickname = searchParams.get("nickname");
  const profile = searchParams.get("profile");
  const currentGroup = searchParams.get("group");
  const currentRole = searchParams.get("role");

  useEffect(() => {
    const currentUser = {
      userId,
      nickname,
      profile,
      currentGroup,
      currentRole,
    };

    if (currentUser.userId || currentUser.nickname) {
      setIsLogin(true);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentGroup, currentRole, userId, nickname, profile, setIsLogin]);

  console.log("prev path: ", prevPath);

  return (
    <>
      {isLogin && <Navigate to={PATH.MAIN_EXPENSES} />}
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
`;
