import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-bold text-sky-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Seite nicht gefunden</h2>
      <p className="text-gray-500 max-w-md mb-8">Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.</p>
      <Button asChild>
        <Link href="/">Zurück zur Startseite</Link>
      </Button>
    </div>
  )
}
