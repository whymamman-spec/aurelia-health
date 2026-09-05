import { ArrowRight, Calendar } from "lucide-react";
import { Button, Container } from "../index";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-aurelia-ivory py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="inline-flex items-center rounded-full bg-aurelia-teal-light px-4 py-2 text-sm font-semibold text-aurelia-teal">
              Modern Healthcare • Nigeria
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-aurelia-text lg:text-6xl">
              Healthcare that puts{" "}
              <span className="text-aurelia-teal">people first.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-aurelia-muted">
              Book appointments, find trusted specialists, monitor your queue
              status and access quality healthcare from one beautiful digital
              experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg">
                <Calendar size={18} />
                Book Appointment
              </Button>

              <Button variant="outline" size="lg">
                Find a Doctor
                <ArrowRight size={18} />
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-8">
              <div>
                <h3 className="text-3xl font-bold text-aurelia-text">25+</h3>
                <p className="text-sm text-aurelia-muted">Specialists</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-aurelia-text">98%</h3>
                <p className="text-sm text-aurelia-muted">
                  Patient Satisfaction
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            {/* Decorative glow */}
            <div className="absolute -left-10 top-8 h-48 w-48 rounded-full bg-aurelia-teal-light opacity-60 blur-3xl animate-pulse" />

            <div className="absolute -right-10 bottom-8 h-56 w-56 rounded-full bg-aurelia-coral opacity-20 blur-3xl animate-pulse" />

            {/* Doctor Image */}
            <img
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80"
              alt="Nigerian female doctor smiling in a modern hospital"
              className="relative z-10 h-full w-full rounded-[28px] object-cover shadow-xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
