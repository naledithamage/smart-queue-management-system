"use client"

import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { useState, useEffect } from "react"
import { Menu, X, User, LogOut, Settings } from "lucide-react"
import { useTranslation } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "./language-switcher"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const authToken = localStorage.getItem("authToken")
    const userStr = localStorage.getItem("user")

    if (authToken && userStr) {
      setIsAuthenticated(true)
      try {
        const user = JSON.parse(userStr)
        setUserName(user.familyName || user.email || "")
      } catch (e) {
        console.error("Error parsing user data", e)
      }
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    try {
      // Clear authentication data
      localStorage.removeItem("authToken")
      localStorage.removeItem("user")

      // Update state
      setIsAuthenticated(false)

      // Redirect to login page
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <header className="border-b bg-background sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-green-600">HealthAssist</span>
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium hover:text-green-600 transition-colors">
                {t("dashboard.title")}
              </Link>
              <Link href="/symptom-checker" className="text-sm font-medium hover:text-green-600 transition-colors">
                {t("symptom.title")}
              </Link>
              <Link href="/family" className="text-sm font-medium hover:text-green-600 transition-colors">
                {t("dashboard.familyMembers")}
              </Link>
              <Link href="/health-info" className="text-sm font-medium hover:text-green-600 transition-colors">
                {t("dashboard.recentActivity")}
              </Link>
              <Link href="/chatbot" className="text-sm font-medium hover:text-green-600 transition-colors">
                AI Chatbot
              </Link>
            </>
          ) : (
            <>
              <Link href="/about" className="text-sm font-medium hover:text-green-600 transition-colors">
                About
              </Link>
              <Link href="/symptom-checker" className="text-sm font-medium hover:text-green-600 transition-colors">
                Symptom Checker
              </Link>
              <Link href="/clinic-queue" className="text-sm font-medium hover:text-green-600 transition-colors">
                Clinic Queue
              </Link>
              <Link href="/health-info" className="text-sm font-medium hover:text-green-600 transition-colors">
                Health Information
              </Link>
              <Link href="/chatbot" className="text-sm font-medium hover:text-green-600 transition-colors">
                AI Chatbot
              </Link>
            </>
          )}
          <LanguageSwitcher />
          <ModeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline-block">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    {t("settings.title")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("auth.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
              <Link href="/login">{t("login.submit")}</Link>
            </Button>
          )}
        </nav>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("dashboard.title")}
                </Link>
                <Link
                  href="/symptom-checker"
                  className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("symptom.title")}
                </Link>
                <Link
                  href="/family"
                  className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("dashboard.familyMembers")}
                </Link>
                <Link
                  href="/health-info"
                  className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("dashboard.recentActivity")}
                </Link>
                <Link
                  href="/chatbot"
                  className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  AI Chatbot
                </Link>
                <Link
                  href="/settings"
                  className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("settings.title")}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/about"
                  className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/symptom-checker"
                  className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Symptom Checker
                </Link>
                <Link
                  href="/clinic-queue"
                  className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Clinic Queue
                </Link>
                <Link
                  href="/health-info"
                  className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Health Information
                </Link>
                <Link
                  href="/chatbot"
                  className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  AI Chatbot
                </Link>
              </>
            )}
            <div className="flex items-center justify-between py-2">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
            {isAuthenticated ? (
              <button
                className="text-sm font-medium py-2 text-red-600 hover:text-red-700 transition-colors flex items-center"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t("auth.logout")}
              </button>
            ) : (
              <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  {t("login.submit")}
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
