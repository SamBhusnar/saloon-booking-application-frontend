import { Scissors } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function AuthHeader() {

  const { isLoading } = useSelector((state) => state.auth);
  
  return (
    <div className={`mb-8 flex flex-col items-center ${isLoading ? "pointer-events-none opacity-60 cursor-not-allowed" : ""}`}>
      {/* Logo */}

      <Link to="/" className="group flex items-center gap-3">
        <div
          className="
                        flex h-14 w-14 items-center justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-emerald-500
                        to-emerald-700
                        text-white
                        shadow-lg
                        transition
                        duration-300
                        group-hover:scale-105
                    "
        >
          <Scissors size={28} />
        </div>

        <div>
          <h1
            className="
                            text-2xl
                            font-extrabold
                            tracking-tight
                            text-slate-800
                        "
          >
            Salon Booking
          </h1>

          <p
            className="
                            text-sm
                            text-slate-500
                        "
          >
            Book • Manage • Grow
          </p>
        </div>
      </Link>
    </div>
  );
}

export default AuthHeader;
