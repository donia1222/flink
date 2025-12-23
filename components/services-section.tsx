"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import SectionTitleAnimation from "@/components/section-title-animation"
import { Button } from "@/components/ui/button"

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  const services = [
    {
      id: "fensterreinigung",
      title: "Fensterreinigung",
      description: "Professionelle Reinigung für kristallklare Fenster",
      image: "/gallery-2.png",
      number: "01",
      color: "from-blue-500 to-sky-400",
    },
    {
      id: "wohnungsreinigung",
      title: "Wohnungsreinigung",
      description: "Umzugsreinigung mit Abgabegarantie",
      image: "/gallery-1.png",
      number: "02",
      color: "from-sky-500 to-cyan-400",
    },
    {
      id: "buroreinigung",
      title: "Büroreinigung",
      description: "Diskrete und gründliche Reinigung für Büroräume",
      image: "/modern-blue-office.png",
      number: "03",
      color: "from-cyan-500 to-teal-400",
    },
    {
      id: "hauswartung",
      title: "Hauswartung",
      description: "Umfassende Betreuung Ihrer Immobilie",
      image: "/gallery-5.png",
      number: "04",
      color: "from-teal-500 to-emerald-400",
    },
    {
      id: "teppichreinigung",
      title: "Teppichreinigung",
      description: "Fachkundige Reinigung aller Arten von Teppichen",
      image: "/gallery-4.png",
      number: "05",
      color: "from-emerald-500 to-blue-400",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="services" className="w-full py-24 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sky-50 rounded-full opacity-50 transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-50 rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2" />

        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <SectionTitleAnimation
          firstWord="DIENST"
          secondWord="LEISTUNGEN"
          description="Unsere professionellen Reinigungsdienstleistungen für jeden Bedarf"
        />

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              className="h-full"
            >
              <div
                className="group h-full bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-500 relative border border-gray-100"
                style={{
                  transform: hoveredService === service.id ? "translateY(-8px)" : "translateY(0)",
                  boxShadow:
                    hoveredService === service.id
                      ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 20px rgba(56, 189, 248, 0.2)"
                      : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
              >
                {/* Service number with gradient background */}
                <div className="absolute top-0 left-0 z-10 p-4">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${service.color} shadow-lg`}
                  >
                    <span className="text-xl font-bold text-white">{service.number}</span>
                  </div>
                </div>

                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                  {/* Title overlay on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:translate-y-0">
                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{service.title}</h3>
                  </div>
                </div>

                <div className="p-6 relative">
                  <p className="text-gray-600 mb-6">{service.description}</p>

                  {/* Enhanced "Mehr erfahren" button */}
                  <Link href={`/services/${service.id}`} className="block">
                    <Button
                      className={`w-full group bg-gradient-to-r ${service.color} text-white hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
                    >
                      <span className="mr-2">Mehr erfahren</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M0,100 Q50,50 100,0 L100,100 Z" fill={`url(#gradient-${index})`} />
                    <defs>
                      <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

     
       
      </div>
    </section>
  )
}
