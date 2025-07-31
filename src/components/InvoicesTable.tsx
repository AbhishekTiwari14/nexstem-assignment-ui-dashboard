import { useEffect, useState } from "react"
import { CircleArrowDown, SlidersHorizontal } from "lucide-react"
import type { InvoiceData } from "../types"
import { fetchData } from "../api/fetchData"

const InvoicesTable = () => {
  const [invoices, setInvoices] = useState<InvoiceData | null>(null)
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData("invoices")
      if (data) setInvoices(data)
    }
    loadData()
  }, [])
  return (
    <div className="rounded-2xl bg-zinc-900 p-6 shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Invoices</h2>
          <p className="text-sm text-zinc-400">
            {invoices?.invoiceCount.toLocaleString()} invoices
          </p>
        </div>
        <button className="flex items-center gap-1 text-sm text-zinc-300 hover:text-white">
          <SlidersHorizontal className="h-4 w-4" />
          <CircleArrowDown className="h-4 w-4" />
          Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-zinc-400 border-b border-zinc-700">
              <th className="py-2">Customer name</th>
              <th className="py-2 hidden lg:table-cell">Date</th>
              <th className="py-2">Amount</th>
              <th className="py-2 hidden lg:table-cell">Product ID</th>
              <th className="py-2 ">Status</th>
              <th className="py-2 hidden lg:table-cell">Option</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {invoices?.list?.map((invoice, idx) => (
              <tr key={idx} className="text-zinc-200">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={invoice.customerImage}
                      alt={invoice.customerName}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="font-medium text-white">
                      {invoice.customerName}
                    </div>
                  </div>
                </td>
                <td className="py-4 hidden lg:table-cell">{invoice.date}</td>
                <td className="py-4">${invoice.amount.toLocaleString()}</td>
                <td className="hidden lg:table-cell">{invoice.productId}</td>
                <td className="py-4 hidden lg:table-cell">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium bg-slate-950 ${
                      invoice.status === "Paid" ? "text-white" : "text-red-400"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="py-4">
                  <button className="text-indigo-400 hover:underline text-sm">
                    More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InvoicesTable
