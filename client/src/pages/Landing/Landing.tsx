import Header from "../../components/common/Header.tsx";
import HeroSection from "./HeroSection.tsx";
import { LABELS } from "../../global/constants";

function Landing() {
  const isLogin = false;

  return (
    <>
      <Header isLogin={isLogin} />
      <HeroSection />
      <h1 style={{ height: "900px" }}>{LABELS.FEATURE_01_TITLE}</h1>
    </>
  );
}

export default Landing;
