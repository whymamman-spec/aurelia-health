import { ArrowRight, Calendar, ShieldCheck, Star } from "lucide-react";
import { Button, Container } from "../index";
import { HeroDoctor } from "../../assets/images";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F7FBFA] via-white to-[#E8F4F1] py-20 lg:py-28">
      {/* Background decorative circles */}
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-aurelia-teal/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-aurelia-coral/10 blur-3xl" />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-aurelia-teal shadow-sm ring-1 ring-aurelia-teal/10">
              <ShieldCheck size={16} />
              Trusted Digital Healthcare
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-aurelia-text lg:text-6xl">
              Healthcare that puts{" "}
              <span className="text-aurelia-teal">people first.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-aurelia-muted">
              Book appointments, meet experienced specialists, track your queue
              in real time and enjoy a seamless healthcare experience designed
              for modern Nigerian hospitals.
            </p>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm">
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>

              <span className="text-aurelia-muted">
                Rated by 20,000+ patients
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg">
                <Calendar size={18} />
                Book Appointment
              </Button>

              <Button variant="outline" size="lg">
                Find a Doctor
                <ArrowRight size={18} />
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <h3 className="text-3xl font-bold text-aurelia-text">50+</h3>
                <p className="mt-1 text-sm text-aurelia-muted">Doctors</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-aurelia-text">15</h3>
                <p className="mt-1 text-sm text-aurelia-muted">Departments</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-aurelia-text">24/7</h3>
                <p className="mt-1 text-sm text-aurelia-muted">Emergency</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            {/* Soft glow */}
            <div className="absolute -left-8 top-10 h-48 w-48 rounded-full bg-aurelia-teal-light opacity-70 blur-3xl" />
            <div className="absolute -right-8 bottom-8 h-56 w-56 rounded-full bg-aurelia-coral opacity-20 blur-3xl" />

            {/* Main image */}
            <img
              src={HeroDoctor}
              alt="Smiling Nigerian female doctor"
              className="relative z-10 w-full animate-aurelia-float rounded-[32px] object-cover shadow-2xl"
            />
            {/* Floating queue card */}
            <div className="absolute -bottom-6 -left-6 z-20 w-56 animate-aurelia-float-card rounded-2xl bg-white/90 p-4 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-aurelia-muted">
                  Queue Status
                </span>

                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>

              <h3 className="mt-3 text-3xl font-bold text-aurelia-teal">#12</h3>

              <p className="mt-1 text-sm text-aurelia-muted">
                Estimated waiting time: 18 mins
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
