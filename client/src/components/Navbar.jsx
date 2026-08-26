import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "./Button";

const navigation = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Doctors", to: "/doctors" },
  { label: "Departments", to: "/departments" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-aurelia-surface/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-aurelia-md bg-aurelia-teal text-lg font-bold text-white">
            A
          </div>

          <div className="leading-tight">
            <span className="block text-lg font-bold tracking-tight text-aurelia-text">
              Aurelia
            </span>
            <span className="block text-xs font-medium text-aurelia-muted">
              Health
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-aurelia-teal"
                    : "text-aurelia-text/70 hover:text-aurelia-teal"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link to="/appointments">
            <Button size="md">Book Appointment</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center rounded-aurelia-md text-aurelia-text transition hover:bg-aurelia-teal-light lg:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-black/5 bg-aurelia-surface lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `rounded-aurelia-md px-4 py-3 text-sm font-medium ${
                      isActive
                        ? "bg-aurelia-teal-light text-aurelia-teal"
                        : "text-aurelia-text hover:bg-aurelia-teal-light"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <Link to="/appointments" onClick={closeMenu} className="mt-3">
                <Button className="w-full">Book Appointment</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
