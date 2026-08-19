import { useEffect, useMemo, useState } from "react";

import { RefreshCw, Search, Star, MessageSquare } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { getReviewsBySalonOwner } from "../../../features/review/auth/reviewThunk";

import ReviewCard from "./ReviewCard";

/* =========================================================
   REVIEW LIST PAGE
========================================================= */

function ReviewListPage() {
  const dispatch = useDispatch();

  const { reviews, status, error, loading } = useSelector(
    (state) => state.review,
  );

  /* =======================================================
     SEARCH
  ======================================================= */

  const [searchTerm, setSearchTerm] = useState("");

  /* =======================================================
     FETCH REVIEWS
  ======================================================= */

  useEffect(() => {
    dispatch(getReviewsBySalonOwner());
  }, [dispatch]);

  /* =======================================================
     FILTER REVIEWS
  ======================================================= */

  const filteredReviews = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return reviews;
    }

    return reviews.filter((review) => {
      const customer = review?.userDto;

      return (
        String(review?.id ?? "")
          .toLowerCase()
          .includes(search) ||
        String(review?.salonId ?? "")
          .toLowerCase()
          .includes(search) ||
        String(review?.userId ?? "")
          .toLowerCase()
          .includes(search) ||
        String(review?.rating ?? "")
          .toLowerCase()
          .includes(search) ||
        String(review?.reviewText ?? "")
          .toLowerCase()
          .includes(search) ||
        String(customer?.fullName ?? "")
          .toLowerCase()
          .includes(search) ||
        String(customer?.email ?? "")
          .toLowerCase()
          .includes(search) ||
        String(customer?.phone ?? "")
          .toLowerCase()
          .includes(search)
      );
    });
  }, [reviews, searchTerm]);

  /* =======================================================
     REFRESH
  ======================================================= */

  const handleRefresh = () => {
    dispatch(getReviewsBySalonOwner());
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading.fetchReviews && reviews.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

          <p className="mt-4 text-sm text-slate-500">Loading reviews...</p>
        </div>
      </div>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="space-y-5">
      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <MessageSquare size={22} strokeWidth={1.8} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">Reviews</h1>

            <p className="mt-0.5 text-sm text-slate-500">
              Reviews received from customers of your salons
            </p>
          </div>
        </div>

        {/* Refresh */}

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading.fetchReviews}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={loading.fetchReviews ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* ===================================================
          ERROR
      =================================================== */}

      {status === "failed" && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error?.message || "Failed to load reviews."}
        </div>
      )}

      {/* ===================================================
          SEARCH + COUNT
      =================================================== */}

      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}

        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            strokeWidth={1.8}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by customer, review, salon..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Count */}

        <div className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredReviews.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">{reviews.length}</span>{" "}
          reviews
        </div>
      </div>

      {/* ===================================================
          EMPTY STATE
      =================================================== */}

      {filteredReviews.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Star size={22} strokeWidth={1.8} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-800">
            No reviews found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {searchTerm
              ? "Try changing your search."
              : "Your salons have not received any reviews yet."}
          </p>
        </div>
      ) : (
        /* =================================================
           REVIEW CARDS
        ================================================= */

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewListPage;
