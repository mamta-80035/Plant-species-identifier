"use client"

import { Button } from "@/components/ui/button"
import { Camera, Loader2 } from "lucide-react"

interface CameraCaptureButtonProps {
  isCapturing: boolean
  onCapture: () => void
}

export function CameraCaptureButton({ isCapturing, onCapture }: CameraCaptureButtonProps) {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <Button
        onClick={onCapture}
        disabled={isCapturing}
        size="lg"
        className="rounded-full w-16 h-16 bg-white hover:bg-gray-200 text-black disabled:opacity-50"
      >
        {isCapturing ? <Loader2 className="h-6 w-6 animate-spin" /> : <Camera className="h-6 w-6" />}
      </Button>
    </div>
  )
}
