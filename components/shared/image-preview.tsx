"use client"

import { Button } from "@/components/ui/button"
import { Loader2, RotateCcw, Zap } from "lucide-react"
import Image from "next/image"

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
            src={selectedImage || "/plant-logo.png"}
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
