import { Banknote, EllipsisVertical } from "lucide-react"
import { useEffect, useState } from "react"
import type { Profit } from "../types"
import { fetchData } from "../api/fetchData"

const ProfitChart = () => {
  const [profitData, setProfitData] = useState<Profit | null>(null)
  useEffect(() => {
    const loadData = async () => {
      const profit = await fetchData("profit")
      if (profit) setProfitData(profit)
    }
    loadData()
  }, [])
  return (
    <div className="relative w-full h-[350px] rounded-2xl overflow-hidden">
      <img
        src="./profitChartImage.svg"
        alt="Background"
        className="w-full h-full object-cover"
      />

      <div className="absolute top-6 w-full text-black">
        <div className="flex justify-between items-center px-6">
          <div className="flex gap-2 items-center">
            <div className="bg-white rounded-md p-2.5">
              <Banknote className="w-6 h-6 text-black" />
            </div>
            <p className="text-2xl font-bold">Profit</p>
          </div>
          <EllipsisVertical className="w-5 h-5 text-black hover:cursor-pointer" />
        </div>
      </div>

      <div className="absolute bottom-8 text-black px-4">
        <p className="text-sm">
          <span className="font-bold">+{profitData?.percentageChange}% </span>
          {profitData?.period}
        </p>
        <p className="text-4xl font-bold">
          $
          {profitData?.value && profitData.value > 1000
            ? Math.floor(profitData.value / 1000) +
              " " +
              (profitData.value % 1000)
            : profitData?.value}
        </p>
      </div>
    </div>
  )
}

export default ProfitChart
