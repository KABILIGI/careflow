import { Home, Heart, Calendar, User } from 'lucide-react'
import { useApp } from '../App'

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'symptoms', label: 'Symptoms', icon: Heart },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'profile', label: 'Profile', icon: User },
]

function BottomNav() {
  const { currentPage, setCurrentPage, symptoms } = useApp()

  const unreadSymptoms = symptoms.filter(s => !s.read).length

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-md bg-white/90 backdrop-blur-sm border border-slate-200/40 rounded-2xl px-3 py-2 shadow-lg z-40">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          const showBadge = item.id === 'symptoms' && unreadSymptoms > 0

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-2 rounded-xl transition-smooth relative ${
                isActive ? 'text-primary' : 'text-slate-600'
              }`}
            >
              <div className="relative flex items-center justify-center w-10 h-10">
                <Icon 
                  size={22} 
                  className={isActive ? 'text-primary' : 'text-slate-500'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {showBadge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                    {unreadSymptoms}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav