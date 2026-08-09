
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ImagePlus,
  Trash2,
  Scissors,
  IndianRupee,
  Clock3,
} from "lucide-react";

function ServiceForm({
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
      description: initialValues?.description || "",
      price: initialValues?.price || "",
      duration: initialValues?.duration || "",
    },
  });

  const [serviceImage, setServiceImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ===========================
     RESET FORM WHEN DATA CHANGES
  =========================== */

  useEffect(() => {
    reset({
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      price: initialValues?.price || "",
      duration: initialValues?.duration || "",
    });

    /*
     * Existing image from backend
     */

    if (initialValues?.image) {
      setPreview(initialValues.image);
    } else {
      setPreview(null);
    }

    setServiceImage(null);
  }, [
    initialValues?.name,
    initialValues?.description,
    initialValues?.price,
    initialValues?.duration,
    initialValues?.image,
    reset,
  ]);

  /* ===========================
     SELECT IMAGE
  =========================== */

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    /*
     * Validate image type
     */

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      event.target.value = "";
      return;
    }

    /*
     * Optional size validation
     * 5 MB maximum
     */

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size cannot exceed 5 MB.");
      event.target.value = "";
      return;
    }

    /*
     * Remove previous preview URL
     */

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setServiceImage(file);

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    /*
     * Allow selecting same image again
     */

    event.target.value = "";
  };

  /* ===========================
     REMOVE IMAGE
  =========================== */

  const handleRemoveImage = () => {
    /*
     * Revoke object URL if it
     * belongs to selected file.
     */

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setServiceImage(null);

    /*
     * If editing and backend image
     * exists, restore its preview.
     */

    if (mode === "edit" && initialValues?.image) {
      setPreview(initialValues.image);
    } else {
      setPreview(null);
    }
  };

  /* ===========================
     SUBMIT
  =========================== */

  const submitHandler = (data) => {
    onSubmit({
      name: data.name.trim(),
      description: data.description.trim(),
      price: data.price,
      duration: data.duration,
      image: serviceImage,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-8"
    >
      {/* ===========================
          SERVICE INFORMATION
      =========================== */}

      <div>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <Scissors size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Service Information
            </h2>

            <p className="text-sm text-slate-500">
              Enter the details of the service.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* ===========================
              SERVICE NAME
          =========================== */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Name
            </label>

            <input
              type="text"
              placeholder="e.g. Hair Cut"
              {...register("name", {
                required: "Service name is required.",
                minLength: {
                  value: 2,
                  message:
                    "Service name must be at least 2 characters.",
                },
                maxLength: {
                  value: 100,
                  message:
                    "Service name cannot exceed 100 characters.",
                },
              })}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${
                errors.name
                  ? "border-red-400"
                  : "border-slate-300"
              }`}
            />

            {errors.name && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* ===========================
              DESCRIPTION
          =========================== */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Describe what this service includes..."
              {...register("description", {
                required: "Service description is required.",
                minLength: {
                  value: 5,
                  message:
                    "Description must be at least 5 characters.",
                },
                maxLength: {
                  value: 500,
                  message:
                    "Description cannot exceed 500 characters.",
                },
              })}
              className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${
                errors.description
                  ? "border-red-400"
                  : "border-slate-300"
              }`}
            />

            {errors.description && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* ===========================
              PRICE + DURATION
          =========================== */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* PRICE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Price
              </label>

              <div className="relative">
                <IndianRupee
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="500"
                  {...register("price", {
                    required: "Price is required.",
                    min: {
                      value: 0,
                      message: "Price cannot be negative.",
                    },
                    valueAsNumber: true,
                  })}
                  className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${
                    errors.price
                      ? "border-red-400"
                      : "border-slate-300"
                  }`}
                />
              </div>

              {errors.price && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* DURATION */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Duration
              </label>

              <div className="relative">
                <Clock3
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="30"
                  {...register("duration", {
                    required: "Duration is required.",
                    min: {
                      value: 1,
                      message:
                        "Duration must be at least 1 minute.",
                    },
                    valueAsNumber: true,
                  })}
                  className={`w-full rounded-xl border bg-white py-3 pl-10 pr-20 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${
                    errors.duration
                      ? "border-red-400"
                      : "border-slate-300"
                  }`}
                />

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                  minutes
                </span>
              </div>

              {errors.duration && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===========================
          SERVICE IMAGE
      =========================== */}

      <div className="border-t border-slate-200 pt-8">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Service Image
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add an image that represents this service.
          </p>
        </div>

        {!preview ? (
          /* ===========================
             UPLOAD AREA
          =========================== */

          <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 transition hover:border-emerald-400 hover:bg-emerald-50/30">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <ImagePlus size={27} />
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-700">
              Click to upload service image
            </p>

            <p className="mt-1 text-xs text-slate-400">
              PNG, JPG, JPEG or WEBP · Max 5 MB
            </p>

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        ) : (
          /* ===========================
             IMAGE PREVIEW
          =========================== */

          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img
              src={preview}
              alt="Service preview"
              className="h-72 w-full object-cover"
            />

            {/* Remove */}

            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg transition hover:bg-red-700"
              title="Remove image"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}

        {/* ===========================
            CHANGE IMAGE
        =========================== */}

        {preview && (
          <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
            <ImagePlus size={17} />
            Change Image

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>

      {/* ===========================
          SUBMIT
      =========================== */}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Scissors size={18} />

          {isLoading
            ? "Saving..."
            : mode === "create"
              ? "Create Service"
              : "Update Service"}
        </button>
      </div>
    </form>
  );
}

export default ServiceForm;

