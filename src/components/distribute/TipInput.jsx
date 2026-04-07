export default function TipInput({ tipAmount, onChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <label htmlFor="tip-amount" className="block text-sm font-semibold text-gray-600 mb-2">
        Montant total des tips (€)
      </label>
      <input
        id="tip-amount"
        type="number" min="0" step="0.01" placeholder="Ex: 150"
        value={tipAmount}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
    </div>
  )
}
