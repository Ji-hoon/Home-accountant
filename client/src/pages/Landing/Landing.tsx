import Header from "../../components/common/Header.tsx";
import HeroSection from "./HeroSection.tsx";
import FeatureSection from "./FeatureSection.tsx";
import SignupSection from "./SignupSection.tsx";
import Footer from "../../components/common/Footer.tsx";
// import { LABELS } from "../../global/constants";

function Landing() {
  const isLogin = false;

  return (
    <>
      <Header isLogin={isLogin} />
      <HeroSection />
      <FeatureSection />
      <SignupSection />
      <Footer />
    </>
  );
}

export default Landing;
