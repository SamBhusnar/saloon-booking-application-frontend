import { useEffect, useMemo, useState } from "react";
import { Search, Users, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { getCustomersOfSalonAndAuth } from "../../../features/booking/auth/bookingThunk";

import CustomerCard from "./CustomerCard";

function CustomerListPage() {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.booking);

  const [searchTerm, setSearchTerm] = useState("");

  /* =========================================================
     FETCH CUSTOMERS
  ========================================================= */

  useEffect(() => {
    dispatch(getCustomersOfSalonAndAuth());
  }, [dispatch]);

  /* =========================================================
     FILTER CUSTOMERS
  ========================================================= */

  const filteredCustomers = useMemo(() => {
    const customers = users || [];

    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return customers;
    }

    return customers.filter((customer) => {
      const fullName = customer.fullName?.toLowerCase() || "";
      const email = customer.email?.toLowerCase() || "";
      const phone = customer.phone?.toLowerCase() || "";

      return (
        fullName.includes(search) ||
        email.includes(search) ||
        phone.includes(search)
      );
    });
  }, [users, searchTerm]);

  /* =========================================================
     REFRESH
  ========================================================= */

  const handleRefresh = () => {
    dispatch(getCustomersOfSalonAndAuth());
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="space-y-6">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Users size={22} strokeWidth={1.8} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Customers
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Customers who have booked your salons
              </p>
            </div>
          </div>
        </div>

        {/* Refresh */}
        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading.fetchAllUsers}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={loading.fetchAllUsers ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* =====================================================
          SEARCH + COUNT
      ===================================================== */}

      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            strokeWidth={1.8}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name, email or phone..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Count */}
        <div className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-800">
            {filteredCustomers.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-800">
            {(users || []).length}
          </span>{" "}
          customers
        </div>
      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && !loading.fetchAllUsers && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error?.message || "Failed to load customers."}
        </div>
      )}

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            {/* =================================================
                TABLE HEADER
            ================================================= */}

            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Phone
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Type
                </th>
              </tr>
            </thead>

            {/* =================================================
                TABLE BODY
            ================================================= */}

            <tbody>
              {/* Loading */}
              {loading.fetchAllUsers ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

                      <p className="mt-4 text-sm font-medium text-slate-600">
                        Loading customers...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                /* Empty */
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <Users size={25} strokeWidth={1.7} />
                      </div>

                      <h3 className="mt-4 text-sm font-semibold text-slate-800">
                        {searchTerm ? "No customers found" : "No customers yet"}
                      </h3>

                      <p className="mt-1 max-w-sm text-sm text-slate-500">
                        {searchTerm
                          ? "Try searching with a different name, email or phone number."
                          : "Customers who book your salons will appear here."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                /* Customers */
                filteredCustomers.map((customer) => (
                  <CustomerCard key={customer.id} customer={customer} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerListPage;
