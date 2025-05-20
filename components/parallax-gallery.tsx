"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import SectionTitleAnimation from "@/components/section-title-animation"

interface GalleryImage {
  id: number
  src: string
  alt: string
  category?: string
  description?: string
}

export default function EnhancedParallaxGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([])
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [isHovering, setIsHovering] = useState<number | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories = [
    { id: "all", name: "Alle" },
    { id: "wohnung", name: "Wohnung" },
    { id: "buero", name: "Büro" },
    { id: "spezial", name: "Spezialreinigung" },
  ]

  // Cargar imágenes desde el servidor PHP
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true)
      try {
        const url =
          activeFilter === "all"
            ? "https://web.lweb.ch/flink/obtenerimagen.php"
            : `https://web.lweb.ch/flink/obtenerimagen.php?categoria=${activeFilter}`

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Error al cargar las imágenes")
        }

        const data = await response.json()
        setImages(data)
        setImagesLoaded(new Array(data.length).fill(false))
        setError(null)
      } catch (err) {
        setError("Error al cargar las imágenes. Por favor, inténtalo de nuevo.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [activeFilter])

  const filteredImages = images

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    if (direction === "prev") {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1)
    } else {
      setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return

      if (e.key === "Escape") {
        closeLightbox()
      } else if (e.key === "ArrowLeft") {
        navigateLightbox("prev")
      } else if (e.key === "ArrowRight") {
        navigateLightbox("next")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage])

  return (
    <div ref={containerRef} className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sky-50 rounded-full opacity-50 transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-50 rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2" />

        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gallery-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gallery-grid)" />
        </svg>
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <SectionTitleAnimation
          firstWord="UNSERE"
          secondWord="ARBEIT"
          description="Sehen Sie sich einige Beispiele unserer professionellen Reinigungsarbeiten an"
        />

        {/* Category filters */}
        <div className="flex flex-wrap justify-center mb-10 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? "bg-sky-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-sky-100 shadow-sm"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && filteredImages.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No hay imágenes disponibles en esta categoría.</p>
          </div>
        )}

        {/* Gallery grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${image.id}-${index}`}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-xl shadow-lg h-64 md:h-80 cursor-pointer"
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => openLightbox(index)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src || "/placeholder.svg?height=400&width=600&query=clean room"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700"
                    style={{
                      transform: isHovering === index ? "scale(1.1)" : "scale(1)",
                    }}
                    onLoad={() => handleImageLoad(index)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300"
                  style={{
                    opacity: isHovering === index ? 1 : 0,
                  }}
                >
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h3 className="text-white text-lg font-bold mb-2">{image.alt}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sky-300 text-sm">
                        {categories.find((c) => c.id === image.category)?.name || "Allgemein"}
                      </span>
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                        <ZoomIn className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && filteredImages[selectedImage] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
            >
              <X className="h-6 w-6" />
            </button>

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                navigateLightbox("prev")
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                navigateLightbox("next")
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={filteredImages[selectedImage].src || "/placeholder.svg?height=800&width=1200&query=clean room"}
                  alt={filteredImages[selectedImage].alt}
                  className="object-contain mx-auto max-h-[80vh]"
                  width={1200}
                  height={800}
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-xl font-bold">{filteredImages[selectedImage].alt}</h3>
                <p className="text-sky-300">
                  {categories.find((c) => c.id === filteredImages[selectedImage].category)?.name || "Allgemein"}
                </p>
                {filteredImages[selectedImage].description && (
                  <p className="text-white/80 mt-2">{filteredImages[selectedImage].description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
