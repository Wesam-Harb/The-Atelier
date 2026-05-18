import { Providers } from "@/components/localProvider";
import Sidebar from "@/components/sideBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atelier | Project Management Dashboard",
  description:
    "Manage your professional projects and track team tasks seamlessly.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </Providers>
  );
}
