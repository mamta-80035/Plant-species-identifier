"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, ImageIcon, Camera } from "lucide-react"
import Link from "next/link"

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
        // Handle file drop
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
