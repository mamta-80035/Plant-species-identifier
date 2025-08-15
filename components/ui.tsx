"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Loader2,
  Leaf,
  Upload,
  ImageIcon,
  Camera,
  RotateCcw,
  Zap,
  ArrowLeft,
  RefreshCw,
  XCircle,
  Home,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Loading Spinner Component
interface LoadingSpinnerProps {
  message?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ message = "Loading...", size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-green-600`} />
        <Leaf className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500" />
      </div>
      <p className="text-gray-600 mt-4 text-center">{message}</p>
    </div>
  )
}

// Upload Zone Component
interface UploadZoneProps {
  onFileSelect: () => void
}

export function UploadZone({ onFileSelect }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
        isDragOver
          ? "border-green-500 bg-green-50 scale-105"
          : "border-gray-300 hover:border-green-400 hover:bg-green-50/50"
      }`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragOver(false)
      }}
    >
      <div className="space-y-6">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
          <Upload className="h-10 w-10 text-white" />
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Upload Plant Image</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Choose a clear, well-lit photo of the plant you want to identify. The better the image quality, the more
            accurate the identification.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onFileSelect}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <ImageIcon className="h-5 w-5 mr-2" />
            Select from Gallery
          </Button>

          <div className="text-gray-500">or</div>

          <Link href="/identify?mode=camera">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl transition-all duration-300 bg-transparent"
            >
              <Camera className="h-5 w-5 mr-2" />
              Use Camera Instead
            </Button>
          </Link>
        </div>

        <div className="text-sm text-gray-500 space-y-1">
          <p>
            💡 <strong>Tips for better results:</strong>
          </p>
          <p>• Ensure good lighting</p>
          <p>• Focus on leaves, flowers, or distinctive features</p>
          <p>• Avoid blurry or distant shots</p>
        </div>
      </div>
    </div>
  )
}

// Image Preview Component
interface ImagePreviewProps {
  selectedImage: string
  isLoading: boolean
  onIdentify: () => void
  onReset: () => void
}

export function ImagePreview({ selectedImage, isLoading, onIdentify, onReset }: ImagePreviewProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Ready to Identify</h2>

        <div className="relative mb-6 group">
          <Image
            src={selectedImage || "/placeholder.svg"}
            alt="Selected plant"
            width={500}
            height={400}
            className="rounded-xl mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onIdentify}
            disabled={isLoading}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Analyzing Plant...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                Identify Plant
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={onReset}
            size="lg"
            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-xl transition-all duration-300 bg-transparent"
            disabled={isLoading}
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Try Another
          </Button>
        </div>
      </div>
    </div>
  )
}

// Animated Counter Component
interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
}

export function AnimatedCounter({ end, duration = 2000, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration])

  return (
    <span className="font-bold text-2xl text-green-600">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}


// Page Header Component
interface PageHeaderProps {
  title: string
  subtitle?: string
  showBackButton?: boolean
  rightContent?: React.ReactNode
}

export function PageHeader({ title, subtitle, showBackButton = true, rightContent }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white w-full">
      <div className="flex items-center justify-between p-4 relative">
        <div className="flex items-center">
          {showBackButton && (
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          )}
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
          <Image
            src="/plant-logo.png"
            alt="Plant Species Identifier"
            width={32}
            height={32}
            className="animate-pulse-slow"
          />
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        
        <div className="flex items-center">
          {rightContent && <div>{rightContent}</div>}
        </div>
      </div>
    </div>
  )
}

// Camera Header Component
interface CameraHeaderProps {
  onSwitchToUpload: () => void
}

export function CameraHeader({ onSwitchToUpload }: CameraHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white w-full">
      <div className="flex items-center justify-between p-4 relative">
        <div className="flex items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
          <Image
            src="/plant-logo.png"
            alt="Plant Species Identifier"
            width={32}
            height={32}
            className="animate-pulse-slow"
          />
          <h1 className="text-lg font-semibold">Camera Capture</h1>
        </div>
        
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 rounded-full"
            onClick={onSwitchToUpload}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>
    </div>
  )
}

// API Error Component
interface ApiErrorProps {
  error: string
  onRetry?: () => void
}

export function ApiError({ error, onRetry }: ApiErrorProps) {
  return (
    <Alert className="border-red-200 bg-gradient-to-br from-red-50 to-red-100 shadow-lg rounded-xl">
      <XCircle className="h-5 w-5 text-red-600" />
      <AlertDescription>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-red-800 mb-2">Something went wrong</h4>
            <p className="text-red-700">{error}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {onRetry && (
              <Button
                size="sm"
                onClick={onRetry}
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            )}
            <Link href="/">
              <Button
                size="sm"
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300 bg-transparent"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}
