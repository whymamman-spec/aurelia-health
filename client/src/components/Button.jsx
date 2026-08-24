function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-aurelia-md font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-aurelia-teal focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary: "bg-aurelia-teal text-white hover:bg-aurelia-teal-dark",
    secondary:
      "bg-aurelia-teal-light text-aurelia-teal hover:bg-aurelia-teal-light/80",
    coral: "bg-aurelia-coral text-white hover:bg-aurelia-coral-dark",
    outline:
      "border border-aurelia-teal text-aurelia-teal hover:bg-aurelia-teal-light",
    ghost: "text-aurelia-teal hover:bg-aurelia-teal-light",
  };

  const sizes = {
    sm: "min-h-10 px-4 text-sm",
    md: "min-h-11 px-5 text-sm",
    lg: "min-h-12 px-6 text-base",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
