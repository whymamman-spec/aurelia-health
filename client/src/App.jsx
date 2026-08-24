function App() {
  return (
    <main className="min-h-screen bg-aurelia-ivory flex items-center justify-center px-6">
      <section className="text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-aurelia-teal">
          Aurelia Health
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-aurelia-text sm:text-5xl">
          Healthcare, made more human.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-aurelia-muted">
          A modern digital healthcare experience connecting patients, doctors
          and hospital services.
        </p>

        <button
          type="button"
          className="mt-8 rounded-aurelia-md bg-aurelia-teal px-6 py-3 font-semibold text-white transition hover:bg-aurelia-teal-dark focus:outline-none focus:ring-2 focus:ring-aurelia-teal focus:ring-offset-2"
        >
          Book an Appointment
        </button>
      </section>
    </main>
  );
}

export default App;
