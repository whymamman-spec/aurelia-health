import Hero from "../components/home/Hero";
import QuickActions from "../components/home/QuickActions";
import Stats from "../components/home/Stats";
import Services from "../components/home/Services";
import Doctors from "../components/home/Doctors";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";

function Home() {
  return (
    <>
      <Hero />
      <QuickActions />
      <Stats />
      <Services />
      <Doctors />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </>
  );
}

export default Home;
