"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, Calendar, Edit, FileText, Pill, Stethoscope, User } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/lib/translations"

type FamilyMember = {
  id: string
  name: string
  age: number
  gender: string
  relationship: string
  healthStatus: string
  bloodType?: string
  allergies?: string[]
  chronicConditions?: string[]
  medications?: {
    id: string
    name: string
    dosage: string
    frequency: string
  }[]
  appointments?: {
    id: string
    title: string
    date: string
    location: string
    status: string
  }[]
  healthRecords?: {
    id: string
    date: string
    type: string
    description: string
  }[]
}

export default function FamilyMemberPage() {
  const [member, setMember] = useState<FamilyMember | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { memberId } = useParams()
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock family member data
        const mockMember: FamilyMember = {
          id: "1",
          name: "John Smith",
          age: 45,
          gender: "Male",
          relationship: "Self",
          healthStatus: "Good",
          bloodType: "O+",
          allergies: ["Penicillin", "Pollen"],
          chronicConditions: ["Hypertension"],
          medications: [
            {
              id: "med1",
              name: "Lisinopril",
              dosage: "10mg",
              frequency: "Once daily",
            },
            {
              id: "med2",
              name: "Aspirin",
              dosage: "81mg",
              frequency: "Once daily",
            },
          ],
          appointments: [
            {
              id: "apt1",
              title: "Blood Pressure Check",
              date: "2023-06-15",
              location: "Soweto Community Clinic",
              status: "upcoming",
            },
            {
              id: "apt2",
              title: "Annual Physical",
              date: "2023-04-10",
              location: "Alexandra Health Center",
              status: "completed",
            },
          ],
          healthRecords: [
            {
              id: "rec1",
              date: "2023-04-10",
              type: "Check-up",
              description: "Annual physical examination. Blood pressure slightly elevated at 140/90.",
            },
            {
              id: "rec2",
              date: "2023-01-22",
              type: "Lab Test",
              description: "Cholesterol test. Total: 195, HDL: 45, LDL: 130, Triglycerides: 150.",
            },
          ],
        }

        // Check if the requested member exists
        if (memberId === "1") {
          setMember(mockMember)
        } else {
          throw new Error("Family member not found")
        }
      } catch (err: any) {
        console.error("Error fetching family member:", err)
        setError(err.message || "Failed to load family member details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMemberDetails()
  }, [memberId])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>{t("common.loading")}</p>
      </div>
    )
  }

  if (error || !member) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("common.error")}</AlertTitle>
          <AlertDescription>{error || "Family member not found"}</AlertDescription>
        </Alert>
      </div>
    )
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
            <User className="h-8 w-8 text-green-600 dark:text-green-300" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{member.name}</h1>
            <p className="text-muted-foreground">
              {member.age} {t("common.yearsOld")} • {member.relationship} • {member.gender}
            </p>
          </div>
        </div>
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href={`/family/${member.id}/edit`}>
            <Edit className="h-4 w-4 mr-2" />
            {t("common.edit")}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Stethoscope className="h-5 w-5 mr-2 text-green-600" />
              Health Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Current Status</p>
                <p className="text-lg">{member.healthStatus}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Blood Type</p>
                <p className="text-lg">{member.bloodType || "Not recorded"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-amber-600" />
              Allergies & Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Allergies</p>
                {member.allergies && member.allergies.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {member.allergies.map((allergy, index) => (
                      <li key={index}>{allergy}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No known allergies</p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">Chronic Conditions</p>
                {member.chronicConditions && member.chronicConditions.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {member.chronicConditions.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No chronic conditions</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Pill className="h-5 w-5 mr-2 text-blue-600" />
              Current Medications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {member.medications && member.medications.length > 0 ? (
              <ul className="space-y-2">
                {member.medications.map((medication) => (
                  <li key={medication.id} className="border-b pb-2 last:border-0 last:pb-0">
                    <p className="font-medium">{medication.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {medication.dosage} • {medication.frequency}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No current medications</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="appointments" className="mb-6">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="appointments">
            <Calendar className="h-4 w-4 mr-2" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="records">
            <FileText className="h-4 w-4 mr-2" />
            Health Records
          </TabsTrigger>
        </TabsList>
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Appointments</CardTitle>
                <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                  <Link href="/appointments/add">Schedule New</Link>
                </Button>
              </div>
              <CardDescription>Past and upcoming medical appointments</CardDescription>
            </CardHeader>
            <CardContent>
              {member.appointments && member.appointments.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Upcoming</h3>
                  <div className="space-y-2">
                    {member.appointments
                      .filter((apt) => apt.status === "upcoming")
                      .map((appointment) => (
                        <div key={appointment.id} className="flex items-start space-x-4 pb-4 border-b last:border-0">
                          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                          </div>
                          <div>
                            <h4 className="font-medium">{appointment.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(appointment.date)} • {appointment.location}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>

                  <h3 className="text-sm font-medium mt-6">Past</h3>
                  <div className="space-y-2">
                    {member.appointments
                      .filter((apt) => apt.status === "completed")
                      .map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-start space-x-4 pb-4 border-b last:border-0 opacity-70"
                        >
                          <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div>
                            <h4 className="font-medium">{appointment.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(appointment.date)} • {appointment.location}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <p className="text-center py-4 text-muted-foreground">No appointments found</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="records">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Health Records</CardTitle>
                <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                  <Link href={`/family/${member.id}/records/add`}>Add Record</Link>
                </Button>
              </div>
              <CardDescription>Medical history and health records</CardDescription>
            </CardHeader>
            <CardContent>
              {member.healthRecords && member.healthRecords.length > 0 ? (
                <div className="space-y-4">
                  {member.healthRecords.map((record) => (
                    <div key={record.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{record.type}</h4>
                        <span className="text-sm text-muted-foreground">{formatDate(record.date)}</span>
                      </div>
                      <p className="text-sm">{record.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-muted-foreground">No health records found</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
