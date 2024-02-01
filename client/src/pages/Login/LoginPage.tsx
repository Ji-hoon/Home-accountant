import styled from "styled-components";
import { FiHome } from "react-icons/fi";
import { LABELS, URLS, SIZES, COLORS, PATH } from "../../global/constants";

import Button_Boxtype from "../../components/basic/Button.boxType";
import { Navigate, useSearchParams } from "react-router-dom";

import { useRecoilState } from "recoil";
import { isLoginAtom } from "../../atoms/globalAtoms";
import { useEffect } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const nickname = searchParams.get("nickname");
  const profile = searchParams.get("profile");
  const currentGroup = searchParams.get("group");

  useEffect(() => {
    const currentUser = { id, nickname, profile, currentGroup };

    if (currentUser.id || currentUser.nickname) {
      setIsLogin(true);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentGroup, id, nickname, profile, setIsLogin]);

  return (
    <>
      {isLogin && <Navigate to={PATH.MAIN_EXPENSES} />}
      {!isLogin && (
        <>
          <FullContentsLayoutContainer>
            <FiHome />
            <h3>{LABELS.LABEL_LOGINPAGE_TITLE}</h3>
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
