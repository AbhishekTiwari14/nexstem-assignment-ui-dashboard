import {
  LayoutDashboard,
  ChartColumnBig,
  User2,
  Mail,
  CalendarDays,
  Settings,
  LogOut,
  X,
} from "lucide-react"
import { useState } from "react"

const links = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Analytics", icon: ChartColumnBig },
  { name: "Contacts", icon: User2 },
  { name: "Mail", icon: Mail },
  { name: "Calendar", icon: CalendarDays },
  { name: "Settings", icon: Settings },
]

type SidebarProps = {
  openSidebar: boolean
  setOpenSidebar: (open: boolean) => void
}

const Sidebar = ({ openSidebar, setOpenSidebar }: SidebarProps) => {
  const [active, setActive] = useState("Dashboard")

  return (
    <>
      {/* Mobile overlay */}
      {openSidebar && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      <aside
        className={`fixed z-50 top-0 left-0 h-screen md:h-full w-full lg:w-56 p-4 bg-[#1a1c1f] transition-transform duration-300 md:relative md:translate-x-0 mr-4
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center mt-2 mb-6 md:hidden">
          <button onClick={() => setOpenSidebar(false)}>
            <X className="w-5 h-5 text-white" />
          </button>
          <button
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm"
            onClick={() => console.log("Log out")}
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>

        <div className="text-2xl mt-24 font-bold text-white mb-12 px-2 flex items-center justify-center md:hidden">
          <p>SPECTRA</p>
        </div>

        <ul className="space-y-2 px-2 md:hidden">
          {links.map(({ name, icon: Icon }) => {
            const isActive = name === active
            return (
              <li key={name}>
                <button
                  onClick={() => setActive(name)}
                  className={`flex w-full items-center gap-3 px-4 py-3 rounded-lg text-md font-medium transition-colors
                    ${
                      isActive
                        ? "bg-[#2d2f34] text-white"
                        : "text-gray-400 hover:text-white hover:bg-[#2d2f34]"
                    }
                  `}
                >
                  <Icon className="w-6 h-6" />
                  <span>{name}</span>
                </button>
              </li>
            )
          })}
        </ul>

        {/* desktop */}
        <div className="hidden md:flex flex-col w-56 h-full">
          {" "}
          <div className="flex flex-col flex-1 justify-between overflow-hidden">
            <ul className="space-y-2 px-2 mt-8 overflow-y-auto">
              {links.map(({ name, icon: Icon }) => {
                const isActive = name === active
                return (
                  <li key={name}>
                    <button
                      onClick={() => setActive(name)}
                      className={`flex w-full items-center gap-3 px-4 py-3 rounded-lg text-md font-medium transition-colors
                ${
                  isActive
                    ? "bg-[#2d2f34] text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#2d2f34]"
                }
              `}
                    >
                      <Icon className="w-6 h-6" />
                      <span>{name}</span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="px-4 py-4 border-t border-[#2d2f34]">
              <button
                className="flex items-center gap-3 text-gray-400 hover:text-white text-sm"
                onClick={() => console.log("Log out")}
              >
                <LogOut className="w-5 h-5" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
