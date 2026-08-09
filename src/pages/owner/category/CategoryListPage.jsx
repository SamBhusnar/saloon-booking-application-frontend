import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Plus,
  Trash2,
  ArrowLeft,
  FolderOpen,
  Scissors,
} from "lucide-react";

import {
  getCategoriesBySalonId,
  deleteCategory,
} from "../../../features/category/auth/categoryThunk";

function CategoryListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { salonId } = useParams();

  const { categories, loading, error } = useSelector(
    (state) => state.category,
  );

  /* ===========================
     LOAD CATEGORIES
  =========================== */

  useEffect(() => {
    if (!salonId) return;

    dispatch(getCategoriesBySalonId(salonId));
  }, [dispatch, salonId]);

  /* ===========================
     DELETE CATEGORY
  =========================== */

  const handleDeleteCategory = async (categoryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?\n\nAll services related to this category may also be deleted.",
    );

    if (!confirmed) return;

    try {
      await dispatch(
        deleteCategory({
          salonId,
          categoryId,
        }),
      ).unwrap();

      toast.success("Category deleted successfully.");
    } catch (error) {
      console.error("Delete category error:", error);

      toast.error(
        error?.message ||
          error?.error ||
          "Failed to delete category.",
      );
    }
  };

  /* ===========================
     OPEN CATEGORY SERVICES
  =========================== */

  const handleServices = (categoryId) => {
    navigate(
      `/owner/salons/${salonId}/categories/${categoryId}/services`,
    );
  };

  /* ===========================
     INVALID SALON ID
  =========================== */

  if (!salonId) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <FolderOpen size={30} className="text-red-500" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-900">
            Salon ID is missing
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Cannot load categories without a salon.
          </p>

          <button
            type="button"
            onClick={() => navigate("/owner/salons")}
            className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Go to Salons
          </button>
        </div>
      </div>
    );
  }

  /* ===========================
     LOADING
  =========================== */

  if (loading.fetch) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading categories...
          </p>
        </div>
      </div>
    );
  }

  /* ===========================
     ERROR
  =========================== */

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <FolderOpen size={30} className="text-red-500" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-900">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error?.message ||
              error?.error ||
              "Unable to load categories."}
          </p>

          <button
            type="button"
            onClick={() =>
              dispatch(getCategoriesBySalonId(salonId))
            }
            className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {/* ===========================
          HEADER
      =========================== */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {/* Back */}

          <button
            type="button"
            onClick={() => navigate("/owner/salons")}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Salons
          </button>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <FolderOpen size={25} />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Categories
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage categories and their services.
              </p>
            </div>
          </div>
        </div>

        {/* ===========================
            ADD CATEGORY
        =========================== */}

        <button
          type="button"
          onClick={() =>
            navigate(
              `/owner/salons/${salonId}/categories/create`,
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          <Plus size={19} />
          Add Category
        </button>
      </div>

      {/* ===========================
          CATEGORY SUMMARY
      =========================== */}

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Total Categories
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {categories.length}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <FolderOpen size={22} />
        </div>
      </div>

      {/* ===========================
          EMPTY STATE
      =========================== */}

      {categories.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <FolderOpen size={30} className="text-slate-400" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-900">
            No categories yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Create your first category to start organizing
            services for your salon.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                `/owner/salons/${salonId}/categories/create`,
              )
            }
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <Plus size={18} />
            Create Category
          </button>
        </div>
      )}

      {/* ===========================
          CATEGORY GRID
      =========================== */}

      {categories.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* ===========================
                  IMAGE
              =========================== */}

              <div className="relative h-52 overflow-hidden bg-slate-100">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-slate-300">
                    <FolderOpen size={48} />

                    <span className="mt-2 text-sm text-slate-400">
                      No Image
                    </span>
                  </div>
                )}

                {/* Category ID */}

                <div className="absolute left-3 top-3 rounded-lg bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  #{category.id}
                </div>
              </div>

              {/* ===========================
                  CONTENT
              =========================== */}

              <div className="p-5">
                <h3 className="truncate text-lg font-bold text-slate-900">
                  {category.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Category
                </p>

                {/* ===========================
                    SERVICES BUTTON
                =========================== */}

                <button
                  type="button"
                  onClick={() =>
                    handleServices(category.id)
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  <Scissors size={17} />
                  Services
                </button>

                {/* ===========================
                    DELETE CATEGORY
                =========================== */}

                <button
                  type="button"
                  disabled={loading.delete}
                  onClick={() =>
                    handleDeleteCategory(category.id)
                  }
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={17} />

                  {loading.delete
                    ? "Deleting..."
                    : "Delete Category"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryListPage;
