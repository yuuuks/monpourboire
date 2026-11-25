export function formatUnits(u) {
  return u % 1 === 0 ? String(u) : u.toFixed(1)
}

// Arrondit chaque part à l'euro, puis distribue les euros restants aux plus grosses parties décimales
export function roundShares(shares, total) {
  const euros = Math.floor(total + 1e-9)
  const floored = shares.map(s => Math.floor(s.share + 1e-9))
  let left = euros - floored.reduce((a, b) => a + b, 0)
  const order = shares
    // Arrondi de la fraction pour que les égalités (au bruit flottant près) gardent l'ordre de la liste
    .map((s, i) => ({ i, frac: Math.round((s.share - floored[i]) * 1e6) }))
    .sort((a, b) => b.frac - a.frac)
  for (const { i } of order) {
    if (left <= 0) break
    floored[i]++
    left--
  }
  return {
    shares: shares.map((s, i) => ({ ...s, share: floored[i] })),
    leftover: Math.round((total - euros) * 100) / 100,
  }
}
