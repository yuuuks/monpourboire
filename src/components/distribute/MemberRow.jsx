import { countDays } from '../../utils/dates'
import { formatUnits } from '../../utils/format'
import Calendar from '../calendar/Calendar'

export default function MemberRow({ member, sel, view, isOpen, units, onToggleOpen, onDayClick, onNavView, onJumpView, onValidate, onReset, onSetHalfDays }) {
  const days = countDays(sel.ranges)
  const halves = sel.halfDays || 0

  return (
    <li className={`rounded-xl border transition-all ${units > 0 ? 'border-amber-300' : 'border-gray-200'}`}>
      <button
        onClick={onToggleOpen}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 font-bold text-sm flex items-center justify-center flex-shrink-0">
          {(member.name[0] || '?').toUpperCase()}
        </div>
        <span className="flex-1 font-medium text-sm text-gray-700">{member.name}</span>
        {units > 0 ? (
          <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2.5 py-1 font-semibold">
            {formatUnits(units)} j{halves > 0 ? ` · ${halves} demi` : ''}
          </span>
        ) : (
          <span className="text-xs text-gray-400">{isOpen ? '▲' : 'Sélectionner ▼'}</span>
        )}
      </button>

      <div style={{
        display: 'grid',
        gridTemplateRows: isOpen ? '1fr' : '0fr',
        transition: 'grid-template-rows 300ms ease'
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div className="px-4 pb-2 border-t border-gray-100">
            <Calendar
              ranges={sel.ranges}
              pending={sel.pending}
              viewYear={view.year}
              viewMonth={view.month}
              onPrev={() => onNavView(-1)}
              onNext={() => onNavView(1)}
              onJump={onJumpView}
              onDayClick={onDayClick}
              onValidate={onValidate}
              onReset={onReset}
            />
          </div>

          {days > 0 && (
            <div className="flex items-center gap-3 px-4 pb-4 pt-1">
              <span className="text-xs text-gray-500 flex-1">Dont demi-journées :</span>
              <button
                onClick={() => onSetHalfDays(halves - 1)}
                disabled={halves === 0}
                className="w-7 h-7 rounded-full border border-gray-200 text-gray-400 hover:text-amber-600 hover:border-amber-300 disabled:opacity-30 text-base font-bold transition-colors flex items-center justify-center"
              >
                −
              </button>
              <span className="text-sm font-semibold text-amber-700 w-5 text-center">{halves}</span>
              <button
                onClick={() => onSetHalfDays(halves + 1)}
                disabled={halves >= days}
                className="w-7 h-7 rounded-full border border-gray-200 text-gray-400 hover:text-amber-600 hover:border-amber-300 disabled:opacity-30 text-base font-bold transition-colors flex items-center justify-center"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}
