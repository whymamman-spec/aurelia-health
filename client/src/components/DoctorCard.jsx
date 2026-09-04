import Card from "./Card";
import Badge from "./Badge";

function DoctorCard({ image, name, specialty, experience }) {
  return (
    <Card padding="none" className="overflow-hidden">
      <img
        src={image}
        alt={name}
        className="h-72 w-full object-cover transition duration-500 hover:scale-105"
      />

      <div className="p-6">
        <Badge>{specialty}</Badge>

        <h3 className="mt-4 text-xl font-semibold text-aurelia-text">{name}</h3>

        <p className="mt-2 text-sm text-aurelia-muted">
          {experience} experience
        </p>
      </div>
    </Card>
  );
}

export default DoctorCard;
