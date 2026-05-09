"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, Building2, LayoutDashboard } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-secondary hover:text-primary transition-colors"
        >
          <Home className="h-6 w-6 text-primary" />
          <span>{SITE_CONFIG.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors font-medium"
          >
            <Home className="h-4 w-4" />
            الرئيسية
          </Link>
          <Link
            href="/houses"
            className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors font-medium"
          >
            <Building2 className="h-4 w-4" />
            المنازل
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors font-medium"
          >
            <LayoutDashboard className="h-4 w-4" />
            لوحة التحكم
          </Link>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-orange-50"
          aria-label="فتح القائمة"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* القائمة المتنقلة */}
      {isOpen && (
        <div className="md:hidden border-t border-orange-100 bg-white px-4 py-4 animate-fadeIn">
          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-orange-50 hover:text-primary transition-colors"
            >
              <Home className="h-5 w-5" />
              الرئيسية
            </Link>
            <Link
              href="/houses"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-orange-50 hover:text-primary transition-colors"
            >
              <Building2 className="h-5 w-5" />
              المنازل
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-orange-50 hover:text-primary transition-colors"
            >
              <LayoutDashboard className="h-5 w-5" />
              لوحة التحكم
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
