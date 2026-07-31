import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Do I need an account to book a salon?",
    answer:
      "Yes. You need to create an account and log in before booking an appointment. This allows you to manage bookings, payments, cancellations, and notifications.",
  },
  {
    question: "Can I become a Salon Owner later?",
    answer:
      "Absolutely! Any registered customer can become a Salon Owner by selecting the 'Become Member' option. After approval, you'll be able to create and manage your salons.",
  },
  {
    question: "Can one Salon Owner manage multiple salons?",
    answer:
      "Yes. A single Salon Owner can create and manage multiple salons from the same account.",
  },
  {
    question: "How does appointment booking work?",
    answer:
      "Simply browse salons, choose a category, select one or more services, pick an available time slot, complete the payment, and your appointment will be confirmed instantly.",
  },
  {
    question: "Which payment methods are supported?",
    answer:
      "Currently, the platform supports Razorpay payments. Once your payment is successful, your booking is automatically confirmed.",
  },
  {
    question: "Can I cancel my appointment?",
    answer:
      "Yes. Customers can cancel their appointments according to the cancellation policy configured by the salon.",
  },
  {
    question: "Will I receive booking notifications?",
    answer:
      "Yes. After a successful booking, you'll receive notifications regarding appointment confirmation and future booking updates.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Yes. Payments are processed securely through Razorpay. We never store your payment card details on our servers.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Heading */}

        <div className="text-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-600">
            FAQ
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-800 md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Everything you need to know about booking salons, managing
            appointments, payments, and becoming a salon owner.
          </p>
        </div>

        {/* FAQ List */}

        <div className="mt-16 space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <h3 className="text-lg font-semibold text-slate-800">
                    {faq.question}
                  </h3>

                  {isOpen ? (
                    <Minus size={22} className="text-emerald-600" />
                  ) : (
                    <Plus size={22} className="text-slate-500" />
                  )}
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-8 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
