import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

function PasswordInput({
  label,
  name,
  placeholder,
  register,
  error,
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
          {...register(name)}
          className={`
                        w-full rounded-xl border py-3 pl-11 pr-12
                        outline-none transition

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

        <button
          type="button"
          disabled={disabled}
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default PasswordInput;
