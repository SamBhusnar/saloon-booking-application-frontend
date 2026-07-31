import {
  Store,
  LayoutGrid,
  Scissors,
  CalendarClock,
  CreditCard,
  CircleCheckBig,
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Browse Salon",
    description:
      "Explore premium salons, compare ratings, locations and services before making your choice.",
    icon: Store,
  },
  {
    id: "02",
    title: "Select Category",
    description:
      "Choose the service category such as Hair, Beard, Facial, Spa or Makeup.",
    icon: LayoutGrid,
  },
  {
    id: "03",
    title: "Select Services",
    description:
      "Pick one or multiple services that best match your appointment needs.",
    icon: Scissors,
  },
  {
    id: "04",
    title: "Choose Time Slot",
    description:
      "Select your preferred appointment date and available time slot.",
    icon: CalendarClock,
  },
  {
    id: "05",
    title: "Secure Payment",
    description:
      "Complete your booking securely using Razorpay and receive instant confirmation.",
    icon: CreditCard,
  },
];

function HowItWorks() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="text-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            HOW IT WORKS
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            Book Your Appointment
            <span className="text-emerald-600"> in Minutes</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Our booking process is simple, secure and designed to help you
            schedule your next salon visit effortlessly.
          </p>
        </div>

        {/* Timeline */}

        <div className="relative mt-24">
          {/* Vertical Line */}

          <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 rounded-full bg-emerald-100 lg:block"></div>

          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center gap-10 lg:flex-row ${
                    index % 2 === 0 ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Card */}

                  <div className="w-full lg:w-5/12">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                          <Icon className="text-emerald-600" size={30} />
                        </div>

                        <div>
                          <p className="text-sm font-bold text-emerald-600">
                            STEP {step.id}
                          </p>

                          <h3 className="text-2xl font-bold text-slate-900">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-6 leading-8 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Circle */}

                  <div className="relative z-10 hidden lg:flex">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 border-white bg-emerald-600 text-xl font-bold text-white shadow-xl">
                      {step.id}
                    </div>
                  </div>

                  <div className="hidden lg:block lg:w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Card */}

        <div className="mx-auto mt-24 max-w-3xl rounded-3xl bg-gradient-to-r from-emerald-600 to-green-500 p-10 text-center text-white shadow-2xl">
          <CircleCheckBig className="mx-auto" size={60} />

          <h3 className="mt-5 text-3xl font-bold">Appointment Confirmed</h3>

          <p className="mt-4 text-lg text-emerald-100">
            Once your payment is completed, your appointment is instantly
            confirmed. You'll receive a confirmation and can manage or cancel
            your booking anytime before the scheduled appointment.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
