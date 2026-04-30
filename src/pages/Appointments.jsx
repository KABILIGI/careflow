import { useState } from 'react'
import { Calendar, Clock, MapPin, Phone, ChevronRight, ChevronLeft, Star, User, CheckCircle, Building, Navigation, PhoneCall, FileText, Pill, Activity } from 'lucide-react'
import { useApp } from '../App'

const doctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Physician', rating: 4.8, experience: '15 years', hospital: 'City Medical Center', image: null },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Internal Medicine', rating: 4.9, experience: '12 years', hospital: 'Metro Hospital', image: null },
  { id: 3, name: 'Dr. Emily Williams', specialty: 'Pediatrics', rating: 4.7, experience: '10 years', hospital: 'Children\'s Health Center', image: null },
  { id: 4, name: 'Dr. James Wilson', specialty: 'Cardiology', rating: 4.9, experience: '20 years', hospital: 'Heart Care Institute', image: null },
  { id: 5, name: 'Dr. Lisa Brown', specialty: 'Dermatology', rating: 4.6, experience: '8 years', hospital: 'Skin Care Clinic', image: null },
]

const specialties = ['All', 'General Physician', 'Internal Medicine', 'Pediatrics', 'Cardiology', 'Dermatology']

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
]

function Appointments() {
  const { appointments, addAppointment, setCurrentPage } = useApp()
  const [view, setView] = useState('list') // list, book, navigate
  const [bookingStep, setBookingStep] = useState(1)
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  const filteredDoctors = selectedSpecialty === 'All' 
    ? doctors 
    : doctors.filter(d => d.specialty === selectedSpecialty)

  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return {
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      num: date.getDate()
    }
  })

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      addAppointment({
        doctor: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        date: selectedDate,
        time: selectedTime,
        hospital: selectedDoctor.hospital,
        status: 'confirmed'
      })
      setBookingStep(5) // Confirmation step
    }
  }

  const resetBooking = () => {
    setView('list')
    setBookingStep(1)
    setSelectedDoctor(null)
    setSelectedDate(null)
    setSelectedTime(null)
  }

  // Booking Flow
  if (view === 'book') {
    return (
      <div className="p-4 max-w-md mx-auto">
        {/* Header */}
        <header className="mb-6 flex items-center gap-3">
          <button onClick={() => view === 'list' ? setView('list') : setBookingStep(prev => Math.max(1, prev - 1))} className="p-2 hover:bg-slate-100 rounded-lg">
            <ChevronLeft size={24} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-800">Book Appointment</h1>
            <p className="text-slate-500 text-sm">Step {bookingStep} of 4</p>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex-1 h-2 rounded-full bg-slate-200">
              <div 
                className={`h-full rounded-full transition-all ${
                  bookingStep >= step ? 'bg-primary' : 'bg-slate-200'
                }`}
                style={{ width: bookingStep >= step ? '100%' : '0%' }}
              />
            </div>
          ))}
        </div>

        {/* Step 1: Select Specialty & Doctor */}
        {bookingStep === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Choose a Doctor</h2>
            
            {/* Specialty Filter */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                    selectedSpecialty === spec
                      ? 'bg-primary text-white'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>

            {/* Doctor List */}
            <div className="space-y-3">
              {filteredDoctors.map((doctor) => (
                <button
                  key={doctor.id}
                  onClick={() => {
                    setSelectedDoctor(doctor)
                    setBookingStep(2)
                  }}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedDoctor?.id === doctor.id
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 bg-white hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                      <User size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{doctor.name}</h3>
                      <p className="text-sm text-slate-500">{doctor.specialty}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-500 fill-yellow-500" />
                          {doctor.rating}
                        </span>
                        <span>{doctor.experience}</span>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Date */}
        {bookingStep === 2 && (
          <div className="animate-slide-left">
            <button onClick={() => setBookingStep(1)} className="text-slate-500 text-sm mb-4 flex items-center gap-1">
              ← Back to doctors
            </button>
            
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Select a Date</h2>

            {/* Selected Doctor Summary */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{selectedDoctor?.name}</h3>
                  <p className="text-sm text-slate-500">{selectedDoctor?.specialty}</p>
                </div>
              </div>
            </div>

            {/* Date Grid */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {next7Days.map((day) => (
                <button
                  key={day.date}
                  onClick={() => setSelectedDate(day.date)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    selectedDate === day.date
                      ? 'bg-primary text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-primary/50'
                  }`}
                >
                  <p className="text-xs">{day.day}</p>
                  <p className="text-lg font-semibold mt-1">{day.num}</p>
                </button>
              ))}
            </div>

            {selectedDate && (
              <button
                onClick={() => setBookingStep(3)}
                className="w-full bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-smooth hover:bg-primary-dark"
              >
                Continue <ChevronRight size={20} />
              </button>
            )}
          </div>
        )}

        {/* Step 3: Select Time */}
        {bookingStep === 3 && (
          <div className="animate-slide-left">
            <button onClick={() => setBookingStep(2)} className="text-slate-500 text-sm mb-4 flex items-center gap-1">
              ← Back to date selection
            </button>
            
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Select a Time</h2>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    selectedTime === time
                      ? 'bg-primary text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-primary/50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            {selectedTime && (
              <button
                onClick={() => setBookingStep(4)}
                className="w-full bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-smooth hover:bg-primary-dark"
              >
                Review Booking <ChevronRight size={20} />
              </button>
            )}
          </div>
        )}

        {/* Step 4: Confirmation */}
        {bookingStep === 4 && (
          <div className="animate-slide-left">
            <button onClick={() => setBookingStep(3)} className="text-slate-500 text-sm mb-4 flex items-center gap-1">
              ← Back to time selection
            </button>
            
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Confirm Your Appointment</h2>

            <div className="bg-white rounded-xl p-4 border border-slate-200 mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-slate-500">Doctor</p>
                    <p className="font-semibold text-slate-800">{selectedDoctor?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-slate-500">Date</p>
                    <p className="font-semibold text-slate-800">{selectedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-slate-500">Time</p>
                    <p className="font-semibold text-slate-800">{selectedTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-slate-500">Hospital</p>
                    <p className="font-semibold text-slate-800">{selectedDoctor?.hospital}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleBookAppointment}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-smooth hover:bg-primary-dark"
            >
              <CheckCircle size={20} />
              Confirm Booking
            </button>
          </div>
        )}

        {/* Step 5: Success */}
        {bookingStep === 5 && (
          <div className="animate-fade-in text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Appointment Booked!</h2>
            <p className="text-slate-500 mt-2 mb-6">Your appointment has been confirmed</p>

            <div className="bg-white rounded-xl p-4 border border-slate-200 text-left mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Doctor</span>
                  <span className="font-medium text-slate-800">{selectedDoctor?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date</span>
                  <span className="font-medium text-slate-800">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Time</span>
                  <span className="font-medium text-slate-800">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hospital</span>
                  <span className="font-medium text-slate-800">{selectedDoctor?.hospital}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                resetBooking()
                setView('navigate')
              }}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold mb-3 transition-smooth hover:bg-primary-dark"
            >
              Get Directions
            </button>
            
            <button
              onClick={resetBooking}
              className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-medium transition-smooth hover:bg-slate-200"
            >
              Back to Appointments
            </button>
          </div>
        )}
      </div>
    )
  }

  // Hospital Navigation View
  if (view === 'navigate') {
    return (
      <div className="p-4 max-w-md mx-auto">
        <header className="mb-6 flex items-center gap-3">
          <button onClick={() => setView('list')} className="p-2 hover:bg-slate-100 rounded-lg">
            <ChevronLeft size={24} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-800">Hospital Navigation</h1>
            <p className="text-slate-500 text-sm">City Medical Center</p>
          </div>
        </header>

        {/* Map Placeholder */}
        <div className="bg-slate-100 rounded-xl h-64 flex items-center justify-center mb-4">
          <div className="text-center">
            <Navigation size={48} className="text-primary mx-auto mb-2" />
            <p className="text-slate-500">Interactive map loading...</p>
          </div>
        </div>

        {/* Directions */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 mb-4">
          <h3 className="font-semibold text-slate-800 mb-3">Directions to Your Appointment</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">1</div>
              <div>
                <p className="font-medium text-slate-800">Enter through Main Entrance</p>
                <p className="text-sm text-slate-500">Located on Ground Floor, North Wing</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">2</div>
              <div>
                <p className="font-medium text-slate-800">Go to Reception Desk</p>
                <p className="text-sm text-slate-500">Check-in and get your visitor pass</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">3</div>
              <div>
                <p className="font-medium text-slate-800">Take Elevator to Floor 2</p>
                <p className="text-sm text-slate-500">Department of General Medicine</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">4</div>
              <div>
                <p className="font-medium text-slate-800">Room 204 - Waiting Area</p>
                <p className="text-sm text-slate-500">Your doctor will call you shortly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
            <PhoneCall size={20} className="text-primary" />
            <span className="text-sm font-medium">Call Hospital</span>
          </button>
          <button className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
            <FileText size={20} className="text-primary" />
            <span className="text-sm font-medium">Pre-visit Checklist</span>
          </button>
        </div>
      </div>
    )
  }

  // Default: Appointment List
  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>
        <p className="text-slate-500 mt-1">Manage your healthcare visits</p>
      </header>

      {/* Book New Button */}
      <button
        onClick={() => setView('book')}
        className="w-full bg-primary text-white py-4 rounded-xl font-semibold mb-6 flex items-center justify-center gap-2 transition-smooth hover:bg-primary-dark shadow-lg shadow-primary/30"
      >
        <Calendar size={20} />
        Book New Appointment
      </button>

      {/* Upcoming Appointments */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Upcoming</h2>
        {appointments.length > 0 ? (
          <div className="space-y-3">
            {appointments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-800">{apt.doctor}</h3>
                    <p className="text-sm text-slate-500">{apt.specialty}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {apt.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {apt.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {apt.time}
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-100 flex gap-2">
                  <button 
                    onClick={() => setView('navigate')}
                    className="flex-1 bg-primary/10 text-primary py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Navigation size={16} />
                    Directions
                  </button>
                  <button className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg text-sm font-medium">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center border border-slate-100">
            <Calendar size={48} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No upcoming appointments</p>
            <button 
              onClick={() => setView('book')}
              className="text-primary font-medium mt-2"
            >
              Book your first appointment
            </button>
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center gap-2 transition-smooth hover:border-primary">
            <Activity size={24} className="text-primary" />
            <span className="text-sm font-medium text-slate-700">Check Symptoms</span>
          </button>
          <button className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center gap-2 transition-smooth hover:border-primary">
            <Pill size={24} className="text-primary" />
            <span className="text-sm font-medium text-slate-700">Medications</span>
          </button>
        </div>
      </section>
    </div>
  )
}

export default Appointments