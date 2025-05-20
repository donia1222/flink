"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SectionTitleProps {
  firstWord: string
  secondWord: string
  description?: string
  className?: string
}

export default function SectionTitleAnimation({
  firstWord,
  secondWord,
  description,
  className = "",
}: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const firstWordVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const secondWordVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  }

  const descriptionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: "easeOut",
      },
    },
  }

  return (
    <div ref={ref} className={`text-center mb-16 ${className}`}>
      <motion.div
        className="inline-block relative"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={titleVariants}
      >
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl relative">
          <motion.span className="relative inline-block" variants={firstWordVariants}>
            <span className="absolute -inset-1 w-full h-full bg-gradient-to-r from-sky-200 to-sky-100 transform -skew-y-3 rounded"></span>
            <span className="relative text-sky-600">{firstWord}</span>
          </motion.span>
          <motion.span className="relative inline-block ml-2" variants={secondWordVariants}>
            <span className="absolute -inset-1 w-full h-full bg-gradient-to-r from-sky-100 to-sky-200 transform skew-y-3 rounded"></span>
            <span className="relative text-sky-500">{secondWord}</span>
          </motion.span>
        </h2>
      </motion.div>

      {description && (
        <motion.p
          className="mt-6 text-gray-500 max-w-3xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={descriptionVariants}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
