"use client"

import { Button } from "@/components/ui/button"

interface CameraErrorDisplayProps {
  error: string
  onRetryCamera: () => void
  onSwitchCamera: () => void
  onSwitchToUpload: () => void
}

export function CameraErrorDisplay({
  error,
  onRetryCamera,
  onSwitchCamera,
  onSwitchToUpload,
}: CameraErrorDisplayProps) {
  return (
    <div className="absolute bottom-32 left-4 right-4">
      <div className="bg-red-500 text-white p-4 rounded-lg text-center">
        <p className="mb-2">{error}</p>
        <div className="space-x-2">
          <Button
            onClick={onRetryCamera}
            size="sm"
            variant="outline"
            className="text-white border-white bg-transparent"
          >
            Try Again
          </Button>
          <Button onClick={onSwitchToUpload} size="sm" className="bg-green-600 hover:bg-green-700">
            Upload Instead
          </Button>
        </div>
      </div>
    </div>
  )
}
