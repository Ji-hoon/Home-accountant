import Header from "../../components/common/Header.tsx";
import HeroSection from "./sections/HeroSection.tsx";
import FeatureSection from "./sections/FeatureSection.tsx";
import SignupSection from "./sections/SignupSection.tsx";
import Footer from "../../components/common/Footer.tsx";

export default function LandingPage() {
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
