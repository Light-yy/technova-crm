import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create demo user
  const hashedPassword = await bcrypt.hash("demo123", 12)

  const user = await prisma.user.upsert({
    where: { email: "demo@technova.com" },
    update: {},
    create: {
      email: "demo@technova.com",
      name: "Demo User",
      password: hashedPassword,
      role: "admin",
    },
  })

  // Create demo customers
  const customers = await Promise.all([
    prisma.customer.upsert({
      where: { email: "john@acme.com" },
      update: {},
      create: {
        name: "John Smith",
        email: "john@acme.com",
        phone: "+1-555-0123",
        company: "Acme Corporation",
        address: "123 Business St, New York, NY",
        status: "active",
        source: "website",
        assignedTo: user.id,
      },
    }),
    prisma.customer.upsert({
      where: { email: "sarah@techsolutions.com" },
      update: {},
      create: {
        name: "Sarah Johnson",
        email: "sarah@techsolutions.com",
        phone: "+1-555-0124",
        company: "Tech Solutions Ltd",
        address: "456 Innovation Ave, San Francisco, CA",
        status: "active",
        source: "referral",
        assignedTo: user.id,
      },
    }),
    prisma.customer.upsert({
      where: { email: "mike@global.com" },
      update: {},
      create: {
        name: "Mike Wilson",
        email: "mike@global.com",
        phone: "+1-555-0125",
        company: "Global Industries",
        address: "789 Corporate Blvd, Chicago, IL",
        status: "prospect",
        source: "cold_call",
        assignedTo: user.id,
      },
    }),
  ])

  // Create demo deals
  await Promise.all([
    prisma.deal.create({
      data: {
        title: "ERP System Implementation",
        value: 25000,
        stage: "proposal",
        probability: 75,
        closeDate: new Date("2024-03-15"),
        description: "Complete ERP system setup and migration",
        customerId: customers[0].id,
        assignedTo: user.id,
      },
    }),
    prisma.deal.create({
      data: {
        title: "CRM Integration Project",
        value: 15000,
        stage: "qualified",
        probability: 60,
        closeDate: new Date("2024-02-28"),
        description: "CRM system integration with existing tools",
        customerId: customers[1].id,
        assignedTo: user.id,
      },
    }),
    prisma.deal.create({
      data: {
        title: "WMS Consultation",
        value: 8000,
        stage: "lead",
        probability: 25,
        closeDate: new Date("2024-04-10"),
        description: "Warehouse management system consultation",
        customerId: customers[2].id,
        assignedTo: user.id,
      },
    }),
  ])

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })