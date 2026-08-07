import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SalonImages from "./SalonImages";

function SalonForm({
  mode = "create",
  initialValues = {},
  onSubmit,
  isLoading = false,
  onDeleteExistingImage=() => {},
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialValues?.name || "",
      address: initialValues?.address || "",
      city: initialValues?.city || "",
      phoneNumber: initialValues?.phoneNumber || "",
      email: initialValues?.email || "",
      openTime: initialValues?.openTime || "",
      closeTime: initialValues?.closeTime || "",
    },
  });

  const [newImages, setNewImages] = useState([]);

  const submitHandler = (data) => {
    onSubmit({
      ...data,
      images: newImages,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      {/* Salon Name */}

      <div>
        <label className="block mb-1 font-medium">Salon Name</label>

        <input
          {...register("name", {
            required: "Salon name is required",
          })}
          className="w-full border rounded-lg p-3"
          placeholder="Enter salon name"
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Images */}

      <SalonImages
        existingImages={initialValues.images || {}}
        value={newImages}
        onChange={setNewImages}
        onDeleteExisting={onDeleteExistingImage}
      />

      {/* Address */}

      <div>
        <label className="block mb-1 font-medium">Address</label>

        <textarea
          {...register("address", {
            required: "Address is required",
          })}
          rows={3}
          className="w-full border rounded-lg p-3"
        />

        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      {/* City */}

      <div>
        <label className="block mb-1 font-medium">City</label>

        <input
          {...register("city", {
            required: "City is required",
          })}
          className="w-full border rounded-lg p-3"
        />

        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}
      </div>

      {/* Phone */}

      <div>
        <label className="block mb-1 font-medium">Phone Number</label>

        <input
          {...register("phoneNumber", {
            required: "Phone number is required",
          })}
          className="w-full border rounded-lg p-3"
        />

        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* Email */}

      <div>
        <label className="block mb-1 font-medium">Email</label>

        <input
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
          className="w-full border rounded-lg p-3"
        />

        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Opening */}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Open Time</label>

          <input
            type="time"
            {...register("openTime", {
              required: "Opening time required",
            })}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Close Time</label>

          <input
            type="time"
            {...register("closeTime", {
              required: "Closing time required",
            })}
            className="w-full border rounded-lg p-3"
          />
        </div>
      </div>

      <button
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
      >
        {isLoading
          ? "Saving..."
          : mode === "create"
            ? "Create Salon"
            : "Update Salon"}
      </button>
    </form>
  );
}

export default SalonForm;
