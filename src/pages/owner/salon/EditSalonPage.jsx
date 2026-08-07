import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import SalonForm from "../../../features/salon/SalonForm";

import {
  getSalonById,
  updateSalon,
  deleteSalonImage,
} from "../../../features/redux/salonThunk";

function EditSalonPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { salonId } = useParams();

  const { currentSalon, loading, error } = useSelector((state) => state.salon);
  const { user } = useSelector((state) => state.auth);

  /* ===========================
       LOAD SALON
  =========================== */

  useEffect(() => {
    dispatch(getSalonById(salonId));
  }, [dispatch, salonId]);

  /* ===========================
       UPDATE SALON
  =========================== */

  const handleUpdateSalon = async (data) => {
    try {
      const salonDto = {
        id: currentSalon.id,
        name: data.name,
        address: data.address,
        city: data.city,
        phoneNumber: data.phoneNumber,
        email: data.email,
        ownerId: user.id,
        openTime: data.openTime,
        closeTime: data.closeTime,
      };
      console.log("currentSalon---------------");
      console.log(currentSalon);
      console.log("currentSalon---------------");

      const formData = new FormData();

      formData.append(
        "saloonDto",
        new Blob([JSON.stringify(salonDto)], {
          type: "application/json",
        }),
      );

      if (data.images?.length > 0) {
        data.images.forEach((image) => {
          formData.append("images", image);
        });
      }
 





      console.log("Selected images:", data.images);

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await dispatch(
        updateSalon({
          id: salonId,
          formData,
        }),
      ).unwrap();

      toast.success("Salon updated successfully.");

      navigate("/owner/salons");
    } catch (error) {
      toast.error(error?.message || "Failed to update salon.");
    }
  };

  /* ===========================
       DELETE EXISTING IMAGE
  =========================== */


  const handleDeleteExistingImage = async (publicId) => {
    try {
      await dispatch(
        deleteSalonImage({
          salonId,
          publicId,
        }),
      ).unwrap();
      // Refresh current salon
      await dispatch(getSalonById(salonId));

      toast.success("Image deleted.");
    } catch (error) {
      toast.error(error?.message || "Unable to delete image.");
    }
  };

  /* ===========================
       LOADING
  =========================== */

  if (loading.fetch) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg text-gray-500">Loading salon...</p>
      </div>
    );
  }

  /* ===========================
       ERROR
  =========================== */

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-red-500">
          {error.message || "Something went wrong."}
        </p>
      </div>
    );
  }

  if (!currentSalon) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500">Salon not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Salon</h1>

        <p className="mt-2 text-gray-500">Update your salon information.</p>
      </div>

      {/* Form */}

      <div className="rounded-xl border bg-white p-8 shadow">
        <SalonForm
          mode="edit"
          initialValues={currentSalon}
          isLoading={loading.update}
          onSubmit={handleUpdateSalon}
          onDeleteExistingImage={handleDeleteExistingImage}
        />
      </div>
    </div>
  );
}

export default EditSalonPage;
