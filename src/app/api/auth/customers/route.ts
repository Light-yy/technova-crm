import { type NextRequest, NextResponse } from "next/server"

// Mock customers data
const mockCustomers = [
  {
    id: "1",
    name: "John Smith",
    email: "john@acme.com",
    phone: "+1-555-0123",
    company: "Acme Corporation",
    status: "active",
    createdAt: "2024-01-15",
    deals: 3,
    totalValue: 45000,
    activities: 12,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@techsolutions.com",
    phone: "+1-555-0124",
    company: "Tech Solutions Ltd",
    status: "active",
    createdAt: "2024-01-14",
    deals: 2,
    totalValue: 30000,
    activities: 8,
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@global.com",
    phone: "+1-555-0125",
    company: "Global Industries",
    status: "prospect",
    createdAt: "2024-01-13",
    deals: 1,
    totalValue: 15000,
    activities: 5,
  },
  {
    id: "4",
    name: "Lisa Brown",
    email: "lisa@startup.com",
    phone: "+1-555-0126",
    company: "Startup Inc",
    status: "active",
    createdAt: "2024-01-12",
    deals: 2,
    totalValue: 25000,
    activities: 7,
  },
  {
    id: "5",
    name: "David Lee",
    email: "david@enterprise.com",
    phone: "+1-555-0127",
    company: "Enterprise Corp",
    status: "inactive",
    createdAt: "2024-01-11",
    deals: 1,
    totalValue: 10000,
    activities: 3,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")

    let filteredCustomers = mockCustomers

    if (search) {
      filteredCustomers = filteredCustomers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(search.toLowerCase()) ||
          customer.email.toLowerCase().includes(search.toLowerCase()) ||
          customer.company?.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (status && status !== "all") {
      filteredCustomers = filteredCustomers.filter((customer) => customer.status === status)
    }

    return NextResponse.json({
      customers: filteredCustomers,
      pagination: {
        page: 1,
        limit: 10,
        total: filteredCustomers.length,
        pages: 1,
      },
    })
  } catch (error) {
    console.error("Get customers error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, phone, company, address, status, source } = data

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Check if customer with email already exists
    const existingCustomer = mockCustomers.find((customer) => customer.email === email)
    if (existingCustomer) {
      return NextResponse.json({ error: "Customer with this email already exists" }, { status: 400 })
    }

    const newCustomer = {
      id: (mockCustomers.length + 1).toString(),
      name,
      email,
      phone: phone || "",
      company: company || "",
      address: address || "",
      status: status || "prospect",
      source: source || "",
      createdAt: new Date().toISOString().split("T")[0],
      deals: 0,
      totalValue: 0,
      activities: 0,
    }

    mockCustomers.push(newCustomer)

    return NextResponse.json(newCustomer, { status: 201 })
  } catch (error) {
    console.error("Create customer error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
