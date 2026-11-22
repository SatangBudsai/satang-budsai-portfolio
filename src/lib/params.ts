// Preserve bracket-style query strings previously produced by $.param, without a DOM dependency.
export function param(values: Record<string, unknown>): string {
  const pairs: string[] = []
  const append = (key: string, value: unknown) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => append(`${key}[${typeof item === 'object' && item !== null ? index : ''}]`, item))
    } else if (value !== null && typeof value === 'object') {
      Object.entries(value).forEach(([name, item]) => append(`${key}[${name}]`, item))
    } else {
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value ?? ''))}`)
    }
  }
  Object.entries(values).forEach(([key, value]) => append(key, value))
  return pairs.join('&')
}
