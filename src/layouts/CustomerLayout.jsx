import DashboardLayout from "./DashboardLayout";
import CustomerSidebar from "../components/customer/CustomerSidebar";

function CustomerLayout() {
  return (
    <DashboardLayout sidebar={<CustomerSidebar />} title="Customer Dashboard" />
  );
}

export default CustomerLayout;
