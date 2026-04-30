import { useState } from 'react'
import { Phone, Calendar, Activity, ChevronRight, Clock, MapPin, Heart, Wind, Brain, Bone, Eye, Ear } from 'lucide-react'
import { useApp } from '../App'

const quickActions = [
  { id: 'emergency', label: 'Emergency Call', icon: Phone, color: 'bg-red-500', textColor: 'text-white' },
  { id: 'symptoms', label: 'Check Symptoms', icon: Activity, color: 'bg-primary-light/20', textColor: 'text-primary-dark' },
  { id: 'book', label: 'Book Appointment', icon: Calendar, color: 'bg-orange-100', textColor: 'text-secondary' },
  { id: 'directions', label: 'Hospital Directions', icon: MapPin, color: 'bg-blue-100', textColor: 'text-blue-600' },
]

const healthTips = [
  { id: 1, title: 'Stay Hydrated', description: 'Drink at least 8 glasses of water daily' },
  { id: 2, title: 'Rest Well', description: 'Aim for 7-8 hours of sleep each night' },
  { id: 3, title: 'Light Exercise', description: 'Take a 15-minute walk today' },
]

const bodyAreas = [
  { id: 'head', label: 'Head', icon: Brain },
  { id: 'eyes', label: 'Eyes', icon: Eye },
  { id: 'ears', label: 'Ears', icon: Ear },
  { id: 'chest', label: 'Chest', icon: Heart },
  { id: 'lungs', label: 'Lungs', icon: Wind },
  { id: 'bones', label: 'Bones', icon: Bone },
]

function Home() {
  const { appointments, setCurrentPage, followUps } = useApp()
  const [tipIndex, setTipIndex] = useState(0)

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % healthTips.length)
  }

  const upcomingAppointment = appointments[0]

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Good morning! 👋</h1>
        <p className="text-slate-500 mt-1">How can we help you today?</p>
      </header>

      {/* Emergency Button */}
      <button className="w-full bg-red-500 text-white py-4 rounded-xl flex items-center justify-center gap-3 mb-6 shadow-lg shadow-red-500/30 transition-smooth hover:bg-red-600 active:scale-[0.98]">
        <Phone size={24} fill="white" />
        <span className="text-lg font-semibold">Emergency: Call 911</span>
      </button>

      {/* Quick Actions */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.id}
                onClick={() => {
                  if (action.id === 'symptoms') setCurrentPage('symptoms')
                  else if (action.id === 'book' || action.id === 'directions') setCurrentPage('appointments')
                }}
                className={`${action.color} ${action.textColor} p-4 rounded-xl text-left transition-smooth active:scale-[0.98]`}
              >
                <Icon size={24} className="mb-2" />
                <span className="font-medium text-sm">{action.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Upcoming Appointment */}
      {upcomingAppointment && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Upcoming Appointment</h2>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-slate-800">{upcomingAppointment.doctor}</h3>
                <p className="text-sm text-slate-500">{upcomingAppointment.specialty}</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                {upcomingAppointment.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {upcomingAppointment.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {upcomingAppointment.time}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm text-slate-500">{upcomingAppointment.hospital}</span>
              <button className="text-primary font-medium text-sm flex items-center gap-1">
                View Details <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Body Area Selector */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Where does it hurt?</h2>
        <div className="flex flex-wrap gap-2">
          {bodyAreas.map((area) => {
            const Icon = area.icon
            return (
              <button
                key={area.id}
                onClick={() => setCurrentPage('symptoms')}
                className="bg-white px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-2 transition-smooth hover:border-primary hover:shadow-sm"
              >
                <Icon size={20} className="text-primary" />
                <span className="text-sm font-medium text-slate-700">{area.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Health Tips Carousel */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Health Tips</h2>
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{healthTips[tipIndex].title}</h3>
              <p className="text-white/80 text-sm mt-1">{healthTips[tipIndex].description}</p>
            </div>
            <button 
              onClick={nextTip}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center transition-smooth hover:bg-white/30"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            {healthTips.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === tipIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Today's Follow-ups */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Today's Tasks</h2>
        <div className="space-y-2">
          {followUps.slice(0, 3).map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-xl p-4 border transition-smooth ${
                task.done ? 'border-green-200 bg-green-50' : 'border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  task.done ? 'border-green-500 bg-green-500' : 'border-slate-300'
                }`}>
                  {task.done && <span className="text-white text-xs">✓</span>}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${task.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                    {task.title}
                  </p>
                  <p className="text-xs text-slate-500">{task.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home