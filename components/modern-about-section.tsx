"use client"

import { useRef, useState } from "react"
import NextImage from "next/image" // Renamed to avoid conflicts
import { motion, useInView } from "framer-motion"
import { ArrowRight, Award, Users, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import SectionTitleAnimation from "@/components/section-title-animation"

export default function ModernAboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: <Award className="h-5 w-5 text-sky-500" />,
      text: "Zertifizierte Reinigungsprofis",
    },
    {
      icon: <Users className="h-5 w-5 text-sky-500" />,
      text: "Erfahrenes & geschultes Team",
    },
    {
      icon: <Clock className="h-5 w-5 text-sky-500" />,
      text: "Pünktlicher & zuverlässiger Service",
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-0 right-0 w-1/3 h-auto text-sky-50 opacity-70"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M42.7,-73.4C55.9,-67.7,67.4,-57.5,76.3,-44.7C85.2,-31.9,91.5,-15.9,90.9,-0.3C90.3,15.2,82.8,30.5,73.1,43.9C63.4,57.3,51.6,68.9,37.5,75.3C23.4,81.7,7,82.9,-8.9,80.1C-24.8,77.3,-40.1,70.4,-52.9,60.1C-65.7,49.8,-76,36.1,-80.9,20.7C-85.8,5.3,-85.3,-11.8,-79.3,-26.5C-73.3,-41.2,-61.8,-53.5,-48.4,-59.2C-35,-64.9,-19.6,-64,-3.2,-59.2C13.2,-54.4,29.5,-79.1,42.7,-73.4Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-1/4 h-auto text-blue-50 opacity-70"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M47.7,-57.2C59,-47.3,63.6,-29.7,68.3,-11.1C73,7.5,77.8,27.1,71.2,41.1C64.6,55.2,46.6,63.7,28.9,69.1C11.2,74.5,-6.2,76.8,-23.4,72.8C-40.6,68.7,-57.5,58.3,-67.3,43.1C-77.1,28,-79.7,8.1,-76.3,-10.3C-72.9,-28.7,-63.5,-45.6,-49.8,-55.1C-36.1,-64.6,-18,-66.7,-0.2,-66.5C17.7,-66.3,35.3,-63.8,47.7,-57.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="space-y-8" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <SectionTitleAnimation
                firstWord="ÜBER"
                secondWord="UNS"
                description="Lernen Sie FLINK SAUBER kennen - Ihr Partner für makellose Sauberkeit"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Willkommen bei <span className="font-semibold text-sky-600">FLINK SAUBER</span>, Ihrem
                vertrauenswürdigen Partner für einwandfreie Reinigungslösungen. Wir sind stolz darauf, Reinigungsdienste
                für Privathaushalte und Gewerbe anzubieten, die alle Erwartungen übertreffen.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Unser hochqualifiziertes Team ist bestrebt, makellose Räume zu gewährleisten und unseren Kunden Komfort
                und Sicherheit zu bieten. Entdecken Sie Spitzenleistungen in der Reinigung mit{" "}
                <span className="font-semibold text-sky-600">FLINK SAUBER</span>.
              </p>
            </motion.div>

            <motion.div className="space-y-4" variants={containerVariants}>
              {features.map((feature, index) => (
                <motion.div key={index} className="flex items-center space-x-3" variants={itemVariants} custom={index}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <span className="text-gray-700">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
      
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            variants={imageVariants}
            whileHover="hover"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Main image */}
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-500">
              <NextImage
                src="/modern-blue-office.png"
                alt="Sauberes Büro"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-sky-100 rounded-lg z-0"
              animate={{
                rotate: [0, 5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full z-0"
              animate={{
                y: [0, -10, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Experience badge */}
            <motion.div
              className="absolute bottom-6 right-6 bg-white rounded-full px-4 py-2 shadow-lg z-20 flex items-center space-x-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold">
                10+
              </div>
              <div className="text-sm">
                <div className="font-semibold">Jahre</div>
                <div className="text-gray-500">Erfahrung</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>


      </div>
    </section>
  )
}
