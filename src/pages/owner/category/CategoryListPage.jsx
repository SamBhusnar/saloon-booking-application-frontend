import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Plus, Trash2, ArrowLeft, FolderOpen } from "lucide-react";

import {
  getCategoriesBySalonId,
  deleteCategory,
} from "../../../features/category/auth/categoryThunk";

function CategoryListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { salonId } = useParams();

  const { categories, loading, error } = useSelector((state) => state.category);

  const { user } = useSelector((state) => state.auth);

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
        error?.message || error?.error || "Failed to delete category.",
      );
    }
  };

  /* ===========================
       INVALID SALON ID
  =========================== */

  if (!salonId) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Salon ID is missing
          </h2>

          <p className="mt-2 text-slate-500">
            Cannot load categories without a salon.
          </p>

          <button
            type="button"
            onClick={() => navigate("/owner/salons")}
            className="mt-5 rounded-lg bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700"
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
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

          <p className="mt-4 text-slate-500">Loading categories...</p>
        </div>
      </div>
    );
  }

  /* ===========================
       ERROR
  =========================== */

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Something went wrong
          </h2>

          <p className="mt-2 text-slate-500">
            {error?.message || error?.error || "Unable to load categories."}
          </p>

          <button
            type="button"
            onClick={() => dispatch(getCategoriesBySalonId(salonId))}
            className="mt-5 rounded-lg bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* ===========================
       PAGE
  =========================== */

  return (
    <div className="mx-auto max-w-7xl">
      {/* ===========================
          HEADER
      =========================== */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {/* Back */}

          <button
            type="button"
            onClick={() => navigate("/owner/salons")}
            className="mb-3 flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Salons
          </button>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <FolderOpen size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">Categories</h1>

              <p className="mt-1 text-slate-500">
                Manage categories for this salon.
              </p>
            </div>
          </div>
        </div>

        {/* Create Category */}

        <button
          type="button"
          onClick={() => navigate(`/owner/salons/${salonId}/categories/create`)}
          className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-emerald-700"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* ===========================
          CATEGORY COUNT
      =========================== */}

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Total Categories</p>

        <p className="mt-1 text-2xl font-bold text-slate-900">
          {categories.length}
        </p>
      </div>

      {/* ===========================
          EMPTY STATE
      =========================== */}

      {categories.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <FolderOpen size={30} className="text-slate-400" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-800">
            No categories found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-slate-500">
            This salon doesn't have any categories yet. Create your first
            category to start adding services.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(`/owner/salons/${salonId}/categories/create`)
            }
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700"
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
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* ===========================
                  IMAGE
              =========================== */}

              <div className="relative h-48 bg-slate-100">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <FolderOpen size={45} className="text-slate-300" />
                  </div>
                )}
              </div>

              {/* ===========================
                  CONTENT
              =========================== */}

              <div className="p-5">
                <h3 className="truncate text-lg font-semibold text-slate-900">
                  {category.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Category #{category.id}
                </p>

                {/* ===========================
                    ACTIONS
                =========================== */}

                <div className="mt-5 flex gap-2">
                  {/* Delete */}

                  <button
                    type="button"
                    disabled={loading.delete}
                    onClick={() => handleDeleteCategory(category.id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 size={17} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryListPage;
