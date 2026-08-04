import { useState } from "react";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import ConfirmDialog from "./ConfirmDialog";
import { logout } from "../../features/auth/authSlice";

function LogoutButton() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");

    dispatch(logout());

    toast.success("Logged out successfully.");

    navigate("/login", { replace: true });

    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        <LogOut size={20} />
        Logout
      </button>

      <ConfirmDialog
        open={open}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        confirmColor="red"
        onCancel={() => setOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

export default LogoutButton;
