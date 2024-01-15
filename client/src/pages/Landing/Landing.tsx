import Header from "../../components/common/Header.tsx";
import HeroSection from "./HeroSection.tsx";
import FeatureSection from "./FeatureSection.tsx";
// import { LABELS } from "../../global/constants";

function Landing() {
  const isLogin = false;

  return (
    <>
      <Header isLogin={isLogin} />
      <HeroSection />
      <FeatureSection />
    </>
  );
}

export default Landing;
