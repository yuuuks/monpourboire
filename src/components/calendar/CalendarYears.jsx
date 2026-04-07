export default function CalendarYears({ viewYear, viewMonth, yearPage, onSetYearPage, onJump, onSetView }) {
  const years = Array.from({ length: 16 }, (_, i) => yearPage + i)

  return (
    <div className="pt-3">
      <div className="flex items-center justify-between mb-4 px-1">
        <button onClick={() => onSetYearPage(p => p - 16)} aria-label="Période précédente"
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors text-lg">‹</button>
        <span className="text-xs font-semibold text-gray-500">
          {yearPage} – {yearPage + 15}
        </span>
        <button onClick={() => onSetYearPage(p => p + 16)} aria-label="Période suivante"
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors text-lg">›</button>
      </div>
      <div className="grid grid-cols-4 gap-1.5 px-1 mb-4">
        {years.map(y => (
          <button
            key={y}
            onClick={() => { onJump(y, viewMonth); onSetView('months') }}
            className={`py-2 text-xs font-medium rounded-xl transition-colors
              ${y === viewYear
                ? 'bg-amber-500 text-white'
                : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700 border border-gray-100'}`}
          >
            {y}
          </button>
        ))}
      </div>
      <button onClick={() => onSetView('months')}
        className="w-full py-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors">
        ← Retour
      </button>
    </div>
  )
}
