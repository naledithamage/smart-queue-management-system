import { NextResponse } from "next/server"

// Mock user database
const users = [
  {
    id: "1",
    email: "family@example.com",
    password: "password123", // In a real app, this would be hashed
    familyName: "Smith Family",
  },
]

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Find user by email
    const user = users.find((u) => u.email === email)

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // In a real app, you would use a proper authentication system
    // and generate a JWT token here
    const token = "mock-jwt-token-" + Date.now()

    // Return user data and token
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        familyName: user.familyName,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "An error occurred during login" }, { status: 500 })
  }
}
