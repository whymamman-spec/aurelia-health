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
      {/* Hero */}
      <Hero />

      {/* Quick Actions */}
      <Reveal>
        <QuickActions />
      </Reveal>

      {/* Trust Statistics */}
      <Reveal delay={100}>
        <Stats />
      </Reveal>

      {/* Medical Services */}
      <Reveal delay={150}>
        <Services />
      </Reveal>

      {/* Specialists */}
      <Reveal delay={200}>
        <Doctors />
      </Reveal>

      {/* Why Choose Aurelia */}
      <Reveal delay={250}>
        <WhyChooseUs />
      </Reveal>

      {/* Patient Stories */}
      <Reveal delay={300}>
        <Testimonials />
      </Reveal>

      {/* Appointment CTA */}
      <Reveal delay={350}>
        <CTA />
      </Reveal>
    </>
  );
}

export default Home;
