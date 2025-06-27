"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useTranslation } from "@/lib/translations"

export default function AddAppointmentPage() {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [forMember, setForMember] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { t } = useTranslation()

  // Mock family members for the select dropdown
  const familyMembers = [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Mary Smith" },
    { id: "3", name: "David Smith" },
    { id: "4", name: "Sarah Smith" },
  ]

  // Mock clinics for the select dropdown
  const clinics = [
    { id: "1", name: "Soweto Community Clinic" },
    { id: "2", name: "Alexandra Health Center" },
    { id: "3", name: "Diepsloot Primary Healthcare" },
    { id: "4", name: "Tembisa Health Facility" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess(true)

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (err: any) {
      console.error("Error scheduling appointment:", err)
      setError(err.message || "An error occurred while scheduling the appointment")
    } finally {
      setIsLoading(false)
    }
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

      <Card className="max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Schedule Appointment</CardTitle>
          <CardDescription>Schedule a new healthcare appointment</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>Appointment has been scheduled. Redirecting to dashboard...</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Appointment Type</Label>
              <Input
                id="title"
                placeholder="e.g., General Checkup"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select clinic" />
                </SelectTrigger>
                <SelectContent>
                  {clinics.map((clinic) => (
                    <SelectItem key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="forMember">For Family Member</Label>
              <Select value={forMember} onValueChange={setForMember}>
                <SelectTrigger>
                  <SelectValue placeholder="Select family member" />
                </SelectTrigger>
                <SelectContent>
                  {familyMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information for the healthcare provider"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !title || !date || !time || !location || !forMember}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? "Scheduling..." : "Schedule Appointment"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
