"use client"

import { Button } from "@/components/ui/button"
import { Camera, Loader2 } from "lucide-react"

interface CameraCaptureButtonProps {
  isCapturing: boolean
  onCapture: () => void
}

export function CameraCaptureButton({ isCapturing, onCapture }: CameraCaptureButtonProps) {
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
      <Button
        onClick={onCapture}
        disabled={isCapturing}
        size="lg"
        className="rounded-full w-16 h-16 md:w-20 md:h-20 bg-white hover:bg-gray-200 text-black disabled:opacity-50 shadow-2xl hover:shadow-3xl transition-all duration-300"
      >
        {isCapturing ? <Loader2 className="h-4 w-4 md:h-6 md:w-6 animate-spin" /> : <Camera className="h-4 w-4 md:h-6 md:w-6" />}
      </Button>
    </div>
  )
}
