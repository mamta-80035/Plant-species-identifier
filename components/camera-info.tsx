"use client"

interface CameraInfoProps {
  currentFacingMode: "user" | "environment"
  isVideoReady: boolean
  cameraStatus: string
}

export function CameraInfo({ currentFacingMode, isVideoReady, cameraStatus }: CameraInfoProps) {
  if (!isVideoReady && cameraStatus === "initializing") return null

  return (
    <div className="absolute top-4 left-4">
      <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs">
        {currentFacingMode === "user" ? "📱 Front Camera" : "📷 Back Camera"}
      </div>
    </div>
  )
}
