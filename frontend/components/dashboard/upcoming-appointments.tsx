"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Calendar, MapPin, Plus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { useTranslation } from "@/lib/translations"

type Appointment = {
  id: string
  title: string
  date: string
  time: string
  location: string
  forMember: string
  status: "upcoming" | "completed" | "cancelled"
}

export default function UpcomingAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        const mockAppointments: Appointment[] = [
          {
            id: "1",
            title: "General Checkup",
            date: "2023-05-20",
            time: "10:30",
            location: "Community Clinic, Soweto",
            forMember: "John Smith",
            status: "upcoming",
          },
          {
            id: "2",
            title: "Vaccination",
            date: "2023-05-25",
            time: "14:15",
            location: "Public Health Center, Johannesburg",
            forMember: "Sarah Smith",
            status: "upcoming",
          },
          {
            id: "3",
            title: "Dental Checkup",
            date: "2023-05-15",
            time: "09:00",
            location: "Dental Clinic, Pretoria",
            forMember: "Mary Smith",
            status: "completed",
          },
        ]

        setAppointments(mockAppointments)
      } catch (err) {
        console.error("Error fetching appointments:", err)
        setError("Failed to load appointments")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  if (isLoading) {
    return <div className="text-center py-8">{t("common.loading")}</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t("common.error")}</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  // Filter for upcoming appointments only
  const upcomingAppointments = appointments.filter((apt) => apt.status === "upcoming")

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{t("dashboard.appointments")}</h3>
        <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
          <Link href="/appointments/add">
            <Plus className="h-4 w-4 mr-1" />
            {t("dashboard.scheduleAppointment")}
          </Link>
        </Button>
      </div>

      {upcomingAppointments.length === 0 ? (
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-muted-foreground">{t("dashboard.noAppointments")}</p>
            <Button asChild className="mt-4 bg-green-600 hover:bg-green-700">
              <Link href="/appointments/add">
                <Plus className="h-4 w-4 mr-1" />
                {t("dashboard.scheduleFirstAppointment")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-4">
                    <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-medium">{appointment.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(appointment.date)} • {appointment.time} • {appointment.forMember}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground ml-14">
                  <MapPin className="h-3 w-3 mr-1" />
                  {appointment.location}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
