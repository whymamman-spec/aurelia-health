import Reveal from "../components/Reveal";

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

      <Reveal>
        <QuickActions />
      </Reveal>

      <Reveal delay={100}>
        <Stats />
      </Reveal>

      <Reveal delay={150}>
        <Services />
      </Reveal>

      <Reveal delay={200}>
        <Doctors />
      </Reveal>

      <Reveal delay={250}>
        <WhyChooseUs />
      </Reveal>

      <Reveal delay={300}>
        <Testimonials />
      </Reveal>

      <Reveal delay={350}>
        <CTA />
      </Reveal>
    </>
  );
}

export default Home;
