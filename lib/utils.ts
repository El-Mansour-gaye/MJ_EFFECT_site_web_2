import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encodeImagePath(path: string): string {
  // encodeURI does not encode #, which is a common character in the image names.
  // We need to manually replace it.
  return encodeURI(path).replace(/#/g, "%23")
}
