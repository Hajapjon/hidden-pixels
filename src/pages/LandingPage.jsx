import HeroSection from "../components/HeroSection";
import NavBar from "../components/NavBar";
import { Footer } from "@/components/Footer";
import ArticleSection from "@/components/AriticleSection";
import Card from "@/components/Card";
import card1 from "../assets/images/card1.png";
import card2 from "../assets/images/card2.png";
import card3 from "../assets/images/card3.png";
import card4 from "../assets/images/card4.png";
import card5 from "../assets/images/card5.png";
import card6 from "../assets/images/card6.png";
import thomson from "../assets/images/thomson.png";

function LandingPage() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <ArticleSection />
      {/* Blog posts card */}
      <div className="flex flex-col gap-4 lg:flex lg:flex-row lg:flex-wrap lg:gap-5">
        <Card
          picture={card1}
          category="Cat"
          title="Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do"
          body="Dive into the curious world of cat behavior, exploring why cats knead, purr, and chase imaginary prey. This article helps pet owners decode their feline's actions and understand how their instincts as hunters shape their daily routines."
          profilePicture={thomson}
          author="Thompson P."
          date="11 September 2024"
        />
        <Card
          picture={card2}
          category="Cat"
          title="The Fascinating World of Cats: Why We Love Our Furry Friends"
          body="Cats have captivated human hearts for thousands of years. Whether lounging in a sunny spot or playfully chasing a string, these furry companions bring warmth and joy to millions of homes. But what makes cats so special? Let’s dive into the unique traits, behaviors, and quirks that make cats endlessly fascinating."
          profilePicture={thomson}
          author="Thompson P."
          date="11 September 2024"
        />
        <Card
          picture={card3}
          category="Cat"
          title="Finding Motivation: How to Stay Inspired Through Life's Challenges"
          body="This article explores strategies to maintain motivation when faced with personal or professional challenges. From setting small goals to practicing mindfulness and surrounding yourself with positive influences, it provides actionable tips to reignite your passion and keep moving forward."
          profilePicture={thomson}
          author="Thompson P."
          date="11 September 2024"
        />
        <Card
          picture={card4}
          category="Cat"
          title="The Science of the Cat’s Purr: How It Benefits Cats and Humans Alike"
          body="Discover the fascinating science behind the cat's purr, including its potential healing properties for both cats and humans. Learn how this unique sound is produced and the emotional and physical benefits it brings to both species."
          profilePicture={thomson}
          author="Thompson P."
          date="11 September 2024"
        />
        <Card
          picture={card5}
          category="Cat"
          title="Unlocking Creativity: Simple Habits to Spark Inspiration Daily"
          body="Discover practical ways to nurture creativity in your everyday life. Whether it's through journaling, taking breaks, or exploring new hobbies, this article offers simple yet effective habits to help you tap into inspiration and stay creatively charged."
          profilePicture={thomson}
          author="Thompson P."
          date="11 September 2024"
        />
        <Card
          picture={card6}
          category="Cat"
          title="Top 10 Health Tips to Keep Your Cat Happy and Healthy"
          body="This guide offers essential tips on keeping your cat in peak health. Covering topics like proper nutrition, regular vet visits, grooming, and mental stimulation, it’s a must-read for cat owners who want to ensure their pets live long, happy lives."
          profilePicture={thomson}
          author="Thompson P."
          date="11 September 2024"
        />
      </div>
      {/* View more */}
      <div className="flex justify-center p-8">
        <a href="" className="underline tex-[16px] font-[Poppins] font-medium leading-[24px]">View more</a>
      </div>

      <Footer />
    </>
  );
}

export default LandingPage;
