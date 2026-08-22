import { Bell, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TopNavbar({ title }) {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();


  const handleClickBtn=(e)=>{
    e.preventDefault();
    console.log("clicked");
    navigate("/owner/profile");

  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          {title}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search (Future Ready) */}
        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            disabled
            className="w-72 rounded-xl border border-slate-300 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Notification */}
        <button
          className="relative rounded-xl p-2 transition hover:bg-slate-100"
          title="Notifications"
        >
          <Bell size={22} className="text-slate-700" />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-slate-100"
        
        onClick={handleClickBtn}
        
        
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
            {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-slate-800">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="text-xs text-slate-500">{user?.roles?.join(", ")}</p>
          </div>
        </button>
      </div>
    </header>
  );
}

export default TopNavbar;
