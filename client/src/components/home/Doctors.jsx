import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button, Container, Section } from "../index";
import DoctorCard from "../DoctorCard";
import SectionHeading from "../SectionHeading";

import { DoctorAmina, DoctorDavid, DoctorIbrahim } from "../../assets/images";

const imageMap = {
  "dr-ibrahim.jpg": DoctorIbrahim,
  "dr-amina.jpg": DoctorAmina,
  "dr-david.jpg": DoctorDavid,
};

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/doctors`,
        );

        const data = await response.json();

        setDoctors(data);
      } catch (error) {
        console.error("Failed to load doctors:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  return (
    <Section className="bg-white">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Medical Specialists"
            title="Meet our experienced doctors"
            align="left"
          />

          <Button variant="outline">
            View All Doctors
            <ArrowRight size={18} />
          </Button>
        </div>

        {loading ? (
          <p className="text-center text-aurelia-muted">Loading doctors...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                image={imageMap[doctor.image]}
                name={doctor.full_name}
                specialty={doctor.specialty}
                experience={`${doctor.experience_years} years`}
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

export default Doctors;
