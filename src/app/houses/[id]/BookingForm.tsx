"use client";
import { useState, useEffect, useMemo } from "react";
import { CalendarCheck, Send, Ban, Sun } from "lucide-react";
import { MESSAGES, SITE_CONFIG } from "@/lib/config";
import { formatDate } from "@/lib/format";

interface BookedDate {
  check_in: string;
  check_out: string;
}

interface BookingFormProps {
  houseId: string;
  pricePerNight: number;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDateStr(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function BookingForm({ houseId, pricePerNight }: BookingFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);
  const [startDate, setStartDate] = useState("");
  const [nights, setNights] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch(`/api/bookings?house_id=${houseId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.bookings) setBookedDates(data.bookings);
      })
      .catch(() => {});
  }, [houseId]);

  const endDate = useMemo(() => {
    if (!startDate) return "";
    return formatDateStr(addDays(new Date(startDate), nights));
  }, [startDate, nights]);

  const totalPrice = useMemo(() => {
    if (!startDate) return 0;
    return pricePerNight * nights;
  }, [pricePerNight, nights, startDate]);

  function isDateUnavailable(date: Date): boolean {
    return bookedDates.some((b) => {
      const start = new Date(b.check_in);
      const end = new Date(b.check_out);
      return date >= start && date < end;
    });
  }

  function checkIfStartDateValid(dateStr: string): string | null {
    if (!dateStr) return null;
    const start = new Date(dateStr);
    if (isDateUnavailable(start)) return "هذا التاريخ محجوز، يرجى اختيار تاريخ آخر";
    const end = addDays(start, nights);
    // Check if any day in the range is unavailable
    for (let d = new Date(start); d < end; d = addDays(d, 1)) {
      if (isDateUnavailable(d)) return "بعض التواريخ في هذه الفترة محجوزة";
    }
    return null;
  }

  function handleStartDateChange(value: string) {
    setStartDate(value);
    setError("");
    const conflict = checkIfStartDateValid(value);
    if (conflict) setError(conflict);
  }

  function handleNightsChange(value: number) {
    setNights(Math.max(1, Math.min(30, value)));
    setError("");
    if (startDate) {
      const conflict = checkIfStartDateValid(startDate);
      if (conflict) setError(conflict);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const conflict = checkIfStartDateValid(startDate);
    if (conflict) {
      setError(conflict);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          house_id: houseId,
          guest_name: guestName,
          guest_phone: guestPhone,
          check_in: startDate,
          check_out: endDate,
          notes: notes || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(true);
      setStartDate("");
      setNights(1);
      setGuestName("");
      setGuestPhone("");
      setNotes("");
    } catch (err: any) {
      setError(err.message || MESSAGES.bookingError);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-xl bg-green-50 p-4 text-center">
        <p className="text-green-700 font-medium">{MESSAGES.bookingSuccess}</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-2 text-sm text-green-600 hover:underline"
        >
          حجز آخر
        </button>
      </div>
    );
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-booking px-6 py-3 text-lg font-bold text-white transition-all hover:bg-booking/90 hover:shadow-lg"
      >
        <CalendarCheck className="h-5 w-5" />
        احجز الآن
      </button>
    );
  }

  const today = formatDateStr(new Date());

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {bookedDates.length > 0 && (
        <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
          <p className="flex items-center gap-1 font-medium mb-1">
            <Ban className="h-3.5 w-3.5" />
            تواريخ محجوزة مسبقاً
          </p>
          {bookedDates.map((b, i) => (
            <p key={i} className="text-amber-600">
              {formatDate(b.check_in, { day: "numeric", month: "long" })} ← {formatDate(b.check_out, { day: "numeric", month: "long" })}
            </p>
          ))}
        </div>
      )}

      <input
        type="text"
        placeholder="الاسم الكامل"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
        required
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <input
        type="tel"
        placeholder="رقم الهاتف"
        value={guestPhone}
        onChange={(e) => setGuestPhone(e.target.value)}
        required
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        dir="ltr"
      />

      {/* Date selection */}
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
          تاريخ البداية
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => handleStartDateChange(e.target.value)}
          min={today}
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
          عدد الليالي
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleNightsChange(nights - 1)}
            disabled={nights <= 1}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-all hover:bg-gray-50 disabled:opacity-30"
          >
            -
          </button>
          <input
            type="number"
            value={nights}
            onChange={(e) => handleNightsChange(parseInt(e.target.value) || 1)}
            min={1}
            max={30}
            className="h-10 w-16 rounded-xl border border-gray-200 text-center text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="button"
            onClick={() => handleNightsChange(nights + 1)}
            disabled={nights >= 30}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-all hover:bg-gray-50 disabled:opacity-30"
          >
            +
          </button>
        </div>
      </div>

      {/* Summary */}
      {startDate && (
        <div className="rounded-xl bg-primary/5 p-3 text-sm space-y-1">
          <div className="flex justify-between text-gray-600">
            <span>تاريخ البداية</span>
            <span className="font-medium text-gray-800">{formatDate(startDate, { weekday: "short", day: "numeric", month: "long" })}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>تاريخ المغادرة</span>
            <span className="font-medium text-gray-800">{formatDate(endDate, { weekday: "short", day: "numeric", month: "long" })}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>عدد الليالي</span>
            <span className="font-medium text-gray-800">{nights}</span>
          </div>
          <div className="flex justify-between border-t border-primary/10 pt-1">
            <span className="font-bold text-gray-800">المجموع</span>
            <span className="font-bold text-primary">{totalPrice.toLocaleString()} د.ج</span>
          </div>
        </div>
      )}

      <textarea
        placeholder="ملاحظات (اختياري)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-[60px] resize-none"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading || !startDate}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-booking px-6 py-3 font-bold text-white transition-all hover:bg-booking/90 disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
        {loading ? MESSAGES.loading : "إرسال طلب الحجز"}
      </button>

      <button
        type="button"
        onClick={() => setShowForm(false)}
        className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
      >
        إلغاء
      </button>
    </form>
  );
}
