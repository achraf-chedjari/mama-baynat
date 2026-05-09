"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { updateBookingStatus } from "@/lib/server-actions";

export default function UpdateBookingStatus({
  bookingId,
  currentStatus,
}: {
  bookingId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleUpdate(status: "confirmed" | "cancelled") {
    setLoading(true);
    try {
      await updateBookingStatus(bookingId, status);
      router.refresh();
    } catch (err: any) {
      alert(err?.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  }

  if (currentStatus !== "pending") return null;

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => handleUpdate("confirmed")}
        disabled={loading}
        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-green-50 hover:text-green-600"
        title="تأكيد الحجز"
      >
        <Check className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleUpdate("cancelled")}
        disabled={loading}
        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
        title="إلغاء الحجز"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
