
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Plus,
  RefreshCw,
  Scissors,
  ArrowLeft,
  Layers3,
} from "lucide-react";

import ServiceCard from "../../../features/service/component/ServiceCard";

import {
  getServicesBySalonId,
  deleteService,
} from "../../../features/service/auth/serviceOfferingThunk";

import { getCategoriesBySalonId } from "../../../features/category/auth/categoryThunk";

function ServiceListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*
  ========================================
  URL PARAMETERS
  ========================================
  */

  const { salonId, categoryId } = useParams();

  /*
  ========================================
  REDUX STATE
  ========================================
  */

  const {
    services = [],
    loading,
    error,
  } = useSelector((state) => state.serviceOffering);

  const { categories = [] } = useSelector(
    (state) => state.category,
  );

  /*
  ========================================
  LOCAL REQUEST STATE

  This prevents an old Redux error from
  immediately displaying the error page
  before the current request completes.
  ========================================
  */

  const [requestStatus, setRequestStatus] = useState("idle");
  const [requestError, setRequestError] = useState(null);

  /*
  ========================================
  FIND CURRENT CATEGORY

  We load categories only to display the
  category name in the page header.
  ========================================
  */

  const currentCategory = categories.find(
    (category) =>
      String(category.id) === String(categoryId),
  );

  /*
  ========================================
  LOAD CATEGORY
  ========================================
  */

  useEffect(() => {
    if (!salonId) return;

    dispatch(getCategoriesBySalonId(Number(salonId)));
  }, [dispatch, salonId]);

  /*
  ========================================
  LOAD SERVICES FOR:

  Salon + Category
  ========================================
  */

  const loadServices = async () => {
    if (!salonId || !categoryId) return;

    setRequestStatus("loading");
    setRequestError(null);

    try {
      await dispatch(
        getServicesBySalonId({
          salonId: Number(salonId),
          categoryId: Number(categoryId),
        }),
      ).unwrap();

      /*
      Important:

      A successful backend response with an
      empty list is NOT an error.

      It means this category currently has
      zero services.
      */

      setRequestStatus("success");
    } catch (error) {
      console.error("Load services error:", error);

      setRequestError(error);
      setRequestStatus("error");
    }
  };

  useEffect(() => {
    loadServices();
  }, [dispatch, salonId, categoryId]);

  /*
  ========================================
  CREATE SERVICE
  ========================================
  */

  const handleCreateService = () => {
    navigate(
      `/owner/salons/${salonId}/categories/${categoryId}/services/create`,
    );
  };

  /*
  ========================================
  EDIT SERVICE
  ========================================
  */

  const handleEditService = (service) => {
    navigate(
      `/owner/salons/${salonId}/categories/${categoryId}/services/edit/${service.id}`,
    );
  };

  /*
  ========================================
  DELETE SERVICE
  ========================================
  */

  const handleDeleteService = async (service) => {
    if (!service?.id) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${service.name}"?`,
    );

    if (!confirmed) return;

    try {
      await dispatch(
        deleteService({
          serviceId: service.id,
          salonId: Number(salonId),
          categoryId: Number(categoryId),
        }),
      ).unwrap();

      toast.success("Service deleted successfully.");

      /*
      Reload services for the same
      salon + category.
      */

      await loadServices();
    } catch (error) {
      console.error("Delete service error:", error);

      toast.error(
        error?.message ||
          error?.error ||
          "Unable to delete service.",
      );
    }
  };

  /*
  ========================================
  RETRY
  ========================================
  */

  const handleRetry = () => {
    loadServices();
  };

  /*
  ========================================
  INVALID PARAMETERS
  ========================================
  */

  if (!salonId || !categoryId) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl border border-red-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <Scissors
              size={30}
              className="text-red-500"
            />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-900">
            Invalid Service Details
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Salon ID and Category ID are required to
            manage services.
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

  /*
  ========================================
  LOADING
  ========================================
  */

  if (requestStatus === "loading") {
    return (
      <div className="flex min-h-[65vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading services...
          </p>
        </div>
      </div>
    );
  }

  /*
  ========================================
  ERROR
  ========================================
  */

  if (requestStatus === "error") {
    return (
      <div className="flex min-h-[65vh] items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <RefreshCw
              size={28}
              className="text-red-500"
            />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-900">
            Unable to Load Services
          </h2>

          <p className="mt-2 text-sm leading-6 text-red-600">
            {requestError?.message ||
              requestError?.error ||
              "Something went wrong while loading services."}
          </p>

          <button
            type="button"
            onClick={handleRetry}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <RefreshCw size={17} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /*
  ========================================
  PAGE
  ========================================
  */

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7">

      {/* =================================
          PAGE HEADER
      ================================= */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          {/* Back to Categories */}

          <button
            type="button"
            onClick={() =>
              navigate(
                `/owner/salons/${salonId}/categories`,
              )
            }
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Categories
          </button>

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Scissors size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Services
              </h1>

              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                {currentCategory?.name
                  ? `Manage services for ${currentCategory.name}.`
                  : "Manage services for this category."}
              </p>
            </div>
          </div>
        </div>

        {/* =================================
            ADD SERVICE
        ================================= */}

        {services.length > 0 && (
          <button
            type="button"
            onClick={handleCreateService}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
          >
            <Plus size={19} />
            Add Service
          </button>
        )}
      </div>

      {/* =================================
          CATEGORY INFORMATION
      ================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
            <Layers3
              size={23}
              className="text-slate-600"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Category
            </p>

            <p className="mt-0.5 text-lg font-bold text-slate-900">
              {currentCategory?.name ||
                `Category #${categoryId}`}
            </p>

            <p className="mt-0.5 text-sm text-slate-500">
              {services.length}{" "}
              {services.length === 1
                ? "service"
                : "services"}
            </p>
          </div>

        </div>
      </div>

      {/* =================================
          EMPTY STATE

          IMPORTANT:

          services.length === 0 is NOT an
          error.

          It means the API successfully
          returned an empty collection.
      ================================= */}

      {services.length === 0 ? (
        <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">

          <div>

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
              <Scissors
                size={36}
                className="text-emerald-600"
              />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-slate-900">
              No Services Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              This category does not have any services
              yet. Create the first service for this
              category.
            </p>

            <button
              type="button"
              onClick={handleCreateService}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
            >
              <Plus size={19} />
              Create First Service
            </button>

          </div>
        </div>
      ) : (

        /* =================================
           SERVICE GRID
        ================================= */

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={() =>
                handleEditService(service)
              }
              onDelete={() =>
                handleDeleteService(service)
              }
            />
          ))}

        </div>
      )}
    </div>
  );
}

export default ServiceListPage;

