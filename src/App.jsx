import { useState } from 'react'
import Header from './components/Header'
import TabBar from './components/TabBar'
import DistributeTab from './components/distribute/DistributeTab'
import TeamTab from './components/team/TeamTab'
import { useMembers } from './hooks/useMembers'
import { useSelections } from './hooks/useSelections'
import { countDays } from './utils/dates'

export default function App() {
  const [tab, setTab] = useState('distribute')
  const [tipAmount, setTipAmount] = useState('')
  const [result, setResult] = useState(null)

  const { members, newName, setNewName, addMember, removeMember } = useMembers()
  const {
    getSel, getView, navView, jumpView, weightedDays,
    handleDayClick, resetSelection, setHalfDays, removeSelection,
    openIds, toggleOpen, closeId,
  } = useSelections()

  function handleRemoveMember(id) {
    removeMember(id)
    removeSelection(id)
  }

  function calculate() {
    const amount = parseFloat(tipAmount)
    if (!amount || amount <= 0) return

    const active = members
      .map(m => ({
        ...m,
        days: countDays(getSel(m.id).ranges),
        halfDays: getSel(m.id).halfDays || 0,
        units: weightedDays(m.id),
      }))
      .filter(m => m.units > 0)

    if (active.length === 0) return

    const totalUnits = active.reduce((s, m) => s + m.units, 0)
    const shares = active.map(m => ({
      ...m,
      share: (m.units / totalUnits) * amount,
    }))

    setResult({ total: amount, shares, totalUnits })
  }

  const activeCount = members.filter(m => weightedDays(m.id) > 0).length
  const canCalculate = tipAmount && parseFloat(tipAmount) > 0 && activeCount > 0

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <TabBar tab={tab} setTab={setTab} membersCount={members.length} />

      <main className="max-w-xl mx-auto px-4 py-6 space-y-4">
        {tab === 'distribute' && (
          <DistributeTab
            tipAmount={tipAmount}
            onTipChange={e => { setTipAmount(e.target.value); setResult(null) }}
            members={members}
            getSel={getSel}
            getView={getView}
            openIds={openIds}
            weightedDays={weightedDays}
            onToggleOpen={toggleOpen}
            onDayClick={(id, iso) => { handleDayClick(id, iso); setResult(null) }}
            onNavView={navView}
            onJumpView={jumpView}
            onValidate={closeId}
            onReset={id => { resetSelection(id); setResult(null) }}
            onSetHalfDays={(id, val) => { setHalfDays(id, val); setResult(null) }}
            canCalculate={canCalculate}
            onCalculate={calculate}
            result={result}
          />
        )}

        {tab === 'team' && (
          <TeamTab
            members={members}
            newName={newName}
            onNameChange={setNewName}
            onAdd={addMember}
            onRemove={handleRemoveMember}
          />
        )}
      </main>
    </div>
  )
}
