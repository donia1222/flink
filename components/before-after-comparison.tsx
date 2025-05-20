"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface BeforeAfterComparisonProps {
  beforeImage: string
  afterImage: string
  beforeAlt?: string
  afterAlt?: string
  beforeLabel?: string
  afterLabel?: string
}

export default function BeforeAfterComparison({
  beforeImage,
  afterImage,
  beforeAlt = "Vor der Reinigung",
  afterAlt = "Nach der Reinigung",
  beforeLabel = "Vorher",
  afterLabel = "Nachher",
}: BeforeAfterComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle slider input change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value))
  }

  // Handle mouse and touch events for dragging
  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleDrag = (clientX: number) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const containerWidth = rect.width
    const offsetX = clientX - rect.left

    // Calculate percentage position (0-100)
    const newPosition = Math.max(0, Math.min(100, (offsetX / containerWidth) * 100))
    setSliderPosition(newPosition)
  }

  const handleMouseMove = (e: MouseEvent) => {
    handleDrag(e.clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleDrag(e.touches[0].clientX)
    }
  }

  // Set up and clean up event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleDragEnd)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleDragEnd)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleDragEnd)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleDragEnd)
    }
  }, [isDragging])

  return (
    <div className="max-w-3xl mx-auto my-12">
 

      <div
        ref={containerRef}
        className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl select-none"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        {/* After image (full size in background) */}
        <div className="absolute inset-0 z-10">
          <Image
            src={afterImage || "/placeholder.svg"}
            alt={afterAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
            priority
          />
          <div className="absolute top-5 right-5 bg-sky-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {afterLabel}
          </div>
        </div>

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 z-20"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          <Image
            src={beforeImage || "/placeholder.svg"}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
            priority
          />
          <div className="absolute top-5 left-5 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {beforeLabel}
          </div>
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white z-30 cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        />

        {/* Slider handle */}
        <div
          className="absolute w-10 h-10 rounded-full bg-white shadow-lg z-30 flex items-center justify-center cursor-ew-resize border-2 border-sky-500"
          style={{
            left: `${sliderPosition}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5L3 10L8 15" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 5L21 10L16 15" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Accessible range input (hidden visually but available for screen readers) */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="sr-only"
          aria-label="Schieberegler für Vorher-Nachher-Vergleich"
        />
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-500 text-sm mb-20">

        </p>
      </div>
    </div>
  )
}
