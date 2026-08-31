import { Container, Section } from "../index";
import CountUp from "../CountUp";

const stats = [
  { value: 15, suffix: "+", label: "Medical Departments" },
  { value: 50, suffix: "+", label: "Experienced Doctors" },
  { value: 20, suffix: "k+", label: "Patients Served" },
  { value: 24, suffix: "/7", label: "Emergency Care" },
];

function Stats() {
  return (
    <Section className="bg-white" spacing="compact">
      <Container>
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <h2 className="text-4xl font-bold text-aurelia-teal">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </h2>

              <p className="mt-2 text-sm text-aurelia-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Stats;
