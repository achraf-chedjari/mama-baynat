"use client";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "success";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-sm",
    secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-sm",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
    ghost: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    success: "bg-green-600 text-white hover:bg-green-700 shadow-sm",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
