import { useState, useEffect, createContext, useContext } from 'react'
import Home from './pages/Home'
import Symptoms from './pages/Symptoms'
import Appointments from './pages/Appointments'
import Profile from './pages/Profile'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import OfflineIndicator from './components/OfflineIndicator'

export const AppContext = createContext()

export function useApp() {
  return useContext(AppContext)
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isOnline, setIsOnline] = useState(true)
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'General Physician',
      date: '2026-05-02',
      time: '10:00 AM',
      hospital: 'City Medical Center',
      status: 'confirmed'
    }
  ])
  const [symptoms, setSymptoms] = useState([])
  const [followUps, setFollowUps] = useState([
    { id: 1, title: 'Take medication', time: '8:00 AM', done: false },
    { id: 2, title: 'Rest and hydrate', time: 'All day', done: false },
    { id: 3, title: 'Follow-up call', time: '3:00 PM', done: false }
  ])

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const addAppointment = (appointment) => {
    setAppointments([...appointments, { ...appointment, id: Date.now() }])
  }

  const addSymptom = (symptom) => {
    setSymptoms([...symptoms, { ...symptom, id: Date.now() }])
  }

  const toggleFollowUp = (id) => {
    setFollowUps(followUps.map(f => 
      f.id === id ? { ...f, done: !f.done } : f
    ))
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'symptoms':
        return <Symptoms />
      case 'appointments':
        return <Appointments />
      case 'profile':
        return <Profile />
      default:
        return <Home />
    }
  }

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      isOnline,
      appointments,
      addAppointment,
      symptoms,
      addSymptom,
      followUps,
      toggleFollowUp
    }}>
      <div className="min-h-screen bg-background pb-28">
        <Header />
        {!isOnline && <OfflineIndicator />}
        <main className="animate-fade-in pt-24">
          {renderPage()}
        </main>
        <BottomNav />
      </div>
    </AppContext.Provider>
  )
}

export default App