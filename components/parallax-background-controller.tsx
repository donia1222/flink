"use client"

import { useState, useEffect } from "react"

export default function ParallaxBackgroundController() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Fondo estático simple con gradiente
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Fondo estático con gradiente suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-white"></div>
    </div>
  )
}
