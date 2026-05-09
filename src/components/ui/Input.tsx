"use client";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <input
          ref={ref}
          className={`rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 ${
            error ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;

export function Textarea({
  label,
  error,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <textarea
        className={`rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-y ${
          error ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export function Select({
  label,
  error,
  className = "",
  children,
  ...props
}: InputHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <select
        className={`rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white ${
          error ? "border-red-400" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
