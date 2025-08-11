"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface CameraControlsProps {
  availableCameras: MediaDeviceInfo[]
  currentFacingMode: "user" | "environment"
  onSwitchCamera: () => void
  cameraStatus: string
}

export function CameraControls({
  availableCameras,
  currentFacingMode,
  onSwitchCamera,
  cameraStatus,
}: CameraControlsProps) {
  if (availableCameras.length <= 1) return null

  return (
    <div className="absolute top-4 right-4">
      <Button
        onClick={onSwitchCamera}
        size="sm"
        className="rounded-full bg-black bg-opacity-50 text-white border-white hover:bg-opacity-70"
        variant="outline"
        disabled={cameraStatus === "requesting_stream" || cameraStatus === "setting_up_video"}
      >
        <RotateCcw className="h-4 w-4 mr-1" />
        {currentFacingMode === "user" ? "Back" : "Front"}
      </Button>
    </div>
  )
}
