"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Modal mit Escape schließen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Formular-Übermittlung verarbeiten
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Passwort über Server-API überprüfen
      const response = await fetch("/api/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        // Authentifizierungsstatus im localStorage speichern
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("authExpiry", (Date.now() + 24 * 60 * 60 * 1000).toString()) // 24 Stunden

        onLogin()
        onClose()
      } else {
        setError("Falsches Passwort")
      }
    } catch (err) {
      setError("Fehler beim Anmelden")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">Administrativer Zugang</h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-sky-100 rounded-full">
                  <Lock className="h-8 w-8 text-sky-600" />
                </div>
              </div>

              <p className="text-center text-gray-600 mb-6">
                Geben Sie das Passwort ein, um auf das Administrationsbereich zuzugreifen
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Passwort
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>

                {error && <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">{error}</div>}

                <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600" disabled={isLoading}>
                  {isLoading ? "Überprüfung..." : "Anmelden"}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}