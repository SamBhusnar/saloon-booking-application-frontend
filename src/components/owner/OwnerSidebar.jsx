import {
  LayoutDashboard,
  Store,
  Scissors,
  CalendarDays,
  Users,
  CreditCard,
  Star,
  Bell,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import LogoutButton from "../common/LogoutButton";

/* ===========================
   NAV ITEM STYLE
=========================== */

const navItemClass = ({ isActive }) =>
  `group flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200
  ${
    isActive
      ? "bg-emerald-50 text-emerald-700 shadow-sm"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
  }`;

/* ===========================
   SIDEBAR
=========================== */

function OwnerSidebar() {
  return (
    <aside
      className="
        sticky top-0
        flex h-screen max-h-screen
        min-h-0 w-full
        flex-col
        overflow-hidden
        bg-white
      "
    >
      {/* ===========================
          LOGO / BRAND
      =========================== */}

      <div className="shrink-0 border-b border-slate-200 px-5 py-5">
        <h2 className="text-2xl font-bold tracking-tight text-emerald-600">
          SalonBook
        </h2>

        <p className="mt-1 text-xs font-medium text-slate-400">
          Salon Owner Panel
        </p>
      </div>

      {/* ===========================
          NAVIGATION

          IMPORTANT:
          Only this section is allowed
          to scroll vertically.
      =========================== */}

      <nav
        className="
          min-h-0
          flex-1
          overflow-y-auto
          overscroll-contain
          px-3 py-5
        "
      >
        <div className="space-y-6">
          {/* ===========================
              DASHBOARD
          =========================== */}

          <div>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Dashboard
            </p>

            <div className="space-y-1">
              <NavLink to="/owner/dashboard" end className={navItemClass}>
                <LayoutDashboard
                  size={19}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                <span>Dashboard</span>
              </NavLink>
            </div>
          </div>

          {/* ===========================
              SALON MANAGEMENT
          =========================== */}

          <div>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Salon Management
            </p>

            <div className="space-y-1">
              {/* Salons */}

              <NavLink to="/owner/salons" className={navItemClass}>
                <Store size={19} strokeWidth={1.8} className="shrink-0" />

                <span>Salons</span>
              </NavLink>

              {/* Services */}

              <NavLink to="/owner/booking/salons" className={navItemClass}>
                <Scissors size={19} strokeWidth={1.8} className="shrink-0" />

                <span>Services</span>
              </NavLink>
            </div>
          </div>

          {/* ===========================
              BOOKING MANAGEMENT
          =========================== */}

          <div>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Booking Management
            </p>

            <div className="space-y-1">
              {/* My Bookings */}

              <NavLink to="/owner/booking/list" className={navItemClass}>
                <CalendarDays
                  size={19}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                <span>My Bookings</span>
              </NavLink>

              {/* All Bookings */}

              <NavLink to="/owner/bookings/all" className={navItemClass}>
                <CalendarDays
                  size={19}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                <span>All Bookings</span>
              </NavLink>

              {/* Customers */}

              <NavLink to="/owner/salons/customers" className={navItemClass}>
                <Users size={19} strokeWidth={1.8} className="shrink-0" />

                <span>Customers</span>
              </NavLink>
            </div>
          </div>

          {/* ===========================
              PAYMENTS
          =========================== */}

          <div>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Payments
            </p>

            <div className="space-y-1">
              <NavLink to="/owner/salons/payments" className={navItemClass}>
                <CreditCard size={19} strokeWidth={1.8} className="shrink-0" />

                <span>Payments</span>
              </NavLink>
            </div>
          </div>

          {/* ===========================
              CUSTOMER EXPERIENCE
          =========================== */}

          <div>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Customer Experience
            </p>

            <div className="space-y-1">
              {/* Reviews */}

              <NavLink to="/owner/salons/reviews" className={navItemClass}>
                <Star size={19} strokeWidth={1.8} className="shrink-0" />

                <span>Reviews</span>
              </NavLink>

              {/* Notifications */}

              <NavLink to="/owner/notifications" className={navItemClass}>
                <Bell size={19} strokeWidth={1.8} className="shrink-0" />

                <span>Notifications</span>
              </NavLink>
            </div>
          </div>

          {/* ===========================
              ACCOUNT
          =========================== */}

          <div>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Account
            </p>

            <div className="space-y-1">
              {/* Profile */}

              <NavLink to="/owner/profile" className={navItemClass}>
                <User size={19} strokeWidth={1.8} className="shrink-0" />

                <span>Profile</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* ===========================
          LOGOUT

          Always stays at bottom of
          the viewport.
      =========================== */}

      <div
        className="
          shrink-0
          border-t
          border-slate-200
          bg-white
          p-3
        "
      >
        <LogoutButton />
      </div>
    </aside>
  );
}

export default OwnerSidebar;
