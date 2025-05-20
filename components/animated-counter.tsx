"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface CounterProps {
  end: number
  duration?: number
  label: string
  icon?: React.ReactNode
}

export default function AnimatedCounter({ end, duration = 2, label, icon }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")

      let startTime: number
      let animationFrame: number

      const countUp = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(countUp)
        }
      }

      animationFrame = requestAnimationFrame(countUp)

      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, end, duration, controls])

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center p-6"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
    >
      <div className="mb-4 text-sky-500">{icon}</div>
      <div className="text-4xl font-bold mb-2">{count}+</div>
      <div className="text-gray-600 text-center">{label}</div>
    </motion.div>
  )
}
