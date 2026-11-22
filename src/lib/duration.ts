/** "YYYY-MM" → months since year 0, for simple differences. */
function months(value: string) {
  const [year, month] = value.split('-').map(Number)
  return year * 12 + (month - 1)
}

/** Current month as "YYYY-MM" (server time). */
export function currentMonth(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

/**
 * Length of a role, counted the way LinkedIn does (both end months included):
 * Apr 2026 – Nov 2026 → "8 mos", Dec 2022 – Mar 2024 → "1 yr 4 mos".
 */
export function duration(start: string, end: string | undefined) {
  const total = months(end ?? currentMonth()) - months(start) + 1
  const years = Math.floor(total / 12)
  const rest = total % 12
  return [years ? `${years} yr${years > 1 ? 's' : ''}` : '', rest ? `${rest} mo${rest > 1 ? 's' : ''}` : '']
    .filter(Boolean)
    .join(' ')
}
