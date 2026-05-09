"use client";
import { useActionState, useState } from "react";
import { updateSettings } from "@/lib/settings-actions";
import type { SiteSettings } from "@/lib/types";
import { Save, Phone, Mail, Globe, MessageSquare, Info, Shield, HelpCircle } from "lucide-react";

const formSections = [
  {
    id: "contact",
    label: "معلومات التواصل",
    icon: Phone,
    fields: [
      { name: "owner_name", label: "اسم المالك", type: "text", dir: "rtl" },
      { name: "owner_phone", label: "رقم الهاتف (مع مفتاح الدولة)", type: "text", dir: "ltr", placeholder: "213550000000" },
      { name: "owner_email", label: "البريد الإلكتروني", type: "email", dir: "ltr" },
      { name: "whatsapp_message", label: "رسالة واتساب الافتراضية", type: "textarea", dir: "rtl" },
    ],
  },
  {
    id: "social",
    label: "روابط التواصل الاجتماعي",
    icon: Globe,
    fields: [
      { name: "instagram", label: "رابط إنستغرام", type: "url", dir: "ltr" },
      { name: "twitter", label: "رابط تويتر", type: "url", dir: "ltr" },
      { name: "facebook", label: "رابط فيسبوك", type: "url", dir: "ltr" },
    ],
  },
  {
    id: "general",
    label: "معلومات عامة",
    icon: Info,
    fields: [
      { name: "tagline", label: "الشعار", type: "text", dir: "rtl" },
      { name: "description", label: "وصف المنصة", type: "textarea", dir: "rtl" },
      { name: "address", label: "العنوان", type: "text", dir: "rtl" },
    ],
  },
  {
    id: "support",
    label: "الدعم",
    icon: HelpCircle,
    fields: [
      { name: "support_phone", label: "رقم الدعم", type: "text", dir: "ltr", placeholder: "213550000000" },
      { name: "support_email", label: "بريد الدعم", type: "email", dir: "ltr" },
      { name: "support_hours", label: "ساعات الدعم", type: "text", dir: "rtl", placeholder: "من 9 صباحاً إلى 9 مساءً" },
    ],
  },
  {
    id: "policies",
    label: "السياسات",
    icon: Shield,
    fields: [
      { name: "cancellation_policy", label: "سياسة الإلغاء", type: "textarea", dir: "rtl" },
      { name: "privacy_policy", label: "سياسة الخصوصية", type: "textarea", dir: "rtl" },
      { name: "about_us", label: "من نحن", type: "textarea", dir: "rtl" },
    ],
  },
];

function FormField({
  name,
  label,
  type,
  dir,
  placeholder,
  defaultValue,
}: {
  name: string;
  label: string;
  type: string;
  dir: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  if (type === "textarea") {
    return (
      <div>
        <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
        <textarea
          id={name}
          name={name}
          dir={dir}
          defaultValue={defaultValue || ""}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          rows={3}
          placeholder={placeholder}
        />
      </div>
    );
  }
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        dir={dir}
        defaultValue={defaultValue || ""}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder={placeholder}
      />
    </div>
  );
}

export function SettingsForm({ settings }: { settings: SiteSettings | null }) {
  const [state, formAction, pending] = useActionState(updateSettings, null);
  const [activeSection, setActiveSection] = useState(formSections[0].id);

  if (!settings) {
    return <div className="text-center text-gray-500 py-12">حدث خطأ في تحميل الإعدادات</div>;
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      {/* Side tabs */}
      <div className="flex gap-2 overflow-x-auto lg:flex-col lg:w-56 lg:shrink-0">
        {formSections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap lg:w-full ${
                activeSection === section.id
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {section.label}
            </button>
          );
        })}
      </div>

      {/* Form */}
      <form action={formAction} className="flex-1">
        <input type="hidden" name="id" value={settings.id} />

        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-lg font-bold text-secondary mb-6">{formSections.find(s => s.id === activeSection)?.label}</h2>

          <div className="space-y-4">
            {formSections
              .find((s) => s.id === activeSection)
              ?.fields.map((field) => (
                <FormField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  dir={field.dir}
                  placeholder={field.placeholder}
                  defaultValue={settings[field.name as keyof SiteSettings] as string}
                />
              ))}
          </div>
        </div>

        {state?.error && (
          <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</div>
        )}
        {state?.success && (
          <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">تم حفظ الإعدادات بنجاح</div>
        )}

        <div className="mt-6 flex justify-left">
          <button
            type="submit"
            disabled={pending}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {pending ? "جارٍ الحفظ..." : "حفظ الإعدادات"}
          </button>
        </div>
      </form>
    </div>
  );
}
