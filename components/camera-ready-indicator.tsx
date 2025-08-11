"use client"

export function CameraReadyIndicator() {
  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
      <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
        📸 Camera Ready - Tap to capture
      </div>
    </div>
  )
}
