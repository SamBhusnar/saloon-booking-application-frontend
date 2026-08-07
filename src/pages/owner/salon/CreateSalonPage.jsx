import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import SalonForm from "../../../features/salon/SalonForm";

import { createSalon } from "../../../features/redux/salonThunk";

function CreateSalonPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.salon);
  const { user } = useSelector((state) => state.auth);

  const handleCreateSalon = async (data) => {
    try {
      const salonDto = {
        name: data.name,
        ownerId: user.id,
        address: data.address,
        city: data.city,
        phoneNumber: data.phoneNumber,
        email: data.email,
        openTime: data.openTime,
        closeTime: data.closeTime,
      };

      const formData = new FormData();

      formData.append(
        "saloonDto",
        new Blob([JSON.stringify(salonDto)], {
          type: "application/json",
        }),
      );

      data.images.forEach((image) => {
        formData.append("images", image);
      });

      await dispatch(createSalon(formData)).unwrap();

      toast.success("Salon created successfully.");

      navigate("/owner/salons");
    } catch (error) {
      toast.error(error?.message || "Failed to create salon.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Salon</h1>

        <p className="mt-2 text-gray-500">
          Fill in the salon information below.
        </p>
      </div>

      {/* Form */}

      <div className="rounded-xl border bg-white p-8 shadow">
        <SalonForm
          mode="create"
          isLoading={loading.create}
          onSubmit={handleCreateSalon}
        />
      </div>
    </div>
  );
}

export default CreateSalonPage;
