import DashboardLayout from "./DashboardLayout";
import OwnerSidebar from "../components/owner/OwnerSidebar";

function OwnerLayout() {
  return <DashboardLayout sidebar={<OwnerSidebar />} title="Owner Dashboard" />;
}

export default OwnerLayout;
