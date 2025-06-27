import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { TranslationProvider } from "@/lib/translations"
import { LanguageInitializer } from "@/components/language-initializer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Health Assistant",
  description: "Community health assistant providing guidance and support",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TranslationProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <LanguageInitializer />
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </TranslationProvider>
      </body>
    </html>
  )
}
