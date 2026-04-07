import { MONTHS_FR } from '../../utils/dates'

export default function CalendarMonths({ viewYear, viewMonth, onJump, onSetView }) {
  return (
    <div className="pt-3">
      <div className="flex items-center justify-between mb-4 px-1">
        <button onClick={() => onJump(viewYear - 1, viewMonth)} aria-label="Année précédente"
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors text-lg">‹</button>
        <button
          onClick={() => onSetView('years')}
          className="text-sm font-bold text-amber-600 hover:text-amber-800 hover:bg-amber-50 px-3 py-1 rounded-lg transition-colors"
        >
          {viewYear}
        </button>
        <button onClick={() => onJump(viewYear + 1, viewMonth)} aria-label="Année suivante"
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors text-lg">›</button>
      </div>
      <div className="grid grid-cols-4 gap-1.5 px-1 mb-4">
        {MONTHS_FR.map((name, i) => (
          <button
            key={i}
            onClick={() => { onJump(viewYear, i); onSetView('days') }}
            className={`py-2 text-xs font-medium rounded-xl transition-colors
              ${i === viewMonth
                ? 'bg-amber-500 text-white'
                : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700 border border-gray-100'}`}
          >
            {name.slice(0, 3)}
          </button>
        ))}
      </div>
      <button onClick={() => onSetView('days')}
        className="w-full py-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors">
        ← Retour
      </button>
    </div>
  )
}
