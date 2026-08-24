function Avatar({ src, alt = "", initials, size = "md" }) {
  const sizes = {
    sm: "h-9 w-9 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-2xl",
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      aria-label={alt}
      className={`${sizes[size]} flex items-center justify-center rounded-full bg-aurelia-teal-light font-semibold text-aurelia-teal`}
    >
      {initials}
    </div>
  );
}

export default Avatar;
