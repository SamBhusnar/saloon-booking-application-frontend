import { AlertTriangle } from "lucide-react";
import { useEffect, useRef } from "react";

function ConfirmDialog({
  open,
  title = "Confirmation",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "emerald",
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleCancel = () => {
    dialogRef.current.close();
    onCancel?.();
  };

  const handleConfirm = () => {
    dialogRef.current.close();
    onConfirm?.();
  };

  const confirmButtonStyles = {
    emerald: "bg-emerald-600 hover:bg-emerald-700",
    red: "bg-red-600 hover:bg-red-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    amber: "bg-amber-500 hover:bg-amber-600",
    slate: "bg-slate-700 hover:bg-slate-800",
  };

  return (
    <dialog
      ref={dialogRef}
      className="w-full max-w-md rounded-2xl p-0 shadow-2xl backdrop:bg-black/40"
    >
      <div className="p-7">
        {/* Icon */}

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="text-red-600" size={28} />
        </div>

        {/* Title */}

        <h2 className="mt-5 text-center text-2xl font-bold text-slate-800">
          {title}
        </h2>

        {/* Message */}

        <p className="mt-3 text-center leading-7 text-slate-600">{message}</p>

        {/* Buttons */}

        <div className="mt-8 flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 rounded-xl border border-slate-300 py-3 font-medium transition hover:bg-slate-100"
          >
            {cancelText}
          </button>

          <button
            onClick={handleConfirm}
            className={`flex-1 rounded-xl py-3 font-medium text-white transition ${
              confirmButtonStyles[confirmColor]
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmDialog;
 