"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Bell, Check, Clock, Plus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { useTranslation } from "@/lib/translations"

type Medication = {
  id: string
  name: string
  dosage: string
  frequency: string
  time: string
  forMember: string
  taken: boolean
}

export default function MedicationReminders() {
  const [medications, setMedications] = useState<Medication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        const mockMedications: Medication[] = [
          {
            id: "1",
            name: "Paracetamol",
            dosage: "500mg",
            frequency: "Every 6 hours",
            time: "08:00",
            forMember: "John Smith",
            taken: false,
          },
          {
            id: "2",
            name: "Vitamin C",
            dosage: "1000mg",
            frequency: "Once daily",
            time: "09:00",
            forMember: "Mary Smith",
            taken: true,
          },
          {
            id: "3",
            name: "Antibiotic",
            dosage: "250mg",
            frequency: "Twice daily",
            time: "20:00",
            forMember: "David Smith",
            taken: false,
          },
        ]

        setMedications(mockMedications)
      } catch (err) {
        console.error("Error fetching medications:", err)
        setError("Failed to load medication reminders")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMedications()
  }, [])

  const markAsTaken = (id: string) => {
    setMedications((prev) => prev.map((med) => (med.id === id ? { ...med, taken: true } : med)))
  }

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

  // Separate medications into today's and upcoming
  const todaysMedications = medications.filter((med) => !med.taken)
  const takenMedications = medications.filter((med) => med.taken)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{t("dashboard.medications")}</h3>
        <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
          <Link href="/medication/add">
            <Plus className="h-4 w-4 mr-1" />
            {t("dashboard.addMedication")}
          </Link>
        </Button>
      </div>

      {medications.length === 0 ? (
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-muted-foreground">{t("dashboard.noMedications")}</p>
            <Button asChild className="mt-4 bg-green-600 hover:bg-green-700">
              <Link href="/medication/add">
                <Plus className="h-4 w-4 mr-1" />
                {t("dashboard.addFirstMedication")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {todaysMedications.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">{t("dashboard.upcomingDoses")}</h4>
              <div className="space-y-2">
                {todaysMedications.map((med) => (
                  <Card key={med.id} className="border-amber-200 dark:border-amber-800">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-4">
                          <Bell className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {med.name} ({med.dosage})
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {med.time} • {med.forMember}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-200 hover:bg-green-50 hover:text-green-700"
                        onClick={() => markAsTaken(med.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        {t("dashboard.markTaken")}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {takenMedications.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">{t("dashboard.takenToday")}</h4>
              <div className="space-y-2">
                {takenMedications.map((med) => (
                  <Card key={med.id} className="border-green-200 dark:border-green-800 opacity-70">
                    <CardContent className="p-4 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {med.name} ({med.dosage})
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {med.time} • {med.forMember}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
