"use client"
import Image from "next/image"
import type React from "react"
import Link from "next/link"
import { useState, useRef } from "react"
import { Phone, Mail, MapPin, Send, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import SectionTitleAnimation from "@/components/section-title-animation"
import LegalModals from "@/components/legal-modals"

export default function WhatsappContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicePage, setIsServicePage] = useState(false)
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    // Format the message for WhatsApp
    const whatsappMessage = `
*Neue Anfrage von der Website*
*Name:* ${formData.name}
*Email:* ${formData.email}
*Telefon:* ${formData.phone}
*Nachricht:* ${formData.message}
    `.trim()

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage)

    // WhatsApp number
    const whatsappNumber = "+764834787"

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")

    // Set success state
    setFormState("success")

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormState("idle")
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    }, 3000)
  }

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Telefon",
      content: "079 759 19 83",
      subtext: "Mo bis Sa 08:00 - 17:00",
      color: "from-sky-400 to-blue-500",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "info@flink-sauber.li",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Adresse",
      content: "Poskahalda 3 ",
      subtext: "Triesen / Liechtenstein",
      color: "from-indigo-400 to-purple-500",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Geschäftszeiten",
      content: "Montag - Samstag",
      subtext: "08:00 - 17:00 Uhr",
      color: "from-purple-400 to-pink-500",
    },
  ]

  const openWhatsApp = () => {
    window.open(`https://wa.me/+764834787`, "_blank")
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

        {/* Grid pattern - Added the same grid pattern as in services and gallery sections */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <div className="container px-4 md:px-6 relative z-10" ref={ref}>
        <SectionTitleAnimation
          firstWord="KONTAKT"
          secondWord="AUFNEHMEN"
          description="Wir freuen uns auf Ihre Nachricht"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
          {/* Contact form - 3 columns */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden border-none shadow-xl bg-white rounded-xl">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Schreiben Sie uns</h3>
                  <p className="text-white/80">
                    Füllen Sie das Formular aus und wir werden uns so schnell wie möglich bei Ihnen melden.
                  </p>
                </div>
                <form className="p-6 space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Ihr Name"
                        className="border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        disabled={formState === "submitting"}
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Input
                        id="email"
                        placeholder="ihre.email@beispiel.com"
                        type="email"
                        className="border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        disabled={formState === "submitting"}
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Telefon
                    </label>
                    <Input
                      id="phone"
                      placeholder="+41 79 123 45 67"
                      type="tel"
                      className="border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                      disabled={formState === "submitting"}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Ihre Nachricht
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Wie können wir Ihnen helfen?"
                      className="min-h-[150px] border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                      disabled={formState === "submitting"}
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <Button
                    type="submit"
                    className={`w-full ${
                      formState === "submitting"
                        ? "bg-gray-400 cursor-not-allowed"
                        : formState === "success"
                          ? "bg-green-500 hover:bg-green-600"
                          : formState === "error"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-sky-500 hover:bg-sky-600"
                    }`}
                    disabled={formState === "submitting"}
                  >
                    <span className="flex items-center justify-center">
                      {formState === "idle" && (
                        <>
                          Nachricht senden
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                      {formState === "submitting" && "Wird gesendet..."}
                      {formState === "success" && (
                        <>
                          Nachricht gesendet
                          <CheckCircle className="ml-2 h-4 w-4" />
                        </>
                      )}
                      {formState === "error" && (
                        <>
                          Fehler beim Senden
                          <AlertCircle className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact info - 2 columns - WITHOUT ANIMATIONS */}
          <div className="lg:col-span-2 space-y-6">
            {/* WhatsApp Button */}
            <div className="bg-[#25D366] rounded-xl p-6 shadow-lg border border-[#20BD5C] text-white">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-white/20 text-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">WhatsApp</h3>
                  <p className="font-medium">Direkt mit uns chatten</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-white text-[#25D366] hover:bg-white/90" onClick={openWhatsApp}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Jetzt chatten
              </Button>
            </div>

            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full bg-gradient-to-br ${method.color} text-white shadow-md`}>
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{method.title}</h3>
                    <p className="text-gray-700 font-medium">{method.content}</p>
                    {method.subtext && <p className="text-sm text-gray-500">{method.subtext}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Footer */}
      <footer className="w-full mt-24 border-t border-gray-200 bg-white">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
                   {/* Logo */}
        <Link href="/#home" className="flex items-center">
          <Image
            src="/logo.png"
            alt="FLINKSAUBER Logo"
            width={180}
            height={80}
            className={`h-10 w-auto transition-opacity duration-300 ${
              isScrolled || isServicePage ? "opacity-100" : "opacity-100"
            }`}
            priority
          />
        </Link>
              <h3 className="text-xl font-bold mb-4 text-gray-800">FLINK SAUBER</h3>
              <p className="text-gray-600 mb-4 max-w-md">
                Ihr zuverlässiger Partner für professionelle Reinigungsdienstleistungen in Liechtenstein und Umgebung.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-sky-100 hover:text-sky-600 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-sky-100 hover:text-sky-600 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                {/* WhatsApp icon in footer */}
                <a
                  href={`https://wa.me/+764834787`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:bg-[#20BD5C] transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Dienstleistungen</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">
                    Haushaltsreinigung
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">
                    Büroreinigung
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">
                    Grundreinigung
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">
                    Fensterreinigung
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Rechtliches</h4>
              <ul className="space-y-2">
                <LegalModals />
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 Flink Sauber. Alle Rechte vorbehalten.</p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-500 text-sm">Designed with ♥ in Liechtenstein</p>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
