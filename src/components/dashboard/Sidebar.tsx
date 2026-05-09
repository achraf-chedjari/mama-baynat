"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  MessageSquare,
  Settings,
  LogOut,
  Home,
  Menu,
  X,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { logoutAdmin } from "@/lib/auth-actions";

const navItems = [
  { href: "/dashboard", label: "الإحصائيات", icon: LayoutDashboard },
  { href: "/dashboard/houses", label: "المنازل", icon: Building2 },
  { href: "/dashboard/bookings", label: "الحجوزات", icon: CalendarCheck },
  { href: "/dashboard/messages", label: "التواصل", icon: MessageSquare },
  { href: "/dashboard/settings", label: "الإعدادات", icon: Settings },
];

function SidebarContent({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClick}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
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
            <LogOut className="h-5 w-5 shrink-0" />
            تسجيل الخروج
          </button>
        </form>
      </div>
    </>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:border-l md:bg-white md:shadow-sm">
        <div className="flex items-center gap-2 border-b px-5 py-4">
          <Home className="h-6 w-6 text-primary shrink-0" />
          <span className="text-lg font-bold text-secondary">{SITE_CONFIG.name}</span>
        </div>
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b bg-white px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <Home className="h-5 w-5 text-primary" />
          <span className="text-base font-bold text-secondary">{SITE_CONFIG.name}</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          aria-label="فتح القائمة"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div className="flex items-center gap-2">
                <Home className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-secondary">{SITE_CONFIG.name}</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-lg p-1 text-gray-600 hover:bg-gray-100"
                aria-label="إغلاق القائمة"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent onClick={() => setIsOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
