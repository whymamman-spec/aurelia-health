import { Link } from "react-router-dom";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-aurelia-text text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-aurelia-md bg-aurelia-teal text-lg font-bold">
                A
              </div>

              <div>
                <span className="block font-bold">Aurelia</span>
                <span className="block text-xs text-white/60">Health</span>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
              A modern healthcare experience designed to make quality care
              easier to access, understand and navigate.
            </p>

            {/* Social / Contact Icons */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Website"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Globe size={18} />
              </a>

              <a
                href="mailto:hello@aureliahealth.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h2 className="font-semibold">Explore</h2>

            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li>
                <Link to="/services" className="hover:text-white">
                  Services
                </Link>
              </li>

              <li>
                <Link to="/doctors" className="hover:text-white">
                  Our Doctors
                </Link>
              </li>

              <li>
                <Link to="/departments" className="hover:text-white">
                  Departments
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Patient Care */}
          <div>
            <h2 className="font-semibold">Patient Care</h2>

            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li>
                <Link to="/appointments" className="hover:text-white">
                  Book an Appointment
                </Link>
              </li>

              <li>
                <Link to="/appointments" className="hover:text-white">
                  Check Appointment
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-semibold">Contact</h2>

            <ul className="mt-5 space-y-4 text-sm text-white/65">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 shrink-0" size={18} />
                <span>
                  Aurelia Health
                  <br />
                  Nigeria
                </span>
              </li>

              <li className="flex gap-3">
                <Phone className="mt-0.5 shrink-0" size={18} />
                <span>+234 800 000 0000</span>
              </li>

              <li className="flex gap-3">
                <Mail className="mt-0.5 shrink-0" size={18} />
                <span>hello@aureliahealth.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/50">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Aurelia Health. All rights reserved.
            </p>

            <div className="flex gap-5">
              <a href="#" className="hover:text-white">
                Privacy
              </a>

              <a href="#" className="hover:text-white">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
