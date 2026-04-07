export const MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
export const DAYS_FR = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']

export function toISO(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function isoToLocal(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function countDays(ranges) {
  const set = new Set()
  ranges.forEach(({ start, end }) => {
    const cur = isoToLocal(start)
    const last = isoToLocal(end)
    while (cur <= last) {
      set.add(toISO(new Date(cur)))
      cur.setDate(cur.getDate() + 1)
    }
  })
  return set.size
}
