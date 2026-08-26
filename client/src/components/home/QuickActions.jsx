import { Calendar, Stethoscope, Clock, Phone } from "lucide-react";

import { Card, Container, Section } from "../index";

const actions = [
  {
    title: "Book Appointment",
    icon: Calendar,
    color: "bg-aurelia-teal",
  },
  {
    title: "Find Doctor",
    icon: Stethoscope,
    color: "bg-aurelia-coral",
  },
  {
    title: "Live Queue",
    icon: Clock,
    color: "bg-green-600",
  },
  {
    title: "Emergency Contact",
    icon: Phone,
    color: "bg-amber-500",
  },
];

function QuickActions() {
  return (
    <Section spacing="compact">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((item) => (
            <Card
              key={item.title}
              className="cursor-pointer transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${item.color} text-white`}
              >
                <item.icon size={24} />
              </div>

              <h3 className="font-semibold text-aurelia-text">{item.title}</h3>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default QuickActions;
