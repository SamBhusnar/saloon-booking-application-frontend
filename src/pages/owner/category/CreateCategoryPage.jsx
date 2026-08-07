import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import CategoryForm from "../../../features/category/component/CategoryForm";
import { createCategory } from "../../../features/category/auth/categoryThunk";

function CreateCategoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { salonId } = useParams();

  const { loading } = useSelector((state) => state.category);

  const { user } = useSelector((state) => state.auth);

  /* ===========================
       CREATE CATEGORY
  =========================== */

  const handleCreateCategory = async (data) => {
    try {
      /*
       * =====================================
       * VALIDATE SALON ID
       * =====================================
       */

      if (!salonId) {
        toast.error("Salon ID is required.");
        return;
      }

      /*
       * =====================================
       * VALIDATE IMAGE
       * =====================================
       */

      if (!data.coverImage) {
        toast.error("Please select a cover image.");
        return;
      }

      /*
       * =====================================
       * CATEGORY DTO
       * =====================================
       *
       * Backend:
       *
       * @RequestPart("category")
       * Category category
       *
       * Category contains:
       * - name
       * - salonId
       */

      const categoryDto = {
        name: data.name,
        salonId: Number(salonId),
      };

      /*
       * =====================================
       * FORM DATA
       * =====================================
       */

      const formData = new FormData();

      /*
       * category JSON
       */

      formData.append(
        "category",
        new Blob([JSON.stringify(categoryDto)], {
          type: "application/json",
        }),
      );

      /*
       * cover image
       */

      formData.append("coverImage", data.coverImage);

      /*
       * =====================================
       * DEBUG
       * =====================================
       */

      console.log("Category DTO:", categoryDto);
      console.log("Cover Image:", data.coverImage);

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      /*
       * =====================================
       * API CALL
       * =====================================
       */

      await dispatch(createCategory(formData)).unwrap();

      /*
       * =====================================
       * SUCCESS
       * =====================================
       */

      toast.success("Category created successfully.");

      /*
       * Go back to categories of this salon
       */

      navigate(`/owner/salons/${salonId}/categories`);
    } catch (error) {
      console.error("Create category error:", error);

      toast.error(
        error?.message || error?.error || "Failed to create category.",
      );
    }
  };

  /*
   * =====================================
   * INVALID SALON ID
   * =====================================
   */

  if (!salonId) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Salon ID is missing
          </h2>

          <p className="mt-2 text-slate-500">
            Cannot create a category without selecting a salon.
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

  /*
   * =====================================
   * PAGE
   * =====================================
   */

  return (
    <div className="mx-auto max-w-5xl">
      {/* ===========================
          HEADER
      =========================== */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Create Category</h1>

        <p className="mt-2 text-slate-500">Add a new category to your salon.</p>
      </div>

      {/* ===========================
          FORM
      =========================== */}

      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <CategoryForm
          mode="create"
          isLoading={loading.create}
          onSubmit={handleCreateCategory}
        />
      </div>
    </div>
  );
}

export default CreateCategoryPage;
