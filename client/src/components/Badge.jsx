function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-aurelia-teal-light text-aurelia-teal",

    success: "bg-green-100 text-green-800",

    warning: "bg-amber-100 text-amber-800",

    error: "bg-red-100 text-red-800",

    info: "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

export default Badge;
