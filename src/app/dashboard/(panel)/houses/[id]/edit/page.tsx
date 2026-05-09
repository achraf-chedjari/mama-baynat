"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import Button from "@/components/ui/Button";
import Input, { Textarea, Select } from "@/components/ui/Input";
import { updateHouse } from "@/lib/server-actions";
import { CITIES, CURRENCY, MESSAGES } from "@/lib/config";
import type { House } from "@/lib/types";
import ImageUploader from "@/components/dashboard/ImageUploader";

const defaultAmenities = [
  "واي فاي",
  "تلفاز", "مكيف هواء",
  "مطبخ مجهز", "مطبخ صغير",
  "شرفة", "حديقة",
  "موقف سيارات", "شواية",
  "غسالة ملابس", "ثلاجة",
  "ماء ساخن", "مولد كهربائي",
];

const statusOptions = [
  { value: "available", label: "متاح" },
  { value: "booked", label: "محجوز" },
  { value: "maintenance", label: "صيانة" },
];

export default function EditHousePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [houseId, setHouseId] = useState<string>("");
  const [form, setForm] = useState({
    title: "", description: "", city: "",
    price_per_night: "", bedrooms: "", bathrooms: "",
    max_guests: "", rating: "0", is_featured: false,
    address: "", phone: "", map_url: "",
    status: "available" as "available" | "booked" | "maintenance",
  });

  useEffect(() => {
    async function load() {
      const { id } = await params;
      setHouseId(id);
      try {
        const res = await fetch(`/api/houses/${id}`);
        const data = await res.json();
        const house: House = data.house;
        setForm({
          title: house.title, description: house.description, city: house.city,
          price_per_night: house.price_per_night.toString(),
          bedrooms: house.bedrooms.toString(), bathrooms: house.bathrooms.toString(),
          max_guests: house.max_guests.toString(), rating: house.rating.toString(),
          is_featured: house.is_featured, status: house.status || "available",
          address: house.address || "",
          phone: house.phone || "",
          map_url: house.map_url || "",
        });
        setImages(house.images.length > 0 ? house.images : []);
        setAmenities(house.amenities || []);
      } catch {
        router.push("/dashboard/houses");
      } finally {
        setFetching(false);
      }
    }
    load();
  }, [params, router]);

  function toggleAmenity(amenity: string) {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (images.length === 0) {
      setError("يرجى إضافة صورة واحدة على الأقل");
      setLoading(false);
      return;
    }

    try {
      await updateHouse(houseId, {
        title: form.title, description: form.description, city: form.city,
        price_per_night: parseInt(form.price_per_night),
        bedrooms: parseInt(form.bedrooms), bathrooms: parseInt(form.bathrooms),
        max_guests: parseInt(form.max_guests), rating: parseFloat(form.rating),
        is_featured: form.is_featured, status: form.status,
        images, amenities,
        phone: form.phone || undefined,
        map_url: form.map_url || undefined,
        address: form.address || undefined,
      });
      router.push("/dashboard/houses");
      router.refresh();
    } catch (err: any) {
      setError(err.message || MESSAGES.error);
    } finally {
      setLoading(false);
    }
  }

  function updateField(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <Link href="/dashboard/houses"
        className="mb-6 flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors w-fit">
        <ArrowLeft className="h-4 w-4" /> العودة لقائمة المنازل
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary">تعديل المنزل</h1>
        <p className="mt-1 text-gray-500">تحديث معلومات {form.title}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Images */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">صور المنزل</h2>
          <ImageUploader images={images} onChange={setImages} />
        </div>

        {/* Basic info */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">المعلومات الأساسية</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="عنوان المنزل" value={form.title}
              onChange={(e) => updateField("title", e.target.value)} required />
            <Select label="المدينة" value={form.city}
              onChange={(e) => updateField("city", e.target.value)} required>
              <option value="">اختر المدينة</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </Select>
            <div className="sm:col-span-2">
              <Textarea label="الوصف" value={form.description}
                onChange={(e) => updateField("description", e.target.value)} required />
            </div>
          </div>
        </div>

        {/* Details & pricing */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">التفاصيل والسعر</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label={`السعر لليلة (${CURRENCY.symbol})`} type="number" value={form.price_per_night}
              onChange={(e) => updateField("price_per_night", e.target.value)} required min={0} />
            <Input label="عدد غرف النوم" type="number" value={form.bedrooms}
              onChange={(e) => updateField("bedrooms", e.target.value)} required min={0} />
            <Input label="عدد الحمامات" type="number" value={form.bathrooms}
              onChange={(e) => updateField("bathrooms", e.target.value)} required min={0} />
            <Input label="أقصى عدد ضيوف" type="number" value={form.max_guests}
              onChange={(e) => updateField("max_guests", e.target.value)} required min={1} />
            <Input label="التقييم (0-5)" type="number" value={form.rating}
              onChange={(e) => updateField("rating", e.target.value)} min={0} max={5} step={0.1} />
            <Select label="الحالة" value={form.status}
              onChange={(e) => updateField("status", e.target.value)}>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Select>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input type="checkbox" id="is_featured" checked={form.is_featured}
              onChange={(e) => updateField("is_featured", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            <label htmlFor="is_featured" className="text-sm text-gray-700">منزل مميز</label>
          </div>
        </div>

        {/* Contact & Location */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">التواصل والموقع</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="رقم الهاتف للتواصل" type="tel" value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="مثال: 0555123456" dir="ltr" />
            <Input label="رابط Google Maps" type="url" value={form.map_url}
              onChange={(e) => updateField("map_url", e.target.value)}
              placeholder="https://maps.google.com/?q=..." dir="ltr" />
          </div>
          <div className="mt-3">
            <Input label="العنوان التفصيلي" value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="مثال: حي السلام، شارع 01، قرب المسجد" />
          </div>
        </div>

        {/* Amenities */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">المرافق والتجهيزات</h2>
          <div className="flex flex-wrap gap-2">
            {defaultAmenities.map((amenity) => (
              <button key={amenity} type="button" onClick={() => toggleAmenity(amenity)}
                className={`rounded-lg border px-3 py-1.5 text-sm transition-all ${
                  amenities.includes(amenity)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}>{amenity}</button>
            ))}
          </div>
          {amenities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {amenities.map((a) => (
                <span key={a} className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>

        {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

        <div className="flex justify-end gap-3">
          <Link href="/dashboard/houses"><Button type="button" variant="ghost">إلغاء</Button></Link>
          <Button type="submit" disabled={loading}>
            <Save className="h-4 w-4" />
            {loading ? "جارٍ الحفظ..." : "حفظ التغييرات"}
          </Button>
        </div>
      </form>
    </>
  );
}
