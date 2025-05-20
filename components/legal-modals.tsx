"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

type ModalType = "impressum" | "datenschutz" | "agb" | null

export default function LegalModals() {
  const [openModal, setOpenModal] = useState<ModalType>(null)

  const openImpressum = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpenModal("impressum")
  }

  const openDatenschutz = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpenModal("datenschutz")
  }

  const openAGB = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpenModal("agb")
  }

  const closeModal = () => {
    setOpenModal(null)
  }

  return (
    <>
      {/* Impressum Link */}
      <li>
        <a href="#" onClick={openImpressum} className="text-gray-600 hover:text-sky-600 transition-colors">
          Impressum
        </a>
      </li>

      {/* Datenschutz Link */}
      <li>
        <a href="#" onClick={openDatenschutz} className="text-gray-600 hover:text-sky-600 transition-colors">
          Datenschutz
        </a>
      </li>

      {/* AGB Link */}
      <li>
        <a href="#" onClick={openAGB} className="text-gray-600 hover:text-sky-600 transition-colors">
          AGB
        </a>
      </li>

      {/* Impressum Modal */}
      <Dialog open={openModal === "impressum"} onOpenChange={closeModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-sky-600">Impressum</DialogTitle>
            <DialogDescription className="text-gray-500">Angaben gemäß § 5 TMG</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">FLINK SAUBER</h3>
              <p className="text-gray-600">Professionelle Reinigungsdienstleistungen</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Adresse</h4>
                <p className="text-gray-600">
                  Am Schrägen Weg 12
                  <br />
                  9490 Vaduz
                  <br />
                  Liechtenstein
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Kontakt</h4>
                <p className="text-gray-600">
                  <strong>Telefon:</strong> 079 759 19 83
                  <br />
                  <strong>Öffnungszeiten:</strong> Mo bis Sa 08:00 - 17:00
                  <br />
                  <strong>E-Mail:</strong> info@flink-sauber.li
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-gray-700">Bildnachweis</h4>
              <p className="text-gray-600">Einige Bilder stammen von Freepik.</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-gray-700">Webseite Design</h4>
              <p className="text-gray-600">lweb.ch</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Datenschutz Modal */}
      <Dialog open={openModal === "datenschutz"} onOpenChange={closeModal}>
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
              <h3 className="text-lg font-bold text-gray-800">2. Datenerfassung auf unserer Website</h3>
              <div className="mt-2 space-y-2">
                <h4 className="font-semibold text-gray-700">
                  Wer ist verantwortlich für die Datenerfassung auf dieser Website?
                </h4>
                <p className="text-gray-600">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                  können Sie dem Impressum dieser Website entnehmen.
                </p>

                <h4 className="font-semibold text-gray-700">Wie erfassen wir Ihre Daten?</h4>
                <p className="text-gray-600">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B.
                  um Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
                <p className="text-gray-600">
                  Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor
                  allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800">3. Kontaktformular und WhatsApp</h3>
              <div className="mt-2 space-y-2">
                <p className="text-gray-600">
                  Wenn Sie uns per Kontaktformular oder WhatsApp Anfragen zukommen lassen, werden Ihre Angaben aus dem
                  Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage
                  und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre
                  Einwilligung weiter.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800">4. Ihre Rechte</h3>
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

      {/* AGB Modal */}
      <Dialog open={openModal === "agb"} onOpenChange={closeModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-sky-600">Allgemeine Geschäftsbedingungen</DialogTitle>
            <DialogDescription className="text-gray-500">
              AGB für die Dienstleistungen von FLINK SAUBER
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">1. Geltungsbereich</h3>
              <p className="text-gray-600 mt-2">
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen FLINK SAUBER und dem
                Kunden über die Erbringung von Reinigungsdienstleistungen.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800">2. Vertragsabschluss</h3>
              <p className="text-gray-600 mt-2">
                Der Vertrag kommt durch die Auftragserteilung des Kunden und die Annahme durch FLINK SAUBER zustande.
                Die Annahme kann durch schriftliche Auftragsbestätigung oder durch Ausführung der Dienstleistung
                erfolgen.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800">3. Leistungsumfang</h3>
              <p className="text-gray-600 mt-2">
                Der Umfang der zu erbringenden Leistungen ergibt sich aus der Leistungsbeschreibung in der
                Auftragsbestätigung oder dem Angebot. Zusätzliche Leistungen werden gesondert berechnet.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800">4. Preise und Zahlung</h3>
              <p className="text-gray-600 mt-2">
                Es gelten die zum Zeitpunkt des Vertragsabschlusses vereinbarten Preise. Die Zahlung erfolgt nach
                Rechnungsstellung und ist innerhalb von 14 Tagen ohne Abzug fällig.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800">5. Gewährleistung</h3>
              <p className="text-gray-600 mt-2">
                FLINK SAUBER gewährleistet die fachgerechte Durchführung der vereinbarten Leistungen. Mängel sind
                unverzüglich nach Entdeckung schriftlich anzuzeigen.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800">6. Haftung</h3>
              <p className="text-gray-600 mt-2">
                FLINK SAUBER haftet für Schäden, die durch grobe Fahrlässigkeit oder Vorsatz entstehen. Die Haftung für
                leichte Fahrlässigkeit ist ausgeschlossen, soweit gesetzlich zulässig.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800">7. Schlussbestimmungen</h3>
              <p className="text-gray-600 mt-2">
                Es gilt das Recht des Fürstentums Liechtenstein. Gerichtsstand ist Vaduz, Liechtenstein.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
