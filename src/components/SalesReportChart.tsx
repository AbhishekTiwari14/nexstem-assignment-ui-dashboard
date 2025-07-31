import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts"
import { ChevronDown } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import type { SalesReport } from "../types"
import { fetchData } from "../api/fetchData"

type ReportItem = { day: string; value: number }
type TabType = keyof SalesReport // "earnings" | "payments"

const SalesReportChart = () => {
  const [salesData, setSalesData] = useState<SalesReport | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>("earnings")
  const [maxDay, setMaxDay] = useState<string | null>(null)
  const [inView, setInView] = useState(false)

  // Load data
  useEffect(() => {
    const loadData = async () => {
      const sales = await fetchData("salesReport")
      if (sales) setSalesData(sales)
    }
    loadData()
  }, [])

  // Memoize chart data (prevents effect churn)
  const chartData: ReportItem[] = useMemo(() => {
    if (!salesData) return []
    return salesData[activeTab]
  }, [salesData, activeTab])

  // Compute max day when data changes
  useEffect(() => {
    if (chartData.length > 0) {
      const maxEntry = chartData.reduce(
        (prev: ReportItem, current: ReportItem) =>
          current.value > prev.value ? current : prev
      )
      setMaxDay(maxEntry.day)
    } else {
      setMaxDay(null)
    }
  }, [chartData])

  // Animate when chart enters viewport
  const chartRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = chartRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect() // run once
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="rounded-2xl shadow-md p-6 h-[350px] bg-[#2e2f39] text-white w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Sales Report</h2>
          <div className="flex gap-4 text-sm mt-1">
            <button
              className={`pb-1 transition-colors hover:cursor-pointer ${
                activeTab === "earnings" ? "**:text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("earnings")}
            >
              Earnings
            </button>
            <button
              className={`pb-1 transition-colors hover:cursor-pointer ${
                activeTab === "payments" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("payments")}
            >
              Payments
            </button>
          </div>
        </div>
        <button className="flex items-center gap-1 text-sm text-gray-300 bg-[#2c2c2c] px-3 py-1 rounded-lg">
          Week
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Chart */}
      <div ref={chartRef} className="h-[calc(350px-88px)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            key={inView ? "animate" : "initial"}
            data={chartData}
            margin={{ top: 0, right: 0, left: -30, bottom: 20 }}
          >
            <CartesianGrid
              stroke="#4e5258"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={({ x, y, payload }) => {
                const isMax = payload.value === maxDay
                return (
                  <text
                    x={x}
                    y={y + 10}
                    textAnchor="middle"
                    fill={isMax ? "#ffffff" : "#a1a1aa"}
                    fontSize={12}
                  >
                    {payload.value}
                  </text>
                )
              }}
            />
            <YAxis
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val: number) =>
                val >= 1000 ? `${val / 1000}k` : `${val}`
              }
            />
            <Tooltip />
            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              barSize={10} // <<< thinner bars
              isAnimationActive={inView} // animate only when in view
              animationBegin={0}
              animationDuration={900}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.day === maxDay ? "#fb923c" : "#4e5258"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SalesReportChart
