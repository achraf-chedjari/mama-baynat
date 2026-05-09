"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteHouse } from "@/lib/server-actions";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function DeleteHouseButton({
  houseId,
  houseTitle,
}: {
  houseId: string;
  houseTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteHouse(houseId);
      router.refresh();
    } catch {
      alert("حدث خطأ أثناء الحذف");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="حذف المنزل">
        <p className="mb-6 text-gray-600">
          هل أنت متأكد من حذف منزل <span className="font-bold text-gray-800">{houseTitle}</span>؟
          هذا الإجراء لا يمكن التراجع عنه.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            إلغاء
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? "جارٍ الحذف..." : "حذف"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
