"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  image: string
  quote: string
  rating: number
}

export default function RotatingCubeTestimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Anna Schmidt",
      position: "Geschäftsführerin",
      company: "Schmidt & Partner GmbH",
      image: "/testimonial-1.png",
      quote:
        "Flink Sauber hat unsere Erwartungen übertroffen. Unser Büro war noch nie so sauber und frisch. Das Team ist professionell, pünktlich und gründlich. Wir werden definitiv langfristig mit ihnen zusammenarbeiten.",
      rating: 5,
    },
    {
      id: 2,
      name: "Thomas Müller",
      position: "Hausbesitzer",
      company: "Vaduz",
      image: "/testimonial-2.png",
      quote:
        "Ich bin beeindruckt von der Qualität der Reinigung. Mein Haus sieht aus wie neu. Das Team von Flink Sauber ist freundlich, effizient und vertrauenswürdig. Ich kann sie nur wärmstens empfehlen!",
      rating: 5,
    },
    {
      id: 3,
      name: "Maria Huber",
      position: "Hoteldirektorin",
      company: "Alpenblick Resort",
      image: "/testimonial-3.png",
      quote:
        "Seit wir mit Flink Sauber zusammenarbeiten, haben wir nur positive Rückmeldungen von unseren Gästen zur Sauberkeit erhalten. Ihr Auge fürs Detail und ihre Zuverlässigkeit sind unübertroffen.",
      rating: 5,
    },
    {
      id: 4,
      name: "Stefan Berger",
      position: "Facility Manager",
      company: "Berger Immobilien AG",
      image: "/testimonial-4.png",
      quote:
        "Die Zusammenarbeit mit Flink Sauber ist eine Freude. Sie verstehen unsere Anforderungen perfekt und liefern stets hervorragende Ergebnisse. Ihre Flexibilität und ihr Engagement sind bemerkenswert.",
      rating: 4,
    },
  ]

  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [perspective, setPerspective] = useState(1000)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const next = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((current) => (current === testimonials.length - 1 ? 0 : current + 1))
    setTimeout(() => setIsAnimating(false), 1000)
  }

  const prev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((current) => (current === 0 ? testimonials.length - 1 : current - 1))
    setTimeout(() => setIsAnimating(false), 1000)
  }

  useEffect(() => {
    if (!autoplay) return

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(next, 6000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoplay, current])

  // Adjust perspective based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPerspective(600)
      } else {
        setPerspective(1000)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate rotation for each face of the cube
  const getRotation = (index: number) => {
    const rotation = (index - current) * 90
    return rotation
  }

  // Calculate z-index for each face to ensure proper stacking
  const getZIndex = (index: number) => {
    if (index === current) return 10
    if ((current === 0 && index === testimonials.length - 1) || (current === testimonials.length - 1 && index === 0)) {
      return 1
    }
    return 5
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto py-16 px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            className="absolute top-10 left-10 text-sky-100 opacity-50 transform rotate-12"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className="absolute bottom-10 right-10 text-blue-100 opacity-50 transform -rotate-12"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="text-gray-800">Was unsere </span>
          <span className="text-sky-600">Kunden</span>
          <span className="text-gray-800"> sagen</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Erfahren Sie, warum unsere Kunden uns vertrauen und immer wieder auf unsere Reinigungsdienstleistungen
          zurückgreifen.
        </p>
      </div>

      {/* 3D Cube Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[500px] md:h-[400px] mx-auto perspective"
        style={{ perspective: `${perspective}px` }}
      >
        <div className="relative w-full h-full">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="absolute inset-0 w-full h-full backface-hidden transition-transform duration-1000 ease-out"
              style={{
                transform: `rotateY(${getRotation(index)}deg) translateZ(${perspective / 2}px)`,
                zIndex: getZIndex(index),
                opacity: Math.abs(getRotation(index)) <= 90 ? 1 : 0,
              }}
            >
              <div className="w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                {/* Left side - Image and info */}
                <div className="md:w-2/5 bg-gradient-to-br from-sky-400 to-blue-600 p-6 md:p-8 flex flex-col justify-between">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-yellow-300 fill-yellow-300" : "text-white/30"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex flex-col items-center md:items-start">
             
                    <h4 className="font-bold text-xl text-white">{testimonial.name}</h4>
                    <p className="text-white/80 text-center md:text-left">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>

                  <div className="hidden md:block">
                    <svg
                      className="text-white/10"
                      width="100"
                      height="100"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>

                {/* Right side - Quote */}
                <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic mb-6">"{testimonial.quote}"</p>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Kunde seit{" "}
                        <span className="font-medium text-sky-600">
                          {2020 + (testimonial.id % 3)} {/* Just for demo */}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        {[1, 2, 3].map((dot) => (
                          <div
                            key={dot}
                            className={`w-2 h-2 rounded-full ${dot === (index % 3) + 1 ? "bg-sky-500" : "bg-gray-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation controls */}
        <div className="absolute -bottom-12 left-0 right-0 flex justify-center items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-sky-200 hover:bg-sky-50 hover:text-sky-600"
            onClick={() => {
              prev()
              setAutoplay(false)
            }}
            disabled={isAnimating}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous</span>
          </Button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating && index !== current) {
                    setIsAnimating(true)
                    setCurrent(index)
                    setAutoplay(false)
                    setTimeout(() => setIsAnimating(false), 1000)
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-sky-500 w-8"
                    : "bg-gray-300 hover:bg-gray-400 hover:scale-110 transition-transform"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                disabled={isAnimating || index === current}
              >
                <span className="sr-only">Testimonial {index + 1}</span>
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-sky-200 hover:bg-sky-50 hover:text-sky-600"
            onClick={() => {
              next()
              setAutoplay(false)
            }}
            disabled={isAnimating}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <style jsx global>{`
        .perspective {
          perspective-origin: center;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }
      `}</style>
    </div>
  )
}
