import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 通过UTC将时间标准化转换
 * @param time 
 * @param timezone 
 * @returns 
 */
export function formatTime(time: string | null, timezone?: string) {
  if (!time) {
    return "";
  }
  if (!timezone) {
    // 客户端调用直接使用local显示本地时间
    return dayjs.utc(time).local().format("YYYY-MM-DD HH:mm:ss");
  }
  // 服务器端调用需要指明时区
  return dayjs.utc(time).tz(timezone).format("YYYY-MM-DD HH:mm:ss");
}