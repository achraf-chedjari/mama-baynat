import Badge from "@/components/ui/Badge";
import { getContacts } from "@/lib/actions";
import { formatDateTime } from "@/lib/format";
import MarkAsReadButton from "./MarkAsReadButton";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const contacts = await getContacts();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary">التواصل</h1>
        <p className="mt-1 text-gray-500">رسائل واستفسارات المستخدمين</p>
      </div>

      <div className="space-y-4">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact.id}
              className={`rounded-2xl border p-5 shadow-sm transition-all ${
                contact.status === "unread"
                  ? "border-primary/20 bg-primary/5"
                  : "border-gray-100 bg-white"
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800">{contact.name}</h3>
                    <Badge variant={contact.status === "unread" ? "warning" : "gray"}>
                      {contact.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500" dir="ltr">{contact.phone}</p>
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400">{formatDateTime(contact.created_at || "")}</p>
                  {contact.houses && (
                    <p className="text-xs text-gray-500">بخصوص: {contact.houses.title}</p>
                  )}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{contact.message}</p>
              <div className="mt-3">
                <a href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("مرحباً، قمنا باستلام رسالتك بخصوص " + (contact.houses?.title || "المنزل"))}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
                  الرد عبر واتساب
                </a>
                {contact.status === "unread" && (
                  <MarkAsReadButton contactId={contact.id} />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center">
            <div className="mb-3 text-5xl">💬</div>
            <p className="text-gray-500">لا توجد رسائل بعد</p>
          </div>
        )}
      </div>
    </>
  );
}
