import {
  CalendarCheck,
  CreditCard,
  Star,
  Store,
  BellRing,
  ChartColumn,
} from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    description:
      "Book salon appointments by selecting services and your preferred time slot.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Complete your booking using secure online payments powered by Razorpay.",
  },
  {
    icon: Star,
    title: "Verified Salons",
    description:
      "Explore trusted salons, compare services, and book with confidence.",
  },
  {
    icon: Store,
    title: "Multi-Salon Management",
    description:
      "Salon owners can manage multiple salons, categories, and services from one place.",
  },
  {
    icon: BellRing,
    title: "Notifications",
    description:
      "Receive booking confirmations and important appointment updates instantly.",
  },
  {
    icon: ChartColumn,
    title: "Business Dashboard",
    description:
      "Track bookings and earnings with interactive reports and charts.",
  },
];

function FeatureSection() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Why Choose SalonBook?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Everything you need to discover salons, book appointments, manage
            businesses, and enjoy a seamless salon experience.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100">
                  <Icon size={28} className="text-emerald-600" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
