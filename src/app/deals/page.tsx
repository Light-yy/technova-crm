"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, ArrowRight, ArrowLeft, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Deal {
  id: string
  title: string
  value: number
  stage: string
  probability: number
  closeDate?: string
  customer: {
    id: string
    name: string
    email: string
    company?: string
  }
}

const stages = [
  { key: "lead", label: "Lead", color: "bg-red-100 text-red-800" },
  { key: "qualified", label: "Qualified", color: "bg-yellow-100 text-yellow-800" },
  { key: "proposal", label: "Proposal", color: "bg-blue-100 text-blue-800" },
  { key: "negotiation", label: "Negotiation", color: "bg-purple-100 text-purple-800" },
  { key: "closed_won", label: "Closed Won", color: "bg-green-100 text-green-800" },
  { key: "closed_lost", label: "Closed Lost", color: "bg-gray-100 text-gray-800" },
]

const mockDeals: Deal[] = [
  {
    id: "1",
    title: "ERP System Implementation",
    value: 25000,
    stage: "proposal",
    probability: 75,
    closeDate: "2024-03-15",
    customer: { id: "1", name: "John Smith", email: "john@acme.com", company: "Acme Corp" },
  },
  {
    id: "2",
    title: "CRM Integration Project",
    value: 15000,
    stage: "qualified",
    probability: 60,
    closeDate: "2024-02-28",
    customer: { id: "2", name: "Sarah Johnson", email: "sarah@tech.com", company: "Tech Solutions" },
  },
  {
    id: "3",
    title: "WMS Consultation",
    value: 8000,
    stage: "lead",
    probability: 25,
    closeDate: "2024-04-10",
    customer: { id: "3", name: "Mike Wilson", email: "mike@global.com", company: "Global Industries" },
  },
  {
    id: "4",
    title: "Cloud Migration",
    value: 35000,
    stage: "negotiation",
    probability: 80,
    closeDate: "2024-03-01",
    customer: { id: "4", name: "Lisa Brown", email: "lisa@startup.com", company: "Startup Inc" },
  },
  {
    id: "5",
    title: "Security Audit",
    value: 12000,
    stage: "closed_won",
    probability: 100,
    closeDate: "2024-01-20",
    customer: { id: "5", name: "David Lee", email: "david@enterprise.com", company: "Enterprise Corp" },
  },
]

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>(mockDeals)

  const moveToNextStage = (dealId: string, currentStage: string) => {
    const currentIndex = stages.findIndex((s) => s.key === currentStage)
    if (currentIndex < stages.length - 2) {
      const nextStage = stages[currentIndex + 1].key
      setDeals(deals.map((deal) => (deal.id === dealId ? { ...deal, stage: nextStage } : deal)))
    }
  }

  const getStageDeals = (stageKey: string) => {
    return deals.filter((deal) => deal.stage === stageKey)
  }

  const getStageValue = (stageKey: string) => {
    return getStageDeals(stageKey).reduce((sum, deal) => sum + deal.value, 0)
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
              <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sales Pipeline</h1>
                <p className="text-sm text-gray-600">{deals.length} deals in pipeline</p>
              </div>
            </div>
            <Link href="/deals/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Deal
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pipeline Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pipeline Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {stages.map((stage) => {
                const stageDeals = getStageDeals(stage.key)
                const stageValue = getStageValue(stage.key)

                return (
                  <div key={stage.key} className="text-center">
                    <div className="text-2xl font-bold">{stageDeals.length}</div>
                    <div className="text-sm text-gray-600">{stage.label}</div>
                    <div className="text-lg font-semibold text-green-600">${stageValue.toLocaleString()}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Board */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {stages.map((stage) => {
            const stageDeals = getStageDeals(stage.key)

            return (
              <div key={stage.key} className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900">{stage.label}</h3>
                  <p className="text-sm text-gray-500">
                    {stageDeals.length} deals • ${getStageValue(stage.key).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-3 min-h-96">
                  {stageDeals.map((deal) => (
                    <Card key={deal.id} className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm line-clamp-2">{deal.title}</h4>
                          {stage.key !== "closed_won" && stage.key !== "closed_lost" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => moveToNextStage(deal.id, deal.stage)}
                              className="h-6 w-6 p-0 ml-2"
                            >
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-green-600 font-semibold">
                              <DollarSign className="h-3 w-3 mr-1" />
                              {deal.value.toLocaleString()}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {deal.probability}%
                            </Badge>
                          </div>

                          <div className="text-xs text-gray-600">
                            <div className="font-medium">{deal.customer.name}</div>
                            {deal.customer.company && <div>{deal.customer.company}</div>}
                          </div>

                          {deal.closeDate && (
                            <div className="text-xs text-gray-500">
                              Close: {new Date(deal.closeDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {stageDeals.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      <p className="text-sm">No deals in this stage</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
