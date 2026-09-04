function SectionHeading({ eyebrow, title, description, align = "center" }) {
  const alignment = {
    center: "text-center mx-auto",
    left: "text-left",
  };

  return (
    <div className={`max-w-3xl ${alignment[align]}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-aurelia-teal">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-3 text-4xl font-bold text-aurelia-text">{title}</h2>

      {description && (
        <p className="mt-4 leading-7 text-aurelia-muted">{description}</p>
      )}
    </div>
  );
}

export default SectionHeading;
