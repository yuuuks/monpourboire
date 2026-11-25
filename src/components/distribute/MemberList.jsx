import MemberRow from './MemberRow'

export default function MemberList({ members, getSel, getView, openIds, weightedDays, onToggleOpen, onDayClick, onNavView, onJumpView, onValidate, onReset, onSetHalfDays }) {
  if (members.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-4">
        Aucun membre — ajoutez votre équipe dans l'onglet "Équipe"
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {members.map(m => (
        <MemberRow
          key={m.id}
          member={m}
          sel={getSel(m.id)}
          view={getView(m.id)}
          isOpen={openIds.has(m.id)}
          units={weightedDays(m.id)}
          onToggleOpen={() => onToggleOpen(m.id)}
          onDayClick={iso => onDayClick(m.id, iso)}
          onNavView={delta => onNavView(m.id, delta)}
          onJumpView={(y, mo) => onJumpView(m.id, y, mo)}
          onValidate={() => onValidate(m.id)}
          onReset={() => onReset(m.id)}
          onSetHalfDays={val => onSetHalfDays(m.id, val)}
        />
      ))}
    </ul>
  )
}
