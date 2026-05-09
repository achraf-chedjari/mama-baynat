"use client";
import { useRouter } from "next/navigation";
import { markContactRead } from "@/lib/server-actions";

export default function MarkAsReadButton({ contactId }: { contactId: string }) {
  const router = useRouter();

  async function handleMarkRead() {
    try {
      await markContactRead(contactId);
      router.refresh();
    } catch {
      alert("حدث خطأ");
    }
  }

  return (
    <button
      onClick={handleMarkRead}
      className="mr-3 inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
    >
      تمت القراءة
    </button>
  );
}
