import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ParallaxBackgroundController from "@/components/parallax-background-controller"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Flink Sauber - Ihr Reinigungsspezialist",
  description: "Professionelle Reinigungsdienstleistungen in Liechtenstein",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Pequeño script para forzar la recarga si hay problemas de hidratación
              if (window.sessionStorage.getItem('initialLoad') !== 'true') {
                window.sessionStorage.setItem('initialLoad', 'true');
                // Comentado para evitar bucles de recarga, descomentar si es necesario
                // window.addEventListener('load', function() {
                //   setTimeout(function() {
                //     if (document.querySelector('main').children.length < 2) {
                //       console.log('Content not loaded properly, refreshing...');
                //       window.location.reload();
                //     }
                //   }, 2000);
                // });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ParallaxBackgroundController />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
