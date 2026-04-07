export default function TabBar({ tab, setTab, membersCount }) {
  return (
    <div className="max-w-xl mx-auto px-4 mt-4">
      <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <button
          onClick={() => setTab('distribute')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${tab === 'distribute' ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Distribuer
        </button>
        <button
          onClick={() => setTab('team')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${tab === 'team' ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Équipe ({membersCount})
        </button>
      </div>
    </div>
  )
}
