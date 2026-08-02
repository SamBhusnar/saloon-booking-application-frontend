import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function AuthLinks({
  question,
  actionText,
  actionTo,
  secondaryText,
  secondaryTo,
  showBackHome = true,
}) {
  return (
    <div className="mt-8 space-y-5">
      {/* Primary Link */}

      {question && actionText && (
        <p className="text-center text-sm text-slate-600">
          {question}{" "}
          <Link
            to={actionTo}
            className="
                            font-semibold
                            text-emerald-600
                            transition
                            hover:text-emerald-700
                            hover:underline
                        "
          >
            {actionText}
          </Link>
        </p>
      )}

      {/* Secondary Link */}

      {secondaryText && (
        <Link
          to={secondaryTo}
          className="
                        block
                        rounded-xl
                        border-2
                        border-emerald-600
                        py-3
                        text-center
                        font-semibold
                        text-emerald-600
                        transition
                        hover:bg-emerald-50
                    "
        >
          {secondaryText}
        </Link>
      )}

      {/* Back Home */}

      {showBackHome && (
        <div className="flex justify-center">
          <Link
            to="/"
            className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-slate-500
                            transition
                            hover:text-emerald-600
                        "
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}

export default AuthLinks;
