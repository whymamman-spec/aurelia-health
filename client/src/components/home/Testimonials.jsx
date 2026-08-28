import { Card, Container, Section } from "../index";

const testimonials = [
  {
    name: "Fatima Ahmed",
    role: "Patient",
    quote:
      "Booking my appointment took less than two minutes. I even knew my queue position before leaving home.",
  },
  {
    name: "John Eze",
    role: "Parent",
    quote:
      "The paediatric department was excellent. The entire experience felt organised and reassuring.",
  },
  {
    name: "Grace Daniel",
    role: "Patient",
    quote:
      "A beautiful digital experience combined with genuinely caring healthcare professionals.",
  },
];

function Testimonials() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-aurelia-teal">
            Patient Stories
          </span>

          <h2 className="mt-3 text-4xl font-bold text-aurelia-text">
            What our patients say
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name}>
              <div className="mb-5 text-5xl text-aurelia-teal/20">"</div>

              <p className="leading-7 text-aurelia-muted">{item.quote}</p>

              <div className="mt-6">
                <h4 className="font-semibold text-aurelia-text">{item.name}</h4>

                <p className="text-sm text-aurelia-muted">{item.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Testimonials;
