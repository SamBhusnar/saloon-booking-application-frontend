import { Outlet } from "react-router-dom";
import TopNavbar from "../components/common/TopNavbar";

function DashboardLayout({ sidebar, title }) {
  return (
    <div className="grid min-h-screen grid-cols-[220px_1fr] bg-slate-100">
      {/* Sidebar */}
      <aside className="border-r border-slate-200 bg-white">{sidebar}</aside>

      {/* Right Section */}
      <div className="flex min-h-screen flex-col">
        <TopNavbar title={title} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
