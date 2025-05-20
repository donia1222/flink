"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import GalleryAdmin from "@/components/gallery-admin"

export default function AdminGalleryPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar autenticación
    const checkAuth = () => {
      const isAuth = localStorage.getItem("isAuthenticated") === "true"
      const expiry = localStorage.getItem("authExpiry")

      if (isAuth && expiry && Number.parseInt(expiry) > Date.now()) {
        setIsAuthenticated(true)
      } else {
        // Redirigir a la página principal si no está autenticado
        router.push("/")
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // No renderizar nada mientras redirige
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <GalleryAdmin />
    </div>
  )
}
