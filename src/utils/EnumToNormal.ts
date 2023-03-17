// Enum to normal string
// this function takes a string and makes the first letter uppercase, and the rest lowercase
// value: string - the string to make normal
// returns: string - the string with the first letter uppercase and the rest lowercase
export function EnumToNormal(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
