import React from "react";

function AuthLayout({
  bannerTitle,
  bannerDescription,
  bannerImage = "/images/login-banner.jpg",
  children,
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Left Side */}
      <div className="relative hidden lg:flex w-1/2 overflow-hidden">
        <img
          src={bannerImage}
          alt="Authentication"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-emerald-900/50"></div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-center px-20 text-white">
          <span className="mb-4 inline-block rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur-sm w-fit">
            Salon Booking Platform
          </span>

          <h1 className="max-w-lg text-5xl font-extrabold leading-tight">
            {bannerTitle}
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-200">
            {bannerDescription}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-1 justify-center px-6 py-10">
        <div className="flex w-full max-w-md items-center">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
