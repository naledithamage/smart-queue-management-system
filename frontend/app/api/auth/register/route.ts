import { NextResponse } from "next/server"

// Mock user database
const users = [
  {
    id: "1",
    email: "family@example.com",
    password: "password123", // In a real app, this would be hashed
    familyName: "Smith Family",
    phone: "0712345678",
  },
]

export async function POST(request: Request) {
  try {
    const { familyName, email, password, phone } = await request.json()

    // Check if email already exists
    if (users.some((u) => u.email === email)) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: `${users.length + 1}`,
      email,
      password, // In a real app, this would be hashed
      familyName,
      phone,
    }

    // Add to mock database
    users.push(newUser)

    // Return success
    return NextResponse.json({
      message: "Registration successful",
      user: {
        id: newUser.id,
        email: newUser.email,
        familyName: newUser.familyName,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 })
  }
}
