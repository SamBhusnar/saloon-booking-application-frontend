import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    review:
      "Booking appointments has never been this easy. The interface is clean, payment was smooth, and the salon experience was amazing.",
    initials: "PS",
  },
  {
    name: "Rahul Patil",
    role: "Business Owner",
    review:
      "I found an excellent salon within minutes. The appointment reminders and booking process were seamless.",
    initials: "RP",
  },
  {
    name: "Sneha Kulkarni",
    role: "Fashion Designer",
    review:
      "Absolutely loved the experience. I could compare services, choose my preferred stylist, and book instantly.",
    initials: "SK",
  },
  {
    name: "Amit Deshmukh",
    role: "Fitness Coach",
    review:
      "Fast, simple, and reliable. The platform helped me discover quality salons near me without wasting time.",
    initials: "AD",
  },
  {
    name: "Neha Joshi",
    role: "Student",
    review:
      "The UI is beautiful and very easy to use. Payment confirmation was instant and everything worked perfectly.",
    initials: "NJ",
  },
  {
    name: "Vaibhav Bhusnar",
    role: "Entrepreneur",
    review:
      "As a salon owner, managing bookings became effortless. Everything is available in one place with a clean dashboard.",
    initials: "VB",
  },
];

function Testimonials() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="text-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-600">
            TESTIMONIALS
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-800 md:text-5xl">
            Loved by Customers
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Thousands of customers trust our platform to discover the best
            salons, schedule appointments, and enjoy a hassle-free booking
            experience.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Stars */}

              <div className="mb-5 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}

              <p className="leading-8 text-slate-600">"{item.review}"</p>

              {/* User */}

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white">
                  {item.initials}
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800">{item.name}</h4>

                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
