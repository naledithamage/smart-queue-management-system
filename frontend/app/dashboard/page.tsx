"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/translations"
import { AlertCircle, Calendar, Clock, User, Users } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import EmergencyServices from "@/components/emergency/emergency-services"
import FamilyMembersList from "@/components/family/family-members-list"
import MedicationReminders from "@/components/medication/medication-reminders"
import RecentActivity from "@/components/dashboard/recent-activity"
import UpcomingAppointments from "@/components/dashboard/upcoming-appointments"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem("authToken")
      const userStr = localStorage.getItem("user")

      if (!authToken) {
        router.push("/login")
        return
      }

      try {
        if (userStr) {
          const user = JSON.parse(userStr)
          setUserData(user)
        }
      } catch (e) {
        console.error("Error parsing user data", e)
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>{t("common.loading")}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {t("dashboard.welcome")}, {userData?.familyName || "Family"}
          </h1>
          <p className="text-muted-foreground">{new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/symptom-checker">{t("symptom.title")}</Link>
          </Button>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/clinic-queue">{t("dashboard.findClinic")}</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="family" className="mb-6">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="family">
                <Users className="h-4 w-4 mr-2" />
                {t("dashboard.familyMembers")}
              </TabsTrigger>
              <TabsTrigger value="medications">
                <Clock className="h-4 w-4 mr-2" />
                {t("dashboard.medications")}
              </TabsTrigger>
              <TabsTrigger value="appointments">
                <Calendar className="h-4 w-4 mr-2" />
                {t("dashboard.appointments")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="family">
              <FamilyMembersList />
            </TabsContent>
            <TabsContent value="medications">
              <MedicationReminders />
            </TabsContent>
            <TabsContent value="appointments">
              <UpcomingAppointments />
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
              <CardDescription>{t("dashboard.recentActivityDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <EmergencyServices />

          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.quickActions")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/family/add">
                  <User className="mr-2 h-4 w-4" />
                  {t("dashboard.addFamilyMember")}
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/medication/add">
                  <Clock className="mr-2 h-4 w-4" />
                  {t("dashboard.addMedication")}
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/appointments/add">
                  <Calendar className="mr-2 h-4 w-4" />
                  {t("dashboard.scheduleAppointment")}
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.healthTips")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <AlertCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>{t("dashboard.dailyTip")}</AlertTitle>
                <AlertDescription>{t("dashboard.tipContent")}</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
