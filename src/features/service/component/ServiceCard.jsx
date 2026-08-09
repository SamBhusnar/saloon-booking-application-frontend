import React from "react";
import { Clock, Pencil, Trash2, ImageOff, IndianRupee } from "lucide-react";

function ServiceCard({ service, onEdit, onDelete }) {
  const image = service?.image || null;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      {/* ===========================
          SERVICE IMAGE
      =========================== */}

      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={service?.name || "Service"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-slate-400">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
              <ImageOff size={28} />
            </div>

            <span className="mt-3 text-sm font-medium">No Image</span>
          </div>
        )}

        {/* Image overlay */}

        {image && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        )}
      </div>

      {/* ===========================
          SERVICE CONTENT
      =========================== */}

      <div className="flex flex-1 flex-col p-5">
        {/* ===========================
            SERVICE HEADER
        =========================== */}

        <div>
          <h2 className="truncate text-xl font-bold text-slate-900">
            {service?.name || "Unnamed Service"}
          </h2>

          <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-500">
            {service?.description || "No description available."}
          </p>
        </div>

        {/* ===========================
            PRICE & DURATION
        =========================== */}

        <div className="mt-5 grid grid-cols-2 gap-3">
          {/* Price */}

          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <IndianRupee size={14} />
              Price
            </div>

            <p className="mt-1.5 text-xl font-bold text-emerald-700">
              ₹{service?.price ?? 0}
            </p>
          </div>

          {/* Duration */}

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <Clock size={14} />
              Duration
            </div>

            <p className="mt-1.5 text-xl font-bold text-slate-700">
              {service?.duration ?? 0}
              <span className="ml-1 text-sm font-medium text-slate-500">
                min
              </span>
            </p>
          </div>
        </div>

        {/* ===========================
            CATEGORY
        =========================== */}

        {service?.categoryName && (
          <div className="mt-4">
            <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {service.categoryName}
            </span>
          </div>
        )}

        {/* ===========================
            ACTIONS
        =========================== */}

        <div className="mt-auto flex gap-3 border-t border-slate-100 pt-5">
          {/* Edit */}

          <button
            type="button"
            onClick={onEdit}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
          >
            <Pencil size={17} />
            Edit
          </button>

          {/* Delete */}

          <button
            type="button"
            onClick={onDelete}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100"
          >
            <Trash2 size={17} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
