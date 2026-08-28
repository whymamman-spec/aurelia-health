import { ShieldCheck, Clock3, Smartphone, HeartHandshake } from "lucide-react";

import { Container, Section } from "../index";

const features = [
  {
    title: "Trusted Medical Care",
    description:
      "Experienced doctors delivering compassionate, evidence-based treatment.",
    icon: ShieldCheck,
  },
  {
    title: "Shorter Waiting Time",
    description:
      "Our digital queue system lets patients know their place before arriving.",
    icon: Clock3,
  },
  {
    title: "Book Anywhere",
    description:
      "Schedule appointments online using your phone, tablet or computer.",
    icon: Smartphone,
  },
  {
    title: "Patient-Centered Experience",
    description:
      "Every interaction is designed to be simple, warm and accessible.",
    icon: HeartHandshake,
  },
];

function WhyChooseUs() {
  return (
    <Section>
      <Container>
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-aurelia-teal">
            Why Choose Us
          </span>

          <h2 className="mt-3 text-4xl font-bold text-aurelia-text">
            Healthcare designed around people
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-aurelia-teal-light text-aurelia-teal">
                <feature.icon size={26} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-aurelia-text">
                  {feature.title}
                </h3>

                <p className="mt-2 leading-7 text-aurelia-muted">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default WhyChooseUs;
