import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Store, RefreshCw, Plus, MapPin } from "lucide-react";

import {
  getSalonDirectory,
  getAllSalons,
} from "../../features/redux/salonThunk";

import SalonBookingCard from "./SalonBookingCard";

/*
 * =========================================================
 * CHANGE THIS IMPORT PATH LATER
 * =========================================================
 */

import useBookingBasePath from "../../hooks/useBookingBasePath";

/*
 * =========================================================
 * SALON DISCOVERY PAGE
 * =========================================================
 *
 * This page is reusable for:
 *
 *      /owner/booking/salons
 *      /customer/booking/salons
 *      /admin/booking/salons
 *
 * The page does NOT hardcode the role into the booking
 * navigation.
 *
 * useBookingBasePath() detects the current URL:
 *
 *      /owner    -> /owner
 *      /customer -> /customer
 *      /admin    -> /admin
 *
 * Therefore:
 *
 * Owner:
 *      /owner/booking/salons
 *          ↓
 *      /owner/booking/salons/:salonId
 *
 * Customer:
 *      /customer/booking/salons
 *          ↓
 *      /customer/booking/salons/:salonId
 *
 * Admin:
 *      /admin/booking/salons
 *          ↓
 *      /admin/booking/salons/:salonId
 *
 * The same component is reused for all three.
 * =========================================================
 */

function SalonDiscoveryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*
   * =========================================================
   * BOOKING BASE PATH
   * =========================================================
   *
   * Example:
   *
   * pathname:
   *      /owner/booking/salons
   *
   * bookingBasePath:
   *      /owner
   *
   */

  const bookingBasePath = useBookingBasePath();

  /*
   * =========================================================
   * AUTH
   * =========================================================
   */

  const { user } = useSelector((state) => state.auth);

  /*
   * =========================================================
   * SALON STATE
   * =========================================================
   */

  const { salons, mySalons, otherSalons, loading, error } = useSelector(
    (state) => state.salon,
  );

  /*
   * =========================================================
   * ROLE
   * =========================================================
   *
   * Role is still used only for determining which salon
   * data should be displayed.
   *
   * It is NOT used for constructing booking URLs.
   * =========================================================
   */

  const roles = user?.roles || [];

  const isSalonOwner = roles.includes("SALON_OWNER");

  /*
   * =========================================================
   * LOAD SALON DIRECTORY
   * =========================================================
   *
   * SALON_OWNER:
   *
   *      getSalonDirectory()
   *
   *      -> mySalons
   *      -> otherSalons
   *
   *
   * CUSTOMER / ADMIN:
   *
   *      getAllSalons()
   *
   *      -> salons
   * =========================================================
   */

  useEffect(() => {
    if (!user) return;

    if (isSalonOwner) {
      dispatch(getSalonDirectory());
    } else {
      dispatch(getAllSalons());
    }
  }, [dispatch, user, isSalonOwner]);

  /*
   * =========================================================
   * DATA NORMALIZATION
   * =========================================================
   */

  const ownerSalons = mySalons || [];

  const outsideSalons = otherSalons || [];
  console.log("otsideSalons", outsideSalons);

  const allSalonList = salons || [];

  /*
   * =========================================================
   * OWNER WITH SALONS
   * =========================================================
   */

  // const ownerHasSalons =
  //   isSalonOwner && ownerSalons.length > 0;

  // -----------

  const ownerHasSalons = isSalonOwner && ownerSalons.length > 0;

  const hasOtherSalons = isSalonOwner && outsideSalons.length > 0;

  const hasAllSalons = !isSalonOwner && allSalonList.length > 0;

  // -------------

  /*
   * =========================================================
   * ALL SALONS
   * =========================================================
   */

  // const displayAllSalons =
  //   !isSalonOwner || !ownerHasSalons;

  /*
   * =========================================================
   * BOOK SALON
   * =========================================================
   *
   * IMPORTANT:
   *
   * There is NO:
   *
   *      /owner
   *
   *      /customer
   *
   *      /admin
   *
   * hardcoded here.
   *
   * The current URL determines the base path.
   *
   * Example:
   *
   * /owner/booking/salons
   *
   *      ↓
   *
   * /owner
   *
   *      ↓
   *
   * /owner/booking/salons/10
   *
   * =========================================================
   */

  const handleBookSalon = (salon) => {
    if (!salon?.id) return;

    if (!bookingBasePath) {
      console.error("Unable to determine booking base path.");

      return;
    }

    navigate(`${bookingBasePath}/booking/salons/${salon.id}`);
  };

  /*
   * =========================================================
   * RETRY
   * =========================================================
   */

  const handleRetry = () => {
    if (isSalonOwner) {
      dispatch(getSalonDirectory());
    } else {
      dispatch(getAllSalons());
    }
  };

  /*
   * =========================================================
   * INVALID USER
   * =========================================================
   */

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Unable to load salons
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            User information is not available.
          </p>
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (loading?.fetch) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <RefreshCw size={28} className="animate-spin text-emerald-600" />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-slate-800">
            Finding salons...
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Please wait while we load available salons.
          </p>
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * ERROR
   * =========================================================
   */

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <Store size={28} className="text-red-500" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Unable to load salons
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error?.message ||
              error?.error ||
              "Something went wrong while loading salons."}
          </p>

          <button
            type="button"
            onClick={handleRetry}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <RefreshCw size={17} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * EMPTY STATE
   * =========================================================
   */

  const hasAnySalon = isSalonOwner
    ? ownerSalons.length > 0 || outsideSalons.length > 0
    : allSalonList.length > 0;

  /*
   * =========================================================
   * PAGE
   * =========================================================
   */

  return (
    <div className="pb-10">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <Store size={25} />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Salons
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Discover salons and book the services you need.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            OWNER CREATE SALON
        ================================================= */}

        {isSalonOwner && (
          <button
            type="button"
            onClick={() => navigate("/owner/salons/create")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <Plus size={18} />
            Add Salon
          </button>
        )}
      </div>

      {/* =====================================================
          QUICK INFO
      ===================================================== */}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
              <Store size={20} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Available
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {isSalonOwner
                  ? ownerSalons.length + outsideSalons.length
                  : allSalonList.length}
              </p>
            </div>
          </div>
        </div>

        {isSalonOwner && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                <Store size={20} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  My Salons
                </p>

                <p className="text-2xl font-bold text-slate-900">
                  {ownerSalons.length}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-100 p-2.5 text-slate-600">
              <MapPin size={20} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Browse
              </p>

              <p className="text-sm font-semibold text-slate-800">
                Find your salon
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
    EMPTY STATE
===================================================== */}

      {!hasAnySalon && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <Store size={30} className="text-slate-400" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-800">
            No salons available
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            There are currently no salons available for booking.
          </p>

          {isSalonOwner && (
            <button
              type="button"
              onClick={() => navigate("/owner/salons/create")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <Plus size={18} />
              Create Your First Salon
            </button>
          )}
        </div>
      )}

      {/* =====================================================
    SALON SECTIONS
===================================================== */}

      {hasAnySalon && (
        <div className="space-y-12">
          {/* =================================================
        MY SALONS
    ================================================= */}

          {ownerHasSalons && (
            <section>
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    My Salons
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Salons owned by you.
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                  {ownerSalons.length}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {ownerSalons.map((salon) => (
                  <SalonBookingCard
                    key={salon.id}
                    salon={salon}
                    onBook={() => handleBookSalon(salon)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* =================================================
        OTHER SALONS
    ================================================= */}

          {isSalonOwner && outsideSalons.length > 0 && (
            <section>
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Other Salons
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Salons owned by other salon owners.
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                  {outsideSalons.length}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {outsideSalons.map((salon) => (
                  <SalonBookingCard
                    key={salon.id}
                    salon={salon}
                    onBook={() => handleBookSalon(salon)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* =================================================
        ALL SALONS — CUSTOMER / ADMIN
    ================================================= */}

          {!isSalonOwner && allSalonList.length > 0 && (
            <section>
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    All Salons
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Explore all available salons.
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                  {allSalonList.length}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {allSalonList.map((salon) => (
                  <SalonBookingCard
                    key={salon.id}
                    salon={salon}
                    onBook={() => handleBookSalon(salon)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default SalonDiscoveryPage;
 