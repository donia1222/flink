"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Users, Home, Building2, Calendar, TrendingUp, Award, CheckCircle } from "lucide-react"

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [0.6, 1])
  const springScale = useSpring(scaleProgress, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(opacityProgress, { stiffness: 100, damping: 30 })

  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const [backgroundElements, setBackgroundElements] = useState<
    Array<{ width: number; height: number; left: string; top: string }>
  >([])

  // Generate background elements only on the client side
  useEffect(() => {
    const elements = Array.from({ length: 20 }, () => ({
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setBackgroundElements(elements)
  }, [])

  const stats = [
    {
      value: 500,
      label: "Zufriedene Kunden",
      icon: <Users className="h-10 w-10" />,
      description: "Kunden, die unsere Dienstleistungen weiterempfehlen",
      color: "from-blue-500 to-sky-400",
    },
    {
      value: 1200,
      label: "Gereinigte Wohnungen",
      icon: <Home className="h-10 w-10" />,
      description: "Perfekt gereinigte Wohnräume seit unserer Gründung",
      color: "from-sky-500 to-cyan-400",
    },
    {
      value: 350,
      label: "Gewerbliche Kunden",
      icon: <Building2 className="h-10 w-10" />,
      description: "Unternehmen, die auf unsere professionelle Reinigung vertrauen",
      color: "from-cyan-500 to-teal-400",
    },
    {
      value: 8,
      label: "Jahre Erfahrung",
      icon: <Calendar className="h-10 w-10" />,
      description: "Jahre Expertise in der professionellen Reinigungsbranche",
      color: "from-teal-500 to-emerald-400",
    },
  ]

  const additionalStats = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: "98%",
      label: "Kundenzufriedenheit",
    },
    {
      icon: <Award className="h-6 w-6" />,
      value: "24h",
      label: "Reaktionszeit",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      value: "100%",
      label: "Qualitätsgarantie",
    },
  ]

  return (
    <section
      ref={containerRef}
      className="w-full py-20 bg-gradient-to-r from-sky-600 to-sky-400 text-white relative overflow-hidden"
    >
      {/* Animated background elements - Only rendered on client side */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundElements.map((element, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: element.width,
              height: element.height,
              left: element.left,
              top: element.top,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0.8, 1],
              opacity: [0, 0.2, 0.1, 0],
            }}
            transition={{
              duration: 10 + (i % 10),
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div
        className="container px-4 md:px-6 mx-auto relative z-10"
        style={{
          scale: springScale,
          opacity: springOpacity,
        }}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <p className="max-w-3xl mx-auto opacity-90 text-white text-xl">
            Zahlen, die für sich sprechen und unser Engagement für Qualität und Kundenzufriedenheit zeigen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${stat.color} p-1`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              onHoverStart={() => setHoveredStat(index)}
              onHoverEnd={() => setHoveredStat(null)}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 h-full flex flex-col items-center">
                <div className="mb-4 text-white">{stat.icon}</div>

                <CounterAnimation
                  value={stat.value}
                  isInView={isInView}
                  delay={index * 0.1}
                  isHovered={hoveredStat === index}
                />

                <div className="text-white font-medium text-center">{stat.label}</div>

                <motion.div
                  className="mt-3 text-sm text-white/80 text-center"
                  initial={{ opacity: 0, height: 0 }}
                  animate={hoveredStat === index ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.description}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional stats bar */}
        <motion.div
          className="mt-16 bg-white/10 backdrop-blur-sm rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {additionalStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-center p-3">
              <div className="mr-3 bg-white/20 p-2 rounded-full">{stat.icon}</div>
              <div>
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

interface CounterProps {
  value: number
  isInView: boolean
  delay: number
  isHovered: boolean
}

function CounterAnimation({ value, isInView, delay, isHovered }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const counterRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number }>>([])

  // Generate particles only on client side
  useEffect(() => {
    if (isHovered) {
      const newParticles = Array.from({ length: 10 }, () => ({
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        delay: Math.random() * 0.2,
      }))
      setParticles(newParticles)
    }
  }, [isHovered])

  // Animate counter when in view
  useEffect(() => {
    if (!isInView) return

    let startValue = 0
    const duration = 2000
    const increment = value / (duration / 16)

    const timer = setInterval(() => {
      startValue += increment
      if (startValue > value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(startValue))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <motion.div
      ref={counterRef}
      className="text-4xl font-bold mb-2 relative"
      animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <span>{displayValue}</span>
      <span className="text-white/90">+</span>

      {/* Particle effect on hover - Only rendered on client side */}
      {isHovered && (
        <motion.div
          className="absolute -inset-4 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                x: particle.x,
                y: particle.y,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: particle.delay,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: Math.random() * 0.5,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
