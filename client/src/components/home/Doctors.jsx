import { ArrowRight } from "lucide-react";
import { Button, Card, Container, Section } from "../index";

const doctors = [
  {
    name: "Dr. Ibrahim Musa",
    specialty: "Cardiologist",
    experience: "15 years",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dr. Amina Bello",
    specialty: "Paediatrician",
    experience: "12 years",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dr. David Okeke",
    specialty: "Neurologist",
    experience: "18 years",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
  },
];

function Doctors() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-aurelia-teal">
              Medical Specialists
            </span>

            <h2 className="mt-3 text-4xl font-bold text-aurelia-text">
              Meet our experienced doctors
            </h2>
          </div>

          <Button variant="outline">
            View All Doctors
            <ArrowRight size={18} />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <Card key={doctor.name} padding="none" className="overflow-hidden">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-72 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold text-aurelia-text">
                  {doctor.name}
                </h3>

                <p className="mt-2 text-aurelia-teal font-medium">
                  {doctor.specialty}
                </p>

                <p className="mt-4 text-sm text-aurelia-muted">
                  {doctor.experience} experience
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Doctors;
