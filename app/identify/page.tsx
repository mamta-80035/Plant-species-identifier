"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { useCamera } from "@/hooks/use-camera"
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import {
  CameraStatusOverlay,
  CameraCaptureButton,
  CameraErrorDisplay
} from "@/components/camera"
import { ApiError, LoadingSpinner, ImagePreview, UploadZone } from "@/components/shared"
import { PlantResultsMobile, PlantResultDisplay } from "@/components/plant"

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

  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    videoRef,
    canvasRef,
    stream,
    isVideoReady,
    cameraStatus,
    currentFacingMode,
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

  const retryCamera = () => {
    cleanupCamera()
    setTimeout(() => {
      startCamera(currentFacingMode)
    }, 1000)
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

        <div className="flex-1 relative flex items-center justify-center">
          <div className="relative w-full max-w-4xl mx-auto">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-auto max-h-[80vh] object-cover rounded-lg"
              style={{
                backgroundColor: "#000",
                minHeight: "400px",
                transform: currentFacingMode === "user" ? "scaleX(-1)" : "none",
              }}
            />
            <canvas ref={canvasRef} className="hidden" />

            {!isVideoReady && (
              <CameraStatusOverlay
                cameraStatus={cameraStatus}
                currentFacingMode={currentFacingMode}
                onRetryCamera={retryCamera}
                onSwitchToUpload={switchToUpload}
              />
            )}

            {isVideoReady && <CameraCaptureButton isCapturing={isCapturing} onCapture={handleCapturePhoto} />}

            {error && (
              <CameraErrorDisplay
                error={error}
                onRetryCamera={retryCamera}
                onSwitchToUpload={switchToUpload}
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
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
