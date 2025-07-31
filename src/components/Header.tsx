import { Menu, Search, Moon, Bell } from "lucide-react"

const Header = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  return (
    <header className="w-full p-4 md:p-8 flex items-center justify-between">
      {/* phone */}
      <button
        className="lg:hidden **:p-2 rounded-md hover:bg-white/5 transition"
        onClick={onToggleSidebar}
      >
        <Menu size={36} className="text-white" />
      </button>
      {/* Desktop */}
      <span className="hidden lg:inline text-xl font-bold text-white pl-8 pr-32 text-center">
        SPECTRA
      </span>
      <span className="hidden lg:inline text-2xl font-bold text-white">
        Overview
      </span>
      <div className="mx-auto hidden lg:flex items-center rounded-md px-4 py-3 w-full max-w-md border border-transparent focus-within:border-white transition">
        <Search size={20} className="text-white mr-4" />
        <input
          type="text"
          placeholder="Search here..."
          className="bg-transparent text-white placeholder:text-gray-400 outline-none w-full"
        />
      </div>
      <div className="flex items-center gap-2 lg:pr-4 lg:gap-4">
        <button className="lg:hidden **:p-2 border border-white/10 rounded-md transition">
          <Search size={36} className="text-white" />
        </button>
        <button className="**:p-2 border border-white/10 rounded-md hover:bg-white/5 transition">
          <Moon size={36} className="text-white" />
        </button>
        <button className="**:p-2 border border-white/10 rounded-md hover:bg-white/5 transition">
          <Bell size={36} className="text-white" />
        </button>
        <img
          src="https://i.pravatar.cc/40?img=12"
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </header>
  )
}

export default Header
