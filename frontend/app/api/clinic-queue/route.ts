import { NextResponse } from "next/server"

// Mock clinics database
const clinics = [
  {
    id: 1,
    name: "Soweto Community Clinic",
    address: "123 Main Road, Soweto",
    phone: "011 123 4567",
    waitTime: "45 minutes",
    openingHours: "8:00 - 17:00",
    services: ["General checkups", "Vaccinations", "TB screening", "HIV testing"],
  },
  {
    id: 2,
    name: "Alexandra Health Center",
    address: "45 Health Street, Alexandra",
    phone: "011 234 5678",
    waitTime: "30 minutes",
    openingHours: "7:30 - 16:30",
    services: ["General checkups", "Maternal care", "Child health", "Chronic medications"],
  },
  {
    id: 3,
    name: "Diepsloot Primary Healthcare",
    address: "78 Community Road, Diepsloot",
    phone: "011 345 6789",
    waitTime: "60 minutes",
    openingHours: "8:00 - 16:00",
    services: ["General checkups", "Emergency care", "Family planning", "HIV/AIDS services"],
  },
  {
    id: 4,
    name: "Tembisa Health Facility",
    address: "12 Hospital Road, Tembisa",
    phone: "011 456 7890",
    waitTime: "40 minutes",
    openingHours: "7:00 - 19:00",
    services: ["General checkups", "Chronic disease management", "Mental health", "Rehabilitation"],
  },
]

// Mock queue claims
const queueClaims = [
  {
    id: "q1",
    clinicId: 1,
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

export async function GET() {
  // Return list of clinics
  return NextResponse.json({ clinics })
}

export async function POST(request: Request) {
  try {
    const { clinicId, name, phone, description, userId } = await request.json()

    if (!clinicId || !name || !phone || !description) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Find the clinic
    const clinic = clinics.find((c) => c.id === Number.parseInt(clinicId))

    if (!clinic) {
      return NextResponse.json({ message: "Clinic not found" }, { status: 404 })
    }

    // Generate queue number
    const prefix = String.fromCharCode(65 + Math.floor(Math.random() * 3)) // A, B, or C
    const number = String(Math.floor(Math.random() * 100)).padStart(3, "0")
    const queueNumber = `${prefix}${number}`

    // Create new claim
    const newClaim = {
      id: `q${queueClaims.length + 1}`,
      clinicId,
      userId,
      name,
      phone,
      description,
      queueNumber,
      status: "waiting",
      estimatedTime: clinic.waitTime,
      createdAt: new Date().toISOString(),
    }

    // Add to mock database
    queueClaims.push(newClaim)

    // Return success
    return NextResponse.json({
      message: "Claim submitted successfully",
      claim: newClaim,
    })
  } catch (error) {
    console.error("Clinic queue error:", error)
    return NextResponse.json({ message: "An error occurred while submitting your claim" }, { status: 500 })
  }
}
