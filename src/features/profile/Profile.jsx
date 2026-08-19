import React from "react";
import { useSelector } from "react-redux";
import { UserRound, Mail, User, ShieldCheck } from "lucide-react";

function Profile() {
  const user = useSelector((state) => state.auth.user);

  /* =========================================================
     USER NOT AVAILABLE
  ========================================================= */

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <UserRound className="mx-auto mb-3 h-12 w-12 text-slate-300" />

          <h2 className="text-lg font-semibold text-slate-800">
            Profile unavailable
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            User information could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     FULL NAME
  ========================================================= */

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <UserRound className="h-6 w-6 text-emerald-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800">Profile</h1>

              <p className="mt-0.5 text-sm text-slate-500">
                View your account information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PROFILE CARD
      ===================================================== */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* ===================================================
            PROFILE HEADER
        =================================================== */}

        <div className="border-b border-slate-200 bg-slate-50 px-6 py-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            {/* =================================================
                PROFILE IMAGE PLACEHOLDER
            ================================================= */}

            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 border-white bg-emerald-50 shadow-sm">
              <UserRound className="h-14 w-14 text-emerald-500" />
            </div>

            {/* =================================================
                BASIC INFORMATION
            ================================================= */}

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold capitalize text-slate-800">
                {fullName || "User"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                @{user.username || "username"}
              </p>

              {/* ROLE */}

              <div className="mt-3 flex justify-center sm:justify-start">
                {user.roles?.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />

                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            USER INFORMATION
        =================================================== */}

        <div className="p-6">
          <h3 className="mb-5 text-lg font-semibold text-slate-800">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* =================================================
                FIRST NAME
            ================================================= */}

            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <User className="h-4 w-4" />

                <span>First Name</span>
              </div>

              <p className="font-medium capitalize text-slate-800">
                {user.firstName || "Not available"}
              </p>
            </div>

            {/* =================================================
                LAST NAME
            ================================================= */}

            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <User className="h-4 w-4" />

                <span>Last Name</span>
              </div>

              <p className="font-medium capitalize text-slate-800">
                {user.lastName || "Not available"}
              </p>
            </div>

            {/* =================================================
                FULL NAME
            ================================================= */}

            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <UserRound className="h-4 w-4" />

                <span>Full Name</span>
              </div>

              <p className="font-medium capitalize text-slate-800">
                {fullName || "Not available"}
              </p>
            </div>

            {/* =================================================
                USERNAME
            ================================================= */}

            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <User className="h-4 w-4" />

                <span>Username</span>
              </div>

              <p className="font-medium text-slate-800">
                {user.username || "Not available"}
              </p>
            </div>

            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="rounded-lg border border-slate-200 bg-white p-4 md:col-span-2">
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Mail className="h-4 w-4" />

                <span>Email Address</span>
              </div>

              <p className="font-medium text-slate-800">
                {user.email || "Not available"}
              </p>
            </div>

            {/* =================================================
                ROLE
            ================================================= */}

            <div className="rounded-lg border border-slate-200 bg-white p-4 md:col-span-2">
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck className="h-4 w-4" />

                <span>Role</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {user.roles?.length > 0 ? (
                  user.roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                    >
                      {role}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">Not available</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
