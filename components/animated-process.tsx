"use client"

import { useRef, useEffect, useState } from "react"
import { ClipboardCheck, Sparkles, Clock, ThumbsUp } from "lucide-react"
import { motion, useInView, useAnimation, type Variants } from "framer-motion"
import SectionTitleAnimation from "@/components/section-title-animation"

export default function ModernAnimatedProcess() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const controls = useAnimation()
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const steps = [
    {
      icon: <ClipboardCheck className="h-10 w-10" />,
      title: "Beratung",
      description: "Wir besprechen Ihre Bedürfnisse und erstellen einen maßgeschneiderten Reinigungsplan.",
      color: "from-blue-500 to-cyan-400",
      shadowColor: "rgba(59, 130, 246, 0.5)",
    },
    {
      icon: <Sparkles className="h-10 w-10" />,
      title: "Reinigung",
      description: "Unser erfahrenes Team führt die Reinigung mit höchster Sorgfalt und Qualität durch.",
      color: "from-cyan-400 to-teal-400",
      shadowColor: "rgba(20, 184, 166, 0.5)",
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "Inspektion",
      description: "Wir überprüfen alle Bereiche, um sicherzustellen, dass unsere hohen Standards erfüllt sind.",
      color: "from-teal-400 to-sky-500",
      shadowColor: "rgba(56, 189, 248, 0.5)",
    },
    {
      icon: <ThumbsUp className="h-10 w-10" />,
      title: "Zufriedenheit",
      description: "Ihre Zufriedenheit ist garantiert - wir sind erst zufrieden, wenn Sie es sind.",
      color: "from-sky-500 to-blue-600",
      shadowColor: "rgba(37, 99, 235, 0.5)",
    },
  ]

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const lineVariants: Variants = {
    hidden: {
      scaleY: 0,
      originY: 0,
    },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  }

  const stepVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  }

  const iconVariants: Variants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 0,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <div className="w-full py-24 bg-gradient-to-b from-sky-50 to-white overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto" ref={containerRef}>
        <SectionTitleAnimation
          firstWord="UNSER"
          secondWord="PROZESS"
          description="So arbeiten wir, um Ihnen die beste Reinigungserfahrung zu bieten"
        />

        <motion.div className="relative mt-16" variants={containerVariants} initial="hidden" animate={controls}>
          {/* Connection line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-300 to-sky-500 transform -translate-x-1/2 hidden md:block"
            variants={lineVariants}
          />

          <div className="space-y-24 md:space-y-32 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 md:gap-16 relative`}
                variants={stepVariants}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <motion.div
                  className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                  custom={index % 2 === 0 ? 1 : 0}
                  variants={textVariants}
                >
                  <motion.h3
                    className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-600 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                  >
                    {step.description}
                  </motion.p>
                </motion.div>

                <div className="relative flex items-center justify-center z-10">
                  <motion.div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}
                    style={{
                      boxShadow:
                        hoveredStep === index ? `0 0 30px ${step.shadowColor}` : `0 0 15px ${step.shadowColor}`,
                    }}
                    variants={iconVariants}
                    whileHover="hover"
                    animate={hoveredStep === index ? "hover" : "visible"}
                    transition={{ duration: 0.3 }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Animated rings */}
                  <div className="absolute w-full h-full">
                    <motion.div
                      className="absolute w-full h-full rounded-full border-2 border-transparent"
                      style={{
                        background: `radial-gradient(circle, transparent 60%, ${step.shadowColor} 60%, transparent 70%)`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 0, 0.7],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute w-full h-full rounded-full border-2 border-transparent"
                      style={{
                        background: `radial-gradient(circle, transparent 60%, ${step.shadowColor} 60%, transparent 70%)`,
                      }}
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        delay: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Step number */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-sky-600 font-bold flex items-center justify-center text-sm border-2 border-sky-200 shadow-md"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: index * 0.2 + 0.7, duration: 0.3, type: "spring" }}
                  >
                    {index + 1}
                  </motion.div>
                </div>

                <div className="w-full md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 3D floating elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-sky-200 to-blue-200 opacity-20"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 360, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}
