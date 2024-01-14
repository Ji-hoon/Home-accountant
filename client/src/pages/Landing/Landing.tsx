import Header from "../../components/common/Header.tsx";
import HeroSection from "./Hero.tsx";

function Landing() {
  const isLogin = false;

  return (
    <>
      <Header isLogin={isLogin} />
      <HeroSection />
      <h1>랜딩페이지입니다.</h1>
    </>
  );
}

export default Landing;
