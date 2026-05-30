function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function getTodayDate(): string {
  const date = new Date();
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatDate(date: Date, withYear: boolean = true): string {
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  return withYear ? `${date.getFullYear()}-${m}-${d}` : `${m}-${d}`;
}

export { getTodayDate, formatDate };
