"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, TrendingUp, Activity, Plus, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Analytics {
  totalCustomers: number
  activeCustomers: number
  totalDeals: number
  closedDeals: number
  totalValue: number
  closedValue: number
  conversionRate: number
  avgDealSize: number
}

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<Analytics>({
    totalCustomers: 15,
    activeCustomers: 12,
    totalDeals: 8,
    closedDeals: 3,
    totalValue: 125000,
    closedValue: 45000,
    conversionRate: 37.5,
    avgDealSize: 15625,
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TechNova CRM</h1>
                <p className="text-sm text-gray-600">Customer Relationship Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/customers">
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Customers
                </Button>
              </Link>
              <Link href="/deals">
                <Button variant="outline">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Deals
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">{analytics.activeCustomers} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalDeals}</div>
              <p className="text-xs text-muted-foreground">{analytics.closedDeals} closed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics.totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">${analytics.closedValue.toLocaleString()} closed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">Avg deal: ${analytics.avgDealSize.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Deals by Stage */}
          <Card>
            <CardHeader>
              <CardTitle>Deals by Stage</CardTitle>
              <CardDescription>Current pipeline distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { stage: "Lead", count: 2, value: 25000 },
                  { stage: "Qualified", count: 3, value: 45000 },
                  { stage: "Proposal", count: 2, value: 35000 },
                  { stage: "Closed Won", count: 3, value: 45000 },
                ].map((stage) => (
                  <div key={stage.stage} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span>{stage.stage}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{stage.count} deals</div>
                      <div className="text-sm text-gray-500">${stage.value.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest customer interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, subject: "Called Acme Corp", customer: "John Smith", date: "2024-01-15" },
                  { id: 2, subject: "Email sent to Tech Solutions", customer: "Sarah Johnson", date: "2024-01-14" },
                  { id: 3, subject: "Meeting scheduled", customer: "Mike Wilson", date: "2024-01-13" },
                  { id: 4, subject: "Proposal sent", customer: "Lisa Brown", date: "2024-01-12" },
                  { id: 5, subject: "Deal closed", customer: "David Lee", date: "2024-01-11" },
                ].map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.subject}</p>
                      <p className="text-xs text-gray-500">
                        {activity.customer} • {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/customers/new">
                <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <Plus className="h-6 w-6" />
                  <span>Add Customer</span>
                </Button>
              </Link>
              <Link href="/deals/new">
                <Button
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  variant="outline"
                >
                  <Plus className="h-6 w-6" />
                  <span>Create Deal</span>
                </Button>
              </Link>
              <Link href="/customers">
                <Button
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  variant="outline"
                >
                  <Users className="h-6 w-6" />
                  <span>View All Customers</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
