"use client"; // Must be a client component to use usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../assets/logo.png";

export default function Sidebar() {
  const pathname = usePathname();

  const getLinkStyle = (path: string) => {
    const isActive = pathname === path;

    return isActive
      ? "flex items-center gap-3 px-4 py-3 bg-white text-indigo-700 rounded-xl font-bold shadow-sm" // Active Style
      : "flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#312E81] hover:bg-white/50 rounded-xl transition-all font-semibold"; // Inactive Style
  };

  return (
    <aside className="w-64 bg-[#EEF2FF] border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen p-6">
      <div className="flex items-center gap-3 mb-10">
        <Image
          src={logo}
          alt="Logo"
          width={40}
          height={40}
          className="rounded-xl"
        />
        <div>
          <h1 className="font-bold text-slate-900 leading-none">The Atelier</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            Project Studio
          </p>
        </div>
      </div>

      <nav className="space-y-1 flex-1">
        <Link href="/dashboard" className={getLinkStyle("/dashboard")}>
          <span>Projects</span>
        </Link>

        <Link
          href="/dashboard/allTasks"
          className={getLinkStyle("/dashboard/allTasks")}
        >
          <span>Tasks</span>
        </Link>

        <Link
          href="/dashboard/calendar"
          className={getLinkStyle("/dashboard/calendar")}
        >
          <span>Calendar</span>
        </Link>
      </nav>
    </aside>
  );
}
