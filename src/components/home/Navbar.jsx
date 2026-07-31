import { Menu, Scissors } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto h-20 px-6 md:px-10 lg:px-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-emerald-600"
        >
          <Scissors size={28} />
          <span>SalonBook</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-slate-700">
          <li>
            <Link className="hover:text-emerald-600 transition-colors" to="/">
              Home
            </Link>
          </li>

          <li>
            <Link
              className="hover:text-emerald-600 transition-colors"
              to="/salons"
            >
              Salons
            </Link>
          </li>

          <li>
            <Link
              className="hover:text-emerald-600 transition-colors"
              to="/about"
            >
              About
            </Link>
          </li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/">Home</Link>
            <Link to="/salons">Salons</Link>
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
