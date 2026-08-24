function Section({ children, className = "", spacing = "default" }) {
  const spacingStyles = {
    default: "py-16 sm:py-20 lg:py-24",
    compact: "py-10 sm:py-14",
    large: "py-20 sm:py-24 lg:py-32",
  };

  return (
    <section className={`${spacingStyles[spacing]} ${className}`}>
      {children}
    </section>
  );
}

export default Section;
