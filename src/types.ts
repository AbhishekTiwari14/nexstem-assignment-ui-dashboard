export type Profit = {
  value?: number
  percentageChange?: number
  period?: string
}

export type Invoice = {
  customerName: string
  customerImage: ""
  date: string
  amount: number
  productId: string
  status: "Paid" | "Unpaid"
}

export type SalesReportDataPoint = {
  day: string
  value: number
}

export type SalesReport = {
  earnings: string
  period: string
  data: SalesReportDataPoint[]
}
