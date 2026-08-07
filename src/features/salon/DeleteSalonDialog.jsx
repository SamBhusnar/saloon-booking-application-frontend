import React from "react";
import ConfirmDialog from "../../components/common/ConfirmDialog";

function DeleteSalonDialog({
  open,
  salon,
  loading = false,
  onClose,
  onConfirm,
}) {
  if (!salon) return null;

  return (
    <ConfirmDialog
      open={open}
      title="Delete Salon"
      confirmText={loading ? "Deleting..." : "Delete"}
      cancelText="Cancel"
      confirmButtonColor="red"
      loading={loading}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <div className="space-y-4">
        <p className="text-gray-700">
          Are you sure you want to delete
          <span className="font-semibold"> "{salon.name}"</span>?
        </p>

        <div className="rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="font-semibold text-red-700">
            This action cannot be undone.
          </p>

          <ul className="mt-3 list-disc list-inside text-red-600 space-y-1">
            <li>The salon will be permanently deleted.</li>

            <li>All categories will be deleted.</li>

            <li>All services inside those categories will be deleted.</li>

            <li>All uploaded salon images will be deleted from Cloudinary.</li>

            <li>Bookings associated with this salon may become unavailable.</li>
          </ul>
        </div>
      </div>
    </ConfirmDialog>
  );
}

export default DeleteSalonDialog;
