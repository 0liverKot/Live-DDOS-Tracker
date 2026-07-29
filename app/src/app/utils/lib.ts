import type { ClassValue } from "clsx"; 
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// merges Tailwind class names, used or Aceternity UI componets
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs)); 
}