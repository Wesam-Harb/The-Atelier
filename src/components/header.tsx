"use client";

import { usePathname } from "next/navigation";
import CreateProjectButton from "./createProjectButton";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTransition } from "react";
import { signOut } from "next-auth/react";
import { useState } from "react";

type HeaderProps = {
  user: {
    name: string | null;
    id: string;
    email: string;
    password: string;
    image: string | null;
    createdAt: Date;
  } | null;
};

export default function Header({ user }: HeaderProps) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    startTransition(async () => {
      // This wipes cookies client-side and triggers a safe redirect
      // without letting the Server Action and Middleware collide!
      await signOut({ redirectTo: "/" });
    });
  };

  const pathname = usePathname();

  const getLinkStyle = (path: string) => {
    const isActive = pathname === path;

    return isActive
      ? "flex items-center gap-3 px-4 py-3 bg-white text-indigo-700 rounded-xl font-bold shadow-sm" // Active Style
      : "flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#312E81] hover:bg-white/50 rounded-xl transition-all font-semibold"; // Inactive Style
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-50/50 backdrop-blur-md border-b border-slate-200/60">
        <div className="flex justify-between items-center px-6 py-4">
          {/* LEFT SIDE: Hamburger & Branding */}
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg md:hidden transition"
              aria-label="Open Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Application Branding */}
            <span className="hidden max-md:block text-xl font-black text-indigo-600">
              Atelier
            </span>
          </div>

          {/* RIGHT SIDE: Action Controls */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <CreateProjectButton />
            </div>

            {/* Desktop-only Profile Name Display */}
            <span className="text-md font-bold text-slate-700">
              {user?.name}
            </span>

            <button
              disabled={isPending}
              className="p-2 text-red-600 rounded-full hover:bg-red-100 disabled:opacity-50 transition"
              onClick={handleLogout}
              title="Logout"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE SLIDING DRAWER PANEL ================= */}
      {/* Background Dim Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sliding Side Content Container */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-50 p-6 flex flex-col justify-between transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Menu Drawer Top Header Row */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-black text-indigo-600">Atelier</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links List (Stacked Column for Mobile) */}
          <nav className="flex flex-col gap-2">
            <Link
              href="/dashboard"
              className={getLinkStyle("/dashboard")}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/dashboard/allTasks"
              className={getLinkStyle("/dashboard/allTasks")}
              onClick={() => setIsOpen(false)}
            >
              Tasks
            </Link>
            <Link
              href="/dashboard/calendar"
              className={getLinkStyle("/dashboard/calendar")}
              onClick={() => setIsOpen(false)}
            >
              Calendar
            </Link>
          </nav>
        </div>

        {/* Mobile Drawer Bottom Profile Panel */}
        <div className="border-t border-slate-100 pt-4 mt-auto flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium">
                Logged in as
              </span>
              <span className="text-sm font-bold text-slate-800">
                {user?.name}
              </span>
            </div>
          </div>
          <div className="sm:hidden w-full">
            <CreateProjectButton />
          </div>
        </div>
      </div>
    </>
  );
}
