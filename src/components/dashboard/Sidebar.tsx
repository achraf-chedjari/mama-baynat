"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  MessageSquare,
  LogOut,
  Home,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { logoutAdmin } from "@/lib/auth-actions";

const navItems = [
  { href: "/dashboard", label: "الإحصائيات", icon: LayoutDashboard },
  { href: "/dashboard/houses", label: "المنازل", icon: Building2 },
  { href: "/dashboard/bookings", label: "الحجوزات", icon: CalendarCheck },
  { href: "/dashboard/messages", label: "التواصل", icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-l bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b px-5 py-4">
        <Home className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold text-secondary">{SITE_CONFIG.name}</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3">
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition-all hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-5 w-5" />
            تسجيل الخروج
          </button>
        </form>
      </div>
    </aside>
  );
}
