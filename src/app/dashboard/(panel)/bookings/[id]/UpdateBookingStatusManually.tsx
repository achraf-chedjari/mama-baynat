"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { updateBookingStatus } from "@/lib/server-actions";
import Button from "@/components/ui/Button";

export default function UpdateBookingStatusManually({
  bookingId,
}: {
  bookingId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await updateBookingStatus(bookingId, "confirmed");
      router.refresh();
    } catch (err: any) {
      alert(err?.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    setLoading(true);
    try {
      await updateBookingStatus(bookingId, "cancelled");
      router.refresh();
    } catch {
      alert("حدث خطأ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-3">
      <Button onClick={handleConfirm} disabled={loading} variant="success">
        <Check className="h-4 w-4" />
        تأكيد الحجز
      </Button>
      <Button onClick={handleCancel} disabled={loading} variant="danger">
        <X className="h-4 w-4" />
        إلغاء الحجز
      </Button>
    </div>
  );
}
