import React from "react";

function TextInput({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  register,
  error,
  disabled = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...register(name)}
          className={`
                        w-full rounded-xl border py-3 pr-4
                        transition outline-none

                        ${Icon ? "pl-11" : "pl-4"}

                        ${
                          error
                            ? "border-red-500"
                            : "border-slate-300 focus:border-emerald-500"
                        }

                        ${
                          disabled
                            ? "cursor-not-allowed bg-slate-100"
                            : "bg-white"
                        }
                    `}
        />
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default TextInput;
