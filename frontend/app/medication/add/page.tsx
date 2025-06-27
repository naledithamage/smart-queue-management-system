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
import { useTranslation } from "@/lib/translations"

export default function AddMedicationPage() {
  const [name, setName] = useState("")
  const [dosage, setDosage] = useState("")
  const [frequency, setFrequency] = useState("")
  const [time, setTime] = useState("")
  const [forMember, setForMember] = useState("")
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
      console.error("Error adding medication:", err)
      setError(err.message || "An error occurred while adding the medication")
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
          <CardTitle className="text-2xl font-bold">Add Medication</CardTitle>
          <CardDescription>Set up a new medication reminder</CardDescription>
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
              <AlertDescription>Medication has been added. Redirecting to dashboard...</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Medication Name</Label>
              <Input
                id="name"
                placeholder="e.g., Paracetamol"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                placeholder="e.g., 500mg"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once">Once daily</SelectItem>
                  <SelectItem value="twice">Twice daily</SelectItem>
                  <SelectItem value="three">Three times daily</SelectItem>
                  <SelectItem value="four">Four times daily</SelectItem>
                  <SelectItem value="as-needed">As needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
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
          </form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !name || !dosage || !frequency || !time || !forMember}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? "Adding..." : "Add Medication"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
