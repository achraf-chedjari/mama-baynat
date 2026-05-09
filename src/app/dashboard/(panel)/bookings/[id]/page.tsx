import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { getBookingById } from "@/lib/actions";
import { formatDate } from "@/lib/format";
import UpdateBookingStatusManually from "./UpdateBookingStatusManually";
import { notFound } from "next/navigation";

const statusVariant: Record<string, "warning" | "success" | "danger"> = {
  pending: "warning",
  confirmed: "success",
  cancelled: "danger",
};

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = await getBookingById(id);

  if (!booking) notFound();

  return (
    <>
      <Link href="/dashboard/bookings"
        className="mb-6 flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors w-fit">
        <ArrowLeft className="h-4 w-4" /> العودة للحجوزات
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary">تفاصيل الحجز</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">معلومات النزيل</h2>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-gray-500">الاسم</dt>
              <dd className="font-medium text-gray-800">{booking.guest_name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">رقم الهاتف</dt>
              <dd className="font-medium text-gray-800" dir="ltr">{booking.guest_phone}</dd>
            </div>
            {booking.notes && (
              <div className="flex justify-between">
                <dt className="text-gray-500">ملاحظات</dt>
                <dd className="font-medium text-gray-800 max-w-[200px] text-left">{booking.notes}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-gray-500">تاريخ الحجز</dt>
              <dd className="font-medium text-gray-800">
                {booking.created_at ? formatDate(booking.created_at) : "-"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">تفاصيل الحجز</h2>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-gray-500">المنزل</dt>
              <dd className="font-medium text-gray-800">{booking.houses?.title || "-"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">المدينة</dt>
              <dd className="font-medium text-gray-800">{booking.houses?.city || "-"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">تاريخ الوصول</dt>
              <dd className="font-medium text-gray-800">{formatDate(booking.check_in)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">تاريخ المغادرة</dt>
              <dd className="font-medium text-gray-800">{formatDate(booking.check_out)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">السعر لليلة</dt>
              <dd className="font-medium text-gray-800">{booking.houses?.price_per_night || 0} د.ج</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">الحالة</dt>
              <dd><Badge variant={statusVariant[booking.status]}>{booking.status}</Badge></dd>
            </div>
          </dl>

          {booking.status === "pending" && (
            <div className="mt-6">
              <UpdateBookingStatusManually bookingId={booking.id} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
