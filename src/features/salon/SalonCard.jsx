import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Pencil,
  Trash2,
  ImageOff,
  Grid2x2,
} from "lucide-react";

function SalonCard({ salon, onEdit, onDelete, onManageCategories }) {
  const image =
    salon?.images && Object.values(salon.images).length > 0
      ? Object.values(salon.images)[0]
      : null;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {/* ===========================
          IMAGE
      =========================== */}

      <div className="h-56 overflow-hidden bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={salon.name}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-slate-400">
            <ImageOff size={50} />

            <span className="mt-2 text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* ===========================
          CONTENT
      =========================== */}

      <div className="space-y-3 p-5">
        {/* Salon Name */}

        <h2 className="text-xl font-bold text-slate-800">{salon.name}</h2>

        {/* Address */}

        <div className="flex items-start gap-2 text-sm text-slate-600">
          <MapPin size={18} className="mt-0.5 shrink-0" />

          <span>{salon.address}</span>
        </div>

        {/* City */}

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin size={18} className="shrink-0" />

          <span>{salon.city}</span>
        </div>

        {/* Phone */}

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Phone size={18} className="shrink-0" />

          <span>{salon.phoneNumber}</span>
        </div>

        {/* Email */}

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Mail size={18} className="shrink-0" />

          <span className="truncate">{salon.email}</span>
        </div>

        {/* Opening Hours */}

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock size={18} className="shrink-0" />

          <span>
            {salon.openTime} - {salon.closeTime}
          </span>
        </div>

        {/* ===========================
            ACTIONS
        =========================== */}

        <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
          {/* Edit */}

          <button
            type="button"
            onClick={onEdit}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Pencil size={16} />
            Edit
          </button>

          {/* Categories */}

          <button
            type="button"
            onClick={onManageCategories}
            className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            <Grid2x2 size={16} />
            Categories
          </button>

          {/* Delete */}

          <button
            type="button"
            onClick={onDelete}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default SalonCard;
