import { roundShares } from '../../utils/format'

export default function ResultCard({ result, rounded, onRoundedChange }) {
  const { shares, leftover } = rounded
    ? roundShares(result.shares, result.total)
    : { shares: result.shares, leftover: 0 }
  const fmt = n => rounded ? `${n} €` : `${n.toFixed(2)} €`

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-amber-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-700">Résultat</h2>
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rounded}
            onChange={e => onRoundedChange(e.target.checked)}
            className="w-4 h-4 accent-amber-500"
          />
          Arrondir à l'euro
        </label>
      </div>
      <div className="space-y-2">
        {shares.map(m => (
          <div key={m.id} className="bg-amber-50 rounded-xl px-4 py-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">{m.name}</span>
              <span className="font-mono font-semibold text-amber-600 text-lg">
                {fmt(m.share)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 space-y-1 text-sm text-gray-500">
        {leftover > 0 && (
          <div className="flex justify-between">
            <span>Reste (non distribué)</span>
            <span className="font-semibold font-mono">{leftover.toFixed(2)} €</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Total distribué</span>
          <span className="font-semibold font-mono">{(result.total - leftover).toFixed(2)} €</span>
        </div>
      </div>
    </div>
  )
}
