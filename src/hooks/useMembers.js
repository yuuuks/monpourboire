import { useState, useEffect } from 'react'

const STORAGE_KEY = 'tips-team'

function loadMembers() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] }
  catch { return [] }
}

export function useMembers() {
  const [members, setMembers] = useState(loadMembers)
  const [newName, setNewName] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members))
  }, [members])

  function addMember() {
    const name = newName.trim()
    if (!name) return
    if (members.find(m => m.name.toLowerCase() === name.toLowerCase())) return
    setMembers(prev => [...prev, { id: crypto.randomUUID(), name }])
    setNewName('')
  }

  function removeMember(id) {
    setMembers(prev => prev.filter(m => m.id !== id))
  }

  return { members, newName, setNewName, addMember, removeMember }
}
