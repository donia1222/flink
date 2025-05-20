"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { CheckCircle, Clock, Shield, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SectionTitleAnimation from "@/components/section-title-animation"

export default function ModernWhyUsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const features = [
    {
      icon: <CheckCircle className="h-12 w-12" />,
      title: "Qualität",
      description: "Höchste Reinigungsstandards für makellose Ergebnisse",
      color: "from-sky-400 to-blue-600",
      hoverColor: "from-sky-500 to-blue-700",
      bgPattern: "radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
    },
    {
      icon: <Clock className="h-12 w-12" />,
      title: "Erfahrung",
      description: "Jahrelange Expertise in der professionellen Reinigung",
      color: "from-cyan-400 to-teal-500",
      hoverColor: "from-cyan-500 to-teal-600",
      bgPattern: "radial-gradient(circle at 90% 10%, rgba(20, 184, 166, 0.1) 0%, transparent 70%)",
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Vertrauen",
      description: "Zuverlässiger Service, dem Sie vertrauen können",
      color: "from-blue-400 to-indigo-600",
      hoverColor: "from-blue-500 to-indigo-700",
      bgPattern: "radial-gradient(circle at 50% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -20 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  }

  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full bg-blue-100 opacity-30"
          style={{ width: 300, height: 300, top: "10%", left: "5%" }}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full bg-cyan-100 opacity-20"
          style={{ width: 400, height: 400, bottom: "5%", right: "10%" }}
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <SectionTitleAnimation
          firstWord="WARUM"
          secondWord="WIR"
          description="Entdecken Sie, was uns von anderen Reinigungsunternehmen unterscheidet"
        />

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="h-full"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card
                className="h-full border-none overflow-hidden relative"
                style={{
                  background: feature.bgPattern,
                  boxShadow:
                    hoveredCard === index
                      ? "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 30px rgba(56, 189, 248, 0.2)"
                      : "0 10px 30px -3px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Gradient border effect */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300"
                  style={{
                    opacity: hoveredCard === index ? 0.7 : 0,
                    background: `linear-gradient(to right, transparent, transparent), 
                                linear-gradient(to right, #38bdf8, #3b82f6)`,
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                    border: "1px solid transparent",
                  }}
                />

                <CardContent className="p-8 flex flex-col items-center text-center space-y-6 relative z-10">
                  <motion.div
                    className={`p-4 rounded-full bg-gradient-to-br ${feature.color} text-white shadow-lg`}
                    variants={iconVariants}
                    style={{
                      boxShadow:
                        hoveredCard === index ? `0 0 30px rgba(56, 189, 248, 0.4)` : `0 0 15px rgba(56, 189, 248, 0.2)`,
                    }}
                  >
                    {feature.icon}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="space-y-3"
                  >
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-700">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                  </motion.div>

                  <AnimatePresence>
                    {hoveredCard === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button variant="ghost" className="mt-4 group text-sky-600 hover:text-sky-700">
                          Mehr erfahren
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === index ? 0.1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path d="M0,100 Q50,50 100,0 L100,100 Z" fill={`url(#gradient-${index})`} />
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated dots grid */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 5 }).map((_, rowIndex) =>
            Array.from({ length: 10 }).map((_, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className="absolute rounded-full bg-sky-500 opacity-10"
                style={{
                  width: 4,
                  height: 4,
                  left: `${colIndex * 10 + 5}%`,
                  top: `${rowIndex * 20 + 10}%`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4,
                  delay: (rowIndex + colIndex) * 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            )),
          )}
        </div>
      </div>
    </section>
  )
}
