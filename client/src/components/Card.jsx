function Card({ children, className = "", padding = "default" }) {
  const paddingStyles = {
    none: "",
    default: "p-6",
    large: "p-8",
  };

  return (
    <div
      className={`rounded-aurelia-lg bg-aurelia-surface shadow-sm ring-1 ring-black/5 ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
