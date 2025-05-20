"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Star, Shield, Sparkles } from "lucide-react"

const images = [
  {
    src: "/modern-clean-interior-sunlight.png",
    alt: "Sauberes Zuhause mit Sonnenlicht",
    title: "Professionelle Reinigung",
    subtitle: "Für Ihr Zuhause",
  },
  {
    src: "/clean-modern-apartment.png",
    alt: "Modernes sauberes Apartment",
    title: "Makellose Räume",
    subtitle: "Für Ihr Wohlbefinden",
  },
  {
    src: "/clean-office-space.png",
    alt: "Sauberer Büroraum",
    title: "Büroreinigung",
    subtitle: "Für Ihr Unternehmen",
  },
]

export default function ModernHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isHovered])

  const features = [
    { icon: <Star className="h-5 w-5" />, text: "Höchste Qualität" },
    { icon: <Shield className="h-5 w-5" />, text: "Zuverlässiger Service" },
    { icon: <Sparkles className="h-5 w-5" />, text: "Makellose Ergebnisse" },
  ]

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background video pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      {/* Parallax images */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-10">
        <AnimatePresence mode="wait">
          {images.map(
            (image, index) =>
              currentSlide === index && (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </motion.div>

      {/* Content overlay */}
      <div className="relative z-20 h-full flex flex-col justify-center  mt-8">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Main heading with animated gradient */}
            <div className="relative">
              <motion.div
                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 opacity-75 blur-xl"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <div className="relative bg-black/30 backdrop-blur-sm p-6  rounded-lg border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mb-2"
                  >
                    <h2 className="text-xl md:text-2xl font-medium text-sky-400">{images[currentSlide].title}</h2>
                    <p className="text-white/80 text-sm md:text-base">{images[currentSlide].subtitle}</p>
                  </motion.div>
                </AnimatePresence>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mt-4">
                     <Image src="/logo.png" alt="FLINKSAUBER Logo" width={150} height={40} className="h-10 w-auto ml-12" priority />
                  <span className="block">FLINK</span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                    SAUBER
                  </span>
                </h1>
                
                <p className="mt-4 text-xl md:text-2xl text-white/90">Ihr Premium-Reinigungsspezialist</p>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                >
                  <div className="text-sky-400">{feature.icon}</div>
                  <span className="text-white text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-sky-500/20 transition-all duration-300 group"
                asChild
              >
                <a
                  href="https://wa.me/764834787?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20Ihre%20Reinigungsdienstleistungen.%20K%C3%B6nnen%20Sie%20mir%20mehr%20Informationen%20geben%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kostenlose Beratung
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>

 
            </div>
          </div>

          {/* Right side - Animated cleaning service highlights */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />

              <motion.div
                className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />

              {/* Service cards */}
              <div className="relative space-y-6">
                {[
                  {
                    title: "Haushaltsreinigung",
                    description: "Professionelle Reinigung für Ihr Zuhause",
                    icon: "🏠",
                    delay: 0.2,
                  },
                  {
                    title: "Büroreinigung",
                    description: "Saubere Arbeitsumgebung für mehr Produktivität",
                    icon: "🏢",
                    delay: 0.4,
                  },
                  {
                    title: "Spezialreinigung",
                    description: "Maßgeschneiderte Lösungen für besondere Anforderungen",
                    icon: "✨",
                    delay: 0.6,
                  },
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 transform hover:scale-105 transition-transform duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: service.delay, duration: 0.6 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{service.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                        <p className="text-white/70">{service.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Slide indicators */}
              <div className="absolute -bottom-12 left-0 right-0 flex justify-center space-x-3">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-sky-500 w-16" : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  )
}
