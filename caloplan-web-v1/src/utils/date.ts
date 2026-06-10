import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/zh-cn";
dayjs.extend(weekday);
dayjs.locale("zh-cn");

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function formatDate(date: Date, withYear: boolean = true): string {
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  return withYear ? `${date.getFullYear()}-${m}-${d}` : `${m}-${d}`;
}

function getTodayDate(): string {
  const date = new Date();
  return formatDate(date);
}

function getTimeStr(d = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function getYesterdayDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return formatDate(date);
}

function getWeekDay(which: number): string {
  return dayjs().weekday(which).format("YYYY-MM-DD");
}

function convertToDate(date: string): Date {
  return new Date(date);
}

export {
  getTodayDate,
  formatDate,
  getYesterdayDate,
  convertToDate,
  getWeekDay,
  getTimeStr,
};
