"use client"

import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw, RotateCcw } from "lucide-react"

interface CameraStatusOverlayProps {
  cameraStatus: string
  currentFacingMode: "user" | "environment"
  availableCameras: MediaDeviceInfo[]
  retryCount: number
  onRetryCamera: () => void
  onSwitchCamera: () => void
  onSwitchToUpload: () => void
  onForceVideoReady: () => void
}

export function CameraStatusOverlay({
  cameraStatus,
  currentFacingMode,
  availableCameras,
  retryCount,
  onRetryCamera,
  onSwitchCamera,
  onSwitchToUpload,
  onForceVideoReady,
}: CameraStatusOverlayProps) {
  const getStatusTitle = () => {
    switch (cameraStatus) {
      case "requesting_permission":
        return "Requesting camera permission..."
      case "getting_devices":
        return "Checking available cameras..."
      case "requesting_stream":
        return `Starting ${currentFacingMode === "user" ? "front" : "back"} camera...`
      case "setting_up_video":
        return "Setting up video..."
      case "video_ready":
      case "ready":
        return "Camera ready!"
      case "error":
        return "Camera Error"
      default:
        return "Initializing camera..."
    }
  }

  const getStatusDescription = () => {
    switch (cameraStatus) {
      case "requesting_permission":
        return "Please allow camera access when prompted"
      case "getting_devices":
        return "Looking for cameras on your device"
      case "requesting_stream":
        return `Connecting to ${currentFacingMode === "user" ? "front" : "back"} camera`
      case "setting_up_video":
        return "Preparing video stream"
      case "video_ready":
      case "ready":
        return "You can now take a photo"
      case "error":
        return "Something went wrong with the camera"
      default:
        return "Please wait while we set up your camera"
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="text-white text-center p-6 max-w-md">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">{getStatusTitle()}</h3>
        <p className="text-sm text-gray-300 mb-4">{getStatusDescription()}</p>

        {cameraStatus === "error" && (
          <div className="space-y-3">
            <Button onClick={onRetryCamera} variant="outline" className="text-white border-white bg-transparent">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Camera {retryCount > 0 && `(${retryCount})`}
            </Button>
            {availableCameras.length > 1 && (
              <Button onClick={onSwitchCamera} variant="outline" className="text-white border-white bg-transparent">
                <RotateCcw className="h-4 w-4 mr-2" />
                Try {currentFacingMode === "user" ? "Back" : "Front"} Camera
              </Button>
            )}
            <Button onClick={onSwitchToUpload} className="bg-green-600 hover:bg-green-700">
              Switch to Upload
            </Button>
          </div>
        )}

        {cameraStatus !== "error" && (
          <div className="space-y-2">
            {availableCameras.length > 1 && (
              <Button onClick={onSwitchCamera} variant="outline" className="text-white border-white bg-transparent">
                <RotateCcw className="h-4 w-4 mr-2" />
                Switch to {currentFacingMode === "user" ? "Back" : "Front"} Camera
              </Button>
            )}
            <Button onClick={onForceVideoReady} variant="outline" className="text-white border-white bg-transparent">
              Force Camera Ready
            </Button>
            <Button onClick={onSwitchToUpload} variant="outline" className="text-white border-white bg-transparent">
              Switch to Upload Instead
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
