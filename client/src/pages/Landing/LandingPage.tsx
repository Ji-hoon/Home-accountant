import Header from "../../components/common/Header.tsx";
import HeroSection from "./sections/HeroSection.tsx";
import FeatureSection from "./sections/FeatureSection.tsx";
import SignupSection from "./sections/SignupSection.tsx";
import Footer from "../../components/common/Footer.tsx";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../atoms/globalAtoms.ts";
import { Navigate } from "react-router";
import { PATH } from "../../global/constants.ts";

export default function LandingPage() {
  const isLogin = useRecoilValue(isLoginAtom); // login 여부를 판별하는 상태.

  if (isLogin) return <Navigate to={PATH.MAIN} />;

  return (
    <>
      <Header isLogin={false} />
      <HeroSection />
      <FeatureSection />
      <SignupSection />
      <Footer />
    </>
  );
}
