"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false)

  useEffect(() => {
    // Check if user has already accepted or declined cookies
    const cookieConsent = localStorage.getItem("cookieConsent")

    // Only show banner if consent hasn't been given yet
    if (!cookieConsent) {
      // Small delay to prevent the banner from appearing immediately
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined")
    setShowBanner(false)
  }

  const openPrivacyPolicy = () => {
    setShowPrivacyDialog(true)
  }

  if (!showBanner) {
    return null
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1 pr-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Wir verwenden Cookies</h3>
              <p className="text-gray-600 text-sm">
                Diese Website verwendet Cookies, um Ihnen ein besseres Nutzererlebnis zu bieten. Mit der Nutzung der
                Website stimmen Sie der Verwendung von Cookies zu.{" "}
                <button
                  onClick={openPrivacyPolicy}
                  className="text-sky-600 hover:text-sky-700 underline underline-offset-2"
                >
                  Mehr erfahren
                </button>
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={declineCookies}
              >
                Ablehnen
              </Button>
              <Button className="bg-sky-500 hover:bg-sky-600 text-white" onClick={acceptCookies}>
                Akzeptieren
              </Button>
              <button
                className="p-1 rounded-md text-gray-400 hover:text-gray-600"
                onClick={declineCookies}
                aria-label="Schließen"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-sky-600">Datenschutzerklärung</DialogTitle>
            <DialogDescription className="text-gray-500">
              Informationen zum Datenschutz bei FLINK SAUBER
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">1. Datenschutz auf einen Blick</h3>
              <div className="mt-2 space-y-2">
                <h4 className="font-semibold text-gray-700">Allgemeine Hinweise</h4>
                <p className="text-gray-600">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                  passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                  persönlich identifiziert werden können.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800">2. Cookies und Webanalyse-Dienste</h3>
              <div className="mt-2 space-y-2">
                <p className="text-gray-600">
                  Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät
                  speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu
                  machen.
                </p>
                <p className="text-gray-600">
                  Einige Cookies sind "Session-Cookies", die nach Ende Ihres Besuchs automatisch gelöscht werden. Andere
                  Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen.
                </p>
                <p className="text-gray-600">
                  Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und
                  Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell
                  ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800">3. Ihre Rechte</h3>
              <div className="mt-2 space-y-2">
                <p className="text-gray-600">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                  gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung,
                  Sperrung oder Löschung dieser Daten zu verlangen.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
