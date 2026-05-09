import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: "primary" | "secondary" | "booking" | "accent" | "danger" | "success" | "info";
}

const colorMap = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  booking: "bg-booking/10 text-booking",
  accent: "bg-accent/50 text-amber-800",
  danger: "bg-red-100 text-red-600",
  success: "bg-green-100 text-green-600",
  info: "bg-blue-100 text-blue-600",
};

export default function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
