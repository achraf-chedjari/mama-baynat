interface BadgeProps {
  variant?: "primary" | "success" | "danger" | "warning" | "info" | "gray";
  children: string;
  className?: string;
}

export default function Badge({ variant = "gray", children, className = "" }: BadgeProps) {
  const variants = {
    primary: "bg-primary/10 text-primary",
    success: "bg-green-100 text-green-700",
    danger: "bg-red-100 text-red-700",
    warning: "bg-amber-100 text-amber-700",
    info: "bg-blue-100 text-blue-700",
    gray: "bg-gray-100 text-gray-600",
  };

  const labels: Record<string, string> = {
    pending: "معلق",
    confirmed: "مؤكد",
    cancelled: "ملغي",
    available: "متاح",
    booked: "محجوز",
    maintenance: "صيانة",
    unread: "غير مقروء",
    read: "مقروء",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {labels[children] || children}
    </span>
  );
}
