import React from "react";
import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "Tri-Thanh Admin",
  description: "Tri~Thanh Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
