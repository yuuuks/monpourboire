import TipInput from './TipInput'
import MemberList from './MemberList'
import ResultCard from './ResultCard'

export default function DistributeTab({
  tipAmount, onTipChange,
  members, getSel, getView, openIds, weightedDays,
  onToggleOpen, onDayClick, onNavView, onJumpView, onValidate, onReset, onSetHalfDays,
  canCalculate, onCalculate,
  result
}) {
  return (
    <>
      <TipInput tipAmount={tipAmount} onChange={onTipChange} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-gray-600 mb-1">
          Jours travaillés par membre
        </h2>
        <MemberList
          members={members}
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
