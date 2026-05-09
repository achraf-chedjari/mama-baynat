import { redirect } from "next/navigation";
import { checkAdminSession } from "@/lib/auth-actions";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await checkAdminSession();

  if (!isAuthenticated) {
    redirect("/dashboard/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
