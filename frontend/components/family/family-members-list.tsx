"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Plus, User } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { useTranslation } from "@/lib/translations"

type FamilyMember = {
  id: string
  name: string
  age: number
  relationship: string
  healthStatus: string
}

export default function FamilyMembersList() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        const mockMembers: FamilyMember[] = [
          {
            id: "1",
            name: "John Smith",
            age: 45,
            relationship: "Self",
            healthStatus: "Good",
          },
          {
            id: "2",
            name: "Mary Smith",
            age: 42,
            relationship: "Spouse",
            healthStatus: "Good",
          },
          {
            id: "3",
            name: "David Smith",
            age: 15,
            relationship: "Child",
            healthStatus: "Good",
          },
          {
            id: "4",
            name: "Sarah Smith",
            age: 12,
            relationship: "Child",
            healthStatus: "Good",
          },
        ]

        setFamilyMembers(mockMembers)
      } catch (err) {
        console.error("Error fetching family members:", err)
        setError("Failed to load family members")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFamilyMembers()
  }, [])

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

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{t("dashboard.familyMembers")}</h3>
        <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
          <Link href="/family/add">
            <Plus className="h-4 w-4 mr-1" />
            {t("dashboard.addMember")}
          </Link>
        </Button>
      </div>

      {familyMembers.length === 0 ? (
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-muted-foreground">{t("dashboard.noFamilyMembers")}</p>
            <Button asChild className="mt-4 bg-green-600 hover:bg-green-700">
              <Link href="/family/add">
                <Plus className="h-4 w-4 mr-1" />
                {t("dashboard.addFirstMember")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {familyMembers.map((member) => (
            <Link key={member.id} href={`/family/${member.id}`}>
              <Card className="cursor-pointer hover:border-green-200 transition-colors">
                <CardContent className="p-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
                    <User className="h-5 w-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {member.age} {t("common.yearsOld")} • {member.relationship}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
