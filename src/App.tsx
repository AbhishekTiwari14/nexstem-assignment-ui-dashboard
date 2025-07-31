import "./index.css"
import Header from "./components/Header"
import { useState } from "react"
import Sidebar from "./components/Sidebar"
import ProfitChart from "./components/ProfitChart"
import SalesReportChart from "./components/SalesReportChart"
import AnalyticalAiChart from "./components/AnalyticalAiChart"
import InvoicesTable from "./components/InvoicesTable"

function App() {
  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <div className="flex flex-col h-full w-full bg-[#1a1c1f] ">
      <Header onToggleSidebar={() => setOpenSidebar((prev) => !prev)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 w-full">
            <ProfitChart />
            <SalesReportChart />
            <AnalyticalAiChart />
            <div className="lg:col-span-2" >
            <InvoicesTable />
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default App
