import {
  LayoutDashboard,
  Store,
  CalendarDays,
  User,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";




const navItemClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition
   ${
     isActive
       ? "bg-emerald-100 text-emerald-700"
       : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
   }`;

function CustomerSidebar() {
  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Logo */}
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-2xl font-bold text-emerald-600">SalonBook</h2>

        <p className="mt-1 text-xs text-slate-500">Customer Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-8">
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Dashboard
          </p>

          <div className="space-y-1">
            <NavLink to="/customer" end className={navItemClass}>
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>

            <NavLink to="/customer/salons" className={navItemClass}>
              <Store size={20} />
              Browse Salons
            </NavLink>

            <NavLink to="/customer/bookings" className={navItemClass}>
              <CalendarDays size={20} />
              My Bookings
            </NavLink>

            <NavLink to="/customer/profile" className={navItemClass}>
              <User size={20} />
              Profile
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-200 p-3">
        <LogoutButton />
      </div>
    </div>
  );
}

export default CustomerSidebar;

