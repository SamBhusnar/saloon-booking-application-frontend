import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImagePlus, Trash2 } from "lucide-react";

function CategoryForm({
  mode = "create",
  initialValues = {},
  onSubmit,
  isLoading = false,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: initialValues?.name || "",
    },
  });

  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(initialValues?.image || null);

  /*
   * =====================================
   * RESET FORM WHEN EDIT DATA CHANGES
   * =====================================
   *
   * IMPORTANT:
   * Do NOT use [initialValues] here.
   *
   * We depend only on the primitive values
   * that actually matter.
   */
  useEffect(() => {
    if (mode === "edit") {
      reset({
        name: initialValues?.name || "",
      });

      setPreview(initialValues?.image || null);
      setCoverImage(null);
    }
  }, [mode, initialValues?.name, initialValues?.image, reset]);

  /*
   * =====================================
   * SELECT IMAGE
   * =====================================
   */

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    /*
     * Remove previous preview URL if it was
     * created from a local File.
     */
    if (coverImage && preview) {
      URL.revokeObjectURL(preview);
    }

    const imageUrl = URL.createObjectURL(file);

    setCoverImage(file);
    setPreview(imageUrl);

    /*
     * Allow selecting the same image again.
     */
    event.target.value = "";
  };

  /*
   * =====================================
   * REMOVE IMAGE
   * =====================================
   */

  const handleRemoveImage = () => {
    /*
     * If current preview belongs to a newly
     * selected local file, release its URL.
     */
    if (coverImage && preview) {
      URL.revokeObjectURL(preview);
    }

    setCoverImage(null);

    /*
     * Edit mode:
     * restore existing backend image.
     */
    if (mode === "edit" && initialValues?.image) {
      setPreview(initialValues.image);
    } else {
      setPreview(null);
    }
  };

  /*
   * =====================================
   * SUBMIT
   * =====================================
   */

  const submitHandler = (data) => {
    onSubmit({
      name: data.name,
      coverImage,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      {/* ===========================
          CATEGORY NAME
      =========================== */}

      <div>
        <label className="mb-1 block font-medium">Category Name</label>

        <input
          type="text"
          placeholder="Enter category name"
          {...register("name", {
            required: "Category name is required",

            minLength: {
              value: 2,
              message: "Category name must be at least 2 characters.",
            },

            maxLength: {
              value: 50,
              message: "Category name cannot exceed 50 characters.",
            },
          })}
          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* ===========================
          COVER IMAGE
      =========================== */}

      <div>
        <label className="mb-2 block font-medium">Cover Image</label>

        {!preview ? (
          /* ===========================
             UPLOAD AREA
          =========================== */

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-8 transition hover:border-emerald-500 hover:bg-slate-50">
            <ImagePlus size={40} className="mb-3 text-slate-400" />

            <p className="font-medium text-slate-700">
              Click to upload cover image
            </p>

            <p className="mt-1 text-sm text-slate-400">PNG, JPG, JPEG, WEBP</p>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        ) : (
          /* ===========================
             IMAGE PREVIEW
          =========================== */

          <div className="relative w-full max-w-md overflow-hidden rounded-xl border bg-slate-50">
            <img
              src={preview}
              alt="Category cover"
              className="h-64 w-full object-cover"
            />

            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white shadow hover:bg-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}

        {/* ===========================
            CHANGE IMAGE
        =========================== */}

        {preview && (
          <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
            <ImagePlus size={17} />
            Change Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>

      {/* ===========================
          SUBMIT
      =========================== */}

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading
          ? "Saving..."
          : mode === "create"
            ? "Create Category"
            : "Update Category"}
      </button>
    </form>
  );
}

export default CategoryForm;
