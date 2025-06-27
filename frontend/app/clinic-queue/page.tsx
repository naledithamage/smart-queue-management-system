"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, AlertCircle, Clock, MapPin, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useTranslation } from "@/lib/translations"

export default function ClinicQueue() {
  const [activeTab, setActiveTab] = useState("submit")
  const [selectedClinic, setSelectedClinic] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [activeClaims, setActiveClaims] = useState<any[]>([])
  const [queueNumber, setQueueNumber] = useState("")
  const [clinics, setClinics] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()

  // Fetch clinics and active claims on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch clinics
        const clinicsResponse = await fetch("/api/clinic-queue")
        if (!clinicsResponse.ok) {
          throw new Error("Failed to fetch clinics")
        }
        const clinicsData = await clinicsResponse.json()
        setClinics(clinicsData.clinics || [])

        // Fetch active claims (in a real app, this would be user-specific)
        // For demo purposes, we'll use mock data
        const mockClaims = [
          {
            id: "q1",
            clinicId: 1,
            clinicName: "Soweto Community Clinic",
            userId: "user123",
            name: "John Smith",
            phone: "071 234 5678",
            description: "Persistent cough and fever",
            queueNumber: "A001",
            status: "waiting",
            estimatedTime: "45 minutes",
            createdAt: "2023-05-15T08:30:00Z",
          },
        ]
        setActiveClaims(mockClaims)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/clinic-queue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clinicId: selectedClinic,
          name,
          phone,
          description,
          userId: "user123", // Mock user ID for demo
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit claim")
      }

      const data = await response.json()

      // Add clinic name to the claim for display purposes
      const selectedClinicObj = clinics.find((c) => c.id === Number(selectedClinic))
      const newClaim = {
        ...data.claim,
        clinicName: selectedClinicObj ? selectedClinicObj.name : "Unknown Clinic",
      }

      setActiveClaims([...activeClaims, newClaim])
      setQueueNumber(newClaim.queueNumber)
      setSubmitted(true)
      setActiveTab("active")

      // Reset form
      setSelectedClinic("")
      setName("")
      setPhone("")
      setDescription("")
    } catch (err) {
      console.error("Error submitting claim:", err)
      setError("Failed to submit your claim. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancelClaim = async (claimId: string) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll just update the local state
      setActiveClaims(activeClaims.filter((claim) => claim.id !== claimId))
    } catch (err) {
      console.error("Error canceling claim:", err)
      setError("Failed to cancel your claim. Please try again.")
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Clinic Queue Management</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="submit" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="submit">Submit Claim</TabsTrigger>
          <TabsTrigger value="active">
            Active Claims
            {activeClaims.length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                {activeClaims.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="submit">
          {!submitted ? (
            <Card>
              <CardHeader>
                <CardTitle>Submit a Claim to a Local Clinic</CardTitle>
                <CardDescription>
                  Fill out this form to submit your health concern to a local clinic and receive a queue number
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="clinic">Select Clinic</Label>
                  {isLoading ? (
                    <p className="text-sm text-muted-foreground">Loading clinics...</p>
                  ) : (
                    <Select value={selectedClinic} onValueChange={setSelectedClinic}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a clinic" />
                      </SelectTrigger>
                      <SelectContent>
                        {clinics.map((clinic) => (
                          <SelectItem key={clinic.id} value={clinic.id.toString()}>
                            {clinic.name} - {clinic.address}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Describe Your Health Concern</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe your symptoms or health concern"
                    className="min-h-[120px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !selectedClinic || !name || !phone || !description}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Submitting..." : "Submit Claim"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 bg-green-100 dark:bg-green-900 h-16 w-16 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-300" />
                </div>
                <CardTitle>Claim Submitted Successfully!</CardTitle>
                <CardDescription>
                  Your claim has been submitted to the clinic and you've been added to the queue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Your Queue Number</h3>
                  <p className="text-3xl font-bold text-green-600">{queueNumber}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  You can check your queue status in the "Active Claims" tab. We'll also send updates to your phone.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={() => setActiveTab("active")} className="bg-green-600 hover:bg-green-700">
                  View Active Claims
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Your Active Claims</CardTitle>
              <CardDescription>Track the status of your submitted claims and queue positions</CardDescription>
            </CardHeader>
            <CardContent>
              {activeClaims.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You don't have any active claims</p>
                  <Button onClick={() => setActiveTab("submit")} variant="outline" className="mt-4">
                    Submit a New Claim
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {activeClaims.map((claim) => (
                    <Card key={claim.id} className="border-green-200 dark:border-green-800">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg flex items-center">
                              <span className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 px-2 py-1 rounded-md text-sm mr-2">
                                {claim.queueNumber}
                              </span>
                              {claim.clinicName}
                            </h3>
                            <p className="text-sm text-muted-foreground">Submitted on {formatDate(claim.createdAt)}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                            onClick={() => handleCancelClaim(claim.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium">Patient</p>
                            <p>{claim.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Contact</p>
                            <p>{claim.phone}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium">Health Concern</p>
                          <p className="text-sm">{claim.description}</p>
                        </div>

                        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-amber-500 mr-2" />
                            <span className="text-sm">Estimated wait time: {claim.estimatedTime}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-green-600 mr-2" />
                            <span className="text-sm">{claim.clinicName}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
