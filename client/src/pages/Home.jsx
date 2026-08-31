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
      <QuickActions />

      {/* Trust Statistics */}
      <Stats />

      {/* Medical Services */}
      <Services />

      {/* Specialists */}
      <Doctors />

      {/* Why Choose Aurelia */}
      <WhyChooseUs />

      {/* Patient Stories */}
      <Testimonials />

      {/* Appointment CTA */}
      <CTA />
    </>
  );
}

export default Home;
