"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import ModernWhyUsSection from "@/components/why-us-section"
import ServicesSection from "@/components/services-section"
import ContactSection from "@/components/contact-section"
import ModernAboutSection from "@/components/modern-about-section"
import ModernPhilosophySection from "@/components/modern-philosophy-section"
import SectionTitleAnimation from "@/components/section-title-animation"
import FancyLoader from "@/components/fancy-loader"
import CookieConsent from "@/components/cookie-consent"
import ScrollToTop from "@/components/scroll-to-top"
import BeforeAfterComparison from "@/components/before-after-comparison"

// Dynamically import heavy components to improve initial load time
const TestimonialSlider = dynamic(() => import("@/components/testimonial-slider"), {
  ssr: true,
  loading: () => <div className="h-[400px] flex items-center justify-center">Lädt Testimonials...</div>,
})

const ParallaxGallery = dynamic(() => import("@/components/parallax-gallery"), {
  ssr: true,
  loading: () => <div className="h-[400px] flex items-center justify-center">Lädt Galerie...</div>,
})

const AnimatedProcess = dynamic(() => import("@/components/animated-process"), {
  ssr: true,
  loading: () => <div className="h-[400px] flex items-center justify-center">Lädt Prozess...</div>,
})



const StatsSection = dynamic(() => import("@/components/stats-section"), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center">Lädt Statistiken...</div>,
})

const InteractiveMap = dynamic(() => import("@/components/interactive-map"), {
  ssr: false,
  loading: () => <div className="h-[500px] flex items-center justify-center">Lädt Karte...</div>,
})

export default function Home() {
  // Estado para controlar si estamos en el cliente
  const [isClient, setIsClient] = useState(false)

  // Efecto para establecer isClient a true cuando el componente se monta en el cliente
  useEffect(() => {
    // Establecer isClient a true inmediatamente
    setIsClient(true)

    // Forzar un re-renderizado después de un breve retraso
    const timer = setTimeout(() => {
      console.log("Forcing re-render to ensure content visibility")
      setIsClient((prev) => {
        // Cambiar y volver a cambiar para forzar un re-renderizado
        return prev
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Renderizar un esqueleto básico mientras se carga
  const renderSkeleton = () => (
    <>
      <FancyLoader />
      <div className="min-h-screen bg-sky-100 opacity-0">
        {/* Este div es solo un placeholder mientras el loader está activo */}
      </div>
    </>
  )

  // Renderizar el contenido completo
  const renderContent = () => (
    <>
      {/* Philosophy Section */}
      <section id="philosophy" className="w-full">
        <ModernPhilosophySection />
      </section>

      <section id="why-us" className="w-full">
        <ModernWhyUsSection />
      </section>

      <section id="stats" className="w-full">
        <StatsSection />
      </section>

      {/* About Section */}
      <section id="about-us" className="w-full">
        <ModernAboutSection />
      </section>

      <ServicesSection />

      <section id="process" className="w-full">
        <AnimatedProcess />
      </section>

      <section id="gallery" className="w-full">
        <ParallaxGallery />

        {/* Before-After Comparison Section */}
        <div className="container px-4 md:px-6 mx-auto">
          <BeforeAfterComparison beforeImage="/before-cleaning.png" afterImage="/after-cleaning.png" />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-20 bg-sky-50">
        <div className="container px-4 md:px-6 mx-auto">
          <SectionTitleAnimation
            firstWord="KUNDEN"
            secondWord="STIMMEN"
            description="Erfahren Sie, was unsere zufriedenen Kunden über unsere Reinigungsdienstleistungen sagen"
          />

          <TestimonialSlider />
        </div>
      </section>

      <section id="map" className="w-full">
        <InteractiveMap />
      </section>

      <section id="contact" className="w-full">
        <ContactSection />
      </section>

      {/* Cookie Consent Banner */}
      <CookieConsent />

      {/* Scroll To Top Button */}
      <ScrollToTop />
    </>
  )

  return (
    <main className="flex min-h-screen flex-col items-center relative z-10">
      {isClient ? renderContent() : renderSkeleton()}
    </main>
  )
}
