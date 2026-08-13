
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  ImageOff,
  Scissors,
  Check,
  Loader2,
  CalendarDays,
  Images,
} from "lucide-react";

import { getSalonById } from "../../features/redux/salonThunk";

import { getCategoriesBySalonId } from "../../features/category/auth/categoryThunk";

import { getServicesByCategoryAndSalon } from "../../features/service/auth/serviceOfferingThunk";

/*
 * Change this import path later according to your project structure.
 */
import { useBookingBasePath } from "../../hooks/useBookingBasePath";

function SalonDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imageIntervalRef = useRef(null);

  const { salonId } = useParams();

  /*
   * =========================================================
   * BOOKING BASE PATH
   * =========================================================
   *
   * Example:
   *
   * Owner:
   *   /owner/booking
   *
   * Customer:
   *   /customer/booking
   *
   * Admin:
   *   /admin/booking
   *
   * The actual value is controlled by useBookingBasePath().
   */

  const bookingBasePath = useBookingBasePath();

  /*
   * =========================================================
   * ROUTES
   * ========================================================= 
   *
   * Keep all booking-related navigation relative to the
   * booking base path.
   */

  const salonsPath = `${bookingBasePath}/booking/salons`;

  const bookingDetailsPath = `${bookingBasePath}/salons/booking/details`;

  /* =========================================================
     LOCAL STATE
  ========================================================= */

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [selectedServiceIds, setSelectedServiceIds] = useState(new Set());

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [imageError, setImageError] = useState(false);

  /* =========================================================
     SALON STATE
  ========================================================= */

  const {
    currentSalon,
    loading: salonLoading,
    error: salonError,
  } = useSelector((state) => state.salon);

  /* =========================================================
     CATEGORY STATE
  ========================================================= */

  const {
    categories = [],
    loading: categoryLoading,
    error: categoryError,
  } = useSelector((state) => state.category);

  /* =========================================================
     SERVICE STATE
  ========================================================= */

  const {
    categoryServices = [],
    loading: serviceLoading,
    error: serviceError,
  } = useSelector((state) => state.serviceOffering);

  /* =========================================================
     LOAD SALON
  ========================================================= */

  useEffect(() => {
    if (!salonId) return;

    dispatch(getSalonById(Number(salonId)));
  }, [dispatch, salonId]);

  /* =========================================================
     LOAD CATEGORIES
  ========================================================= */

  useEffect(() => {
    if (!salonId) return;

    dispatch(getCategoriesBySalonId(Number(salonId)));
  }, [dispatch, salonId]);

  /* =========================================================
     CLEANUP IMAGE INTERVAL
  ========================================================= */

  useEffect(() => {
    return () => {
      clearInterval(imageIntervalRef.current);
    };
  }, []);

  /* =========================================================
     SALON IMAGES
  =========================================================
     
     Backend:
     
     Map<String, String>
     
     publicId -> secureUrl

     Example:
     
     {
       "salon/image1": "https://....",
       "salon/image2": "https://....",
       "salon/image3": "https://...."
     }
  ========================================================= */

  const salonImages = useMemo(() => {
    if (
      currentSalon?.images &&
      typeof currentSalon.images === "object" &&
      !Array.isArray(currentSalon.images)
    ) {
      return Object.values(currentSalon.images).filter(
        (image) => typeof image === "string" && image.trim().length > 0,
      );
    }

    /*
     * Backward compatibility:
     * If backend still sends a single image.
     */
    if (currentSalon?.image) {
      return [currentSalon.image];
    }

    return [];
  }, [currentSalon]);

  /* =========================================================
     RESET IMAGE INDEX WHEN SALON CHANGES
  ========================================================= */

  useEffect(() => {
    setCurrentImageIndex(0);
    setImageError(false);

    /*
     * Also stop any running slideshow when salon changes.
     */
    clearInterval(imageIntervalRef.current);
    imageIntervalRef.current = null;
  }, [salonId]);

  /* =========================================================
     START IMAGE SLIDESHOW
  ========================================================= */

  const handleImageMouseEnter = () => {
    if (salonImages.length <= 1) return;

    /*
     * Prevent multiple intervals from being created if
     * mouseenter fires more than once.
     */
    if (imageIntervalRef.current) return;

    imageIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((previous) => {
        return (previous + 1) % salonImages.length;
      });
    }, 1000);
  };

  /* =========================================================
     STOP IMAGE SLIDESHOW
  ========================================================= */

  const handleImageMouseLeave = () => {
    clearInterval(imageIntervalRef.current);
    imageIntervalRef.current = null;
  };

  /* =========================================================
     SELECT CATEGORY
  ========================================================= */

  const handleCategorySelect = (categoryId) => {
    const id = Number(categoryId);

    setSelectedCategoryId(id);

    /*
     * Services from previous category should no longer
     * remain selected.
     */
    setSelectedServiceIds(new Set());

    dispatch(
      getServicesByCategoryAndSalon({
        salonId: Number(salonId),
        categoryId: id,
      }),
    );
  };

  /* =========================================================
     SELECT / UNSELECT SERVICE
  ========================================================= */

  const handleServiceToggle = (serviceId) => {
    const id = Number(serviceId);

    setSelectedServiceIds((previous) => {
      const updated = new Set(previous);

      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }

      return updated;
    });
  };

  /* =========================================================
     SELECTED SERVICES
  ========================================================= */

  const selectedServices = useMemo(() => {
    if (!categoryServices?.length || !selectedServiceIds.size) {
      return [];
    }

    return categoryServices.filter((service) =>
      selectedServiceIds.has(Number(service.id)),
    );
  }, [categoryServices, selectedServiceIds]);

  /* =========================================================
     TOTAL PRICE
  ========================================================= */

  const totalPrice = useMemo(() => {
    return selectedServices.reduce(
      (total, service) => total + Number(service?.price || 0),
      0,
    );
  }, [selectedServices]);

  /* =========================================================
     TOTAL DURATION
  ========================================================= */

  const totalDuration = useMemo(() => {
    return selectedServices.reduce(
      (total, service) => total + Number(service?.duration || 0),
      0,
    );
  }, [selectedServices]);

  /* =========================================================
     PROCEED TO BOOKING
  ========================================================= */

  const handleProceed = () => {
    if (!salonId) {
      toast.error("Salon ID is missing.");
      return;
    }

    if (!selectedCategoryId) {
      toast.error("Please select a category.");
      return;
    }

    if (selectedServiceIds.size === 0) {
      toast.error("Please select at least one service.");
      return;
    }

    navigate(bookingDetailsPath, {
      state: {
        salonId: Number(salonId),

        categoryId: Number(selectedCategoryId),

        serviceIds: Array.from(selectedServiceIds),

        selectedServices,

        totalPrice,

        totalDuration,
      },
    });
  };

  /* =========================================================
     BACK
  ========================================================= */

  const handleBack = () => {
    navigate(salonsPath);
  };

  /* =========================================================
     INVALID SALON ID
  ========================================================= */

  if (!salonId) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Invalid Salon
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Salon ID is missing.
          </p>

          <button
            type="button"
            onClick={() => navigate(salonsPath)}
            className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
          >
            Browse Salons
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     SALON LOADING
  ========================================================= */

  if (salonLoading?.fetch) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2
            size={35}
            className="mx-auto animate-spin text-emerald-600"
          />

          <p className="mt-4 text-sm text-slate-500">
            Loading salon...
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     SALON ERROR
  ========================================================= */

  if (salonError && !currentSalon) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Unable to load salon
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {salonError?.message ||
              salonError?.error ||
              "Something went wrong while loading the salon."}
          </p>

          <button
            type="button"
            onClick={() => dispatch(getSalonById(Number(salonId)))}
            className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     SALON NOT FOUND
  ========================================================= */

  if (!currentSalon) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Salon not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The requested salon could not be found.
          </p>

          <button
            type="button"
            onClick={() => navigate(salonsPath)}
            className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
          >
            Browse Salons
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     SALON DATA
  ========================================================= */

  const salon = currentSalon;

  const rating = Number(salon?.rating || 0);

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="pb-10">

      {/* =====================================================
          BACK
      ===================================================== */}

      <button
        type="button"
        onClick={handleBack}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={17} />

        Back to Salons
      </button>

      {/* =====================================================
          SALON HERO
      ===================================================== */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {/* ===================================================
            IMAGE AREA
        =================================================== */}

        <div
          className="group relative h-72 overflow-hidden bg-slate-100 sm:h-96 lg:h-[450px]"
          onMouseEnter={handleImageMouseEnter}
          onMouseLeave={handleImageMouseLeave}
        >
          {salonImages.length > 0 && !imageError ? (
            <>
              <img
                key={salonImages[currentImageIndex]}
                src={salonImages[currentImageIndex]}
                alt={`${salon?.name || "Salon"} ${
                  currentImageIndex + 1
                }`}
                onError={() => setImageError(true)}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Dark gradient */}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

              {/* Image count */}

              {salonImages.length > 1 && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  <Images size={14} />

                  {currentImageIndex + 1}
                  {" / "}
                  {salonImages.length}
                </div>
              )}

              {/* Image indicators */}

              {salonImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {salonImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Show image ${index + 1}`}
                      onClick={(event) => {
                        event.stopPropagation();

                        setCurrentImageIndex(index);
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        currentImageIndex === index
                          ? "w-7 bg-white"
                          : "w-2 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Hover hint */}

              {salonImages.length > 1 && (
                <div className="pointer-events-none absolute right-4 bottom-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  Move away to stop
                </div>
              )}
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-slate-400">
              <ImageOff size={60} />

              <p className="mt-3 text-sm">
                No salon image
              </p>
            </div>
          )}

          {/* =================================================
              RATING
          ================================================= */}

          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-800 shadow-lg backdrop-blur-sm">
            <Star
              size={16}
              className="fill-amber-400 text-amber-400"
            />

            {rating.toFixed(1)}
          </div>
        </div>

        {/* ===================================================
            SALON INFORMATION
        =================================================== */}

        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {salon?.name}
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
                {salon?.description ||
                  "No description available."}
              </p>
            </div>

            <div className="shrink-0 rounded-2xl bg-emerald-50 px-5 py-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
                Salon ID
              </p>

              <p className="mt-1 text-xl font-bold text-emerald-800">
                #{salon?.id}
              </p>
            </div>
          </div>

          {/* =================================================
              CONTACT / LOCATION
          ================================================= */}

          <div className="mt-7 grid gap-5 border-t border-slate-100 pt-7 sm:grid-cols-2 lg:grid-cols-4">

            {/* Location */}

            <div className="flex gap-3">
              <MapPin
                size={19}
                className="mt-0.5 shrink-0 text-emerald-600"
              />

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Location
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {salon?.city || "N/A"}
                </p>

                <p className="mt-0.5 text-xs leading-5 text-slate-500">
                  {salon?.address || "N/A"}
                </p>
              </div>
            </div>

            {/* Phone */}

            <div className="flex gap-3">
              <Phone
                size={19}
                className="mt-0.5 shrink-0 text-emerald-600"
              />

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Phone
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {salon?.phoneNumber || "N/A"}
                </p>
              </div>
            </div>

            {/* Email */}

            <div className="flex min-w-0 gap-3">
              <Mail
                size={19}
                className="mt-0.5 shrink-0 text-emerald-600"
              />

              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">
                  Email
                </p>

                <p className="mt-1 truncate text-sm font-medium text-slate-700">
                  {salon?.email || "N/A"}
                </p>
              </div>
            </div>

            {/* Opening Hours */}

            <div className="flex gap-3">
              <Clock
                size={19}
                className="mt-0.5 shrink-0 text-emerald-600"
              />

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Opening Hours
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {salon?.openTime || "N/A"} -{" "}
                  {salon?.closeTime || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          REVIEWS
      ===================================================== */}

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Reviews
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              See what customers say about this salon.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2">
            <Star
              size={18}
              className="fill-amber-400 text-amber-400"
            />

            <span className="font-bold text-slate-800">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-sm text-slate-500">
            Reviews will appear here.
          </p>
        </div>
      </section>

      {/* =====================================================
          CATEGORY + SERVICE SELECTION
      ===================================================== */}

      <section className="mt-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Choose Your Services
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select a category and then choose one or more
            services.
          </p>
        </div>

        {/* ===================================================
            CATEGORY
        =================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Scissors size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Select Category
              </h3>

              <p className="text-xs text-slate-500">
                Choose a category to see available services.
              </p>
            </div>
          </div>

          {/* Category Loading */}

          {categoryLoading?.fetch && (
            <div className="mt-6 flex items-center justify-center py-8">
              <Loader2
                size={25}
                className="animate-spin text-emerald-600"
              />

              <span className="ml-3 text-sm text-slate-500">
                Loading categories...
              </span>
            </div>
          )}

          {/* Category Error */}

          {categoryError && (
            <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
              {categoryError?.message ||
                categoryError?.error ||
                "Unable to load categories."}
            </div>
          )}

          {/* Categories */}

          {!categoryLoading?.fetch &&
            categories.length > 0 && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => {
                  const isSelected =
                    Number(selectedCategoryId) ===
                    Number(category.id);

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() =>
                        handleCategorySelect(category.id)
                      }
                      className={`group flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                          : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50"
                      }`}
                    >
                      {/* Category Image */}

                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        {category?.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Scissors
                              size={22}
                              className="text-slate-300"
                            />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-slate-900">
                          {category.name}
                        </p>

                        <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                          {category.description ||
                            "Explore available services."}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                          <Check size={15} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

          {/* No Categories */}

          {!categoryLoading?.fetch &&
            !categoryError &&
            categories.length === 0 && (
              <div className="mt-6 rounded-xl border border-dashed border-slate-300 py-10 text-center">
                <Scissors
                  size={35}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 font-medium text-slate-700">
                  No categories available
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  This salon currently has no service
                  categories.
                </p>
              </div>
            )}
        </div>

        {/* ===================================================
            SERVICES
        =================================================== */}

        {selectedCategoryId && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <h3 className="text-xl font-bold text-slate-900">
                Available Services
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Select one or more services for your
                appointment.
              </p>
            </div>

            {/* Service Loading */}

            {serviceLoading?.fetchByCategoryAndSalon && (
              <div className="flex items-center justify-center py-12">
                <Loader2
                  size={28}
                  className="animate-spin text-emerald-600"
                />

                <span className="ml-3 text-sm text-slate-500">
                  Loading services...
                </span>
              </div>
            )}

            {/* Service Error */}

            {serviceError?.fetchByCategoryAndSalon && (
              <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {serviceError?.fetchByCategoryAndSalon
                  ?.message ||
                  serviceError?.fetchByCategoryAndSalon
                    ?.error ||
                  serviceError?.fetchByCategoryAndSalon ||
                  "Unable to load services."}
              </div>
            )}

            {/* Services */}

            {!serviceLoading?.fetchByCategoryAndSalon &&
              !serviceError?.fetchByCategoryAndSalon &&
              categoryServices.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => {
                    const serviceId = Number(service.id);

                    const isSelected =
                      selectedServiceIds.has(serviceId);

                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() =>
                          handleServiceToggle(service.id)
                        }
                        className={`relative overflow-hidden rounded-xl border text-left transition ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                            : "border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm"
                        }`}
                      >
                        {/* Service Image */}

                        <div className="h-40 overflow-hidden bg-slate-100">
                          {service?.image ? (
                            <img
                              src={service.image}
                              alt={service.name}
                              className="h-full w-full object-cover transition duration-500 hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Scissors
                                size={35}
                                className="text-slate-300"
                              />
                            </div>
                          )}
                        </div>

                        {/* Selection */}

                        <div
                          className={`absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border ${
                            isSelected
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-white bg-white/90 text-transparent"
                          }`}
                        >
                          <Check size={16} />
                        </div>

                        {/* Service Content */}

                        <div className="p-4">
                          <h4 className="font-semibold text-slate-900">
                            {service.name}
                          </h4>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                            {service.description ||
                              "No description available."}
                          </p>

                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-lg font-bold text-emerald-700">
                              ₹{service.price ?? 0}
                            </span>

                            <span className="flex items-center gap-1 text-xs text-slate-500">
                              <Clock size={14} />

                              {service.duration ?? 0} min
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

            {/* No Services */}

            {!serviceLoading?.fetchByCategoryAndSalon &&
              !serviceError?.fetchByCategoryAndSalon &&
              categoryServices.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
                  <Scissors
                    size={38}
                    className="mx-auto text-slate-300"
                  />

                  <h4 className="mt-4 font-semibold text-slate-800">
                    No services available
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    This category currently has no services.
                  </p>
                </div>
              )}
          </div>
        )}
      </section>

      {/* =====================================================
          BOOKING SUMMARY
      ===================================================== */}

      {selectedServiceIds.size > 0 && (
        <div className="sticky bottom-4 z-20 mt-8">
          <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              {/* Summary */}

              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CalendarDays size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      Booking Summary
                    </p>

                    <p className="text-xs text-slate-500">
                      {selectedServiceIds.size} service
                      {selectedServiceIds.size !== 1
                        ? "s"
                        : ""}{" "}
                      selected
                    </p>
                  </div>
                </div>
              </div>

              {/* Price / Duration */}

              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-slate-500">
                    Total Duration
                  </p>

                  <p className="font-semibold text-slate-800">
                    {totalDuration} min
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Total Price
                  </p>

                  <p className="text-xl font-bold text-emerald-700">
                    ₹{totalPrice}
                  </p>
                </div>
              </div>

              {/* Proceed */}

              <button
                type="button"
                onClick={handleProceed}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Proceed to Booking

                <ArrowLeft
                  size={18}
                  className="rotate-180"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalonDetailsPage;

