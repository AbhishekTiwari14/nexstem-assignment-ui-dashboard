export type Profit = {
  value: number
  percentageChange: number
  period: string
}

export type Invoice = {
  customerName: string
  customerImage: ""
  date: string
  amount: number
  productId: string
  status: "Paid" | "Unpaid"
}

export type InvoiceData = {
  invoiceCount: number
  list: Invoice[]
}

export type SalesReportDataPoint = {
  day: string
  value: number
}

export type SalesReport = {
  earnings: SalesReportDataPoint[]
  payments: SalesReportDataPoint[]
}

export type AnalyticalAi = {
  period: string
  data: SalesReportDataPoint[]
}

export type ActivityStats = {
  transactions: number
  sales: number
  payouts: number
  reports: number
}

export type ActivityData = {
  percentageChange: number
  period: string
  progressValue: number
  stats: ActivityStats
}
