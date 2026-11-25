import TipInput from './TipInput'
import MemberList from './MemberList'
import ResultCard from './ResultCard'

export default function DistributeTab({
  tipAmount, onTipChange,
  members, mode, onModeChange, getManual, onManualChange, getSel, getView, openIds, weightedDays,
  onToggleOpen, onDayClick, onNavView, onJumpView, onValidate, onReset, onSetHalfDays,
  canCalculate, onCalculate,
  result
}) {
  return (
    <>
      <TipInput tipAmount={tipAmount} onChange={onTipChange} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h2 className="text-sm font-semibold text-gray-600">
            Jours travaillés par membre
          </h2>
          <div className="flex rounded-lg overflow-hidden border border-gray-200 text-xs font-medium flex-shrink-0">
            {[['manual', 'Saisie'], ['calendar', 'Calendrier']].map(([value, label]) => (
              <button
                key={value}
                onClick={() => onModeChange(value)}
                className={`px-3 py-1.5 transition-colors ${mode === value ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <MemberList
          members={members}
          mode={mode}
          getManual={getManual}
          onManualChange={onManualChange}
          getSel={getSel}
          getView={getView}
          openIds={openIds}
          weightedDays={weightedDays}
          onToggleOpen={onToggleOpen}
          onDayClick={onDayClick}
          onNavView={onNavView}
          onJumpView={onJumpView}
          onValidate={onValidate}
          onReset={onReset}
          onSetHalfDays={onSetHalfDays}
        />
      </div>

      <button
        onClick={onCalculate}
        disabled={!canCalculate}
        className="w-full py-3.5 rounded-2xl bg-amber-500 text-white font-semibold text-base shadow hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Calculer la répartition
      </button>

      {result && <ResultCard result={result} />}
    </>
  )
}
