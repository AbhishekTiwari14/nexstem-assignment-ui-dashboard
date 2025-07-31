import { useEffect, useState } from "react"
import { fetchData } from "../api/fetchData"
import type { AnalyticalAi } from "../types"
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
  type DotProps,
} from "recharts"

const AnalyticalAiChart = () => {
  const [analyticalData, setAnalyticalData] = useState<AnalyticalAi | null>(
    null
  )
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData("analyticalAI")
      if (data) setAnalyticalData(data)
    }
    loadData()
  }, [])

  const maxEntry = analyticalData?.data.reduce((max, item) =>
    item.value > max.value ? item : max
  )

  return (
    <div className="rounded-2xl bg-[#2e2f39] text-white p-4 w-full max-w-[320px] shadow-md">
      <h2 className="text-md font-semibold">Analytical AI</h2>
      <p className="text-sm text-gray-400 mb-2">{analyticalData?.period}</p>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={analyticalData?.data}
            margin={{ top: 0, right: 0, left: -20 }}
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
                const isMax = payload.value === maxEntry?.day
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
              fill={maxEntry?.value ? "#ffffff" : "#a1a1aa"}
            />
            <YAxis
              tickFormatter={(val: number) =>
                val >= 1000 ? `${val / 1000}k` : `${val}`
              }
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#cbd5e1", fontSize: 12 }}
            />

            <ReferenceLine
              x={maxEntry?.day}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={10}
              ifOverflow="discard"
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={(props) => (
                <MaxValueDot {...props} maxEntryValue={maxEntry?.value} />
              )}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AnalyticalAiChart

interface CustomDotProps extends DotProps {
  payload?: {
    value: number
  }
  maxEntryValue?: number 
}

const MaxValueDot = ({ cx, cy, payload, maxEntryValue }: CustomDotProps) => {
  if (payload?.value !== maxEntryValue) {
    return null
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill="white"
      stroke="#60a5fa"
      strokeWidth={3}
    />
  )
}
