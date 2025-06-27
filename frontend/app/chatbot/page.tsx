"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Send, User, Bot, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useTranslation } from "@/lib/translations"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotPage() {
  const { t } = useTranslation()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: t("chatbot.welcome"),
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!input.trim()) return

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call to a language model
      // For demo purposes, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a response based on the user's message
      const botResponse = generateBotResponse(input)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      console.error("Error sending message:", err)
      setError("Failed to get a response. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Simple response generation based on keywords
  // In a real app, this would be replaced with an actual AI model API call
  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello! How can I assist with your health questions today?"
    }

    if (input.includes("headache") || (input.includes("head") && input.includes("pain"))) {
      return "Headaches can be caused by various factors including stress, dehydration, lack of sleep, or eye strain. For occasional headaches, rest, hydration, and over-the-counter pain relievers may help. If headaches are severe, persistent, or accompanied by other symptoms, please consult a healthcare provider."
    }

    if (input.includes("fever") || input.includes("temperature")) {
      return "Fever is often a sign that your body is fighting an infection. Rest, stay hydrated, and take fever-reducing medication if needed. If the fever is high (above 39°C/102°F), persists for more than three days, or is accompanied by severe symptoms, please seek medical attention."
    }

    if (input.includes("cough") || input.includes("cold") || input.includes("flu")) {
      return "For coughs, colds, and flu-like symptoms, rest and hydration are important. Over-the-counter medications can help manage symptoms. If you have difficulty breathing, chest pain, or symptoms that worsen or don't improve after a week, please consult a healthcare provider."
    }

    if (input.includes("tb") || input.includes("tuberculosis")) {
      return "Tuberculosis (TB) is a serious bacterial infection that mainly affects the lungs. Symptoms include persistent cough (often with blood), chest pain, fatigue, weight loss, fever, and night sweats. If you suspect TB, it's important to get tested at a clinic. TB is treatable with antibiotics, but the full course of treatment must be completed."
    }

    if (input.includes("hiv") || input.includes("aids")) {
      return "HIV is a virus that attacks the immune system. Early testing and treatment are crucial. With proper antiretroviral therapy (ART), people with HIV can live long, healthy lives. If you're concerned about HIV, please visit a clinic for confidential testing and counseling."
    }

    if (input.includes("clinic") || input.includes("doctor") || input.includes("hospital")) {
      return "If you need to visit a clinic, you can use our Clinic Queue feature to find nearby clinics and join the queue remotely. This can help reduce your waiting time. Would you like me to help you find a clinic near you?"
    }

    if (input.includes("medicine") || input.includes("medication") || input.includes("pill")) {
      return "It's important to take medications as prescribed by your healthcare provider. Our app can help you set up medication reminders. If you have questions about specific medications, please consult your healthcare provider or pharmacist."
    }

    if (input.includes("thank")) {
      return "You're welcome! If you have any other health questions, feel free to ask. I'm here to help."
    }

    // Default response
    return "I understand you're asking about health information. For more specific guidance, could you provide more details about your question or concern? I'm here to help with health information, but remember I'm not a replacement for professional medical advice."
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-6 w-6 text-green-600 mr-2" />
            {t("chatbot.title")}
          </CardTitle>
          <CardDescription>{t("chatbot.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t("common.error")}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 h-[400px] overflow-y-auto mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-green-100 text-green-600">AI</AvatarFallback>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  </Avatar>
                )}

                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${message.sender === "user" ? "text-green-100" : "text-muted-foreground"}`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>

                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 ml-2">
                    <AvatarFallback className="bg-slate-200">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start mb-4 justify-start">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-green-100 text-green-600">AI</AvatarFallback>
                </Avatar>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2">
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <p className="text-sm">{t("chatbot.thinking")}</p>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder={t("chatbot.placeholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          <p>{t("chatbot.disclaimer")}</p>
        </CardFooter>
      </Card>
    </div>
  )
}
