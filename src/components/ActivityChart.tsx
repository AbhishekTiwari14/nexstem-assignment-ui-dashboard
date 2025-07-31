import { useEffect, useRef, useState } from "react"
import { PieChart, Pie, Cell } from "recharts"
import type { ActivityData, ActivityStats } from "../types"
import { fetchData } from "../api/fetchData"

const COLORS = {
  transactions: "#A5B4FC",
  sales: "#E5E7EB",
  payouts: "#FDBA74",
  reports: "#FB923C",
}

const ActivityChart = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)
  const [activity, setActivity] = useState<ActivityData | null>(null)
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData("activity")
      if (data) setActivity(data)
    }
    loadData()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.9 }
    )

    if (chartRef.current) observer.observe(chartRef.current)
    return () => observer.disconnect()
  }, [])

  if (!activity) return <div className="text-white">Loading...</div>

  const chartData = Object.entries(activity.stats).map(([key, value]) => ({
    name: key,
    value,
    color: COLORS[key as keyof ActivityStats],
  }))

  return (
    <div
      ref={chartRef}
      className="bg-zinc-900 p-6 rounded-2xl shadow-md w-full max-w-sm text-white"
    >
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Activity</h2>
        <button className="text-white/70 text-xl">⋮</button>
      </div>

      <div className="relative flex justify-center">
        <div
          className={`transition-transform ${
            animate ? "animate-rotateOnce" : ""
          }`}
        >
          <PieChart width={200} height={200}>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>

        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
          <div className="text-4xl font-semibold">
            +{activity.percentageChange}%
          </div>
          <div className="text-xs text-gray-400">{activity.period}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-6 text-sm text-gray-300">
        {chartData.map((entry, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2 capitalize">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </div>
            <span className="text-gray-400 ml-2">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityChart
