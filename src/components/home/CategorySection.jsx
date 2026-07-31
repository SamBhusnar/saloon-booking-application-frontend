import {
  Scissors,
  UserRound,
  Sparkles,
  Flower2,
  Brush,
  Hand,
} from "lucide-react"; 
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Hair",
    description: "Haircut, Styling & Coloring",
    icon: Scissors,
  },
  {
    id: 2,
    name: "Beard",
    description: "Trim, Shape & Grooming",
    icon: UserRound,
  },
  {
    id: 3,
    name: "Facial",
    description: "Clean-up & Skin Care",
    icon: Sparkles,
  },
  {
    id: 4,
    name: "Spa",
    description: "Relaxation & Wellness",
    icon: Flower2,
  },
  {
    id: 5,
    name: "Makeup",
    description: "Professional Makeup",
    icon: Brush,
  },
  {
    id: 6,
    name: "Nails",
    description: "Manicure & Pedicure",
    icon: Hand,
  },
];

function CategorySection() {


  const navigate = useNavigate();

const handleExplore = () => {
toast("Please login to continue.", {
    icon: "ℹ️",
    style: {
        border: "1px solid #3b82f6",
        background: "#eff6ff",
        color: "#1e40af",
    },
});

  setTimeout(() => {
   navigate("/login", {
     state: {
       redirectTo: "/salons",
     },
   });;
  }, 1000);
};



  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="text-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            OUR CATEGORIES
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            Discover Our
            <span className="text-emerald-600"> Service Categories</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Browse a variety of salon services designed to meet your beauty,
            grooming and wellness needs.
          </p>
        </div>

        {/* Grid */}

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.id}
                className="group cursor-pointer rounded-3xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100 transition-all duration-300 group-hover:bg-emerald-600">
                  <Icon
                    size={38}
                    className="text-emerald-600 transition-all duration-300 group-hover:text-white"
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {category.name}
                </h3>

                <p className="mt-3 text-slate-600 leading-7">
                  {category.description}
                </p>

                <button
                  onClick={handleExplore}
                  className="mt-8 font-semibold text-emerald-600 transition group-hover:translate-x-2"
                >
                  Explore →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
