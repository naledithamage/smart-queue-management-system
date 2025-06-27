"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertCircle, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, BookOpen } from "lucide-react"
import { useParams } from "next/navigation"

function HealthInfoContent() {
  const [topic, setTopic] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { topicId } = useParams()

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        // In a real app, this would be an API call with the topicId
        // For demo purposes, we'll use mock data

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock health topics
        const mockTopics = [
          {
            id: "tb",
            title: "Tuberculosis (TB)",
            description: "Information about TB symptoms, prevention, and treatment",
            content: `
              <h2>What is Tuberculosis?</h2>
              <p>Tuberculosis (TB) is a bacterial infection that primarily affects the lungs. It is caused by Mycobacterium tuberculosis and can spread from person to person through the air.</p>
              
              <h2>Symptoms</h2>
              <ul>
                <li>Persistent cough that lasts more than 3 weeks</li>
                <li>Coughing up blood or mucus</li>
                <li>Chest pain, or pain with breathing or coughing</li>
                <li>Unintentional weight loss</li>
                <li>Fatigue</li>
                <li>Fever</li>
                <li>Night sweats</li>
                <li>Chills</li>
                <li>Loss of appetite</li>
              </ul>
              
              <h2>Prevention</h2>
              <ul>
                <li>BCG vaccination for children</li>
                <li>Early detection and treatment</li>
                <li>Good ventilation in homes and workplaces</li>
                <li>Covering mouth when coughing or sneezing</li>
              </ul>
              
              <h2>Treatment</h2>
              <p>TB is treated with antibiotics for at least 6 months. It's essential to complete the full course of treatment. Directly Observed Treatment (DOT) may be used to ensure medication adherence.</p>
              
              <h2>When to Seek Help</h2>
              <p>If you have been experiencing a cough for more than 3 weeks, especially if you're coughing up blood, or if you have been in contact with someone with TB, you should visit a healthcare facility for testing.</p>
            `,
          },
          {
            id: "hiv",
            title: "HIV/AIDS",
            description: "Resources for HIV prevention, testing, and management",
            content: `
              <h2>What is HIV/AIDS?</h2>
              <p>HIV (Human Immunodeficiency Virus) is a virus that attacks the body's immune system. If not treated, it can lead to AIDS (Acquired Immunodeficiency Syndrome).</p>
              
              <h2>Symptoms</h2>
              <p>Many people don't have symptoms in the early stages. Some may experience flu-like symptoms within 2-4 weeks after infection. Later symptoms include weight loss, fever, night sweats, and fatigue.</p>
              
              <h2>Prevention</h2>
              <ul>
                <li>Using condoms during sex</li>
                <li>Not sharing needles</li>
                <li>Pre-exposure prophylaxis (PrEP) for high-risk individuals</li>
                <li>Post-exposure prophylaxis (PEP) within 72 hours of potential exposure</li>
              </ul>
              
              <h2>Testing</h2>
              <p>Regular testing is recommended for those at risk. Home testing kits are available, and free testing is available at many clinics.</p>
              
              <h2>Treatment</h2>
              <p>Antiretroviral therapy (ART) can control the virus. With proper treatment, people with HIV can live long, healthy lives. Treatment also prevents transmission to others.</p>
              
              <h2>Living with HIV</h2>
              <p>With proper medical care, people with HIV can live normal, healthy lives. It's important to take medications as prescribed, attend regular medical appointments, and maintain a healthy lifestyle.</p>
            `,
          },
          {
            id: "malaria",
            title: "Malaria",
            description: "Prevention and treatment of malaria in endemic areas",
            content: `
              <h2>What is Malaria?</h2>
              <p>Malaria is a serious disease caused by a parasite that is transmitted through the bite of infected mosquitoes.</p>
              
              <h2>Symptoms</h2>
              <ul>
                <li>Fever</li>
                <li>Chills</li>
                <li>Headache</li>
                <li>Nausea and vomiting</li>
                <li>Muscle pain and fatigue</li>
              </ul>
              
              <h2>Prevention</h2>
              <ul>
                <li>Use insecticide-treated bed nets</li>
                <li>Apply mosquito repellent</li>
                <li>Wear long-sleeved clothing</li>
                <li>Take antimalarial medications when traveling to endemic areas</li>
                <li>Eliminate standing water where mosquitoes breed</li>
              </ul>
              
              <h2>Treatment</h2>
              <p>Early diagnosis and treatment is critical. Treatment includes antimalarial medications and supportive care for complications.</p>
              
              <h2>When to Seek Help</h2>
              <p>If you develop a fever within a few weeks of being in a malaria-endemic area, seek medical attention immediately. Early treatment is essential to prevent serious complications.</p>
            `,
          },
          {
            id: "common-illnesses",
            title: "Common Illnesses",
            description: "Information about common illnesses and self-care",
            content: `
              <h2>Common Illnesses</h2>
              <p>Common illnesses include colds, flu, diarrhea, and minor infections. Many can be managed at home with proper care.</p>
              
              <h2>Cold and Flu</h2>
              <ul>
                <li>Rest and stay hydrated</li>
                <li>Over-the-counter medications for symptom relief</li>
                <li>Wash hands frequently to prevent spread</li>
              </ul>
              
              <h2>Diarrhea</h2>
              <ul>
                <li>Stay hydrated with water and electrolyte solutions</li>
                <li>Eat bland foods</li>
                <li>Seek medical attention if severe or persistent</li>
              </ul>
              
              <h2>Fever</h2>
              <ul>
                <li>Rest and stay cool</li>
                <li>Take appropriate fever reducers</li>
                <li>Seek medical attention for high or persistent fevers</li>
              </ul>
              
              <h2>When to Seek Medical Help</h2>
              <ul>
                <li>Symptoms persist or worsen after several days</li>
                <li>High fever (above 39°C/102°F)</li>
                <li>Difficulty breathing</li>
                <li>Severe pain</li>
                <li>Confusion or unusual drowsiness</li>
              </ul>
            `,
          },
          {
            id: "medications",
            title: "Medications Guide",
            description: "Information about common medications and proper usage",
            content: `
              <h2>Proper Medication Use</h2>
              <p>Proper medication use is important for effective treatment and to avoid complications.</p>
              
              <h2>General Guidelines</h2>
              <ul>
                <li>Always follow prescription instructions</li>
                <li>Complete the full course of antibiotics</li>
                <li>Store medications properly</li>
                <li>Check expiration dates</li>
                <li>Don't share prescription medications</li>
              </ul>
              
              <h2>Common Medications</h2>
              <ul>
                <li>Painkillers: Paracetamol, ibuprofen</li>
                <li>Antibiotics: Only use when prescribed for bacterial infections</li>
                <li>Antimalarials: Follow dosing schedule exactly</li>
                <li>ARVs: Take consistently at the same time each day</li>
              </ul>
              
              <h2>Side Effects</h2>
              <p>All medications can have side effects. Report severe side effects to a healthcare provider. Don't stop medication without consulting a healthcare provider.</p>
              
              <h2>Medication Storage</h2>
              <p>Store medications in a cool, dry place away from direct sunlight. Keep all medications out of reach of children. Dispose of expired medications properly.</p>
            `,
          },
          {
            id: "preventive-care",
            title: "Preventive Care",
            description: "Tips for staying healthy and preventing illness",
            content: `
              <h2>Preventive Care</h2>
              <p>Preventive care helps you stay healthy and catch potential health problems early.</p>
              
              <h2>Vaccinations</h2>
              <ul>
                <li>Keep vaccinations up to date for all family members</li>
                <li>Follow the recommended childhood vaccination schedule</li>
                <li>Get seasonal flu vaccines</li>
              </ul>
              
              <h2>Regular Check-ups</h2>
              <ul>
                <li>Annual health examinations</li>
                <li>Regular blood pressure checks</li>
                <li>TB screening in high-risk areas</li>
                <li>HIV testing as recommended</li>
              </ul>
              
              <h2>Healthy Lifestyle</h2>
              <ul>
                <li>Balanced diet rich in fruits and vegetables</li>
                <li>Regular physical activity</li>
                <li>Adequate sleep</li>
                <li>Stress management</li>
                <li>Avoid smoking and limit alcohol</li>
              </ul>
              
              <h2>Hygiene</h2>
              <ul>
                <li>Regular handwashing</li>
                <li>Safe food preparation</li>
                <li>Clean drinking water</li>
                <li>Proper waste disposal</li>
              </ul>
            `,
          },
        ]

        const foundTopic = mockTopics.find((t) => t.id === topicId)

        if (!foundTopic) {
          throw new Error("Topic not found")
        }

        setTopic(foundTopic)
      } catch (err) {
        console.error("Error fetching topic:", err)
        setError("Failed to load health information")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopic()
  }, [topicId])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading health information...</p>
      </div>
    )
  }

  if (error || !topic) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || "Topic not found"}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button asChild variant="outline">
            <Link href="/health-info">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Health Information
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link href="/health-info">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Health Information
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center mb-2">
            <BookOpen className="h-6 w-6 text-green-600 mr-2" />
            <CardTitle>{topic.title}</CardTitle>
          </div>
          <CardDescription>{topic.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: topic.content }} />
        </CardContent>
      </Card>
    </div>
  )
}

export default function HealthInfoPage() {
  return <HealthInfoContent />
}
