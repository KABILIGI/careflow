import { Search, Bell, User } from 'lucide-react'
import { useApp } from '../App'

function Header() {
  const hour = new Date().getHours()
  let greet = 'Hello'
  if (hour < 12) greet = 'Good morning'
  else if (hour < 18) greet = 'Good afternoon'
  else greet = 'Good evening'

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-r from-primary to-primary-dark text-white shadow-md">
      <div className="max-w-md mx-auto p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">CareFlow</h1>
            <p className="text-xs opacity-90 mt-0.5">{greet}! How are you feeling today?</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
              <Bell size={18} />
            </button>
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium">
              <User size={16} />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-2">
            <Search size={16} className="text-white/90" />
            <input
              aria-label="Search"
              type="search"
              placeholder="Search symptoms, doctors, hospitals..."
              className="flex-1 bg-transparent placeholder-white/80 text-white text-sm focus:outline-none"
            />
            <button className="bg-white text-primary px-3 py-1 rounded-lg text-sm font-semibold">Find</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
