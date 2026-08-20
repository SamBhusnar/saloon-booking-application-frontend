import React, { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  Store,
  Trash2,
  Loader2,
  Star,
} from "lucide-react";

function ReviewCard({ review, currentUser, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  /*
   * =========================================================
   * CURRENT USER CHECK
   * =========================================================
   */

  const isOwnReview = Number(review.userId) === Number(currentUser?.id);

  /*
   * =========================================================
   * CUSTOMER
   * =========================================================
   */

  const customerName = review.userDto?.fullName || "Unknown Customer";

  const email = review.userDto?.email || "N/A";

  const phone = review.userDto?.phone || "N/A";

  /*
   * =========================================================
   * DATE
   * =========================================================
   */

  const formattedDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  /*
   * =========================================================
   * DELETE
   * =========================================================
   */

  const handleDelete = async () => {
    if (!isOwnReview || isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);

      await onDelete(review.id);
    } finally {
      setIsDeleting(false);
    }
  };

  /*
   * =========================================================
   * STARS
   * =========================================================
   */

  const rating = Number(review.rating || 0);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50">
            <UserRound size={20} className="text-emerald-600" />
          </div>

          {/* Customer */}

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900">
              {customerName}
            </h3>

            <p className="text-xs text-slate-400">Customer #{review.userId}</p>
          </div>
        </div>

        {/* Rating */}

        <div className="flex shrink-0 items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={17}
                className={
                  star <= Math.round(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                }
              />
            ))}
          </div>

          <span className="ml-1 text-sm font-medium text-slate-600">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* =====================================================
          REVIEW TEXT
      ====================================================== */}

      <div className="mt-5 rounded-lg bg-slate-50 p-4">
        <p className="text-sm leading-6 text-slate-700">{review.reviewText}</p>
      </div>

      {/* =====================================================
          INFORMATION
      ====================================================== */}

      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
        {/* Email */}

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Mail size={16} className="shrink-0 text-slate-400" />

          <span className="truncate">{email}</span>
        </div>

        {/* Phone */}

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Phone size={16} className="shrink-0 text-slate-400" />

          <span>{phone}</span>
        </div>

        {/* Salon */}

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Store size={16} className="shrink-0 text-slate-400" />

          <span className="truncate">
            {review.salonName || `Salon #${review.salonId}`}
          </span>
        </div>

        {/* Date */}

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} className="shrink-0 text-slate-400" />

          <span>{formattedDate}</span>
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-xs text-slate-400">Review #{review.id}</span>

        {/*
         * IMPORTANT:
         * Delete button exists ONLY for the review owner.
         */}

        {isOwnReview && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={15} />
                Delete
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;
