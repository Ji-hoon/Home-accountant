import Header from "../../components/common/Header.tsx";
import HeroSection from "./HeroSection.tsx";

function Landing() {
  const isLogin = false;

  return (
    <>
      <Header isLogin={isLogin} />
      <HeroSection />
    </>
  );
}

export default Landing;
