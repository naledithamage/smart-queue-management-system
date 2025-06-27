"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Common symptoms for the checkbox selection
const commonSymptoms = [
  "Fever",
  "Cough",
  "Headache",
  "Sore throat",
  "Fatigue",
  "Shortness of breath",
  "Muscle aches",
  "Runny nose",
  "Nausea",
  "Diarrhea",
  "Vomiting",
  "Loss of taste or smell",
  "Rash",
  "Joint pain",
]

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) => {
      if (prev.includes(symptom)) {
        return prev.filter((s) => s !== symptom)
      } else {
        return [...prev, symptom]
      }
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/symptom-checker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms,
          selectedSymptoms,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze symptoms")
      }

      const data = await response.json()
      setResults(data.predictions)
      setSubmitted(true)
    } catch (err) {
      console.error("Error analyzing symptoms:", err)
      setError("An error occurred while analyzing your symptoms. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setSymptoms("")
    setSelectedSymptoms([])
    setResults([])
    setSubmitted(false)
    setError(null)
  }

  const needsMedicalAttention = results.some((result) => result.seekMedicalAttention && result.likelihood > 20)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Symptom Checker</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!submitted ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Describe Your Symptoms</CardTitle>
              <CardDescription>Please describe what you're experiencing in detail</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="E.g., I've had a headache for two days, along with a mild fever and sore throat..."
                className="min-h-[150px]"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Symptoms</CardTitle>
              <CardDescription>Select all symptoms that apply to you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {commonSymptoms.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptom}
                      checked={selectedSymptoms.includes(symptom)}
                      onCheckedChange={() => handleSymptomToggle(symptom)}
                    />
                    <Label htmlFor={symptom}>{symptom}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <Button
              onClick={handleSubmit}
              disabled={isLoading || (symptoms.trim() === "" && selectedSymptoms.length === 0)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isLoading ? "Analyzing Symptoms..." : "Check Symptoms"}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-8">
            {needsMedicalAttention ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Medical Attention Recommended</AlertTitle>
                <AlertDescription>
                  Based on your symptoms, we recommend seeking medical attention. Please contact your healthcare
                  provider or visit a clinic.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Symptom Analysis Complete</AlertTitle>
                <AlertDescription>
                  Based on your symptoms, here are the most likely conditions. Remember, this is not a medical
                  diagnosis.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            {results.map((result, index) => (
              <Card
                key={index}
                className={result.seekMedicalAttention && result.likelihood > 20 ? "border-red-300" : ""}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{result.illness}</CardTitle>
                    <span className="text-sm font-medium">{result.likelihood}% match</span>
                  </div>
                  <Progress value={result.likelihood} className="h-2" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">Severity:</span>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        result.severity === "Low"
                          ? "bg-green-100 text-green-800"
                          : result.severity === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {result.severity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.recommendation}</p>

                  {result.seekMedicalAttention && result.likelihood > 20 && (
                    <div className="mt-4 flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950 rounded-md">
                      <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                      <p className="text-sm text-red-600">Medical attention recommended for this condition.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-4">
            <Button onClick={resetForm} variant="outline" className="w-full">
              Check Different Symptoms
            </Button>
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <a href="/clinic-queue">Connect with a Clinic</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
