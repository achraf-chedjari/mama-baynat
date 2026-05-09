import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl mb-6">🏠</div>
      <h1 className="text-4xl font-bold text-secondary mb-2">
        الصفحة غير موجودة
      </h1>
      <p className="text-gray-500 mb-8">
        عذراً، الصفحة التي تبحث عنها غير متوفرة
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary/90"
        >
          <Home className="h-4 w-4" />
          العودة للرئيسية
        </Link>
        <Link
          href="/houses"
          className="flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-3 font-medium text-gray-600 transition-all hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          عرض المنازل
        </Link>
      </div>
    </div>
  );
}
