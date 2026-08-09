import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  Scissors,
  CheckCircle2,
} from "lucide-react";

import ServiceForm from "../../../features/service/component/ServiceForm";

import {
  createService,
} from "../../../features/service/auth/serviceOfferingThunk";

function CreateServicePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { salonId, categoryId } = useParams();

  const { loading } = useSelector(
    (state) => state.serviceOffering
  );

  /* ===========================
     VALIDATE URL PARAMETERS
  =========================== */

  if (!salonId || !categoryId) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <Scissors size={28} className="text-red-500" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Invalid Service Request
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Salon ID or Category ID is missing. Please select a
            category before creating a service.
          </p>

          <button
            type="button"
            onClick={() =>
              salonId
                ? navigate(`/owner/salons/${salonId}/categories`)
                : navigate("/owner/salons")
            }
            className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Go to Categories
          </button>
        </div>
      </div>
    );
  }

  /* ===========================
     CREATE SERVICE
  =========================== */

  const handleCreateService = async (data) => {
    try {
      /* ===========================
         SERVICE DTO
      =========================== */

      const serviceOffering = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        duration: Number(data.duration),
        salonId: Number(salonId),
        categoryId: Number(categoryId),
      };

      /* ===========================
         CREATE SERVICE
      =========================== */

      await dispatch(
        createService({
          serviceOffering,
          image: data.image || null,
        })
      ).unwrap();

      /* ===========================
         SUCCESS
      =========================== */

      toast.success("Service created successfully.");

      /* ===========================
         BACK TO SERVICES
      =========================== */

      navigate(
        `/owner/salons/${salonId}/categories/${categoryId}/services`
      );
    } catch (error) {
      console.error("Create service error:", error);

      toast.error(
        error?.message ||
          error?.error ||
          "Failed to create service."
      );
    }
  };

  /* ===========================
     BACK TO SERVICES
  =========================== */

  const handleBack = () => {
    navigate(
      `/owner/salons/${salonId}/categories/${categoryId}/services`
    );
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* ===========================
          HEADER
      =========================== */}

      <div className="mb-8">
        <button
          type="button"
          onClick={handleBack}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Services
        </button>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <Scissors size={25} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Create Service
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Add a new service to this category.
            </p>
          </div>
        </div>
      </div>

      {/* ===========================
          CATEGORY CONTEXT
      =========================== */}

      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4">
        <CheckCircle2
          size={20}
          className="shrink-0 text-emerald-600"
        />

        <div>
          <p className="text-sm font-semibold text-emerald-800">
            Category selected
          </p>

          <p className="mt-0.5 text-xs text-emerald-700">
            This service will be added to category #{categoryId}
          </p>
        </div>
      </div>

      {/* ===========================
          FORM
      =========================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <ServiceForm
          mode="create"
          isLoading={loading?.create}
          onSubmit={handleCreateService}
        />
      </div>
    </div>
  );
}


export default CreateServicePage;



