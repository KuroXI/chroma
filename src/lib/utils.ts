import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseImage(path : string = "") : string {
  return "https://image.tmdb.org/t/p/original" + path;
}