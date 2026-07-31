import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";

function CTASection() {
  const navigate = useNavigate();

  const handleBooking = () => {
    toast("Please login to continue.");
    setTimeout(() => navigate("/auth"), 1200);
  };

  const handleSalonOwner = () => {
    navigate("/become-member");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 py-24">
      {/* Background Blur */}

      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold tracking-wide text-white backdrop-blur">
          JOIN THE EXPERIENCE
        </span>

        <h2 className="mt-8 max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
          Ready to Experience
          <br />
          Premium Salon Services?
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50">
          Whether you're looking for the perfect salon or want to grow your own
          salon business, we've got everything you need in one place.
        </p>

        <div className="mt-12 flex flex-col gap-5 sm:flex-row">
          <button
            onClick={handleBooking}
            className="flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-emerald-600 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
          >
            Book Appointment
            <ArrowRight size={20} />
          </button>

          <button
            onClick={handleSalonOwner}
            className="rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white hover:text-emerald-600"
          >
            Become Salon Owner
          </button>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-10 text-white">
          <div>
            <h3 className="text-3xl font-bold">500+</h3>
            <p className="mt-2 text-emerald-100">Salons</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">15K+</h3>
            <p className="mt-2 text-emerald-100">Happy Customers</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">50K+</h3>
            <p className="mt-2 text-emerald-100">Bookings</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
