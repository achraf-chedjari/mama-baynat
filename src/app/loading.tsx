import { MESSAGES } from "@/lib/config";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-primary" />
        <p className="text-gray-500">{MESSAGES.loading}</p>
      </div>
    </div>
  );
}
