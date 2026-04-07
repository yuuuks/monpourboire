export default function MemberItem({ member, onRemove }) {
  return (
    <li className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 font-bold text-sm flex items-center justify-center">
          {(member.name[0] || '?').toUpperCase()}
        </div>
        <span className="font-medium text-gray-700">{member.name}</span>
      </div>
      <button
        onClick={onRemove}
        aria-label={`Supprimer ${member.name}`}
        className="text-gray-300 hover:text-red-400 transition-colors text-xl leading-none px-1"
      >
        ×
      </button>
    </li>
  )
}
