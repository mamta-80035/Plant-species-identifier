"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Loader2, Camera, RefreshCw } from "lucide-react"

// Camera Controls Component
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

// Camera Info Component
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

// Camera Status Overlay Component
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

// Camera Capture Button Component
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

// Camera Ready Indicator Component
export function CameraReadyIndicator() {
  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
      <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
        📸 Camera Ready - Tap to capture
      </div>
    </div>
  )
}

// Camera Error Display Component
interface CameraErrorDisplayProps {
  error: string
  availableCameras: MediaDeviceInfo[]
  onRetryCamera: () => void
  onSwitchCamera: () => void
  onSwitchToUpload: () => void
}

export function CameraErrorDisplay({
  error,
  availableCameras,
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
          {availableCameras.length > 1 && (
            <Button
              onClick={onSwitchCamera}
              size="sm"
              variant="outline"
              className="text-white border-white bg-transparent"
            >
              Switch Camera
            </Button>
          )}
          <Button onClick={onSwitchToUpload} size="sm" className="bg-green-600 hover:bg-green-700">
            Upload Instead
          </Button>
        </div>
      </div>
    </div>
  )
}

// Camera Debug Overlay Component
interface CameraDebugOverlayProps {
  videoRef: React.RefObject<HTMLVideoElement>
  stream: MediaStream | null
  isVideoReady: boolean
  cameraStatus: string
}

export function CameraDebugOverlay({ videoRef, stream, isVideoReady, cameraStatus }: CameraDebugOverlayProps) {
  const [showDebug, setShowDebug] = useState(false)

  if (!showDebug) {
    return (
      <div className="absolute top-16 right-4">
        <Button
          onClick={() => setShowDebug(true)}
          size="sm"
          variant="outline"
          className="text-white border-white bg-black bg-opacity-50"
        >
          Debug
        </Button>
      </div>
    )
  }

  const video = videoRef.current
  const videoTrack = stream?.getVideoTracks()[0]

  return (
    <div className="absolute top-16 right-4 bg-black bg-opacity-80 text-white p-4 rounded text-xs max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold">Camera Debug</h4>
        <Button onClick={() => setShowDebug(false)} size="sm" variant="ghost" className="text-white p-1 h-auto">
          ✕
        </Button>
      </div>

      <div className="space-y-1">
        <div>Status: {cameraStatus}</div>
        <div>Video Ready: {isVideoReady ? "✅" : "❌"}</div>
        <div>Stream Active: {stream ? "✅" : "❌"}</div>
        <div>Video Element: {video ? "✅" : "❌"}</div>

        {video && (
          <>
            <div>Video Paused: {video.paused ? "❌" : "✅"}</div>
            <div>Video Time: {video.currentTime.toFixed(2)}s</div>
            <div>
              Video Dimensions: {video.videoWidth}x{video.videoHeight}
            </div>
            <div>
              Client Dimensions: {video.clientWidth}x{video.clientHeight}
            </div>
            <div>Ready State: {video.readyState}</div>
          </>
        )}

        {videoTrack && (
          <>
            <div>Track State: {videoTrack.readyState}</div>
            <div>Track Enabled: {videoTrack.enabled ? "✅" : "❌"}</div>
            <div>Track Muted: {videoTrack.muted ? "❌" : "✅"}</div>
          </>
        )}
      </div>
    </div>
  )
}
