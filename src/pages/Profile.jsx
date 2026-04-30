import { useState } from 'react'
import { User, Settings, Bell, Shield, HelpCircle, ChevronRight, CheckCircle, Circle, Clock, Pill, Activity, FileText, Star, Phone, Mail, MapPin, Calendar } from 'lucide-react'
import { useApp } from '../App'

const menuItems = [
  { id: 'profile', label: 'Personal Information', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
  { id: 'security', label: 'Privacy & Security', icon: Shield },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const medications = [
  { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: '3 times daily', days: 7, taken: 2 },
  { id: 2, name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', days: 5, taken: 1 },
]

const recoveryTips = [
  { id: 1, title: 'Rest', description: 'Get plenty of sleep to help your body recover', icon: '😴' },
  { id: 2, title: 'Hydrate', description: 'Drink at least 8 glasses of water daily', icon: '💧' },
  { id: 3, title: 'Light Activity', description: 'Take short walks to improve circulation', icon: '🚶' },
  { id: 4, title: 'Healthy Food', description: 'Eat nutritious meals to boost immunity', icon: '🥗' },
]

function Profile() {
  const { followUps, toggleFollowUp, appointments } = useApp()
  const [activeTab, setActiveTab] = useState('profile')

  const completedTasks = followUps.filter(f => f.done).length

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Profile</h1>
        <p className="text-slate-500 mt-1">Manage your health journey</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {['profile', 'followup', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-primary text-white'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {tab === 'profile' ? 'Profile' : tab === 'followup' ? 'Follow-up Care' : 'History'}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="animate-fade-in">
          {/* User Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User size={32} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">John Doe</h2>
                <p className="text-sm text-slate-500">john.doe@email.com</p>
                <p className="text-sm text-slate-500">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {menuItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  className={`w-full p-4 flex items-center justify-between transition-smooth hover:bg-slate-50 ${
                    idx < menuItems.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <span className="font-medium text-slate-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight size={20} className="text-slate-400" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Follow-up Care Tab */}
      {activeTab === 'followup' && (
        <div className="animate-fade-in">
          {/* Progress Card */}
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-4 text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Today's Progress</h3>
                <p className="text-white/80 text-sm">{completedTasks} of {followUps.length} tasks completed</p>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
                  <circle 
                    cx="32" cy="32" r="28" 
                    stroke="white" 
                    strokeWidth="4" 
                    fill="none"
                    strokeDasharray={176}
                    strokeDashoffset={176 - (176 * completedTasks / followUps.length)}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                  {Math.round(completedTasks / followUps.length * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Today's Tasks */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">Today's Tasks</h2>
            <div className="space-y-2">
              {followUps.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleFollowUp(task.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    task.done 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-slate-200 bg-white hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.done 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-slate-300'
                    }`}>
                      {task.done && <CheckCircle size={14} className="text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${task.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-slate-500">{task.time}</p>
                    </div>
                    <Clock size={18} className={task.done ? 'text-green-500' : 'text-slate-400'} />
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Medications */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">Medications</h2>
            <div className="space-y-3">
              {medications.map((med) => (
                <div key={med.id} className="bg-white rounded-xl p-4 border border-slate-100">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Pill size={20} className="text-primary" />
                      <h3 className="font-semibold text-slate-800">{med.name}</h3>
                    </div>
                    <span className="text-sm text-slate-500">{med.dosage}</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-2">{med.frequency}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(med.taken / med.days) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{med.taken}/{med.days} days</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recovery Tips */}
          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">Recovery Tips</h2>
            <div className="grid grid-cols-2 gap-3">
              {recoveryTips.map((tip) => (
                <div key={tip.id} className="bg-white rounded-xl p-4 border border-slate-100">
                  <span className="text-2xl mb-2 block">{tip.icon}</span>
                  <h3 className="font-semibold text-slate-800 text-sm">{tip.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{tip.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="animate-fade-in">
          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">Appointment History</h2>
            {appointments.length > 0 ? (
              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div key={apt.id} className="bg-white rounded-xl p-4 border border-slate-100">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-800">{apt.doctor}</h3>
                        <p className="text-sm text-slate-500">{apt.specialty}</p>
                      </div>
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                        Completed
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {apt.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {apt.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center border border-slate-100">
                <FileText size={48} className="text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No appointment history yet</p>
              </div>
            )}
          </section>

          {/* Feedback Section */}
          <section className="mt-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">Rate Your Experience</h2>
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <p className="text-sm text-slate-500 mb-3">How was your last hospital visit?</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} className="p-1">
                    <Star size={32} className="text-yellow-400 fill-yellow-400" />
                  </button>
                ))}
              </div>
              <button className="w-full mt-3 bg-primary/10 text-primary py-2 rounded-lg text-sm font-medium">
                Submit Feedback
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default Profile