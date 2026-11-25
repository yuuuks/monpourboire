export function formatUnits(u) {
  return u % 1 === 0 ? String(u) : u.toFixed(1)
}

export function parseDays(str) {
  const s = String(str).trim()
  if (!/^(\d+[.,]?\d*|[.,]\d+)$/.test(s)) return 0
  const n = parseFloat(s.replace(',', '.'))
  return n > 0 ? n : 0
}
