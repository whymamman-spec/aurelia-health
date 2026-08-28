import {
  HeartPulse,
  Brain,
  Baby,
  Bone,
  Stethoscope,
  Microscope,
} from "lucide-react";

import { Card, Container, Section } from "../index";

const services = [
  {
    title: "Cardiology",
    description: "Comprehensive heart and cardiovascular care.",
    icon: HeartPulse,
  },
  {
    title: "Neurology",
    description: "Diagnosis and treatment of neurological conditions.",
    icon: Brain,
  },
  {
    title: "Paediatrics",
    description: "Compassionate healthcare for infants and children.",
    icon: Baby,
  },
  {
    title: "Orthopaedics",
    description: "Bone, joint and musculoskeletal specialists.",
    icon: Bone,
  },
  {
    title: "General Medicine",
    description: "Primary healthcare and routine consultations.",
    icon: Stethoscope,
  },
  {
    title: "Laboratory",
    description: "Modern diagnostic and medical laboratory services.",
    icon: Microscope,
  },
];

function Services() {
  return (
    <Section>
      <Container>
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-aurelia-teal">
            Our Services
          </span>

          <h2 className="mt-3 text-4xl font-bold text-aurelia-text">
            Quality healthcare across every specialty
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-aurelia-muted">
            From preventive medicine to specialist treatment, Aurelia Health
            brings experienced professionals together under one trusted
            platform.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-aurelia-teal-light text-aurelia-teal">
                <service.icon size={28} />
              </div>

              <h3 className="text-xl font-semibold text-aurelia-text">
                {service.title}
              </h3>

              <p className="mt-3 leading-7 text-aurelia-muted">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Services;
