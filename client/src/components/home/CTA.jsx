import { Calendar } from "lucide-react";
import { Button, Container, Section } from "../index";

function CTA() {
  return (
    <Section className="bg-aurelia-teal text-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
            Ready to get started?
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            Book your appointment today
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/80">
            Experience a modern healthcare journey with online appointments,
            trusted specialists and real-time queue updates.
          </p>

          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              className="bg-white text-aurelia-teal hover:bg-gray-100"
            >
              <Calendar size={18} />
              Book Appointment
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default CTA;
