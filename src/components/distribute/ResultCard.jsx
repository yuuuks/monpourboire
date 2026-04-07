import { formatUnits } from '../../utils/format'

export default function ResultCard({ result }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-amber-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-700">Résultat</h2>
      </div>
      <div className="space-y-2">
        {result.shares.map(m => (
          <div key={m.id} className="bg-amber-50 rounded-xl px-4 py-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">{m.name}</span>
              <span className="font-mono font-semibold text-amber-600 text-lg">
                {m.share.toFixed(2)} €
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm text-gray-500">
        <span>Total distribué</span>
        <span className="font-semibold font-mono">{result.total.toFixed(2)} €</span>
      </div>
    </div>
  )
}
