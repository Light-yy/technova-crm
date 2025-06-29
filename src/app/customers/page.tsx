"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, Plus, Phone, Mail, Building, Calendar, Edit, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: string
  createdAt: string
  deals: number
  totalValue: number
  activities: number
}

const mockCustomers: Customer[] = [
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

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)
      if (statusFilter !== "all") params.append("status", statusFilter)

      const response = await fetch(`/api/customers?${params}`)
      if (!response.ok) {
        throw new Error("Failed to fetch customers")
      }

      const data = await response.json()
      setCustomers(data.customers)
    } catch (error) {
      console.error("Error fetching customers:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [searchTerm, statusFilter])

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const deleteCustomer = (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "prospect":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
                <p className="text-sm text-gray-600">{filteredCustomers.length} customers total</p>
              </div>
            </div>
            <Link href="/customers/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search customers by name, email, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Customer List */}
        <div className="grid gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-xl">{customer.name}</CardTitle>
                      <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {customer.email}
                      </div>
                      {customer.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {customer.phone}
                        </div>
                      )}
                      {customer.company && (
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          {customer.company}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Joined {new Date(customer.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/customers/${customer.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteCustomer(customer.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{customer.deals}</div>
                      <div className="text-sm text-gray-500">Deals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">${customer.totalValue.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">Total Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{customer.activities}</div>
                      <div className="text-sm text-gray-500">Activities</div>
                    </div>
                  </div>
                  <Link href={`/customers/${customer.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search criteria"
                  : "Get started by adding your first customer"}
              </p>
              <Link href="/customers/new">
                <Button>Add Customer</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
