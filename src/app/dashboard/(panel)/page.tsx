import {
  Building2, CalendarCheck, MessageSquare, DollarSign, Home, Ban, Clock,
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { getDashboardStats, getBookings } from "@/lib/actions";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { formatDate } from "@/lib/format";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const bookings = await getBookings();
  const recentBookings = bookings.slice(0, 5);

  const statusBadge: Record<string, "warning" | "success" | "danger"> = {
    pending: "warning", confirmed: "success", cancelled: "danger",
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary">لوحة التحكم</h1>
        <p className="mt-1 text-gray-500">نظرة عامة على المنصة</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="إجمالي المنازل" value={stats.totalHouses}
          icon={<Building2 className="h-6 w-6" />} color="primary" />
        <StatsCard title="منازل متاحة" value={stats.availableHouses}
          icon={<Home className="h-6 w-6" />} color="success" />
        <StatsCard title="حجوزات معلقة" value={stats.pendingBookings}
          icon={<Clock className="h-6 w-6" />} color="accent" />
        <StatsCard title="حجوزات مؤكدة" value={stats.confirmedBookings}
          icon={<CalendarCheck className="h-6 w-6" />} color="booking" />
        <StatsCard title="حجوزات ملغية" value={stats.cancelledBookings}
          icon={<Ban className="h-6 w-6" />} color="danger" />
        <StatsCard title="رسائل غير مقروءة" value={stats.unreadContacts}
          icon={<MessageSquare className="h-6 w-6" />} color="info" />
        <StatsCard title="الإيرادات المتوقعة" value={`${stats.totalRevenue} د.ج`}
          icon={<DollarSign className="h-6 w-6" />} color="secondary" />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">آخر الحجوزات</h2>
          <Link href="/dashboard/bookings"
            className="text-sm font-medium text-primary hover:underline">عرض الكل</Link>
        </div>

        {recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-3 text-right font-medium text-gray-500">النزيل</th>
                  <th className="py-3 text-right font-medium text-gray-500">المنزل</th>
                  <th className="py-3 text-right font-medium text-gray-500">تاريخ الدخول</th>
                  <th className="py-3 text-right font-medium text-gray-500">تاريخ الخروج</th>
                  <th className="py-3 text-right font-medium text-gray-500">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-50">
                    <td className="py-3 text-gray-800">{booking.guest_name}</td>
                    <td className="py-3 text-gray-600">{booking.houses?.title || "-"}</td>
                    <td className="py-3 text-gray-600">{formatDate(booking.check_in)}</td>
                    <td className="py-3 text-gray-600">{formatDate(booking.check_out)}</td>
                    <td className="py-3">
                      <Badge variant={statusBadge[booking.status]}>{booking.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="py-8 text-center text-gray-500">لا توجد حجوزات بعد</p>
        )}
      </div>
    </>
  );
}
