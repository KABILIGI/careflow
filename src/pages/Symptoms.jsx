import { useState } from 'react'
import { Brain, Eye, Ear, Heart, Wind, Bone, Circle, Hand, ChevronRight, Search, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { useApp } from '../App'

const bodyParts = [
  { id: 'head', label: 'Head', icon: Brain, area: 'head' },
  { id: 'eyes', label: 'Eyes', icon: Eye, area: 'head' },
  { id: 'ears', label: 'Ears', icon: Ear, area: 'head' },
  { id: 'chest', label: 'Chest', icon: Heart, area: 'torso' },
  { id: 'lungs', label: 'Lungs', icon: Wind, area: 'torso' },
  { id: 'stomach', label: 'Stomach', icon: Circle, area: 'torso' },
  { id: 'arm-left', label: 'Left Arm', icon: Hand, area: 'arms' },
  { id: 'arm-right', label: 'Right Arm', icon: Hand, area: 'arms' },
  { id: 'leg-left', label: 'Left Leg', icon: Circle, area: 'legs' },
  { id: 'leg-right', label: 'Right Leg', icon: Circle, area: 'legs' },
]

const commonSymptoms = {
  head: ['Headache', 'Dizziness', 'Fever', 'Fatigue'],
  eyes: ['Blurred vision', 'Eye pain', 'Redness', 'Dry eyes'],
  ears: ['Ear pain', 'Hearing loss', 'Ringing', 'Discharge'],
  chest: ['Chest pain', 'Shortness of breath', 'Cough', 'Palpitations'],
  lungs: ['Cough', 'Wheezing', 'Difficulty breathing', 'Chest tightness'],
  stomach: ['Nausea', 'Abdominal pain', 'Bloating', 'Loss of appetite'],
  arms: ['Joint pain', 'Numbness', 'Weakness', 'Swelling'],
  legs: ['Leg pain', 'Swelling', 'Cramping', 'Numbness'],
}

const severityLevels = [
  { id: 'mild', label: 'Mild', color: 'bg-green-100 text-green-700', description: 'Manageable, minimal impact' },
  { id: 'moderate', label: 'Moderate', color: 'bg-yellow-100 text-yellow-700', description: 'Noticeable, affecting daily life' },
  { id: 'severe', label: 'Severe', color: 'bg-red-100 text-red-700', description: 'Significant, needs attention' },
]

function Symptoms() {
  const { addSymptom, symptoms } = useApp()
  const [selectedPart, setSelectedPart] = useState(null)
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [severity, setSeverity] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [step, setStep] = useState(1) // 1: select part, 2: select symptoms, 3: severity, 4: results

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const handleSubmit = () => {
    if (selectedPart && selectedSymptoms.length > 0 && severity) {
      addSymptom({
        part: selectedPart,
        symptoms: selectedSymptoms,
        severity: severity,
        date: new Date().toISOString(),
        read: false
      })
      setStep(4)
    }
  }

  const resetFlow = () => {
    setSelectedPart(null)
    setSelectedSymptoms([])
    setSeverity(null)
    setSearchQuery('')
    setStep(1)
  }

  const filteredSymptoms = selectedPart 
    ? commonSymptoms[selectedPart.id]?.filter(s => 
        s.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    : []

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Symptom Checker</h1>
        <p className="text-slate-500 mt-1">Select where you feel discomfort</p>
      </header>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              step >= s ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              {step > s ? '✓' : s}
            </div>
            {s < 4 && (
              <div className={`flex-1 h-1 rounded-full transition-all ${
                step > s ? 'bg-primary' : 'bg-slate-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Body Part */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Tap on the affected area</h2>
          
          {/* Body Map */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-4">
            <div className="relative h-80">
              {/* Head */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
                <button
                  onClick={() => setSelectedPart(bodyParts[0])}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    selectedPart?.id === 'head' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-primary/10'
                  }`}
                >
                  <Brain size={28} />
                </button>
                <div className="flex gap-2 mt-2">
                  {bodyParts.slice(1, 3).map((part) => {
                    const Icon = part.icon
                    return (
                      <button
                        key={part.id}
                        onClick={() => setSelectedPart(part)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          selectedPart?.id === part.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-primary/10'
                        }`}
                      >
                        <Icon size={18} />
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Torso */}
              <div className="absolute left-1/2 -translate-x-1/2 top-28 flex flex-col items-center">
                <div className="flex gap-2">
                  {bodyParts.slice(3, 6).map((part) => {
                    const Icon = part.icon
                    return (
                      <button
                        key={part.id}
                        onClick={() => setSelectedPart(part)}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                          selectedPart?.id === part.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-primary/10'
                        }`}
                      >
                        <Icon size={24} />
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Arms */}
              <div className="absolute left-1/2 -translate-x-1/2 top-44 flex gap-32">
                {bodyParts.slice(6, 8).map((part) => {
                  const Icon = part.icon
                  return (
                    <button
                      key={part.id}
                      onClick={() => setSelectedPart(part)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        selectedPart?.id === part.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-primary/10'
                      }`}
                    >
                      <Icon size={20} />
                    </button>
                  )
                })}
              </div>

              {/* Legs */}
              <div className="absolute left-1/2 -translate-x-1/2 top-64 flex gap-24">
                {bodyParts.slice(8, 10).map((part) => {
                  const Icon = part.icon
                  return (
                    <button
                      key={part.id}
                      onClick={() => setSelectedPart(part)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        selectedPart?.id === part.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-primary/10'
                      }`}
                    >
                      <Icon size={20} />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {selectedPart && (
            <button
              onClick={() => setStep(2)}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-smooth hover:bg-primary-dark"
            >
              Continue <ChevronRight size={20} />
            </button>
          )}
        </div>
      )}

      {/* Step 2: Select Symptoms */}
      {step === 2 && (
        <div className="animate-slide-left">
          <button onClick={() => setStep(1)} className="text-slate-500 text-sm mb-4 flex items-center gap-1">
            ← Back to body selection
          </button>
          
          <h2 className="text-lg font-semibold text-slate-800 mb-2">
            What symptoms do you feel in your {selectedPart?.label.toLowerCase()}?
          </h2>
          <p className="text-slate-500 text-sm mb-4">Select all that apply</p>

          {/* Search */}
          <div className="relative mb-4">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Symptom List */}
          <div className="space-y-2 mb-4">
            {filteredSymptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  selectedSymptoms.includes(symptom)
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-slate-200 text-slate-700 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{symptom}</span>
                  {selectedSymptoms.includes(symptom) && (
                    <CheckCircle size={20} className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {selectedSymptoms.length > 0 && (
            <button
              onClick={() => setStep(3)}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-smooth hover:bg-primary-dark"
            >
              Continue <ChevronRight size={20} />
            </button>
          )}
        </div>
      )}

      {/* Step 3: Severity */}
      {step === 3 && (
        <div className="animate-slide-left">
          <button onClick={() => setStep(2)} className="text-slate-500 text-sm mb-4 flex items-center gap-1">
            ← Back to symptoms
          </button>
          
          <h2 className="text-lg font-semibold text-slate-800 mb-2">
            How severe is your condition?
          </h2>
          <p className="text-slate-500 text-sm mb-4">This helps us recommend the right care</p>

          <div className="space-y-3 mb-6">
            {severityLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSeverity(level.id)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  severity === level.id
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-200 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    severity === level.id ? 'border-primary bg-primary' : 'border-slate-300'
                  }`}>
                    {severity === level.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div>
                    <span className={`font-semibold px-2 py-0.5 rounded-full text-sm ${level.color}`}>
                      {level.label}
                    </span>
                    <p className="text-sm text-slate-500 mt-1">{level.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {severity && (
            <button
              onClick={handleSubmit}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-smooth hover:bg-primary-dark"
            >
              Get Recommendations <ChevronRight size={20} />
            </button>
          )}
        </div>
      )}

      {/* Step 4: Results */}
      {step === 4 && (
        <div className="animate-slide-left">
          <div className="bg-green-50 rounded-xl p-6 text-center mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-green-800">Assessment Complete!</h2>
            <p className="text-green-600 mt-2">Based on your symptoms, here's what we recommend:</p>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-4">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <AlertCircle size={20} className="text-primary" />
              Recommended Actions
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <Clock size={18} className="text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800">Seek immediate care</p>
                  <p className="text-sm text-red-600">Your symptoms may require urgent attention</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle size={18} className="text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Book an appointment</p>
                  <p className="text-sm text-yellow-600">See a doctor within 24-48 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle size={18} className="text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Rest and monitor</p>
                  <p className="text-sm text-blue-600">Track symptoms and rest well</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Book */}
          <button
            onClick={() => {
              resetFlow()
            }}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold mb-3 transition-smooth hover:bg-primary-dark"
          >
            Book Appointment Now
          </button>
          
          <button
            onClick={resetFlow}
            className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-medium transition-smooth hover:bg-slate-200"
          >
            Start New Assessment
          </button>
        </div>
      )}

      {/* Recent Symptoms */}
      {symptoms.length > 0 && step < 4 && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Recent Assessments</h2>
          <div className="space-y-2">
            {symptoms.slice(-3).reverse().map((symptom) => (
              <div key={symptom.id} className="bg-white rounded-xl p-4 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-800 capitalize">{symptom.part.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    symptom.severity === 'severe' ? 'bg-red-100 text-red-700' :
                    symptom.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {symptom.severity}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{symptom.symptoms.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Symptoms