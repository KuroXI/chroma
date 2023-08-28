import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {IChapter} from "@/types/Manga";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cleanDescription(description : string = "") : string {
  return description.replace(/\(Source:[\s\S]*$/g, '').replace(/<[^>]*>/g, '')
}

export function filterEnglish(array : IChapter[]) : IChapter[] {
  return array.filter((chapter) => chapter.id.includes("/en/"))
}