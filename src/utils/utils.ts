import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirst(str: string): string {
  if (typeof str !== 'string') {
    console.error(
      `[capitalizeFirst Error]: Expected string, but received: `,
      str,
    );
    return '';
  }

  if (!str) return '';

  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}
