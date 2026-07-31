import {
  Scissors,
 
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";


function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}

          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-500 p-3">
                <Scissors className="text-white" size={24} />
              </div>

              <h2 className="text-2xl font-bold text-white">SalonBook</h2>
            </div>

            <p className="mt-6 leading-8 text-slate-400">
              Discover trusted salons, book appointments, manage your business
              and enjoy a seamless salon experience from anywhere.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              <li>
                <a href="#" className="transition hover:text-emerald-400">
                  Home
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-emerald-400">
                  Features
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-emerald-400">
                  Categories
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-emerald-400">
                  Testimonials
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-emerald-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Explore */}

          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Explore</h3>

            <ul className="space-y-4">
              <li>
                <a href="/login" className="transition hover:text-emerald-400">
                  Login
                </a>
              </li>

              <li>
                <a
                  href="/register"
                  className="transition hover:text-emerald-400"
                >
                  Create Account
                </a>
              </li>

              <li>
                <a
                  href="/become-member"
                  className="transition hover:text-emerald-400"
                >
                  Become Salon Owner
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-emerald-400">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-emerald-400">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Contact</h3>

            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin className="mt-1 text-emerald-400" size={20} />

                <span>Pune, Maharashtra, India</span>
              </div>

              <div className="flex gap-3">
                <Mail className="text-emerald-400" size={20} />

                <span>hello@salonbook.com</span>
              </div>

              <div className="flex gap-3">
                <Phone className="text-emerald-400" size={20} />

                <span>+91 98765 43210</span>
              </div>
            </div>

            {/* Social */}

            <div className="mt-8 flex gap-4">
              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-500"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-500"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-500"
              >
                <FaXTwitter size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-500"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-400 md:flex-row">
          <p>© 2026 SalonBook. All rights reserved.</p>

          <p>Built with ❤️ using React, Spring Boot, RabbitMQ & Keycloak.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
