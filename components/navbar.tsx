"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  Phone,
  Briefcase,
  ListChecks,
  ImageIcon,
  MessageSquareQuote,
  MapPin,
  Mail,
  Settings,
  LogIn,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import LoginModal from "./login-modal"
import { useRouter } from "next/navigation"

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
}

export default function NavbarWithIcons() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isServicePage, setIsServicePage] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navItems: NavItem[] = [
    { name: "Dienstleistungen", href: "#services", icon: <Briefcase className="h-4 w-4" /> },
    { name: "Prozess", href: "#process", icon: <ListChecks className="h-4 w-4" /> },
    { name: "Galerie", href: "#gallery", icon: <ImageIcon className="h-4 w-4" /> },
    { name: "Testimonials", href: "#testimonials", icon: <MessageSquareQuote className="h-4 w-4" /> },
    { name: "Standort", href: "#map", icon: <MapPin className="h-4 w-4" /> },
    { name: "Kontakt", href: "#contact", icon: <Mail className="h-4 w-4" /> },
  ]

  // Verificar autenticación al cargar
  useEffect(() => {
    setIsMounted(true)

    // Verificar si el usuario está autenticado
    const checkAuth = () => {
      const isAuth = localStorage.getItem("isAuthenticated") === "true"
      const expiry = localStorage.getItem("authExpiry")

      if (isAuth && expiry && Number.parseInt(expiry) > Date.now()) {
        setIsAuthenticated(true)
      } else {
        // Limpiar autenticación expirada
        localStorage.removeItem("isAuthenticated")
        localStorage.removeItem("authExpiry")
        setIsAuthenticated(false)
      }
    }

    checkAuth()

    // Check if we're on a service page
    if (typeof window !== "undefined") {
      setIsServicePage(window.location.pathname.includes("/services/"))
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Determine active section based on scroll position
      const sections = document.querySelectorAll("section[id]")
      let currentSection = "home"

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const sectionId = section.getAttribute("id")

        if (sectionTop <= 100 && sectionId) {
          currentSection = sectionId
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Manejar login exitoso
  const handleLogin = () => {
    setIsAuthenticated(true)
    router.push("/admin/gallery")
  }

  // Manejar logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("authExpiry")
    setIsAuthenticated(false)
  }

  // If not mounted on the client, show a basic navbar
  if (!isMounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 shadow-md backdrop-blur-md py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.png" alt="FLINKSAUBER Logo" width={150} height={40} className="h-10 w-auto" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 shadow-md backdrop-blur-md py-2`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/#home" className="flex items-center">
            <Image
              src="/logo.png"
              alt="FLINKSAUBER Logo"
              width={150}
              height={40}
              className={`h-10 w-auto transition-opacity duration-300 ${
                isScrolled || isServicePage ? "opacity-100" : "opacity-100"
              }`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={isServicePage ? `/${item.href}` : item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                  activeSection === item.href.substring(1)
                    ? "text-sky-600 bg-sky-50"
                    : "text-gray-700 hover:text-sky-600 hover:bg-sky-50"
                }`}
                onClick={(e) => {
                  if (!isServicePage) {
                    e.preventDefault()
                    const targetId = item.href.substring(1)
                    const targetElement = document.getElementById(targetId)
                    if (targetElement) {
                      window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: "smooth",
                      })
                    }
                  }
                }}
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.name}
              </Link>
            ))}

            {/* Botón de Admin */}
            <button
              onClick={() => (isAuthenticated ? router.push("/admin/gallery") : setIsLoginModalOpen(true))}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center text-gray-700 hover:text-sky-600 hover:bg-sky-50`}
            >
              <span className="mr-1.5">
                <Settings className="h-4 w-4" />
              </span>
            </button>
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated && (
              <Button size="sm" variant="outline" onClick={handleLogout} className="rounded-full">
                Logout
              </Button>
            )}
            <Button size="sm" className={`rounded-full bg-sky-500 hover:bg-sky-600 text-white`} asChild>
              <a href="tel:+41797591983">
                <Phone className="h-4 w-4 mr-2" />
                079 759 19 83
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Botón de Admin en móvil */}
            <button
              onClick={() => (isAuthenticated ? router.push("/admin/gallery") : setIsLoginModalOpen(true))}
              className={`p-2 rounded-md text-gray-700`}
              aria-label=""
            >
              <Settings className="h-5 w-5" />
            </button>

            <button
              className="p-2 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="text-gray-700" /> : <Menu className="text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white shadow-lg"
            >
              <div className="container mx-auto px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={isServicePage ? `/${item.href}` : item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      activeSection === item.href.substring(1)
                        ? "text-sky-600 bg-sky-50"
                        : "text-gray-700 hover:text-sky-600 hover:bg-sky-50"
                    }`}
                    onClick={(e) => {
                      if (!isServicePage) {
                        e.preventDefault()
                        const targetId = item.href.substring(1)
                        const targetElement = document.getElementById(targetId)
                        if (targetElement) {
                          window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: "smooth",
                          })
                          setMobileMenuOpen(false)
                        }
                      } else {
                        setMobileMenuOpen(false)
                      }
                    }}
                  >
                    <span className="mr-3 text-sky-500">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}

                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-sky-50 w-full"
                  >
                    <span className="mr-3 text-sky-500">
                      <LogIn className="h-4 w-4" />
                    </span>
                    Abmelden
                  </button>
                )}

                <div className="pt-2">
                  <Button size="sm" className="w-full bg-sky-500 hover:bg-sky-600 text-white" asChild>
                    <a href="tel:+41797591983">
                      <Phone className="h-4 w-4 mr-2" />
                      079 759 19 83
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Modal de Login */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
    </>
  )
}
