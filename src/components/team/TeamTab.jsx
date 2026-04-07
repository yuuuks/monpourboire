import AddMemberForm from './AddMemberForm'
import MemberItem from './MemberItem'

export default function TeamTab({ members, newName, onNameChange, onAdd, onRemove }) {
  return (
    <>
      <AddMemberForm
        newName={newName}
        onChange={e => onNameChange(e.target.value)}
        onAdd={onAdd}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-gray-600 mb-3">
          Membres ({members.length})
        </h2>
        {members.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">Aucun membre pour l'instant</p>
        ) : (
          <ul className="space-y-2">
            {members.map(m => (
              <MemberItem key={m.id} member={m} onRemove={() => onRemove(m.id)} />
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
