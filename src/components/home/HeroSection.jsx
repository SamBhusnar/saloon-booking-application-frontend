import { ArrowDown, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center text-white">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 backdrop-blur-sm">
          <PlayCircle size={18} />
          <span className="text-sm font-medium">
            Trusted Salon Booking Platform
          </span>
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
          Book Your Next
          <br />
          Salon Appointment
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 md:text-xl">
          Discover premium salons, compare services, book appointments instantly
          and pay securely from anywhere.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/salons"
            className="rounded-lg bg-emerald-600 px-8 py-4 font-semibold transition hover:bg-emerald-700"
          >
            Explore Salons
          </Link>

          <Link
            to="/become-member"
            className="rounded-lg border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-black"
          >
            Become Salon Owner
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-20 flex flex-col items-center animate-bounce">
          <ArrowDown size={28} />

          <span className="mt-2 text-sm tracking-widest uppercase">Scroll</span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
