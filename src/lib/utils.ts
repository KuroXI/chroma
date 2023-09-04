import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseImage(path : string = "") : string {
  return "https://image.tmdb.org/t/p/original" + path;
}

export function proxyImage(image: string) : string {
  return `${process.env.NEXT_PUBLIC_CONSUMET_URL}/utils/image-proxy?url=${image}&headers={}`
}

export function proxyM3U8(url: string = "") : string {
  return `${process.env.NEXT_PUBLIC_CONSUMET_URL}/utils/m3u8-proxy/${new URL(url).host}/${Buffer.from(url).toString("base64")}`
}