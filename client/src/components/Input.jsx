function Input({ label, id, error, helperText, className = "", ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-aurelia-text"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`min-h-11 w-full rounded-aurelia-md border bg-white px-4 text-aurelia-text outline-none transition placeholder:text-aurelia-muted/70 focus:border-aurelia-teal focus:ring-2 focus:ring-aurelia-teal/20 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : "border-gray-300"
        } ${className}`}
        {...props}
      />

      {error ? (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      ) : helperText ? (
        <p className="mt-2 text-sm text-aurelia-muted">{helperText}</p>
      ) : null}
    </div>
  );
}

export default Input;
