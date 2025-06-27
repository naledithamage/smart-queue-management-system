"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, BookOpen, WormIcon as Virus, Shield, Pill, Thermometer, Droplets, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function HealthInfo() {
  const [healthTopics, setHealthTopics] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [relatedTopic, setRelatedTopic] = useState<any | null>(null)

  // Map topic IDs to icons
  const topicIcons: Record<string, any> = {
    tb: { icon: Virus, color: "text-orange-600" },
    hiv: { icon: Shield, color: "text-red-600" },
    malaria: { icon: Droplets, color: "text-blue-600" },
    "common-illnesses": { icon: Thermometer, color: "text-purple-600" },
    medications: { icon: Pill, color: "text-green-600" },
    "preventive-care": { icon: Shield, color: "text-teal-600" },
  }

  // Fetch health topics on component mount
  useEffect(() => {
    const fetchHealthTopics = async () => {
      try {
        const response = await fetch("/api/health-info")
        if (!response.ok) {
          throw new Error("Failed to fetch health topics")
        }
        const data = await response.json()
        setHealthTopics(data.topics || [])
      } catch (err) {
        console.error("Error fetching health topics:", err)
        setError("Failed to load health information. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchHealthTopics()
  }, [])

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsSubmitting(true)
    setAnswer(null)
    setRelatedTopic(null)
    setError(null)

    try {
      const response = await fetch("/api/health-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        throw new Error("Failed to get answer")
      }

      const data = await response.json()
      setAnswer(data.answer)
      setRelatedTopic(data.relatedTopic)
    } catch (err) {
      console.error("Error getting answer:", err)
      setError("Failed to process your question. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickQuestion = (quickQuestion: string) => {
    setQuestion(quickQuestion)
    // Submit the question automatically
    const event = { preventDefault: () => {} } as React.FormEvent
    handleQuestionSubmit(event)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Health Information Resources</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Educational resources about common health conditions relevant to your community
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <p>Loading health information...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthTopics.map((topic) => {
            const topicIcon = topicIcons[topic.id] || { icon: BookOpen, color: "text-gray-600" }
            const IconComponent = topicIcon.icon

            return (
              <Card key={topic.id} className="flex flex-col">
                <CardHeader>
                  <IconComponent className={`h-8 w-8 ${topicIcon.color} mb-2`} />
                  <CardTitle>{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Symptoms and signs</span>
                    </li>
                    <li className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Prevention methods</span>
                    </li>
                    <li className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Treatment options</span>
                    </li>
                    <li className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>When to seek help</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/health-info/${topic.id}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}

      <div className="mt-16 bg-slate-50 dark:bg-slate-900 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Health Information Assistant</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about your health? Our AI assistant can provide information about common health topics.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Ask a Health Question</CardTitle>
              <CardDescription>Get information about symptoms, prevention, and general health topics</CardDescription>
            </CardHeader>
            <CardContent>
              {answer ? (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Answer:</h3>
                  <p className="p-4 bg-slate-50 dark:bg-slate-800 rounded-md">{answer}</p>

                  {relatedTopic && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Related Topic:</h4>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/health-info/${relatedTopic.id}`}>
                          Learn more about {relatedTopic.title} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col space-y-4 mb-6">
                  <Button
                    variant="outline"
                    className="justify-start text-left h-auto py-3"
                    onClick={() => handleQuickQuestion("What are the early symptoms of tuberculosis?")}
                  >
                    What are the early symptoms of tuberculosis?
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start text-left h-auto py-3"
                    onClick={() => handleQuickQuestion("How can I prevent malaria?")}
                  >
                    How can I prevent malaria?
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start text-left h-auto py-3"
                    onClick={() => handleQuickQuestion("What should I do if I think I've been exposed to HIV?")}
                  >
                    What should I do if I think I've been exposed to HIV?
                  </Button>
                </div>
              )}

              <form onSubmit={handleQuestionSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your health question here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting || !question.trim()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? "Thinking..." : "Ask"}
                  </Button>
                </div>
              </form>
            </CardContent>
            {answer && (
              <CardFooter>
                <Button
                  onClick={() => {
                    setAnswer(null)
                    setRelatedTopic(null)
                    setQuestion("")
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Ask Another Question
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
