"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CameraDebug() {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [permissions, setPermissions] = useState<string>("unknown")
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    checkCameraSupport()
  }, [])

  const checkCameraSupport = async () => {
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissions("not_supported")
        return
      }

      // Get available devices
      const deviceList = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = deviceList.filter((device) => device.kind === "videoinput")
      setDevices(videoDevices)

      // Check permissions
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        setPermissions("granted")
        stream.getTracks().forEach((track) => track.stop())
      } catch (err) {
        setPermissions("denied")
      }
    } catch (error) {
      console.error("Camera check error:", error)
      setPermissions("error")
    }
  }

  const testCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Test camera error:", error)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Camera Debug Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <strong>Permission Status:</strong> {permissions}
        </div>

        <div>
          <strong>Available Cameras:</strong> {devices.length}
          {devices.map((device, index) => (
            <div key={device.deviceId} className="text-sm text-gray-600 ml-4">
              {index + 1}. {device.label || `Camera ${index + 1}`}
            </div>
          ))}
        </div>

        <div>
          <strong>getUserMedia Support:</strong> {navigator.mediaDevices?.getUserMedia ? "✅ Yes" : "❌ No"}
        </div>

        <Button onClick={testCamera} className="w-full">
          Test Camera
        </Button>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full rounded border"
          style={{ maxHeight: "200px" }}
        />
      </CardContent>
    </Card>
  )
}
