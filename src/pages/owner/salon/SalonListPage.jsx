import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus, Store } from "lucide-react";
import { toast } from "react-hot-toast";

import SalonCard from "../../../features/salon/SalonCard";
import DeleteSalonDialog from "../../../features/salon/DeleteSalonDialog";

import {
  getOwnerSalons,
  deleteSalon,
} from "../../../features/redux/salonThunk";

function SalonListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { salons, loading, error } = useSelector(
    (state) => state.salon,
  );

  const [selectedSalon, setSelectedSalon] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  /* ===========================
     LOAD OWNER SALONS
  =========================== */

  useEffect(() => {
    dispatch(getOwnerSalons());
  }, [dispatch]);

  /* ===========================
     CREATE SALON
  =========================== */

  const handleCreateSalon = () => {
    navigate("/owner/salons/create");
  };

  /* ===========================
     EDIT SALON
  =========================== */

  const handleEditSalon = (salon) => {
    navigate(`/owner/salons/edit/${salon.id}`);
  };

  /* ===========================
     MANAGE CATEGORIES
  =========================== */

  const handleManageCategories = (salon) => {
    navigate(`/owner/salons/${salon.id}/categories`);
  };

  /* ===========================
     OPEN DELETE DIALOG
  =========================== */

  const handleDeleteClick = (salon) => {
    setSelectedSalon(salon);
    setDeleteDialogOpen(true);
  };

  /* ===========================
     CLOSE DELETE DIALOG
  =========================== */

  const handleCloseDeleteDialog = () => {
    if (loading.delete) return;

    setDeleteDialogOpen(false);
    setSelectedSalon(null);
  };

  /* ===========================
     DELETE SALON
  =========================== */

  const handleDeleteSalon = async () => {
    if (!selectedSalon) return;

    try {
      await dispatch(deleteSalon(selectedSalon.id)).unwrap();

      toast.success("Salon deleted successfully.");

      setDeleteDialogOpen(false);
      setSelectedSalon(null);
    } catch (error) {
      toast.error(
        error?.message || "Unable to delete salon.",
      );
    }
  };

  /* ===========================
     LOADING
  =========================== */

  if (loading.fetch) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

          <p className="mt-4 text-slate-500">
            Loading salons...
          </p>
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
        <div className="rounded-xl border border-red-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Unable to load salons
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error.message || "Something went wrong."}
          </p>

          <button
            type="button"
            onClick={() => dispatch(getOwnerSalons())}
            className="mt-5 rounded-lg bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ===========================
          PAGE HEADER
      =========================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            My Salons
          </h1>

          <p className="mt-1 text-slate-500">
            Manage your salons and their information.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateSalon}
          className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          <Plus size={20} />

          Create Salon
        </button>
      </div>

      {/* ===========================
          SALON COUNT
      =========================== */}

      {salons.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Store size={17} />

          <span>
            You have{" "}
            <span className="font-semibold text-slate-700">
              {salons.length}
            </span>{" "}
            {salons.length === 1 ? "salon" : "salons"}.
          </span>
        </div>
      )}

      {/* ===========================
          EMPTY STATE
      =========================== */}

      {salons.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <Store
              size={30}
              className="text-emerald-600"
            />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-900">
            No salons yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-slate-500">
            Create your first salon to start managing
            categories, services and bookings.
          </p>

          <button
            type="button"
            onClick={handleCreateSalon}
            className="mt-7 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
          >
            Create Your First Salon
          </button>
        </div>
      ) : (
        /* ===========================
             SALON GRID
        =========================== */

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {salons.map((salon) => (
            <SalonCard
              key={salon.id}
              salon={salon}

              onEdit={() =>
                handleEditSalon(salon)
              }

              onManageCategories={() =>
                handleManageCategories(salon)
              }

              onDelete={() =>
                handleDeleteClick(salon)
              }
            />
          ))}
        </div>
      )}

      {/* ===========================
          DELETE DIALOG
      =========================== */}

      <DeleteSalonDialog
        open={deleteDialogOpen}
        salon={selectedSalon}
        loading={loading.delete}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteSalon}
      />
    </div>
  );
}

export default SalonListPage;
