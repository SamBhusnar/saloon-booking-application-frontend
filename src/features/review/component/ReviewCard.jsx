import { Star, User, Mail, Phone, Store, CalendarDays } from "lucide-react";

/* =========================================================
   HELPERS
========================================================= */

function formatDate(dateString) {
  if (!dateString) {
    return "N/A";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* =========================================================
   STAR RATING
========================================================= */

function Rating({ rating }) {
  const numericRating = Number(rating) || 0;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={17}
          strokeWidth={1.8}
          className={
            star <= numericRating
              ? "fill-amber-400 text-amber-400"
              : "text-slate-300"
          }
        />
      ))}

      <span className="ml-1 text-sm font-semibold text-slate-700">
        {numericRating.toFixed(1)}
      </span>
    </div>
  );
}

/* =========================================================
   REVIEW CARD
========================================================= */

function ReviewCard({ review }) {
  const customer = review?.userDto;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* ===================================================
          TOP SECTION
      =================================================== */}

      <div className="flex items-start justify-between gap-4">
        {/* Customer */}

        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <User size={21} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-slate-900">
              {customer?.fullName || `User #${review?.userId}`}
            </h3>

            <p className="mt-0.5 text-xs text-slate-400">
              Customer #{review?.userId ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Rating */}

        <Rating rating={review?.rating} />
      </div>

      {/* ===================================================
          REVIEW TEXT
      =================================================== */}

      <div className="mt-5 rounded-lg bg-slate-50 p-4">
        <p className="text-sm leading-6 text-slate-700">
          {review?.reviewText || "No review text available."}
        </p>
      </div>

      {/* ===================================================
          CUSTOMER INFORMATION
      =================================================== */}

      <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
        {/* Email */}

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Mail
            size={16}
            strokeWidth={1.8}
            className="shrink-0 text-slate-400"
          />

          <span className="truncate">{customer?.email || "N/A"}</span>
        </div>

        {/* Phone */}

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Phone
            size={16}
            strokeWidth={1.8}
            className="shrink-0 text-slate-400"
          />

          <span>{customer?.phone || "N/A"}</span>
        </div>

        {/* Salon */}

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Store
            size={16}
            strokeWidth={1.8}
            className="shrink-0 text-slate-400"
          />

          <span>Salon #{review?.salonId ?? "N/A"}</span>
        </div>

        {/* Created date */}

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays
            size={16}
            strokeWidth={1.8}
            className="shrink-0 text-slate-400"
          />

          <span>{formatDate(review?.createdAt)}</span>
        </div>
      </div>

      {/* ===================================================
          REVIEW ID
      =================================================== */}

      <div className="mt-4 text-xs text-slate-400">
        Review #{review?.id ?? "N/A"}
      </div>
    </article>
  );
}

export default ReviewCard;
