import styled from "styled-components";
import { FiHome } from "react-icons/fi";
import { LABELS, URLS, SIZES, COLORS, PATH } from "../../global/constants";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Button_Boxtype from "../../components/basic/Button.boxType";
import { Navigate, useSearchParams } from "react-router-dom";

import { useRecoilState } from "recoil";
import { isLoginAtom } from "../../atoms/globalAtoms";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const nickname = searchParams.get("nickname");

  const currentUser = { id, nickname };
  console.log(currentUser);

  if (currentUser.id || currentUser.nickname) {
    setIsLogin(true);
    return <Navigate to={PATH.MAIN} />;
  }

  return (
    <>
      <Header isLogin={isLogin} />
      <LoginContainer>
        <FiHome />
        <h3>{LABELS.LABEL_LOGINPAGE_TITLE}</h3>
        <a href={URLS.EXTERNAL_KAKAO_LOGIN}>
          <Button_Boxtype>{LABELS.LABEL_LOGIN_WITH_KAKAO}</Button_Boxtype>
        </a>
      </LoginContainer>
      <Footer />
    </>
  );
}

const LoginContainer = styled.section`
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
    margin-top: ${SIZES.LG}px;
    flex-shrink: 0;
  }

  & h3 {
    margin: 0;
    white-space: break-spaces;
  }

  & button {
    background-color: ${COLORS.VARIATION_YELLOW};
  }
`;
