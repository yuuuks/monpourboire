export default function AddMemberForm({ newName, onChange, onAdd }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <label htmlFor="new-member-name" className="block text-sm font-semibold text-gray-600 mb-2">
        Ajouter un membre
      </label>
      <div className="flex gap-2">
        <input
          id="new-member-name"
          type="text" placeholder="Prénom ou nom"
          value={newName}
          onChange={onChange}
          onKeyDown={e => e.key === 'Enter' && onAdd()}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <button
          onClick={onAdd} disabled={!newName.trim()}
          className="px-5 py-2.5 bg-amber-500 text-white rounded-xl font-medium text-sm hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Ajouter
        </button>
      </div>
    </div>
  )
}
