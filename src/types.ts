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
