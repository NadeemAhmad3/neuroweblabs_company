"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/admin-login");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className={`flex-grow ${!isAdminRoute ? "pt-[115px]" : ""}`}>
        {children}
      </main>
    </>
  );
}