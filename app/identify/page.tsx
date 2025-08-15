"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { useCamera } from "@/hooks/use-camera"
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import {
  CameraDebugOverlay,
  CameraControls,
  CameraInfo,
  CameraStatusOverlay,
  CameraCaptureButton,
  CameraReadyIndicator,
  CameraErrorDisplay,
} from "@/components/camera"

import { LoadingSpinner, UploadZone, ImagePreview, CameraHeader, PageHeader, ApiError } from "@/components/ui"

import { PlantResultsMobile, PlantResultDisplay } from "@/components/plant-results"

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

  const isMobile = useMobileDetection()

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
      // Camera hook handles this internally
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
        <CameraHeader onSwitchToUpload={switchToUpload} />

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <PageHeader
        title={mode === "camera" ? "Camera Capture" : "Upload Image"}
        subtitle="Identify any plant species with AI-powered recognition"
      />

      <div className="w-full py-8">
        <div className="w-full px-4">
          {!selectedImage && mode === "upload" && (
            <div className="max-w-2xl mx-auto">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <UploadZone onFileSelect={() => fileInputRef.current?.click()} />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {selectedImage && !result && !isLoading && (
            <div className="max-w-2xl mx-auto px-4">
              <ImagePreview
                selectedImage={selectedImage}
                isLoading={isLoading}
                onIdentify={identifyPlant}
                onReset={resetIdentification}
              />
            </div>
          )}

          {isLoading && (
            <div className="max-w-2xl mx-auto px-4">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <LoadingSpinner message="Analyzing your plant image with AI technology..." size="lg" />
                </CardContent>
              </Card>
            </div>
          )}

          {error && (
            <div className="mb-6 max-w-2xl mx-auto px-4">
              <ApiError error={error} onRetry={resetIdentification} />
            </div>
          )}

          {result && (
            <>
              {isMobile ? (
                <PlantResultsMobile
                  selectedImage={selectedImage!}
                  result={result}
                  onResetIdentification={resetIdentification}
                />
              ) : (
                <PlantResultDisplay
                  selectedImage={selectedImage!}
                  result={result}
                  onResetIdentification={resetIdentification}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
