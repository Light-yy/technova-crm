import { type NextRequest, NextResponse } from "next/server"

// Mock customers data (same as in route.ts)
const mockCustomers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    company: "Acme Corp",
    address: "123 Main St",
    status: "active",
    source: "web",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    company: "Beta Inc",
    address: "456 Oak Ave",
    status: "inactive",
    source: "email",
  },
  {
    id: "3",
    name: "David Lee",
    email: "david.lee@example.com",
    phone: "555-123-4567",
    company: "Gamma Ltd",
    address: "789 Pine Ln",
    status: "pending",
    source: "phone",
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const customer = mockCustomers.find((c) => c.id === params.id)

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    return NextResponse.json(customer)
  } catch (error) {
    console.error("Get customer error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const { name, email, phone, company, address, status, source } = data

    const customerIndex = mockCustomers.findIndex((c) => c.id === params.id)
    if (customerIndex === -1) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    mockCustomers[customerIndex] = {
      ...mockCustomers[customerIndex],
      name,
      email,
      phone,
      company,
      address,
      status,
      source,
    }

    return NextResponse.json(mockCustomers[customerIndex])
  } catch (error) {
    console.error("Update customer error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const customerIndex = mockCustomers.findIndex((c) => c.id === params.id)
    if (customerIndex === -1) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    mockCustomers.splice(customerIndex, 1)
    return NextResponse.json({ message: "Customer deleted successfully" })
  } catch (error) {
    console.error("Delete customer error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
