import HeroSection from "../components/HeroSection";
import NavBar from "../components/NavBar";
import { Footer } from "@/components/Footer";
import ArticleSection from "@/components/AriticleSection";


function LandingPage() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </>
  );
}

export default LandingPage;
