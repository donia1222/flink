"use client"

import { useState, useEffect } from "react"

export default function FancyLoader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simular progreso de carga incremental
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        // Acelerar al final para dar sensación de completado
        const increment = Math.random() * (oldProgress > 80 ? 10 : 5)
        const newProgress = Math.min(oldProgress + increment, 99)
        return newProgress
      })
    }, 100)

    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-500">
      <div className="relative mb-16">
        <div className="text-5xl font-bold tracking-tighter sm:text-6xl">
          <span className="text-sky-600">FLINK</span>
          <span className="text-sky-400">SAUBER</span>
        </div>

        {/* Elementos decorativos animados */}
        <div className="absolute -top-8 -left-8 w-6 h-6 bg-sky-200 rounded-full animate-ping opacity-75"></div>
        <div
          className="absolute -bottom-4 -right-4 w-4 h-4 bg-sky-400 rounded-full animate-ping opacity-75"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="absolute top-1/2 -right-12 w-5 h-5 bg-sky-300 rounded-full animate-ping opacity-75"
          style={{ animationDelay: "0.6s" }}
        ></div>
      </div>

      {/* Animación de limpieza */}
      <div className="relative w-64 h-4 mb-8 overflow-hidden rounded-full bg-gray-100">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all ease-out duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>

        {/* Efecto de "limpieza" animado */}
        <div
          className="absolute top-0 h-full bg-white opacity-30"
          style={{
            width: "30px",
            left: `${progress - 30}%`,
            display: progress < 5 ? "none" : "block",
          }}
        ></div>
      </div>

      <div className="text-gray-500 text-sm">
        {progress < 30 && "Vorbereitung..."}
        {progress >= 30 && progress < 60 && "Reinigung läuft..."}
        {progress >= 60 && progress < 90 && "Fast fertig..."}
        {progress >= 90 && "Willkommen!"}
      </div>
    </div>
  )
}
