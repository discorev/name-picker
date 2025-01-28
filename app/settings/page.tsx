"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function SettingsPage() {
  const [names, setNames] = useState<string[]>([])
  const [newName, setNewName] = useState("")

  useEffect(() => {
    const storedNames = localStorage.getItem("names")
    if (storedNames) {
      setNames(JSON.parse(storedNames))
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addName()
    }
  }

  const addName = () => {
    if (newName.trim()) {
      const updatedNames = [...names, newName.trim()]
      setNames(updatedNames)
      localStorage.setItem("names", JSON.stringify(updatedNames))
      setNewName("")
      // Keep focus on the input
      document.getElementById("nameInput")?.focus()
    }
  }

  const removeName = (index: number) => {
    const updatedNames = names.filter((_, i) => i !== index)
    setNames(updatedNames)
    localStorage.setItem("names", JSON.stringify(updatedNames))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 font-semibold text-purple-700">Manage Names</h2>

        <div className="flex mb-4">
          <Input
            id="nameInput"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a name"
            className="flex-grow mr-2"
          />
          <Button onClick={addName}>Add</Button>
        </div>

        <ul className="mb-4">
          {names.map((name, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{name}</span>
              <Button variant="destructive" size="sm" onClick={() => removeName(index)}>
                Remove
              </Button>
            </li>
          ))}
        </ul>

        {names.length > 0 ? (
          <Link href="/" className="text-purple-600 hover:underline">
            Save
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

