import { type NextRequest, NextResponse } from "next/server"

// Mock user data for demo
const DEMO_USER = {
  id: "demo-user-id",
  email: "demo@technova.com",
  password: "demo123",
  name: "Demo User",
  role: "admin",
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Simple demo authentication
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      const response = NextResponse.json({
        user: {
          id: DEMO_USER.id,
          email: DEMO_USER.email,
          name: DEMO_USER.name,
          role: DEMO_USER.role,
        },
      })

      // Set a simple session cookie
      response.cookies.set("auth-token", "demo-session-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return response
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
