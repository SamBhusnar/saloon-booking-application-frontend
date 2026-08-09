import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft, Clock, IndianRupee, Pencil, Scissors } from "lucide-react";

import ServiceForm from "../../../features/service/component/ServiceForm";

import {
  getServiceById,
  updateService,
} from "../../../features/service/auth/serviceOfferingThunk";

function EditServicePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { salonId, categoryId, serviceId } = useParams();

  const { selectedService, loading, error } = useSelector(
    (state) => state.serviceOffering,
  );

  /* ===========================
     LOAD SERVICE
  =========================== */

  useEffect(() => {
    if (!serviceId) return;

    dispatch(getServiceById(Number(serviceId)));
  }, [dispatch, serviceId]);

  /* ===========================
     UPDATE SERVICE
  =========================== */

  const handleUpdateService = async (data) => {
    try {
      /* ===========================
         VALIDATE PARAMETERS
      =========================== */

      if (!salonId) {
        toast.error("Salon ID is required.");
        return;
      }

      if (!categoryId) {
        toast.error("Category ID is required.");
        return;
      }

      if (!serviceId) {
        toast.error("Service ID is required.");
        return;
      }

      /* ===========================
         SERVICE DATA
      =========================== */

      const serviceOffering = {
        id: Number(serviceId),

        name: data.name,

        description: data.description,

        price: Number(data.price),

        duration: Number(data.duration),

        salonId: Number(salonId),

        categoryId: Number(categoryId),

        image: selectedService?.image || null,

        publicId: selectedService?.publicId || null,
      };

      /* ===========================
         UPDATE SERVICE
      =========================== */

      await dispatch(
        updateService({
          serviceId: Number(serviceId),
          serviceOffering,
          image: data.image || null,
        }),
      ).unwrap();

      /* ===========================
         SUCCESS
      =========================== */

      toast.success("Service updated successfully.");

      /* ===========================
         GO BACK TO CATEGORY SERVICES
      =========================== */

      navigate(`/owner/salons/${salonId}/categories/${categoryId}/services`);
    } catch (error) {
      console.error("Update service error:", error);

      toast.error(
        error?.message || error?.error || "Failed to update service.",
      );
    }
  };

  /* ===========================
     INVALID PARAMETERS
  =========================== */

  if (!salonId || !categoryId || !serviceId) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <Pencil size={28} className="text-red-500" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-900">
            Invalid Service Details
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Salon ID, Category ID and Service ID are required.
          </p>

          <button
            type="button"
            onClick={() => navigate("/owner/salons")}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
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

  if (loading?.fetchById) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading service...
          </p>
        </div>
      </div>
    );
  }

  /* ===========================
     ERROR
  =========================== */

  if (error && !selectedService) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <Pencil size={28} className="text-red-500" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-900">
            Unable to Load Service
          </h2>

          <p className="mt-2 text-sm leading-6 text-red-600">
            {error?.message ||
              error?.error ||
              "Something went wrong while loading the service."}
          </p>

          <button
            type="button"
            onClick={() => dispatch(getServiceById(Number(serviceId)))}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* ===========================
     SERVICE NOT FOUND
  =========================== */

  if (!selectedService) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <Scissors size={28} className="text-slate-400" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-900">
            Service Not Found
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            The requested service could not be found.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                `/owner/salons/${salonId}/categories/${categoryId}/services`,
              )
            }
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  /* ===========================
     PAGE
  =========================== */

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* ===========================
          BACK NAVIGATION
      =========================== */}

      <button
        type="button"
        onClick={() =>
          navigate(`/owner/salons/${salonId}/categories/${categoryId}/services`)
        }
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Back to Services
      </button>

      {/* ===========================
          PAGE HEADER
      =========================== */}

      <div className="mb-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <Pencil size={23} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Edit Service
            </h1>

            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Update the details, pricing, duration or image of your service.
            </p>
          </div>
        </div>
      </div>

      {/* ===========================
          CURRENT SERVICE SUMMARY
      =========================== */}

      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* Service Image */}

            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
              {selectedService?.image ? (
                <img
                  src={selectedService.image}
                  alt={selectedService?.name || "Service"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Scissors size={25} className="text-slate-300" />
                </div>
              )}
            </div>

            {/* Service Name */}

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Editing Service
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-900">
                {selectedService?.name}
              </h2>
            </div>
          </div>

          {/* Service Meta */}

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 px-4 py-2.5">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <IndianRupee size={13} />
                Price
              </div>

              <p className="mt-0.5 font-bold text-emerald-700">
                ₹{selectedService?.price ?? 0}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-2.5">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Clock size={13} />
                Duration
              </div>

              <p className="mt-0.5 font-bold text-slate-700">
                {selectedService?.duration ?? 0} min
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===========================
          FORM
      =========================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
          <h2 className="text-lg font-semibold text-slate-900">
            Service Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Make the required changes and save your service.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <ServiceForm
            mode="edit"
            initialValues={selectedService}
            isLoading={loading?.update}
            onSubmit={handleUpdateService}
          />
        </div>
      </div>

      {/* ===========================
          UPDATE ERROR
      =========================== */}

      {error && (
        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
          {error?.message || error?.error || "Unable to update service."}
        </div>
      )}
    </div>
  );
}

export default EditServicePage;
