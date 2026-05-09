import Link from "next/link";
import { Plus, Edit3, Trash2, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { getHouses } from "@/lib/actions";
import DeleteHouseButton from "./DeleteHouseButton";

const statusVariant: Record<string, "success" | "warning" | "danger" | "info"> = {
  available: "success",
  booked: "warning",
  maintenance: "danger",
};

export const dynamic = "force-dynamic";

export default async function HousesPage() {
  const houses = await getHouses();

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary">إدارة المنازل</h1>
          <p className="mt-1 text-gray-500">إضافة وتعديل وحذف المنازل</p>
        </div>
        <Link href="/dashboard/houses/new">
          <Button>
            <Plus className="h-4 w-4" />
            إضافة منزل
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        {houses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">المنزل</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">المدينة</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">السعر</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">الحالة</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">مميز</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {houses.map((house) => (
                  <tr key={house.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={house.images?.[0] || "/placeholder.svg"}
                            alt={house.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="font-medium text-gray-800">{house.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{house.city}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">
                      {house.price_per_night} د.ج
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[house.status] || "gray"}>
                        {house.status || "available"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {house.is_featured ? (
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/houses/${house.id}/edit`}
                          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>
                        <DeleteHouseButton houseId={house.id} houseTitle={house.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mb-3 text-5xl">🏠</div>
            <p className="text-gray-500 mb-4">لا توجد منازل مضافة بعد</p>
            <Link href="/dashboard/houses/new">
              <Button>إضافة أول منزل</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
