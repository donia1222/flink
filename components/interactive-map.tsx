"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import SectionTitleAnimation from "@/components/section-title-animation"

export default function InteractiveMap() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const locations = [
    { id: "vaduz", name: "Vaduz", position: { top: "30%", left: "40%" } },
    { id: "schaan", name: "Schaan", position: { top: "20%", left: "35%" } },
    { id: "triesen", name: "Triesen", position: { top: "40%", left: "45%" } },
    { id: "balzers", name: "Balzers", position: { top: "50%", left: "30%" } },
    { id: "triesenberg", name: "Triesenberg", position: { top: "25%", left: "50%" } },
  ]

  useEffect(() => {
    const handleIframeLoad = () => {
      setMapLoaded(true)
    }

    const handleIframeError = () => {
      console.error("Map failed to load")
      setMapError(true)
    }

    const iframe = iframeRef.current
    if (iframe) {
      iframe.addEventListener("load", handleIframeLoad)
      iframe.addEventListener("error", handleIframeError)
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleIframeLoad)
        iframe.removeEventListener("error", handleIframeError)
      }
    }
  }, [])

  return (
    <section className="w-full py-20 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <SectionTitleAnimation
          firstWord="UNSER"
          secondWord="STANDORT"
          description="Besuchen Sie uns in Vaduz oder nutzen Sie unsere Reinigungsdienstleistungen in ganz Liechtenstein"
        />

        <div className="relative w-full h-[500px] bg-sky-50 rounded-xl overflow-hidden shadow-lg">
          {mapError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-sky-50">
              <p className="text-gray-500 text-center p-4">
                Karte konnte nicht geladen werden. Bitte versuchen Sie es später erneut.
              </p>
            </div>
          ) : (
            <>
              <iframe
                ref={iframeRef}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87021.95720466296!2d9.477873311584396!3d47.16591310825234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479b31435c335f9d%3A0x400ff8590e404b0!2sLiechtenstein!5e0!3m2!1sen!2sus!4v1716151994897!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>

              {mapLoaded &&
                locations.map((location) => (
                  <div
                    key={location.id}
                    className="absolute z-10"
                    style={{ top: location.position.top, left: location.position.left }}
                  >
                    <motion.button
                      className={`w-6 h-6 rounded-full ${
                        activeLocation === location.id ? "bg-sky-500" : "bg-sky-400"
                      } shadow-md flex items-center justify-center relative`}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setActiveLocation(location.id === activeLocation ? null : location.id)}
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      {activeLocation === location.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full mt-2 bg-white px-3 py-1 rounded shadow-md whitespace-nowrap"
                        >
                          {location.name}
                        </motion.div>
                      )}
                    </motion.button>
                  </div>
                ))}
            </>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-sky-50 p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">Servicegebiet</h3>
            <p className="text-gray-600">
              Wir bieten unsere Dienstleistungen in ganz Liechtenstein an, einschließlich Vaduz, Schaan, Triesen,
              Balzers und Triesenberg.
            </p>
          </div>

          <div className="bg-sky-50 p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">Anfahrtskosten</h3>
            <p className="text-gray-600">
              Innerhalb von Liechtenstein fallen keine zusätzlichen Anfahrtskosten an. Für Kunden außerhalb berechnen
              wir eine kleine Gebühr.
            </p>
          </div>

          <div className="bg-sky-50 p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">Terminvereinbarung</h3>
            <p className="text-gray-600">
              Kontaktieren Sie uns für eine kostenlose Beratung und Terminvereinbarung in Ihrem Gebiet.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
