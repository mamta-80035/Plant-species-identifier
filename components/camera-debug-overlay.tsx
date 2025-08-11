"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

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
