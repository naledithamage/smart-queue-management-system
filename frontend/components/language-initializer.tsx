"use client"

import { useEffect } from "react"

export function LanguageInitializer() {
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en"
    document.documentElement.lang = savedLanguage
  }, [])

  return null
}
