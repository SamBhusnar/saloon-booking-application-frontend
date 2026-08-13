
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  CalendarDays,
  ImageOff,
} from "lucide-react";

// Change this import path later according to your project structure.
import useBookingBasePath from "../../hooks/useBookingBasePath";

function SalonBookingCard({ salon }) {
  const navigate = useNavigate();

  /*
   * =========================================================
   * BOOKING BASE PATH
   * =========================================================
   *
   * Example:
   *
   * useBookingBasePath() -> "/owner/booking"
   *
   * Therefore:
   *
   * /owner/booking/salons/${salonId}
   *
   * The component no longer knows which user/role owns
   * the booking route.
   */
  const bookingBasePath = useBookingBasePath();

  /* ===========================
     SALON DATA
  =========================== */

  const salonId = salon?.id;

  const name = salon?.name || "Unnamed Salon";

  const rating = salon?.rating ?? 0;

  const city = salon?.city || "City not available";

  const address = salon?.address || "Address not available";

  const phone = salon?.phone || "Phone not available";

  const email = salon?.email || "Email not available";

  const openTime = salon?.openTime || "N/A";

  const closeTime = salon?.closeTime || "N/A";

  /* ===========================
     NORMALIZE IMAGES
  ===========================

  Expected:

  salon.images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg"
  ]

  Also supports:

  salon.images = {
    image1: "image1.jpg",
    image2: "image2.jpg"
  }

  And keeps compatibility with
  the old salon.image property.
  */

  const images =
    salon?.images &&
    typeof salon.images === "object" &&
    !Array.isArray(salon.images)
      ? Object.values(salon.images).filter(Boolean)
      : salon?.image
        ? [salon.image]
        : [];

  /* ===========================
     IMAGE SLIDESHOW STATE
  =========================== */

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isImageHovered, setIsImageHovered] = useState(false);

  /* ===========================
     RESET INDEX WHEN SALON
     / IMAGES CHANGE
  =========================== */

  useEffect(() => {
    setCurrentImageIndex(0);
    setIsImageHovered(false);
  }, [salonId, images.length]);

  /* ===========================
     IMAGE SLIDESHOW
  ===========================

  Only start the slideshow when:

  1. User is hovering
  2. There is more than one image

  One image = no slideshow.
  */

  useEffect(() => {
    if (!isImageHovered || images.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentImageIndex((previousIndex) => {
        return (previousIndex + 1) % images.length;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isImageHovered, images.length]);

  /* ===========================
     IMAGE HOVER HANDLERS
  =========================== */

  const handleImageMouseEnter = () => {
    if (images.length > 1) {
      setIsImageHovered(true);
    }
  };

  const handleImageMouseLeave = () => {
    setIsImageHovered(false);

    /*
     * When the user leaves the image,
     * return to the first image.
     */
    setCurrentImageIndex(0);
  };

  /* ===========================
     BOOK SALON
  =========================== */

  const handleBookSalon = () => {
    if (!salonId) {
      console.error("Cannot book salon: salon ID is missing.");
      return;
    }

    /*
     * Booking route is now generated from
     * useBookingBasePath().
     *
     * Example:
     *
     * bookingBasePath = "/owner/booking"
     *
     * Result:
     *
     * /owner/booking/salons/15
     */
    navigate(`${bookingBasePath}/booking/salons/${salonId}`);
  };

  /* ===========================
     INVALID SALON
  =========================== */

  if (!salon) {
    return null;
  }

  /* ===========================
     CURRENT IMAGE
  =========================== */

  const currentImage = images[currentImageIndex] || null;

  /* ===========================
     CARD
  =========================== */

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* ===========================
          IMAGE
      =========================== */}

      <div
        className="relative h-56 w-full overflow-hidden bg-slate-100"
        onMouseEnter={handleImageMouseEnter}
        onMouseLeave={handleImageMouseLeave}
      >
        {/* ===========================
            CURRENT IMAGE
        =========================== */}

        {currentImage ? (
          <img
            key={currentImage}
            src={currentImage}
            alt={name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-slate-400">
            <ImageOff size={45} />

            <span className="mt-2 text-sm">No Image</span>
          </div>
        )}

        {/* ===========================
            IMAGE INDICATORS
        =========================== */}

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 backdrop-blur-sm">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "w-4 bg-white"
                    : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}

        {/* ===========================
            IMAGE COUNT
        =========================== */}

        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

        {/* ===========================
            RATING
        =========================== */}

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm">
          <Star size={15} className="fill-amber-400 text-amber-400" />

          <span>{Number(rating).toFixed(1)}</span>
        </div>

        {/* ===========================
            HOVER MESSAGE
        =========================== */}

        {images.length > 1 && !isImageHovered && (
          <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            Hover to view photos
          </div>
        )}
      </div>

      {/* ===========================
          CONTENT
      =========================== */}

      <div className="flex flex-1 flex-col p-5">
        {/* Salon Name */}

        <h2 className="truncate text-xl font-bold text-slate-900">
          {name}
        </h2>

        {/* Location */}

        <div className="mt-2 flex items-start gap-2 text-sm text-slate-500">
          <MapPin
            size={17}
            className="mt-0.5 shrink-0 text-emerald-600"
          />

          <div>
            <p className="font-medium text-slate-700">{city}</p>

            <p className="mt-0.5 line-clamp-2">{address}</p>
          </div>
        </div>

        {/* ===========================
            CONTACT INFORMATION
        =========================== */}

        <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
          {/* Phone */}

          {salon?.phone && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Phone
                size={16}
                className="shrink-0 text-emerald-600"
              />

              <span className="truncate">{phone}</span>
            </div>
          )}

          {/* Email */}

          {salon?.email && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Mail
                size={16}
                className="shrink-0 text-emerald-600"
              />

              <span className="truncate">{email}</span>
            </div>
          )}

          {/* Opening Hours */}

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock
              size={16}
              className="shrink-0 text-emerald-600"
            />

            <span>
              {openTime} - {closeTime}
            </span>
          </div>
        </div>

        {/* ===========================
            BOOK BUTTON
        =========================== */}

        <div className="mt-auto border-t border-slate-100 pt-5">
          <button
            type="button"
            disabled={!salonId}
            onClick={handleBookSalon}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CalendarDays size={18} />

            Book Salon
          </button>
        </div>
      </div>
    </article>
  );
}

export default SalonBookingCard;
