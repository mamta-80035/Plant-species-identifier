"use client"

export function CameraReadyIndicator() {
  return (
    <div className="absolute top-8 md:top-12 left-1/2 transform -translate-x-1/2 z-10">
      <div className="bg-green-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium shadow-lg backdrop-blur-sm bg-green-500/90">
        📸 Camera Ready - Tap to capture
      </div>
    </div>
  )
}
