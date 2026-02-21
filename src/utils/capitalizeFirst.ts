export function capitalizeFirst(str: string): string {
  if (typeof str !== 'string') {
    return '';
  }

  if (!str) return '';

  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}
