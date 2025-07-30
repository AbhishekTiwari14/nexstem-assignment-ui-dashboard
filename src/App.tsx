import "./index.css"
import Header from "./components/Header"
import { useState } from "react"
import Sidebar from "./components/Sidebar"

function App() {
  const [openSidebar, setOpenSidebar] = useState(false)
  return (
    <div className="flex flex-col h-screen w-full bg-[#1a1c1f]">
      <Header onToggleSidebar={() => setOpenSidebar((prev) => !prev)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      </div>
    </div>
  )
}

export default App
