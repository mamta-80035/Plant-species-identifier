"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Upload, ArrowLeft, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ApiError } from "@/components/api-error"
import { CameraDebugOverlay } from "@/components/camera-debug-overlay"
import { CameraControls } from "@/components/camera-controls"
import { CameraInfo } from "@/components/camera-info"
import { CameraStatusOverlay } from "@/components/camera-status-overlay"
import { CameraCaptureButton } from "@/components/camera-capture-button"
import { CameraReadyIndicator } from "@/components/camera-ready-indicator"
import { CameraErrorDisplay } from "@/components/camera-error-display"
import { PlantResultDisplay } from "@/components/plant-result-display"
import { useCamera } from "@/hooks/use-camera"

export default function IdentifyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const mode = searchParams.get("mode") || "upload"

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    videoRef,
    canvasRef,
    stream,
    isVideoReady,
    cameraStatus,
    currentFacingMode,
    availableCameras,
    getAvailableCameras,
    cleanupCamera,
    startCamera,
    capturePhoto,
  } = useCamera()

  // Initialize camera if mode is camera
  useEffect(() => {
    if (mode === "camera") {
      getAvailableCameras().then(() => {
        startCamera()
      })
      setShowCamera(true)
    }
    return () => {
      cleanupCamera()
    }
  }, [mode])

  const switchCamera = async () => {
    const newFacingMode = currentFacingMode === "user" ? "environment" : "user"
    console.log(`Switching camera from ${currentFacingMode} to ${newFacingMode}`)
    await startCamera(newFacingMode)
  }

  const retryCamera = () => {
    setRetryCount((prev) => prev + 1)
    cleanupCamera()
    setTimeout(() => {
      startCamera(currentFacingMode)
    }, 1000)
  }

  const forceVideoReady = () => {
    console.log("Force video ready clicked")
    if (videoRef.current && stream) {
      // setIsVideoReady(true)
      // setCameraStatus("ready")
    }
  }

  const handleCapturePhoto = async () => {
    setIsCapturing(true)
    setError(null)

    try {
      const imageDataUrl = capturePhoto()
      console.log("Photo captured successfully")
      setSelectedImage(imageDataUrl)
      setShowCamera(false)
      cleanupCamera()
    } catch (err) {
      console.error("Capture error:", err)
      setError(`Failed to capture photo: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setIsCapturing(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const identifyPlant = async () => {
    if (!selectedImage) return

    setIsLoading(true)
    setError(null)

    try {
      const base64Data = selectedImage.includes(",") ? selectedImage.split(",")[1] : selectedImage

      const response = await fetch("/api/identify-plant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images: [base64Data],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("API key is invalid. Please check your Plant.id API key configuration.")
        }
        throw new Error(data.error || "Failed to identify plant")
      }

      setResult(data)
    } catch (err) {
      console.error("Plant identification error:", err)
      setError(err instanceof Error ? err.message : "Failed to identify plant. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetIdentification = () => {
    setSelectedImage(null)
    setResult(null)
    setError(null)
    if (mode === "camera") {
      startCamera(currentFacingMode)
      setShowCamera(true)
    }
  }

  const switchToUpload = () => {
    cleanupCamera()
    setShowCamera(false)
    router.push("/identify?mode=upload")
  }

  if (showCamera && mode === "camera") {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <div className="flex items-center justify-between p-4 bg-black text-white">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Take Photo</h1>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800" onClick={switchToUpload}>
            Upload Instead
          </Button>
        </div>

        <div className="flex-1 relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{
              backgroundColor: "#000",
              minHeight: "400px",
              transform: currentFacingMode === "user" ? "scaleX(-1)" : "none",
            }}
          />
          <canvas ref={canvasRef} className="hidden" />

          <CameraDebugOverlay
            videoRef={videoRef}
            stream={stream}
            isVideoReady={isVideoReady}
            cameraStatus={cameraStatus}
          />

          <CameraControls
            availableCameras={availableCameras}
            currentFacingMode={currentFacingMode}
            onSwitchCamera={switchCamera}
            cameraStatus={cameraStatus}
          />

          <CameraInfo currentFacingMode={currentFacingMode} isVideoReady={isVideoReady} cameraStatus={cameraStatus} />

          {!isVideoReady && (
            <CameraStatusOverlay
              cameraStatus={cameraStatus}
              currentFacingMode={currentFacingMode}
              availableCameras={availableCameras}
              retryCount={retryCount}
              onRetryCamera={retryCamera}
              onSwitchCamera={switchCamera}
              onSwitchToUpload={switchToUpload}
              onForceVideoReady={forceVideoReady}
            />
          )}

          {isVideoReady && <CameraCaptureButton isCapturing={isCapturing} onCapture={handleCapturePhoto} />}

          {isVideoReady && <CameraReadyIndicator />}

          {error && (
            <CameraErrorDisplay
              error={error}
              availableCameras={availableCameras}
              onRetryCamera={retryCamera}
              onSwitchCamera={switchCamera}
              onSwitchToUpload={switchToUpload}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">{mode === "camera" ? "Camera Capture" : "Upload Image"}</h1>
          <div className="w-24"></div>
        </div>

        <div className="max-w-2xl mx-auto">
          {!selectedImage && mode === "upload" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Select Plant Image</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-green-400 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Choose a clear photo of the plant you want to identify</p>
                  <Button onClick={() => fileInputRef.current?.click()}>Select Image</Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                <div className="mt-4">
                  <Link href="/identify?mode=camera">
                    <Button variant="outline" className="mr-2 bg-transparent">
                      <Camera className="h-4 w-4 mr-2" />
                      Try Camera Instead
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedImage && !result && (
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Identify This Plant</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Selected plant"
                    width={400}
                    height={300}
                    className="rounded-lg mx-auto object-cover"
                  />
                </div>
                <div className="flex gap-4 justify-center">
                  <Button onClick={identifyPlant} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Identifying...
                      </>
                    ) : (
                      "Identify Plant"
                    )}
                  </Button>
                  <Button variant="outline" onClick={resetIdentification}>
                    Try Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {error && <ApiError error={error} onRetry={resetIdentification} />}

          {result && (
            <PlantResultDisplay
              selectedImage={selectedImage!}
              result={result}
              onResetIdentification={resetIdentification}
            />
          )}
        </div>
      </div>
    </div>
  )
}
