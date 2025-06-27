"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Calendar, CheckCircle, Stethoscope, User } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useTranslation } from "@/lib/translations"

type Activity = {
  id: string
  type: "symptom-check" | "appointment" | "medication" | "family-update"
  title: string
  description: string
  timestamp: string
  icon: any
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        const mockActivities: Activity[] = [
          {
            id: "1",
            type: "symptom-check",
            title: "Symptom Check Completed",
            description: "Checked symptoms for headache and fever",
            timestamp: "2023-05-15T10:30:00Z",
            icon: Stethoscope,
          },
          {
            id: "2",
            type: "appointment",
            title: "Appointment Scheduled",
            description: "Scheduled a clinic visit for John Smith",
            timestamp: "2023-05-14T14:00:00Z",
            icon: Calendar,
          },
          {
            id: "3",
            type: "medication",
            title: "Medication Taken",
            description: "Mary Smith took Vitamin C",
            timestamp: "2023-05-15T09:15:00Z",
            icon: CheckCircle,
          },
          {
            id: "4",
            type: "family-update",
            title: "Family Member Added",
            description: "Added Sarah Smith to family members",
            timestamp: "2023-05-13T16:45:00Z",
            icon: User,
          },
        ]

        setActivities(mockActivities)
      } catch (err) {
        console.error("Error fetching activities:", err)
        setError("Failed to load recent activities")
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (isLoading) {
    return <div className="text-center py-4">{t("common.loading")}</div>
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

  if (activities.length === 0) {
    return <div className="text-center py-4 text-muted-foreground">{t("dashboard.noRecentActivity")}</div>
  }

  // Format the timestamp to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const IconComponent = activity.icon

        return (
          <div key={activity.id} className="flex items-start space-x-4 pb-4 border-b last:border-0">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center 
              ${
                activity.type === "symptom-check"
                  ? "bg-blue-100 text-blue-600"
                  : activity.type === "appointment"
                    ? "bg-purple-100 text-purple-600"
                    : activity.type === "medication"
                      ? "bg-green-100 text-green-600"
                      : "bg-amber-100 text-amber-600"
              }`}
            >
              <IconComponent className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">{activity.title}</h4>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{formatDate(activity.timestamp)}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
