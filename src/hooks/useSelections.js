import { useState } from 'react'
import { countDays } from '../utils/dates'

export function useSelections() {
  const [selections, setSelections] = useState({})
  const [calViews, setCalViews] = useState({})
  const [openIds, setOpenIds] = useState(new Set())

  function getSel(id) {
    return selections[id] || { ranges: [], pending: null, halfDays: 0 }
  }

  function getView(id) {
    if (calViews[id]) return calViews[id]
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  }

  function navView(id, delta) {
    const v = getView(id)
    let m = v.month + delta
    let y = v.year
    if (m < 0) { m = 11; y-- }
    if (m > 11) { m = 0; y++ }
    setCalViews(prev => ({ ...prev, [id]: { year: y, month: m } }))
  }

  function jumpView(id, year, month) {
    setCalViews(prev => ({ ...prev, [id]: { year, month } }))
  }

  function weightedDays(id) {
    const sel = getSel(id)
    const total = countDays(sel.ranges)
    const halves = Math.min(sel.halfDays || 0, total)
    return total - halves * 0.5
  }

  function handleDayClick(memberId, iso) {
    setSelections(prev => {
      const cur = prev[memberId] || { ranges: [], pending: null, halfDays: 0 }

      if (cur.pending) {
        const [start, end] = cur.pending <= iso
          ? [cur.pending, iso]
          : [iso, cur.pending]
        return { ...prev, [memberId]: { ...cur, ranges: [...cur.ranges, { start, end }], pending: null } }
      }

      const rangeIdx = cur.ranges.findIndex(r => iso >= r.start && iso <= r.end)
      if (rangeIdx !== -1) {
        const newRanges = cur.ranges.filter((_, i) => i !== rangeIdx)
        const newTotal = countDays(newRanges)
        const newHalves = Math.min(cur.halfDays || 0, newTotal)
        return { ...prev, [memberId]: { ...cur, ranges: newRanges, halfDays: newHalves } }
      }

      return { ...prev, [memberId]: { ...cur, pending: iso } }
    })
  }

  function resetSelection(id) {
    setSelections(prev => ({ ...prev, [id]: { ranges: [], pending: null, halfDays: 0 } }))
  }

  function setHalfDays(id, value) {
    setSelections(prev => {
      const cur = prev[id] || { ranges: [], pending: null, halfDays: 0 }
      const total = countDays(cur.ranges)
      const halves = Math.max(0, Math.min(value, total))
      return { ...prev, [id]: { ...cur, halfDays: halves } }
    })
  }

  function removeSelection(id) {
    setSelections(prev => { const n = { ...prev }; delete n[id]; return n })
    setOpenIds(prev => { const n = new Set(prev); n.delete(id); return n })
  }

  function toggleOpen(id) {
    setOpenIds(prev => {
      const n = new Set(prev)
      if (n.has(id)) {
        n.delete(id)
        // Annule la sélection en attente si on ferme sans avoir cliqué le 2e jour
        setSelections(s => {
          if (!s[id]?.pending) return s
          return { ...s, [id]: { ...s[id], pending: null } }
        })
      } else {
        n.add(id)
      }
      return n
    })
  }

  function closeId(id) {
    setOpenIds(prev => { const n = new Set(prev); n.delete(id); return n })
  }

  return {
    getSel, getView, navView, jumpView, weightedDays,
    handleDayClick, resetSelection, setHalfDays, removeSelection,
    openIds, toggleOpen, closeId,
  }
}
