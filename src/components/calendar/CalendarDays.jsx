import { useState, useMemo } from 'react'
import { DAYS_FR, MONTHS_FR, toISO } from '../../utils/dates'

export default function CalendarDays({ ranges, pending, viewYear, viewMonth, onPrev, onNext, onSetView, onDayClick, onValidate, onReset, total }) {
  const [hovered, setHovered] = useState(null)

  const firstDay = new Date(viewYear, viewMonth, 1)
  const lastDay = new Date(viewYear, viewMonth + 1, 0)
  const startDow = (firstDay.getDay() + 6) % 7

  const cells = []
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) {
    cells.push(toISO(new Date(viewYear, viewMonth, d)))
  }

  const today = useMemo(() => toISO(new Date()), [])

  function dayClass(iso) {
    const isEndpoint = ranges.some(r => iso === r.start || iso === r.end)
    const inRange = ranges.some(r => iso >= r.start && iso <= r.end)
    const isPending = iso === pending
    let inPreview = false
    if (pending && hovered) {
      const lo = pending < hovered ? pending : hovered
      const hi = pending < hovered ? hovered : pending
      inPreview = iso >= lo && iso <= hi
    }
    if (isEndpoint || isPending) return 'bg-amber-500 text-white font-bold'
    if (inRange) return 'bg-amber-200 text-amber-900'
    if (inPreview) return 'bg-amber-100 text-amber-700'
    return 'text-gray-700 hover:bg-gray-100'
  }

  return (
    <div className="pt-3">
      <p className="text-xs text-center text-amber-600 font-medium mb-3 min-h-[16px]">
        {!pending && !ranges.length && 'Cliquez sur le premier jour'}
        {pending && 'Cliquez sur le dernier jour de la plage'}
        {!pending && ranges.length > 0 && 'Nouvelle plage · cliquez sur une plage existante pour la supprimer'}
      </p>

      <div className="flex items-center justify-between mb-3 px-1">
        <button onClick={onPrev} aria-label="Mois précédent"
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors text-lg leading-none">
          ‹
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onSetView('months')}
            className="text-sm font-semibold text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-2 py-1 rounded-lg transition-colors"
          >
            {MONTHS_FR[viewMonth]}
          </button>
          <button
            onClick={() => onSetView('years')}
            className="text-sm font-semibold text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-2 py-1 rounded-lg transition-colors"
          >
            {viewYear}
          </button>
        </div>
        <button onClick={onNext} aria-label="Mois suivant"
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors text-lg leading-none">
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAYS_FR.map(d => (
          <div key={d} className="text-center text-xs font-medium py-1 text-gray-400">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((iso, i) => {
          if (!iso) return <div key={`e${i}`} />
          const isToday = iso === today
          return (
            <button
              key={iso}
              onClick={() => onDayClick(iso)}
              onMouseEnter={() => setHovered(iso)}
              onMouseLeave={() => setHovered(null)}
              className={`relative text-xs py-1.5 rounded-lg transition-colors ${dayClass(iso)}`}
            >
              {parseInt(iso.split('-')[2], 10)}
              {isToday && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400 block" />
              )}
            </button>
          )
        })}
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={onReset}
          className="flex-1 py-2 text-xs text-gray-400 hover:text-red-400 border border-gray-200 rounded-xl transition-colors">
          Effacer
        </button>
        <button onClick={onValidate}
          disabled={total === 0}
          className="flex-1 px-6 py-2 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          Valider · {total} jour{total > 1 ? 's' : ''}
        </button>
      </div>
    </div>
  )
}
