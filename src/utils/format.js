export function formatUnits(u) {
  return u % 1 === 0 ? String(u) : u.toFixed(1)
}
