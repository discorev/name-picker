"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NameFromHat() {
  const router = useRouter()
  const [names, setNames] = useState<string[]>([])
  const [pulledName, setPulledName] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const storedNames = JSON.parse(localStorage.getItem("names") ?? "null")
    console.log("names %s", storedNames)
    if (storedNames === null || storedNames.length === 0) {
      console.log("redirecting to settings")
      router.push('/settings')
    } else {
      setNames(storedNames)
    }
  }, [])

  const pullName = () => {
    if (names.length === 0) {
      alert("All names have been pulled!")
      return
    }

    setPulledName("")
    setIsAnimating(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * names.length)
      const name = names[randomIndex]
      setPulledName(name)
      const updatedNames = names.filter((_, index) => index !== randomIndex)
      setNames(updatedNames)
      localStorage.setItem("names", JSON.stringify(updatedNames))
    }, 2000) // Animation duration
  }

  useEffect(() => {
    if (!isAnimating) return
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 3000) // Total animation duration
    return () => clearTimeout(timer)
  }, [isAnimating])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="flex items-center justify-center mb-8 w-full max-w-2xl">
        <div className="relative mr-8">
          <svg
            width="200"
            height="200"
            className={`hat ${isAnimating ? "animate-hat-shake" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="100" cy="110" rx="40" ry="20" fill="black" />
            <rect x="60" y="50" width="80" height="60" fill="black" />
            <ellipse cx="100" cy="50" rx="80" ry="20" fill="black" />
            <ellipse cx="100" cy="50" rx="40" ry="10" fill="grey" />
          </svg>
          {isAnimating && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-10%] bg-yellow-200 px-4 py-2 rounded-full shadow-lg animate-pull-name">
              <span className="animate-text-reveal">{pulledName}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          {pulledName && !isAnimating && (
            <div className="bg-green-200 px-4 py-2 rounded shadow-lg animate-pop text-center">
              <div className="font-semibold mb-1">Selected:</div>
              <div className="text-xl">{pulledName}</div>
            </div>
          )}
        </div>
      </div>

      <div>
          <Button
            onClick={pullName}
            disabled={isAnimating || names.length === 0}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Pull a Name
          </Button>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold mb-2 text-purple-800">Remaining Names:</h2>
        <ul className="list-disc list-inside text-purple-600">
          {names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <Link href="/settings" className="text-purple-600 hover:underline">
          Manage Names
        </Link>
      </div>
    </div>
  )
}

