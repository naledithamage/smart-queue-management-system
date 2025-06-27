"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Stethoscope, ClipboardList, BookOpen, Clock } from "lucide-react"
import { useTranslation } from "@/lib/translations"
import { useRouter } from "next/navigation"

export default function Home() {
  const { t } = useTranslation()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const authToken = localStorage.getItem("authToken")

    if (authToken) {
      setIsAuthenticated(true)
      router.push("/dashboard")
    } else {
      setIsAuthenticated(false)
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>{t("common.loading")}</p>
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">AI Health Assistant</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your community health companion providing guidance, support, and connecting you with local clinics.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/register">
                Create Family Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <Card>
            <CardHeader>
              <Stethoscope className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Symptom Checker</CardTitle>
              <CardDescription>Input your symptoms and get AI-powered health insights</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our AI analyzes your symptoms and provides a ranked list of possible conditions with recommendations.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/login">
                  Check Symptoms <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <ClipboardList className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Family Health Tracker</CardTitle>
              <CardDescription>Track health records for your entire family</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Manage health records for all family members in one place, with personalized insights and
                recommendations.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/login">
                  Track Health <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Medication Reminders</CardTitle>
              <CardDescription>Never miss important medications</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Set up personalized medication schedules and receive timely reminders for each family member.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/login">
                  Set Reminders <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Health Information</CardTitle>
              <CardDescription>Learn about common conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Access educational resources about TB, HIV, malaria, and other health topics relevant to your community.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/login">
                  Explore Resources <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}
