"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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

