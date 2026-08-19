import { Mail, Phone, UserRound } from "lucide-react";

function CustomerCard({ customer }) {
  return (
    <tr className="border-b border-slate-100 last:border-b-0">
      {/* Customer */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <UserRound size={18} strokeWidth={1.8} />
          </div>

          {/* Name */}
          <div className="min-w-0">
            <p className="truncate font-medium text-slate-900">
              {customer.fullName || "Unknown Customer"}
            </p>

            <p className="text-xs text-slate-400">Customer #{customer.id}</p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Mail
            size={16}
            strokeWidth={1.8}
            className="shrink-0 text-slate-400"
          />

          <span className="truncate">{customer.email || "Not available"}</span>
        </div>
      </td>

      {/* Phone */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Phone
            size={16}
            strokeWidth={1.8}
            className="shrink-0 text-slate-400"
          />

          <span>{customer.phone || "Not available"}</span>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          Customer
        </span>
      </td>
    </tr>
  );
}

export default CustomerCard;
