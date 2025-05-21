"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Sparkles, Droplets, Wind, Shield, CheckCircle } from "lucide-react"

const TextImageScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const borderRotation = useMotionValue(0)
  const glowOpacity = useMotionValue(0.5)

  // Animación continua para la rotación del borde
  useEffect(() => {
    const controls = animate(borderRotation, 360, {
      duration: 20,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    })

    return controls.stop
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const textY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "50%", "150%"])
  const imageScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.2])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [1, 0.8, 0.3, 0])

  // Efecto de brillo basado en el scroll
  const glowIntensity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 0.8, 0.2])
  const borderWidth = useTransform(scrollYProgress, [0, 0.5, 1], [2, 3, 1])

  // Efecto de resorte para animaciones más suaves
  const smoothGlow = useSpring(glowIntensity, { stiffness: 100, damping: 30 })
  const smoothBorder = useSpring(borderWidth, { stiffness: 100, damping: 30 })

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ scale: imageScale, opacity: imageOpacity }}>
          <img src="/modern-blue-office.png" alt="Clean Office Space" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          ref={ref}
          className="relative z-10 h-full flex items-center justify-center overflow-hidden"
          style={{ y: textY }}
        >
          {/* Contenedor con borde animado */}
          <motion.div
            className="relative max-w-2xl rounded-lg overflow-hidden text-center mx-auto"
            style={{
              boxShadow: useTransform(
                smoothGlow,
                (value) => `0 0 ${value * 30}px ${value * 10}px rgba(100, 200, 255, ${value * 0.3})`,
              ),
            }}
          >
            {/* Borde animado con gradiente */}
            <motion.div
              className="absolute inset-0 z-0 rounded-lg"
              style={{
                background: `linear-gradient(${borderRotation}deg, rgba(100,200,255,0.8), rgba(0,150,255,0.8), rgba(100,220,255,0.8), rgba(255,255,255,0.8))`,
                opacity: smoothGlow,
                padding: smoothBorder,
              }}
            />

            {/* Único bloque en alemán */}
            <div className="relative z-10 p-8 bg-white bg-opacity-90 m-[3px] rounded-lg">
              <div className="flex justify-center mb-4 text-blue-500">
                <Sparkles size={40} className="mr-2" />
                <Droplets size={40} />
              </div>
              <motion.h2
                className="text-4xl font-bold mb-4 text-blue-600"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Professionelle Reinigung
              </motion.h2>
              <motion.p
                className="text-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Willkommen bei CleanTech - Ihrem Experten für professionelle Reinigungsdienste. Wir bieten
                maßgeschneiderte Lösungen für Privathaushalte und Unternehmen mit modernster Technologie und
                umweltfreundlichen Produkten.
              </motion.p>

              <div className="flex justify-center mt-6 space-x-8">
                <div className="flex flex-col items-center">
                  <Shield className="h-8 w-8 text-blue-500 mb-2" />
                  <span className="text-sm">Garantie</span>
                </div>
                <div className="flex flex-col items-center">
                  <Wind className="h-8 w-8 text-blue-500 mb-2" />
                  <span className="text-sm">Ökologisch</span>
                </div>
                <div className="flex flex-col items-center">
                  <CheckCircle className="h-8 w-8 text-blue-500 mb-2" />
                  <span className="text-sm">Zertifiziert</span>
                </div>
              </div>

              <motion.button
                className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-full font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Angebot Anfordern
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default TextImageScroll
