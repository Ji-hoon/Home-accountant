import HeroSection from "./sections/HeroSection.tsx";
import FeatureSection from "./sections/FeatureSection.tsx";
import SignupSection from "./sections/SignupSection.tsx";

import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../atoms/globalAtoms.ts";
import { Navigate } from "react-router";
import { PATH } from "../../global/constants.ts";

export default function LandingPage() {
  const isLogin = useRecoilValue(isLoginAtom); // login 여부를 판별하는 상태.

  return (
    <>
      {isLogin && <Navigate to={PATH.MAIN_EXPENSES} />}
      {!isLogin && (
        <>
          <HeroSection />
          <FeatureSection />
          <SignupSection />
        </>
      )}
    </>
  );
}
