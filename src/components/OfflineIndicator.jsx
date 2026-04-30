import { WifiOff } from 'lucide-react'

function OfflineIndicator() {
  return (
    <div className="bg-amber-500 text-white px-4 py-2 flex items-center justify-center gap-2 animate-slide-down">
      <WifiOff size={18} />
      <span className="text-sm font-medium">You're offline. Some features may be limited.</span>
    </div>
  )
}

export default OfflineIndicator