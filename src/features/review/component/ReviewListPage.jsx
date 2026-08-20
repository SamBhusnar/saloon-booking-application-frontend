import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, RefreshCw, SlidersHorizontal, X, Check } from "lucide-react";

import ReviewCard from "./ReviewCard";

import {
  fetchReviewsByOwner,
  fetchReviewsBySalonIds,
  removeReview,
} from "../auth/reviewThunk";

import {salonApi} from "../../redux/salonApi";

function ReviewListPage() {
  const dispatch = useDispatch();

  /*
   * =========================================================
   * AUTH
   * =========================================================
   */

  const currentUser = useSelector((state) => state.auth.user);

  /*
   * =========================================================
   * REVIEW STATE
   * =========================================================
   */

  const {
    reviews = [],
    isLoading,
    error,
  } = useSelector((state) => state.review);

  /*
   * =========================================================
   * LOCAL UI STATE
   * =========================================================
   */

  const [searchTerm, setSearchTerm] = useState("");

  const [showFilter, setShowFilter] = useState(false);

  const [ownerSalons, setOwnerSalons] = useState([]);

  const [selectedSalonIds, setSelectedSalonIds] = useState([]);

  const [isLoadingSalons, setIsLoadingSalons] = useState(false);

  const [salonError, setSalonError] = useState(null);

  const [isFiltered, setIsFiltered] = useState(false);

  /*
   * =========================================================
   * INITIAL LOAD
   *
   * Get all reviews received by salons of current owner.
   * =========================================================
   */

  useEffect(() => {
    dispatch(fetchReviewsByOwner());
  }, [dispatch]);

  /*
   * =========================================================
   * FILTERED SEARCH
   * =========================================================
   */

  const filteredReviews = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) {
      return reviews;
    }

    return reviews.filter((review) => {
      const customerName =
        review.userDto?.fullName ||
        review.userDto?.fullname ||
        review.userDto?.firstName ||
        "";

      const email = review.userDto?.email || "";

      const salonName = review.salonName || "";

      const reviewText = review.reviewText || "";

      const reviewId = String(review.id || "");

      return (
        customerName.toLowerCase().includes(value) ||
        email.toLowerCase().includes(value) ||
        salonName.toLowerCase().includes(value) ||
        reviewText.toLowerCase().includes(value) ||
        reviewId.includes(value)
      );
    });
  }, [reviews, searchTerm]);

  /*
   * =========================================================
   * OPEN FILTER
   *
   * IMPORTANT:
   * We call salon API HERE.
   *
   * We are NOT using salon Redux state.
   * =========================================================
   */

  const handleOpenFilter = async () => {
    setShowFilter(true);
    setSalonError(null);

    /*
     * Don't call API repeatedly if salons have already
     * been loaded for this filter session.
     */

    if (ownerSalons.length > 0) {
      return;
    }

    try {
      setIsLoadingSalons(true);

      const response = await salonApi.getOwnerSalons();

      const salons = Array.isArray(response?.data) ? response.data : [];

      setOwnerSalons(salons);
    } catch (error) {
      console.error("Failed to fetch owner salons:", error);

      setSalonError(
        error?.response?.data?.message || "Failed to load your salons.",
      );
    } finally {
      setIsLoadingSalons(false);
    }
  };

  /*
   * =========================================================
   * CLOSE FILTER
   * =========================================================
   */

  const handleCloseFilter = () => {
    setShowFilter(false);
  };

  /*
   * =========================================================
   * SALON CHECKBOX
   * =========================================================
   */

  const handleSalonCheckbox = (salonId) => {
    setSelectedSalonIds((previous) => {
      const id = Number(salonId);

      if (previous.includes(id)) {
        return previous.filter((selectedId) => selectedId !== id);
      }

      return [...previous, id];
    });
  };

  /*
   * =========================================================
   * SELECT ALL
   * =========================================================
   */

  const handleSelectAll = () => {
    if (selectedSalonIds.length === ownerSalons.length) {
      setSelectedSalonIds([]);
      return;
    }

    setSelectedSalonIds(ownerSalons.map((salon) => Number(salon.id)));
  };

  /*
   * =========================================================
   * APPLY FILTER
   * =========================================================
   */

  const handleProceed = async () => {
    if (selectedSalonIds.length === 0) {
      return;
    }

    try {
      await dispatch(fetchReviewsBySalonIds(selectedSalonIds)).unwrap();

      setIsFiltered(true);
      setShowFilter(false);
    } catch (error) {
      console.error("Failed to filter reviews:", error);
    }
  };

  /*
   * =========================================================
   * CLEAR FILTER
   * =========================================================
   */

  const handleClearFilter = async () => {
    setSelectedSalonIds([]);
    setIsFiltered(false);

    await dispatch(fetchReviewsByOwner()).unwrap();
  };

  /*
   * =========================================================
   * REFRESH
   * =========================================================
   */

  const handleRefresh = () => {
    if (isFiltered && selectedSalonIds.length > 0) {
      dispatch(fetchReviewsBySalonIds(selectedSalonIds));
    } else {
      dispatch(fetchReviewsByOwner());
    }
  };

  /*
   * =========================================================
   * DELETE REVIEW
   * =========================================================
   */

  const handleDeleteReview = async (reviewId) => {
    try {
      await dispatch(removeReview(reviewId)).unwrap();

      /*
       * Re-fetch after successful deletion.
       */

      if (isFiltered && selectedSalonIds.length > 0) {
        dispatch(fetchReviewsBySalonIds(selectedSalonIds));
      } else {
        dispatch(fetchReviewsByOwner());
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="space-y-5">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
            <span className="text-xl text-emerald-600">💬</span>
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">Reviews</h1>

            <p className="text-sm text-slate-500">
              Reviews received from customers of your salons
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* =====================================================
          SEARCH + FILTER
      ====================================================== */}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Search */}

          <div className="relative w-full md:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by customer, review, salon..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Right controls */}

          <div className="flex items-center gap-3">
            {isFiltered && (
              <button
                type="button"
                onClick={handleClearFilter}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <X size={16} />
                Clear Filter
              </button>
            )}

            <button
              type="button"
              onClick={handleOpenFilter}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              <SlidersHorizontal size={16} />
              Filter Reviews
            </button>
          </div>
        </div>

        {/* Count */}

        <div className="mt-3 text-right text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredReviews.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">{reviews.length}</span>{" "}
          reviews
        </div>
      </div>

      {/* =====================================================
          FILTER PANEL
      ====================================================== */}

      {showFilter && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Filter by Salon</h2>

              <p className="mt-1 text-sm text-slate-500">
                Select one or more salons.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseFilter}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>

          {/* Loading salons */}

          {isLoadingSalons && (
            <div className="flex items-center justify-center py-8 text-sm text-slate-500">
              <RefreshCw size={18} className="mr-2 animate-spin" />
              Loading your salons...
            </div>
          )}

          {/* Error */}

          {!isLoadingSalons && salonError && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {salonError}
            </div>
          )}

          {/* Salons */}

          {!isLoadingSalons && !salonError && ownerSalons.length > 0 && (
            <>
              {/* Select all */}

              <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  {selectedSalonIds.length === ownerSalons.length
                    ? "Unselect All"
                    : "Select All"}
                </button>

                <span className="text-sm text-slate-500">
                  {selectedSalonIds.length} selected
                </span>
              </div>

              {/* Checkbox list */}

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {ownerSalons.map((salon) => {
                  const salonId = Number(salon.id);

                  const selected = selectedSalonIds.includes(salonId);

                  return (
                    <label
                      key={salon.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                        selected
                          ? "border-emerald-400 bg-emerald-50"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => handleSalonCheckbox(salonId)}
                        className="sr-only"
                      />

                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                          selected
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {selected && <Check size={14} />}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {salon.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          Salon #{salon.id}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Proceed */}

              <div className="mt-5 flex justify-end border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={handleProceed}
                  disabled={selectedSalonIds.length === 0 || isLoading}
                  className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Proceed
                </button>
              </div>
            </>
          )}

          {/* No salons */}

          {!isLoadingSalons && !salonError && ownerSalons.length === 0 && (
            <div className="py-8 text-center text-sm text-slate-500">
              No salons found.
            </div>
          )}
        </div>
      )}

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =====================================================
          REVIEWS
      ====================================================== */}

      {isLoading ? (
        <div className="flex justify-center py-16">
          <RefreshCw size={28} className="animate-spin text-emerald-600" />
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white py-16 text-center shadow-sm">
          <p className="font-medium text-slate-700">No reviews found</p>

          <p className="mt-1 text-sm text-slate-400">
            There are no reviews matching your current filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              currentUser={currentUser}
              onDelete={handleDeleteReview}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewListPage;


