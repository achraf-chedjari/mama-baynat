const DATE_LOCALE = "ar-SA-u-nu-latn";

export function formatDate(dateStr: string, options?: Intl.DateTimeFormatOptions) {
  return new Date(dateStr).toLocaleDateString(DATE_LOCALE, {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
}

export function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(DATE_LOCALE, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatPrice(price: number) {
  return price.toLocaleString("ar-SA-u-nu-latn");
}
