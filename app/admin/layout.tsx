import { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Dashboard - NeuroWebLabs",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-islamabad-bg)] text-[var(--color-islamabad-primary)] overflow-x-hidden">
      <AdminSidebar />
      <main className="lg:ml-72 pt-16 lg:pt-0 w-full lg:w-[calc(100%-18rem)]">
        <div className="h-full w-full max-w-[1600px] mx-auto p-4 md:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}