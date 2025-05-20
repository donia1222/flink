import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ServicePageProps {
  params: {
    service: string
  }
}

const services = {
  fensterreinigung: {
    title: "Fensterreinigung",
    description: "Professionelle Reinigung für kristallklare Fenster",
    fullDescription:
      "Unsere Hauswarte setzen Aufgaben des Facility Managements wie Winterdienstes, der Grünpflege und der Gebäudereinigung genauso unkompliziert um wie kleinere Reparaturen. Flexibel und zuverlässig übernehmen wir ungeplante Aufgaben und Störungen. Dabei agieren unsere Hausmeister lösungsorientiert und regeln alle administrativen Fragen transparent und fair im Nachgang.",
    image: "/gallery-2.png",
    number: "01",
    benefits: [
      "Streifenfreie Reinigung aller Glasflächen",
      "Professionelle Ausrüstung für alle Höhen",
      "Reinigung von Rahmen und Fensterbänken",
      "Umweltfreundliche Reinigungsmittel",
      "Flexible Terminvereinbarung",
    ],
  },
  wohnungsreinigung: {
    title: "Wohnungsreinigung",
    description: "Umzugsreinigung mit Abgabegarantie",
    fullDescription:
      'Als Umzugsreinigung wird die gründliche Wohnungsreinigung beim Auszug bezeichnet. Eine „Umzug Wohnungsreinigung" ist in der Schweiz Pflicht. Oftmals wird die Umzugsreinigung auch als Reinigung mit Abgabegarantie, Wohnungsputz mit Übergabe oder Endreinigung mit Übergabe genannt. Als spezialisiertes Unternehmen von „Wohnungsreinigungen mit Abgabegarantie" versprechen wir Ihnen die zuverlässige Abgabe Ihres Objektes direkt an Ihre Verwaltung oder den Vermieter.',
    image: "/gallery-1.png",
    number: "02",
    benefits: [
      "Abgabegarantie bei Wohnungsübergabe",
      "Gründliche Reinigung aller Räume",
      "Spezielle Behandlung von Küche und Bad",
      "Reinigung von Böden, Wänden und Decken",
      "Fenster- und Rahmenreinigung inklusive",
    ],
  },
  buroreinigung: {
    title: "Büroreinigung",
    description: "Diskrete und gründliche Reinigung für Büroräume",
    fullDescription:
      "Verzeichnen eine hohe Nutzungsrate. Ihre Mitarbeiter nehmen Veränderungen detailliert wahr. Aktenschränke, Schreibtische, Böden, Mülleimer und alle weiteren Oberflächen erfordern regelmässig die Aufmerksamkeit eines erfahrenen Reinigungsservices. Die Dienstleistung muss pünktlich, gründlich und schonend ausgeführt werden. Wir verfügen über einen Personalpool mit geschulten Kräften, die diesen Anforderungen umfassend gerecht werden. Erfolgen die Massnahmen tagsüber, werden Kräfte eingesetzt, die auf ein besonders behutsames Vorgehen vorbereitet sind, um die Arbeit der Anwesenden nicht zu stören. Unser Personal reinigt Büros und Praxen jeder Grösse und wirkt dabei diskret im Hintergrund.",
    image: "/gallery-3.png",
    number: "03",
    benefits: [
      "Diskrete Reinigung ohne Störung des Arbeitsalltags",
      "Regelmässige oder einmalige Reinigung möglich",
      "Reinigung von Büromöbeln und Arbeitsflächen",
      "Hygienische Reinigung von Sanitäranlagen",
      "Flexible Terminvereinbarung ausserhalb der Bürozeiten",
    ],
  },
  hauswartung: {
    title: "Hauswartung",
    description: "Umfassende Betreuung Ihrer Immobilie",
    fullDescription:
      "Unsere Hauswarte setzen Aufgaben des Facility Managements wie Winterdienst, der Grünpflege und der Gebäudereinigung genauso unkompliziert um wie kleinere Reparaturen. Flexibel und zuverlässig übernehmen wir ungeplante Aufgaben und Störungen. Dabei agieren unsere Hausmeister lösungsorientiert und regeln alle administrativen Fragen transparent und fair im Nachgang.",
    image: "/gallery-5.png",
    number: "04",
    benefits: [
      "Winterdienst und Schneeräumung",
      "Grünpflege und Gartenpflege",
      "Regelmässige Gebäudereinigung",
      "Kleinere Reparaturen und Instandhaltung",
      "Schnelle Reaktion bei ungeplanten Störungen",
    ],
  },
  teppichreinigung: {
    title: "Teppichreinigung",
    description: "Fachkundige Reinigung aller Arten von Teppichen",
    fullDescription:
      "Eine sachgerechte, regelmässige und fachkundige Reinigung Ihrer Teppiche erfüllt alle Ansprüche der Hygiene und sorgt zugleich für eine optimale Optik. Ausserdem bleibt der Wert Ihrer Teppiche erhalten. So fühlen sich alle wohl, die in diesem Raum arbeiten, egal ob Hotel oder Büro, Privathaushalt, Industrieräume oder Gastronomie. Wir nutzen modernste Maschinen und Techniken und sind so in der Lage alle Arten von Teppichböden zu reinigen. Natürlich nutzen wir umweltfreundliche und biologische Reinigungsmittel, damit der Teppich geschont wird und ohne Gefahr für die Gesundheit in diesem Raum arbeiten können.",
    image: "/gallery-4.png",
    number: "06",
    benefits: [
      "Tiefenreinigung aller Arten von Teppichen",
      "Entfernung von hartnäckigen Flecken",
      "Umweltfreundliche und biologische Reinigungsmittel",
      "Modernste Maschinen und Techniken",
      "Werterhalt Ihrer Teppiche durch fachkundige Pflege",
    ],
  },
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = services[params.service as keyof typeof services]

  if (!service) {
    return {
      title: "Service nicht gefunden | Flink Sauber",
    }
  }

  return {
    title: `${service.title} | Flink Sauber`,
    description: service.description,
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services[params.service as keyof typeof services]

  if (!service) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-24">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 bg-sky-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mb-8">
            <Link
              href="/#services"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md text-sky-600 hover:text-sky-700 transition-colors"
              aria-label="Zurück zur Übersicht"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="inline-block bg-sky-500 text-white text-3xl font-bold px-4 py-2 rounded-lg mb-4">
                {service.number}
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{service.title}</h1>
              <p className="text-xl text-gray-600">{service.description}</p>
              <div className="pt-6">
                <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-8">
                  Kontakt aufnehmen
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative h-64 md:h-96 overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Beschreibung</h2>
              <div className="prose prose-lg max-w-none">
                <p>{service.fullDescription}</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Vorteile</h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-6 w-6 text-sky-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-20 bg-sky-500 text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Bereit für professionelle {service.title}?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns noch heute für ein unverbindliches Angebot und erleben Sie den Unterschied!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-sky-600 hover:bg-sky-50 rounded-full px-8">
              Angebot anfordern
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
              079 759 19 83
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
