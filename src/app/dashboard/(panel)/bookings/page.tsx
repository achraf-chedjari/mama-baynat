import Link from "next/link";
import { Eye } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { getBookings } from "@/lib/actions";
import { formatDate } from "@/lib/format";
import UpdateBookingStatus from "./UpdateBookingStatus";

const statusVariant: Record<string, "warning" | "success" | "danger"> = {
  pending: "warning",
  confirmed: "success",
  cancelled: "danger",
};

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary">إدارة الحجوزات</h1>
        <p className="mt-1 text-gray-500">مراجعة وتأكيد حجوزات المنازل</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">النزيل</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">المنزل</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">الهاتف</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">تاريخ الوصول</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">تاريخ المغادرة</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">الحالة</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-800">{booking.guest_name}</td>
                    <td className="px-4 py-3 text-gray-600">{booking.houses?.title || "-"}</td>
                    <td className="px-4 py-3 text-gray-600" dir="ltr">{booking.guest_phone}</td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(booking.check_in)}</td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(booking.check_out)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[booking.status]}>{booking.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/bookings/${booking.id}`}
                          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <UpdateBookingStatus bookingId={booking.id} currentStatus={booking.status} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mb-3 text-5xl">📋</div>
            <p className="text-gray-500">لا توجد حجوزات بعد</p>
          </div>
        )}
      </div>
    </>
  );
}
